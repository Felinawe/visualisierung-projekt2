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

const state = {
  task: "task1",
  scenarioCount: 100,
  selectedLeader: null,
  selectedThresholdParty: null,
  selectedCoalition: null,
  coalitionOptions: [],
  scenarios: [],
  parties: [],
};

const cardWidth = 124;
const cardHeight = 86;
const columns = 10;
const cardGap = 8;

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
}

function regenerateScenarios() {
  state.scenarios = d3
    .range(state.scenarioCount)
    .map((index) => buildScenario(index, state.parties));

  state.selectedLeader = dominantLeader(state.scenarios);
  state.coalitionOptions = buildCoalitionOptions(state.scenarios);

  if (
    !state.selectedCoalition ||
    !state.coalitionOptions.some(
      (entry) => entry.id === state.selectedCoalition,
    )
  ) {
    state.selectedCoalition = strongestCoalition(state.coalitionOptions);
  }
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
  const view = deriveView();
  renderSubControls(view);
  renderSummary(view);
  renderLandscape(view);
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
    detail: `Vorne stehen Szenarien mit Mehrheit. Innerhalb der Gruppen sortiert die Ansicht nach klaren bzw. knappen Mehrheiten.`,
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

  const scenarioLabel = container.append("label");
  scenarioLabel.text("Szenarien:");

  const scenarioSelect = container.append("select");
  scenarioSelect
    .selectAll("option")
    .data(SCENARIO_OPTIONS)
    .join("option")
    .attr("value", (d) => d)
    .property("selected", (d) => d === state.scenarioCount)
    .text((d) => `${d}`);

  scenarioSelect.on("change", (event) => {
    state.scenarioCount = Number(event.target.value);
    regenerateScenarios();
    render();
  });

  if (view.controls.type === "none") {
    return;
  }

  const label = container.append("label");
  label.text(
    view.controls.type === "leader"
      ? "Fokuspartei Führung:"
      : view.controls.type === "threshold"
        ? "Partei an der 5%-Hürde:"
        : "Mehrheitsoption:",
  );

  const select = container.append("select");
  select
    .selectAll("option")
    .data(view.controls.options)
    .join("option")
    .attr("value", (d) => d)
    .property("selected", (d) => d === view.controls.selected)
    .text((d) => {
      if (view.controls.type === "coalition") {
        return (
          state.coalitionOptions.find((entry) => entry.id === d)?.label ?? d
        );
      }
      return partyName(d);
    });

  select.on("change", (event) => {
    const value = event.target.value;
    if (view.controls.type === "leader") {
      state.selectedLeader = value;
    }
    if (view.controls.type === "threshold") {
      state.selectedThresholdParty = value;
    }
    if (view.controls.type === "coalition") {
      state.selectedCoalition = value;
    }
    render();
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
  const width = columns * cardWidth + (columns - 1) * cardGap + 24;
  const rows = Math.ceil(view.ordered.length / columns);
  const height = rows * cardHeight + (rows - 1) * cardGap + 24;

  const svg = d3
    .select("#landscape")
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet");

  const cards = svg
    .selectAll("g.card")
    .data(view.ordered)
    .join("g")
    .attr("class", "card")
    .attr("transform", (_, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const x = 12 + col * (cardWidth + cardGap);
      const y = 12 + row * (cardHeight + cardGap);
      return `translate(${x},${y})`;
    });

  cards
    .append("rect")
    .attr("class", (d) => `chart-card ${view.highlight(d) ? "highlight" : ""}`)
    .attr("width", cardWidth)
    .attr("height", cardHeight)
    .attr("rx", 8)
    .attr("ry", 8);

  cards
    .append("text")
    .attr("class", "card-rank")
    .attr("x", 8)
    .attr("y", 13)
    .text((_, index) => `#${index + 1}`);

  cards
    .append("text")
    .attr("class", "card-label")
    .attr("x", 8)
    .attr("y", cardHeight - 8)
    .text((d) => view.cardText(d));

  cards.each(function eachCard(scenario) {
    const group = d3.select(this);
    const sorted = [...scenario.rankedSeat].filter(
      (entry) => entry.seatShare > 0.4,
    );
    const y = 20;
    const barHeight = 16;
    const innerWidth = cardWidth - 16;

    let startX = 8;
    sorted.forEach((entry) => {
      const w = Math.max(0, (entry.seatShare / 100) * innerWidth);
      group
        .append("rect")
        .attr("x", startX)
        .attr("y", y)
        .attr("width", w)
        .attr("height", barHeight)
        .attr("fill", PARTY_META[entry.party].color);
      startX += w;
    });
  });
}

function renderLegend() {
  const items = Object.entries(PARTY_META);
  const legend = d3.select("#legend");

  const entry = legend
    .selectAll("span.legend-item")
    .data(items)
    .join("span")
    .attr("class", "legend-item");

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
