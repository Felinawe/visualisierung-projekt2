import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const PARTY_META = {
  spd: { label: "SPD", color: "#D94D41" },
  cxu: { label: "Union", color: "#615952" },
  gru: { label: "GRÜNE", color: "#84C462" },
  lin: { label: "LINKE", color: "#B56BB8" },
  fdp: { label: "FDP", color: "#F5D233" },
  afd: { label: "AfD", color: "#75C0EB" },
  bsw: { label: "BSW", color: "#BF3964" },
};

const TASKS = [
  { id: "task1", label: "Führung" },
  { id: "task2a", label: "Abstand an der Spitze" },
  { id: "task2b", label: "5%-Hürde" },
  { id: "task3", label: "Mehrheiten" },
];

const SCENARIO_OPTIONS = [100, 1000];
const COALITION_PARTY_POOL = ["cxu", "spd", "gru", "fdp", "lin", "bsw"];
const FREQUENCY_BUCKET = 1;
const TOTAL_SEATS = 630;

const LAYOUT_TOKENS = {
  cardWidth: 124,
  cardHeight: 86,
  cardGap: 8,
  baselineColumns: 10,
  minAdaptiveColumns: 2,
  maxAdaptiveColumns: 10,
  framePadding: 12,
  bandTitleGap: 18,
  bandGap: 16,
};

const state = {
  task: "task1",
  scenarioCount: 100,
  selectedLeader: null,
  selectedThresholdParty: null,
  selectedCoalition: null,
  coalitionOptions: [],
  scenarios: [],
  frequencyOrderedScenarios: [],
  parties: [],
  variants: {
    layoutStructure: "adaptive-grid",
    controlAreaLayout: "perspective-bridge",
    probabilityLayout: "standard",
    groupingDisplay: "segmented-bands",
    microchartDisplay: "standard",
    editorialStyle: "calm-serif",
  },
};

init();

async function init() {
  const poll = await d3.json("../data/poll-data.json");
  state.parties = poll.data.map((entry) => ({
    key: entry.party,
    avg: entry.avg,
    ciLower: entry.ci_lower,
    ciUpper: entry.ci_upper,
  }));

  regenerateScenarios();
  state.selectedThresholdParty = partyAtHurdle(state.parties);

  renderTaskButtons();
  renderLegend();
  render();

  window.addEventListener("resize", () => {
    renderLandscape(deriveView());
  });
}

function regenerateScenarios() {
  state.scenarios = d3
    .range(state.scenarioCount)
    .map((index) => buildScenario(index, state.parties));

  state.selectedLeader = dominantLeader(state.scenarios);
  state.coalitionOptions = buildCoalitionOptions(state.scenarios);
  rebuildFrequencyRanking();

  if (
    !state.selectedCoalition ||
    !state.coalitionOptions.some(
      (entry) => entry.id === state.selectedCoalition,
    )
  ) {
    state.selectedCoalition = strongestCoalition(state.coalitionOptions);
  }
}

function rebuildFrequencyRanking() {
  const frequencies = d3.rollup(
    state.scenarios,
    (arr) => arr.length,
    (scenario) => buildSeatSignature(scenario),
  );

  state.scenarios.forEach((scenario) => {
    const signature = buildSeatSignature(scenario);
    scenario.signature = signature;
    scenario.frequencyCount = frequencies.get(signature) ?? 0;
    scenario.frequencyShare =
      state.scenarioCount > 0
        ? scenario.frequencyCount / state.scenarioCount
        : 0;
  });

  state.frequencyOrderedScenarios = [...state.scenarios].sort((a, b) => {
    if (b.frequencyCount !== a.frequencyCount) {
      return b.frequencyCount - a.frequencyCount;
    }
    if (b.rankedSeat[0].seatShare !== a.rankedSeat[0].seatShare) {
      return b.rankedSeat[0].seatShare - a.rankedSeat[0].seatShare;
    }
    return a.id - b.id;
  });
}

function buildSeatSignature(scenario) {
  return Object.keys(PARTY_META)
    .map((party) => {
      const share = seatShareOfParty(scenario, party);
      const bucketed = Math.round(share / FREQUENCY_BUCKET) * FREQUENCY_BUCKET;
      return `${party}:${bucketed.toFixed(0)}`;
    })
    .join("|");
}

function seatShareOfParty(scenario, party) {
  return (
    scenario.seatShares.find((entry) => entry.party === party)?.seatShare ?? 0
  );
}

function buildScenario(index, parties) {
  const simulated = parties.map((party) => {
    const spread = Math.max((party.ciUpper - party.ciLower) / 3.92, 0.15);
    const raw = d3.randomNormal(party.avg, spread)();
    return { party: party.key, vote: Math.max(0, raw) };
  });

  const voteSum = d3.sum(simulated, (d) => d.vote);
  const normalized = simulated.map((item) => ({
    ...item,
    voteShare: voteSum > 0 ? (item.vote / voteSum) * 100 : 0,
  }));

  const sortedVotes = [...normalized].sort((a, b) => b.voteShare - a.voteShare);
  const first = sortedVotes[0];
  const second = sortedVotes[1];
  const leadMargin = first.voteShare - second.voteShare;

  const aboveHurdle = normalized.filter((d) => d.voteShare >= 5);
  const validSum = d3.sum(aboveHurdle, (d) => d.voteShare);
  const seatShares = normalized.map((d) => ({
    party: d.party,
    voteShare: d.voteShare,
    seatShare:
      d.voteShare >= 5 && validSum > 0 ? (d.voteShare / validSum) * 100 : 0,
  }));

  const rankedSeat = [...seatShares].sort((a, b) => b.seatShare - a.seatShare);

  return {
    id: index + 1,
    votes: normalized,
    seatShares,
    firstParty: first.party,
    secondParty: second.party,
    leadMargin,
    rankedSeat,
  };
}

function dominantLeader(scenarios) {
  const counts = d3.rollup(
    scenarios,
    (arr) => arr.length,
    (d) => d.firstParty,
  );
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  return top?.[0] ?? "cxu";
}

function partyAtHurdle(parties) {
  const closest = [...parties].sort(
    (a, b) => Math.abs(a.avg - 5) - Math.abs(b.avg - 5),
  )[0];
  return closest?.key ?? "fdp";
}

function strongestCoalition(options) {
  return options[0]?.id ?? null;
}

function buildCoalitionOptions(scenarios) {
  const candidates = [];

  [2, 3, 4].forEach((size) => {
    combinations(COALITION_PARTY_POOL, size).forEach((parties) => {
      const includesUnion = parties.includes("cxu");
      const includesLinke = parties.includes("lin");

      if (includesUnion && includesLinke) {
        return;
      }

      const id = parties.join("-");
      const label = parties.map((party) => partyName(party)).join(" + ");
      const count = scenarios.filter((scenario) =>
        coalitionMajority(scenario, parties),
      ).length;

      if (count > 0) {
        candidates.push({ id, label, parties, count });
      }
    });
  });

  return candidates.sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label, "de"),
  );
}

function combinations(values, size) {
  const result = [];

  function helper(start, current) {
    if (current.length === size) {
      result.push([...current]);
      return;
    }

    for (let index = start; index < values.length; index += 1) {
      current.push(values[index]);
      helper(index + 1, current);
      current.pop();
    }
  }

  helper(0, []);
  return result;
}

function coalitionMajority(scenario, parties) {
  const value = d3.sum(
    scenario.seatShares.filter((entry) => parties.includes(entry.party)),
    (d) => d.seatShare,
  );
  return value >= 50;
}

function coalitionSurplus(scenario, parties) {
  return (
    d3.sum(
      scenario.seatShares.filter((entry) => parties.includes(entry.party)),
      (d) => d.seatShare,
    ) - 50
  );
}

function renderTaskButtons() {
  const nav = d3.select("#task-nav");

  nav
    .selectAll("button")
    .data(TASKS)
    .join("button")
    .attr("class", (d) => `task-btn ${d.id === state.task ? "active" : ""}`)
    .text((d) => d.label)
    .on("click", (_, task) => {
      state.task = task.id;
      renderTaskButtons();
      render();
    });
}

function render() {
  applyEditorialStyleVariant();
  const view = deriveView();
  applyControlAreaLayout(view);
  renderSubControls(view);
  renderSummary(view);
  renderLandscape(view);
}

function applyEditorialStyleVariant() {
  const visualization = document.querySelector("#visualization");
  if (!visualization) return;

  visualization.classList.remove(
    "visual-style-standard",
    "visual-style-calm-serif",
    "visual-style-clear-sans",
  );
  visualization.classList.add("visual-style-calm-serif");
}

function applyControlAreaLayout(view) {
  const container = d3.select("#control-area");
  const hasContextControl = view.controls.type !== "none";

  container
    .classed("layout-standard", false)
    .classed("layout-perspective-bridge", true)
    .classed("layout-split-emphasis", false)
    .classed("has-context-control", hasContextControl);
}

function deriveView() {
  if (state.task === "task1") {
    return task1View();
  }
  if (state.task === "task2a") {
    return task2aView();
  }
  if (state.task === "task2b") {
    return task2bView();
  }
  return task3View();
}

function task1View() {
  const leaders = d3.rollup(
    state.scenarios,
    (arr) => arr.length,
    (d) => d.firstParty,
  );

  const selected = state.selectedLeader;
  const ordered = [...state.scenarios].sort((a, b) => {
    const aLead = a.firstParty === selected;
    const bLead = b.firstParty === selected;
    if (aLead !== bLead) {
      return aLead ? -1 : 1;
    }
    if (aLead && bLead) {
      return b.leadMargin - a.leadMargin;
    }
    const aDist = Math.abs(a.rankedSeat[0].seatShare - shareOf(a, selected));
    const bDist = Math.abs(b.rankedSeat[0].seatShare - shareOf(b, selected));
    return aDist - bDist;
  });

  const selectedCount = leaders.get(selected) ?? 0;
  const secondLeader = [...leaders.entries()].sort((a, b) => b[1] - a[1])[1];
  const headline = `${partyName(selected)} liegt in ${selectedCount} von ${state.scenarioCount} Szenarien vorne.`;
  const detail = secondLeader
    ? `${partyName(secondLeader[0])} führt in ${secondLeader[1]} Szenarien.`
    : "Keine weitere Partei übernimmt in nennenswerter Zahl die Führung.";

  return {
    title: "Wer liegt vorn?",
    headline,
    detail,
    ordered,
    highlight: (d) => d.firstParty === selected,
    cardText: (d) =>
      `${partyName(d.firstParty)} +${d.leadMargin.toFixed(1)} Pkt.`,
    controls: {
      type: "leader",
      options: [...leaders.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([party]) => party),
      selected,
    },
  };
}

function task2aView() {
  const ordered = [...state.scenarios].sort(
    (a, b) => a.leadMargin - b.leadMargin,
  );
  const close = ordered.filter((d) => d.leadMargin <= 1.5).length;
  const medium = ordered.filter(
    (d) => d.leadMargin > 1.5 && d.leadMargin <= 4,
  ).length;
  const clear = state.scenarioCount - close - medium;

  return {
    title: "Wie eng ist das Rennen an der Spitze?",
    headline: `${close} Szenarien zeigen ein sehr knappes Rennen, ${clear} Szenarien einen klaren Vorsprung.`,
    detail: `${medium} Szenarien liegen dazwischen. So wird sichtbar, wie oft die Spitze offen bleibt.`,
    ordered,
    highlight: (d) => d.leadMargin <= 1.5,
    cardText: (d) =>
      `${partyName(d.firstParty)} vor ${partyName(d.secondParty)} (${d.leadMargin.toFixed(1)} Pkt.)`,
    controls: { type: "none" },
  };
}

function task2bView() {
  const selected = state.selectedThresholdParty;
  const ordered = [...state.scenarios].sort((a, b) => {
    const aShare = shareOf(a, selected);
    const bShare = shareOf(b, selected);
    const aBelow = aShare < 5;
    const bBelow = bShare < 5;
    if (aBelow !== bBelow) {
      return aBelow ? -1 : 1;
    }
    if (aBelow && bBelow) {
      return 5 - bShare - (5 - aShare);
    }
    return aShare - 5 - (bShare - 5);
  });

  const belowCount = ordered.filter((d) => shareOf(d, selected) < 5).length;
  const aboveCount = state.scenarioCount - belowCount;

  return {
    title: "Wer rutscht unter 5%?",
    headline: `${partyName(selected)} liegt in ${belowCount} von ${state.scenarioCount} Szenarien unter 5%.`,
    detail: `${aboveCount} Szenarien liegen darüber. Die Sortierung zeigt zuerst die klaren Unterschreitungen, danach die knappen Fälle über 5%.`,
    ordered,
    highlight: (d) => shareOf(d, selected) < 5,
    cardText: (d) =>
      `${partyName(selected)}: ${shareOf(d, selected).toFixed(1)}%`,
    controls: {
      type: "threshold",
      options: Object.keys(PARTY_META),
      selected,
    },
  };
}

function task3View() {
  const coalition =
    state.coalitionOptions.find(
      (entry) => entry.id === state.selectedCoalition,
    ) ?? state.coalitionOptions[0];

  if (!coalition) {
    return {
      title: "Welche Mehrheiten sind möglich?",
      headline:
        "Keine der zulässigen Koalitionen erreicht in diesen Szenarien eine Mehrheit.",
      detail:
        "Wählen Sie eine andere Perspektive oder ändern Sie die Szenariozahl.",
      ordered: [...state.scenarios],
      highlight: () => false,
      cardText: () => "Keine Mehrheit",
      controls: {
        type: "coalition",
        options: [],
        selected: null,
      },
    };
  }

  const ordered = [...state.scenarios].sort((a, b) => {
    const aSurplus = coalitionSurplus(a, coalition.parties);
    const bSurplus = coalitionSurplus(b, coalition.parties);
    const aMajority = aSurplus >= 0;
    const bMajority = bSurplus >= 0;
    if (aMajority !== bMajority) {
      return aMajority ? -1 : 1;
    }
    if (aMajority && bMajority) {
      return bSurplus - aSurplus;
    }
    return Math.abs(aSurplus) - Math.abs(bSurplus);
  });

  const majorityCount = ordered.filter((d) =>
    coalitionMajority(d, coalition.parties),
  ).length;

  return {
    title: "Welche Mehrheiten sind möglich?",
    headline: `${coalition.label} erreicht in ${majorityCount} von ${state.scenarioCount} Szenarien eine Mehrheit.`,
    detail:
      "Vorne stehen Szenarien mit Mehrheit. Innerhalb der Gruppen sortiert die Ansicht nach klaren bzw. knappen Mehrheiten.",
    ordered,
    highlight: (d) => coalitionMajority(d, coalition.parties),
    cardText: (d) => {
      const value = coalitionSurplus(d, coalition.parties);
      const label = value >= 0 ? "Mehrheit" : "Fehlt";
      return `${label}: ${Math.abs(value).toFixed(1)} Sitz-%`;
    },
    controls: {
      type: "coalition",
      options: state.coalitionOptions.map((d) => d.id),
      selected: coalition.id,
    },
  };
}

function renderSubControls(view) {
  const container = d3.select("#sub-controls");
  container.html("");

  const controlRows = [
    {
      id: "scenario",
      fieldClass: "control-scenario",
      label: "Szenarien:",
      options: SCENARIO_OPTIONS,
      selected: state.scenarioCount,
      text: (d) => `${d}`,
      onChange: (value) => {
        state.scenarioCount = Number(value);
        regenerateScenarios();
      },
    },
  ];

  if (view.controls.type !== "none") {
    controlRows.push({
      id: "context",
      fieldClass: "control-context",
      label:
        view.controls.type === "leader"
          ? "Fokuspartei Führung:"
          : view.controls.type === "threshold"
            ? "Partei an der 5%-Hürde:"
            : "Mehrheitsoption:",
      options: view.controls.options,
      selected: view.controls.selected,
      text: (d) => {
        if (view.controls.type === "coalition") {
          return (
            state.coalitionOptions.find((entry) => entry.id === d)?.label ?? d
          );
        }
        return partyName(d);
      },
      onChange: (value) => {
        if (view.controls.type === "leader") {
          state.selectedLeader = value;
        }
        if (view.controls.type === "threshold") {
          state.selectedThresholdParty = value;
        }
        if (view.controls.type === "coalition") {
          state.selectedCoalition = value;
        }
      },
    });
  }

  const activeLayout = state.variants.controlAreaLayout ?? "standard";

  controlRows.forEach((row) => {
    const field = container
      .append("div")
      .attr("class", `control-field ${row.fieldClass}`);

    field.append("label").text(row.label);

    if (row.id === "context" && activeLayout !== "standard") {
      field
        .append("div")
        .attr("class", "control-context-subtitle")
        .text("Auswahl zur aktiven Perspektive");
    }

    const select = field.append("select");
    select
      .selectAll("option")
      .data(row.options)
      .join("option")
      .attr("value", (d) => d)
      .property("selected", (d) => d === row.selected)
      .text((d) => row.text(d));

    select.on("change", (event) => {
      row.onChange(event.target.value);
      render();
    });
  });
}

function renderSummary(view) {
  const summary = d3.select("#summary");
  summary.html("");
  summary.append("h2").text(view.title);
  summary.append("p").text(view.headline);
  summary.append("p").style("margin-top", "6px").text(view.detail);
}

function renderLandscape(view) {
  const landscape = d3.select("#landscape");
  landscape.html("");

  const columns = resolveColumns(landscape.node()?.clientWidth ?? 0);
  const ordered = view.ordered;
  const rankedCards = rankCards(ordered);

  const bands = buildGroupedBands(rankedCards, view, null);

  renderBandLandscape(landscape, bands, columns, view);
}

function renderBandLandscape(landscape, bands, columns, view) {
  const frame = getMicrochartFrame();
  const chartWidth =
    columns * frame.width +
    (columns - 1) * LAYOUT_TOKENS.cardGap +
    LAYOUT_TOKENS.framePadding * 2;

  const totalHeight = calculateChartHeight(bands, columns);

  const svg = landscape
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", totalHeight)
    .attr("viewBox", `0 0 ${chartWidth} ${totalHeight}`)
    .attr("preserveAspectRatio", "xMinYMin meet");

  let yCursor = LAYOUT_TOKENS.framePadding;

  bands.forEach((band, bandIndex) => {
    if (band.title) {
      svg
        .append("text")
        .attr("class", "band-title")
        .attr("x", LAYOUT_TOKENS.framePadding)
        .attr("y", yCursor + 10)
        .text(band.title);
      yCursor += LAYOUT_TOKENS.bandTitleGap;
    }

    const cards = svg
      .selectAll(`g.card-group.band-${bandIndex}`)
      .data(band.cards)
      .join("g")
      .attr("class", (d) => cardGroupClass(d.scenario, view))
      .attr("transform", (_, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const x =
          LAYOUT_TOKENS.framePadding +
          col * (frame.width + LAYOUT_TOKENS.cardGap);
        const y = yCursor + row * (frame.height + LAYOUT_TOKENS.cardGap);
        return `translate(${x},${y})`;
      });

    drawCardContents(cards, view);

    const rows = Math.max(1, Math.ceil(band.cards.length / columns));
    yCursor += rows * frame.height + (rows - 1) * LAYOUT_TOKENS.cardGap;

    if (bandIndex < bands.length - 1) {
      yCursor += LAYOUT_TOKENS.bandGap;
    }
  });
}

function renderFrequencyCenterLandscape(landscape, columns, view, cards) {
  const frame = getMicrochartFrame();

  let positions = buildCircularFrequencyPositions(cards);
  if (state.variants.microchartDisplay === "circle-only-markers") {
    positions = applyCircularCollision(positions, markerRadius() + 2);
  }

  const positionByScenario = new Map(
    cards.map((card, index) => [card.scenario.id, positions[index]]),
  );

  const maxRadius = d3.max(positions, (p) => p.radius) || 200;
  const diameter = (maxRadius + frame.width / 2) * 2;
  const centerX = diameter / 2;
  const centerY = diameter / 2;
  const chartWidth = diameter + LAYOUT_TOKENS.framePadding * 2;
  const totalHeight = diameter + LAYOUT_TOKENS.framePadding * 2;

  const svg = landscape
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", totalHeight)
    .attr("viewBox", `0 0 ${chartWidth} ${totalHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  if (state.variants.groupingDisplay === "segmented-bands") {
    const focusCards = cards.filter((card) => view.highlight(card.scenario));
    const otherCards = cards.filter((card) => !view.highlight(card.scenario));
    const centerCount = Math.max(1, Math.ceil(cards.length * 0.2));
    const outerCount = Math.max(0, cards.length - centerCount);

    if (focusCards.length > 0 && otherCards.length > 0) {
      svg
        .append("text")
        .attr("class", "band-title")
        .attr("x", LAYOUT_TOKENS.framePadding)
        .attr("y", LAYOUT_TOKENS.framePadding + 10)
        .text(
          `Zentrum: häufige Sitzbilder (${centerCount}) · Außenbereich: seltene Konstellationen (${outerCount})`,
        );
    }

    const otherGroups = svg
      .append("g")
      .selectAll("g.card-group.center-other")
      .data(otherCards)
      .join("g")
      .attr("class", (d) => cardGroupClass(d.scenario, view))
      .attr("transform", (d) => {
        const pos = positionByScenario.get(d.scenario.id) || { x: 0, y: 0 };
        const x =
          LAYOUT_TOKENS.framePadding + centerX + pos.x - frame.width / 2;
        const y =
          LAYOUT_TOKENS.framePadding + centerY + pos.y - frame.height / 2;
        return `translate(${x},${y})`;
      });

    const focusGroups = svg
      .append("g")
      .selectAll("g.card-group.center-focus")
      .data(focusCards)
      .join("g")
      .attr("class", (d) => cardGroupClass(d.scenario, view))
      .attr("transform", (d) => {
        const pos = positionByScenario.get(d.scenario.id) || { x: 0, y: 0 };
        const x =
          LAYOUT_TOKENS.framePadding + centerX + pos.x - frame.width / 2;
        const y =
          LAYOUT_TOKENS.framePadding + centerY + pos.y - frame.height / 2;
        return `translate(${x},${y})`;
      });

    drawCardContents(otherGroups, view);
    drawCardContents(focusGroups, view);
    return;
  }

  const cardGroups = svg
    .selectAll("g.card-group")
    .data(cards)
    .join("g")
    .attr("class", (d) => cardGroupClass(d.scenario, view))
    .attr("transform", (d) => {
      const pos = positionByScenario.get(d.scenario.id) || { x: 0, y: 0 };
      const x = LAYOUT_TOKENS.framePadding + centerX + pos.x - frame.width / 2;
      const y = LAYOUT_TOKENS.framePadding + centerY + pos.y - frame.height / 2;
      return `translate(${x},${y})`;
    });

  drawCardContents(cardGroups, view);
}

function drawCardContents(cardGroups, view) {
  bindScenarioHover(cardGroups, view);
  drawCardContentsStandard(cardGroups, view);
}

function drawCardContentsCircleOnly(cardGroups, view) {
  const radius = markerRadius();
  const centerX = radius + 1;
  const centerY = radius + 1;

  cardGroups.each(function eachMarker(cardData) {
    const group = d3.select(this);
    const sorted = [...cardData.scenario.rankedSeat].filter(
      (entry) => entry.seatShare > 0.4,
    );

    const total = d3.sum(sorted, (d) => d.seatShare);
    let startAngle = 0;

    sorted.forEach((entry) => {
      const fraction = entry.seatShare / total;
      const endAngle = startAngle + fraction * 2 * Math.PI;

      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(startAngle)
        .endAngle(endAngle);

      group
        .append("path")
        .attr("d", arc)
        .attr("transform", `translate(${centerX}, ${centerY})`)
        .attr("fill", PARTY_META[entry.party].color);

      startAngle = endAngle;
    });

    group
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("stroke", "var(--text-muted)")
      .attr("stroke-width", view.highlight(cardData.scenario) ? 2 : 1)
      .attr("opacity", view.highlight(cardData.scenario) ? 1 : 0.7);
  });
}

function drawCardContentsStandard(cardGroups, view) {
  cardGroups
    .append("rect")
    .attr(
      "class",
      (d) => `chart-card ${view.highlight(d.scenario) ? "highlight" : ""}`,
    )
    .attr("width", LAYOUT_TOKENS.cardWidth)
    .attr("height", LAYOUT_TOKENS.cardHeight)
    .attr("rx", 8)
    .attr("ry", 8);

  cardGroups
    .append("text")
    .attr("class", "card-rank")
    .attr("x", 8)
    .attr("y", 13)
    .text((d) => `#${d.rank}`);

  cardGroups
    .append("text")
    .attr("class", "card-label")
    .attr("x", 8)
    .attr("y", LAYOUT_TOKENS.cardHeight - 8)
    .text((d) => view.cardText(d.scenario));

  cardGroups.each(function eachCard(cardData) {
    const group = d3.select(this);
    const sorted = [...cardData.scenario.rankedSeat].filter(
      (entry) => entry.seatShare > 0.4,
    );
    const y = 20;
    const barHeight = 16;
    const innerWidth = LAYOUT_TOKENS.cardWidth - 16;

    let startX = 8;
    sorted.forEach((entry) => {
      const width = Math.max(0, (entry.seatShare / 100) * innerWidth);
      group
        .append("rect")
        .attr("x", startX)
        .attr("y", y)
        .attr("width", width)
        .attr("height", barHeight)
        .attr("fill", PARTY_META[entry.party].color);
      startX += width;
    });
  });
}

function drawCardContentsCompact(cardGroups, view) {
  const iconRadius = 28;
  const centerX = LAYOUT_TOKENS.cardWidth / 2;
  const centerY = LAYOUT_TOKENS.cardHeight / 2;

  cardGroups
    .append("rect")
    .attr(
      "class",
      (d) => `chart-card ${view.highlight(d.scenario) ? "highlight" : ""}`,
    )
    .attr("width", LAYOUT_TOKENS.cardWidth)
    .attr("height", LAYOUT_TOKENS.cardHeight)
    .attr("rx", 8)
    .attr("ry", 8);

  cardGroups
    .append("text")
    .attr("class", "card-rank")
    .attr("x", 8)
    .attr("y", 13)
    .text((d) => `#${d.rank}`);

  cardGroups
    .append("text")
    .attr("class", "card-label")
    .attr("x", 8)
    .attr("y", LAYOUT_TOKENS.cardHeight - 8)
    .text((d) => view.cardText(d.scenario));

  cardGroups.each(function eachCard(cardData) {
    const group = d3.select(this);
    const sorted = [...cardData.scenario.rankedSeat].filter(
      (entry) => entry.seatShare > 0.4,
    );

    const total = d3.sum(sorted, (d) => d.seatShare);
    let startAngle = 0;

    sorted.forEach((entry) => {
      const fraction = entry.seatShare / total;
      const endAngle = startAngle + fraction * 2 * Math.PI;

      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(iconRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);

      group
        .append("path")
        .attr("d", arc)
        .attr("transform", `translate(${centerX}, ${centerY})`)
        .attr("fill", PARTY_META[entry.party].color);

      startAngle = endAngle;
    });
  });
}

function buildFrequencyBands(rankedCards, view) {
  const total = rankedCards.length;
  const centerCount = Math.max(1, Math.ceil(total * 0.2));
  const midCount = Math.max(1, Math.ceil(total * 0.35));
  const centerEnd = Math.min(centerCount, total);
  const midEnd = Math.min(centerEnd + midCount, total);

  const zones = [
    {
      title: `Zentrum: häufige Sitzbilder (${centerEnd})`,
      cards: rankedCards.slice(0, centerEnd),
    },
    {
      title: `Mittelfeld: mittlere Häufigkeit (${Math.max(0, midEnd - centerEnd)})`,
      cards: rankedCards.slice(centerEnd, midEnd),
    },
    {
      title: `Außenbereich: seltene Konstellationen (${Math.max(0, total - midEnd)})`,
      cards: rankedCards.slice(midEnd),
    },
  ].filter((band) => band.cards.length > 0);

  if (state.variants.groupingDisplay === "standard") {
    return zones;
  }

  return zones.flatMap((zone) =>
    buildGroupedBands(zone.cards, view, zone.title),
  );
}

function resolveOrderedScenarios(view) {
  if (state.variants.probabilityLayout === "standard") {
    return view.ordered;
  }

  return state.frequencyOrderedScenarios;
}

function rankCards(orderedScenarios) {
  return orderedScenarios.map((scenario, index) => ({
    scenario,
    rank: index + 1,
  }));
}

function buildGroupedBands(rankedCards, view, titlePrefix) {
  const focusCards = rankedCards.filter((entry) =>
    view.highlight(entry.scenario),
  );
  const remainingCards = rankedCards.filter(
    (entry) => !view.highlight(entry.scenario),
  );

  if (focusCards.length === 0) {
    return [
      {
        title: titlePrefix
          ? `${titlePrefix} · Weitere Szenarien (${remainingCards.length})`
          : `Weitere Szenarien (${remainingCards.length})`,
        cards: remainingCards,
      },
    ];
  }

  if (remainingCards.length === 0) {
    return [
      {
        title: titlePrefix
          ? `${titlePrefix} · Im Fokus (${focusCards.length})`
          : `Im Fokus (${focusCards.length})`,
        cards: focusCards,
      },
    ];
  }

  return [
    {
      title: titlePrefix
        ? `${titlePrefix} · Im Fokus (${focusCards.length})`
        : `Im Fokus (${focusCards.length})`,
      cards: focusCards,
    },
    {
      title: titlePrefix
        ? `${titlePrefix} · Weitere Szenarien (${remainingCards.length})`
        : `Weitere Szenarien (${remainingCards.length})`,
      cards: remainingCards,
    },
  ];
}

function buildCircularFrequencyPositions(cards) {
  const maxFrequency =
    d3.max(cards, (entry) => entry.scenario.frequencyCount) || 1;
  const minFrequency =
    d3.min(cards, (entry) => entry.scenario.frequencyCount) || 0;
  const frequencyRange = maxFrequency - minFrequency || 1;

  const minRadius = 0;
  const maxRadius = 200;

  const positions = [];
  const radiusStep = 30;
  const radiusLevels = [];

  for (let r = minRadius; r <= maxRadius; r += radiusStep) {
    radiusLevels.push({ radius: r, cards: [] });
  }

  cards.forEach((cardEntry) => {
    const card = cardEntry.scenario;
    const normalizedFreq =
      (card.frequencyCount - minFrequency) / frequencyRange;
    const targetRadius =
      minRadius + (1 - normalizedFreq) * (maxRadius - minRadius);
    const closestLevel = radiusLevels.reduce((prev, curr) =>
      Math.abs(curr.radius - targetRadius) <
      Math.abs(prev.radius - targetRadius)
        ? curr
        : prev,
    );
    closestLevel.cards.push(card);
  });

  radiusLevels.forEach((level, levelIndex) => {
    const count = level.cards.length;
    if (count === 0) return;

    const angleStep = (2 * Math.PI) / count;
    const startAngle =
      fractionalNoise((levelIndex + 1) * 73.13 + count * 17.37) * 2 * Math.PI;

    level.cards.forEach((card, index) => {
      const angle = startAngle + index * angleStep;
      const jitterRadius =
        level.radius * 0.15 * signedNoise(card.id * 11.7 + index * 3.1);
      const jitterAngle =
        angleStep * 0.3 * signedNoise(card.id * 5.3 + levelIndex * 2.9);
      const finalRadius = level.radius + jitterRadius;
      const finalAngle = angle + jitterAngle;

      positions.push({
        x: finalRadius * Math.cos(finalAngle),
        y: finalRadius * Math.sin(finalAngle),
        radius: finalRadius,
      });
    });
  });

  return positions;
}

function fractionalNoise(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function signedNoise(seed) {
  return fractionalNoise(seed) - 0.5;
}

function bindScenarioHover(cardGroups, view) {
  const panel = ensureScenarioHoverPanel();

  cardGroups
    .on("mouseenter", function onEnter(event, cardData) {
      updateScenarioHoverPanel(panel, cardData, view);
      positionScenarioHoverPanel(panel, event);
      panel.classed("visible", true);
    })
    .on("mousemove", function onMove(event) {
      positionScenarioHoverPanel(panel, event);
    })
    .on("mouseleave", function onLeave() {
      panel.classed("visible", false);
    });
}

function ensureScenarioHoverPanel() {
  const visualization = d3.select("#visualization");

  return visualization
    .selectAll("div.scenario-hover-panel")
    .data([null])
    .join("div")
    .attr("class", "scenario-hover-panel")
    .attr("role", "status")
    .attr("aria-live", "polite");
}

function updateScenarioHoverPanel(panel, cardData, view) {
  const seatRows = buildAbsoluteSeatRows(cardData.scenario);

  panel.html("");
  panel
    .append("div")
    .attr("class", "scenario-hover-title")
    .text(
      `Sitzverteilung · #${cardData.rank} · ${view.cardText(cardData.scenario)}`,
    );

  const seats = panel.append("div").attr("class", "scenario-hover-seats");

  seatRows.forEach((row) => {
    const entry = seats.append("div").attr("class", "scenario-hover-row");

    const party = entry.append("span").attr("class", "scenario-hover-party");
    party
      .append("span")
      .attr("class", "scenario-hover-dot")
      .style("background-color", PARTY_META[row.party].color);
    party.append("span").text(PARTY_META[row.party].label);

    entry
      .append("span")
      .attr("class", "scenario-hover-value")
      .text(`${row.seats} Sitze`);
  });
}

function positionScenarioHoverPanel(panel, event) {
  const visualization = document.querySelector("#visualization");
  if (!visualization) return;

  const bounds = visualization.getBoundingClientRect();
  const panelNode = panel.node();
  if (!panelNode) return;

  const offsetX = 12;
  const offsetY = 8;
  const panelWidth = panelNode.offsetWidth || 240;
  const panelHeight = panelNode.offsetHeight || 180;

  let left = event.clientX - bounds.left + offsetX;
  let top = event.clientY - bounds.top + offsetY;

  if (left + panelWidth > bounds.width - 8) {
    left = event.clientX - bounds.left - panelWidth - 8;
  }

  if (top + panelHeight > bounds.height - 8) {
    top = event.clientY - bounds.top - panelHeight - 8;
  }

  left = Math.max(8, left);
  top = Math.max(8, top);

  panel.style("left", `${left}px`).style("top", `${top}px`);
}

function buildAbsoluteSeatRows(scenario) {
  const byShare = [...scenario.seatShares].sort(
    (a, b) => b.seatShare - a.seatShare,
  );
  const raw = byShare.map((entry) => ({
    party: entry.party,
    exact: (entry.seatShare / 100) * TOTAL_SEATS,
  }));

  const flooredTotal = d3.sum(raw, (entry) => Math.floor(entry.exact));
  let missing = Math.max(0, TOTAL_SEATS - flooredTotal);

  const rows = raw.map((entry) => ({
    party: entry.party,
    seats: Math.floor(entry.exact),
    remainder: entry.exact - Math.floor(entry.exact),
  }));

  rows
    .sort((a, b) => b.remainder - a.remainder)
    .forEach((entry) => {
      if (missing <= 0) return;
      entry.seats += 1;
      missing -= 1;
    });

  return rows
    .sort((a, b) => b.seats - a.seats)
    .map((entry) => ({ party: entry.party, seats: entry.seats }));
}

function applyCircularCollision(positions, collideRadius) {
  const nodes = positions.map((pos) => ({
    x: pos.x,
    y: pos.y,
    targetX: pos.x,
    targetY: pos.y,
  }));

  const simulation = d3
    .forceSimulation(nodes)
    .force("x", d3.forceX((d) => d.targetX).strength(0.28))
    .force("y", d3.forceY((d) => d.targetY).strength(0.28))
    .force("collide", d3.forceCollide(collideRadius).strength(1))
    .stop();

  for (let i = 0; i < 220; i += 1) {
    simulation.tick();
  }

  return nodes.map((node) => ({
    x: node.x,
    y: node.y,
    radius: Math.sqrt(node.x * node.x + node.y * node.y),
  }));
}

function markerRadius() {
  return 16;
}

function getMicrochartFrame() {
  return {
    width: LAYOUT_TOKENS.cardWidth,
    height: LAYOUT_TOKENS.cardHeight,
  };
}

function cardGroupClass(scenario, view) {
  return `card-group ${view.highlight(scenario) ? "highlighted" : ""}`;
}

function resolveColumns(containerWidth) {
  return computeAdaptiveColumns(containerWidth);
}

function calculateChartHeight(bands, columns) {
  const frame = getMicrochartFrame();
  let height = LAYOUT_TOKENS.framePadding;

  bands.forEach((band, index) => {
    if (band.title) {
      height += LAYOUT_TOKENS.bandTitleGap;
    }

    const rows = Math.max(1, Math.ceil(band.cards.length / columns));
    height += rows * frame.height + (rows - 1) * LAYOUT_TOKENS.cardGap;

    if (index < bands.length - 1) {
      height += LAYOUT_TOKENS.bandGap;
    }
  });

  return height + LAYOUT_TOKENS.framePadding;
}

function computeAdaptiveColumns(containerWidth) {
  const frame = getMicrochartFrame();
  const usableWidth = Math.max(
    320,
    containerWidth - LAYOUT_TOKENS.framePadding * 2,
  );
  const perCard = frame.width + LAYOUT_TOKENS.cardGap;
  const rawColumns = Math.floor(
    (usableWidth + LAYOUT_TOKENS.cardGap) / perCard,
  );

  return Math.max(
    LAYOUT_TOKENS.minAdaptiveColumns,
    Math.min(
      LAYOUT_TOKENS.maxAdaptiveColumns,
      rawColumns || LAYOUT_TOKENS.minAdaptiveColumns,
    ),
  );
}

function renderLegend() {
  const items = Object.entries(PARTY_META);
  const legend = d3.select("#legend");

  const entry = legend
    .selectAll("span.legend-item")
    .data(items)
    .join("span")
    .attr("class", "legend-item");

  entry.html("");

  entry
    .append("span")
    .attr("class", "legend-color")
    .style("background-color", (d) => d[1].color);

  entry.append("span").text((d) => d[1].label);
}

function partyName(key) {
  return PARTY_META[key]?.label ?? key.toUpperCase();
}

function shareOf(scenario, party) {
  return scenario.votes.find((d) => d.party === party)?.voteShare ?? 0;
}
