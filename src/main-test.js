import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let PARTY_META = {};
const PARTY_COLORS = {
  spd: "#D94D41",
  cxu: "#615952",
  gru: "#84C462",
  lin: "#B56BB8",
  fdp: "#F5D233",
  afd: "#75C0EB",
  bsw: "#BF3964",
};

const TASKS = [
  { id: "task1", label: "Führung" },
  { id: "task2b", label: "5%-Hürde" },
  { id: "task3", label: "Mehrheiten" },
];

const SCENARIO_OPTIONS = [100, 1000];
const COALITION_PARTY_POOL = ["cxu", "spd", "gru", "fdp", "lin", "bsw"];
let PARTY_ORDER = [];
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

const LEAD_MARGIN_CLOSE_MIN = 0.1;
const LEAD_MARGIN_CLEAR_MIN = 1.0;

const VARIANT_GROUPS = [
  {
    id: "entryNarrative",
    title: "Einstieg & Erzählrichtung",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Unveränderte Baseline aus Start.",
      },
      {
        value: "majority-start",
        label: "A – Mehrheits-Start",
        hint: "Einstieg bei Mehrheiten, Fokus auf knappe Regierungsfähigkeit.",
      },
      {
        value: "risk-start",
        label: "B – Risiko-Start",
        hint: "Einstieg bei 5%-Hürde, Fokus auf Kippmomente.",
      },
      {
        value: "leadership-tension",
        label: "C – Führungs-Spannung",
        hint: "Einstieg bei Führung, knappe Führungen zuerst.",
      },
    ],
  },
  {
    id: "layoutStructure",
    title: "Layoutstruktur",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Feste Rasterstruktur wie in Start.",
      },
      {
        value: "adaptive-grid",
        label: "Adaptives Raster",
        hint: "Spaltenzahl passt sich der Breite an.",
      },
    ],
  },
  {
    id: "controlAreaLayout",
    title: "Steuerbereich-Struktur",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Perspektive und Auswahl in linearer Folge.",
      },
      {
        value: "perspective-bridge",
        label: "Perspektive + Fokusblock",
        hint: "Fokusauswahl direkt zur Perspektive, Szenarien nachgeordnet.",
      },
      {
        value: "split-emphasis",
        label: "Geteilte Steuerfläche",
        hint: "Navigation links, Auswahlblock rechts mit klarer Hierarchie.",
      },
    ],
  },
  {
    id: "probabilityLayout",
    title: "Häufigkeitsanordnung",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Sortierung folgt der gewählten Perspektive.",
      },
      {
        value: "frequency-center",
        label: "Häufigkeit: Zentrum",
        hint: "Häufige Sitzbilder im Zentrum, seltene klar im Außenbereich.",
      },
      {
        value: "frequency-zones",
        label: "Häufigkeit: Zonen",
        hint: "Häufige Sitzbilder zuerst, seltene klar am Randbereich.",
      },
    ],
  },
  {
    id: "groupingDisplay",
    title: "Gruppendarstellung",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Ein durchgehendes Szenariofeld.",
      },
      {
        value: "segmented-bands",
        label: "Segmentierte Bänder",
        hint: "Fokusgruppe und übrige Szenarien werden getrennt gezeigt.",
      },
    ],
  },
  {
    id: "microchartDisplay",
    title: "Mikrochart-Darstellung",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Horizontale Balken wie in Start.",
      },
      {
        value: "compact-icons",
        label: "Kompakte Icons",
        hint: "Kreisförmige Icons, optimiert für dichte Layouts.",
      },
      {
        value: "circle-only-markers",
        label: "Nur Kreis-Marker",
        hint: "Ohne Kartenrahmen: nur kompakte Marker für dichte Kreislayouts.",
      },
    ],
  },
  {
    id: "editorialStyle",
    title: "Typografie & Farbklima",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Start-Basis für Schriftbild und Grundfarben.",
      },
      {
        value: "calm-serif",
        label: "Redaktionell Serif",
        hint: "Serifenbetont, ruhiger Lesefluss mit weicherem Hintergrund.",
      },
      {
        value: "clear-sans",
        label: "Redaktionell Sans",
        hint: "Klarer Sans-Stil mit präziser Gewichtung und höherem Kontrast.",
      },
    ],
  },
  {
    id: "hoverBehavior",
    title: "Hover-Verhalten",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Bestehendes Tooltip-Verhalten wie in der bisherigen Testansicht.",
      },
      {
        value: "hover-tooltip",
        label: "Hover + Tooltip",
        hint: "Tooltip plus zusätzliche visuelle Hervorhebung.",
      },
    ],
  },
  {
    id: "editorialLanguage",
    title: "Redaktionelle Sprache",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Technische Formulierungen wie in Start.",
      },
      {
        value: "journalistic-optimized",
        label: "Journalistisch optimiert",
        hint: "Interpretative Sprache, journalistische Formulierungen.",
      },
      {
        value: "journalistic-flow",
        label: "Journalistisch optimiert – klarerer narrativer Flow",
        hint: "Lead mit Kernaussage, abgestufte Text-Hierarchie ohne Redundanzen.",
      },
    ],
  },
  {
    id: "explanationDepth",
    title: "Erklärungstiefe",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Minimale Erklärungen wie in Start.",
      },
      {
        value: "extended-transparency",
        label: "Erweiterte Transparenz",
        hint: "Sortierlogik, Coalition Pool und Filter-Kontext erklärt.",
      },
    ],
  },
  {
    id: "thresholdVisualization",
    title: "Schwellenwert-Visualisierung",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Schwellenwerte nur im Text erwähnt.",
      },
      {
        value: "visual-markers",
        label: "Mit visuellen Markern",
        hint: "5%-Hürde und 50%-Mehrheit visuell in Mikrocharts markiert.",
      },
    ],
  },
  {
    id: "numericalUnits",
    title: "Wording in Szenario-Karten",
    options: [
      {
        value: "standard",
        label: "Standard",
        hint: "Kurzform wie in Start (z. B. Pkt., Sitz-%).",
      },
      {
        value: "clarified",
        label: "Journalistische Klarsprache",
        hint: "Eindeutige Begriffe in allen Perspektiven (z. B. Prozentpunkte).",
      },
    ],
  },
];

const state = {
  task: "task1",
  scenarioCount: 100,
  totalScenarioBase: 0,
  referenceScenarios: [],
  selectedLeader: null,
  selectedThresholdParty: null,
  selectedCoalition: null,
  coalitionOptions: [],
  scenarios: [],
  frequencyOrderedScenarios: [],
  parties: [],
  variants: {
    entryNarrative: "leadership-tension",
    layoutStructure: "adaptive-grid",
    controlAreaLayout: "perspective-bridge",
    probabilityLayout: "standard",
    groupingDisplay: "segmented-bands",
    microchartDisplay: "standard",
    editorialStyle: "calm-serif",
    hoverBehavior: "hover-tooltip",
    editorialLanguage: "journalistic-flow",
    explanationDepth: "extended-transparency",
    thresholdVisualization: "visual-markers",
    numericalUnits: "clarified",
  },
};

init();

async function init() {
  const pollUrl = new URL("../data/poll-data.json", import.meta.url);
  const poll = await d3.json(pollUrl);

  const namesByKey = new Map(
    (poll.metadata?.parties ?? []).map((party) => [party.key, party.name]),
  );

  PARTY_META = Object.fromEntries(
    poll.data.map((entry) => [
      entry.party,
      {
        label: namesByKey.get(entry.party) ?? entry.party.toUpperCase(),
        color: PARTY_COLORS[entry.party] ?? "#9CA3AF",
      },
    ]),
  );
  PARTY_ORDER = Object.keys(PARTY_META);

  state.parties = poll.data.map((entry) => ({
    key: entry.party,
    avg: entry.avg,
    ciLower: entry.ci_lower,
    ciUpper: entry.ci_upper,
    prevResult: entry.prev_result,
    diff: entry.diff,
  }));

  state.referenceScenarios = normalizeReferenceScenarios(
    poll.simulation_reference?.scenarios ?? [],
  );
  state.totalScenarioBase = state.referenceScenarios.length;

  regenerateScenarios();

  renderVariantPanel();
  renderHeader();
  renderTaskButtons();
  renderLegend();
  render();

  window.addEventListener("resize", () => {
    if (state.variants.layoutStructure === "adaptive-grid") {
      renderLandscape(deriveView());
    }
  });
}

function regenerateScenarios() {
  state.scenarios = state.referenceScenarios.slice(0, state.scenarioCount);

  const leaders = d3.rollup(
    state.scenarios,
    (arr) => arr.length,
    (d) => d.firstParty,
  );
  const leaderOptions = [...leaders.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([party]) => party);

  if (!state.selectedLeader || !leaderOptions.includes(state.selectedLeader)) {
    state.selectedLeader = dominantLeader(state.scenarios);
  }

  const thresholdOptions = thresholdRelevantParties(state.scenarios);
  if (
    !state.selectedThresholdParty ||
    !thresholdOptions.includes(state.selectedThresholdParty)
  ) {
    state.selectedThresholdParty =
      thresholdOptions[0] ?? partyAtHurdle(state.parties);
  }

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

  applyEntryNarrativeDefaultsIfNeeded(false);
}

function applyEntryNarrativeDefaultsIfNeeded(forceTaskSwitch = false) {
  const narrative = state.variants.entryNarrative ?? "standard";

  if (narrative === "majority-start") {
    if (forceTaskSwitch) {
      state.task = "task3";
    }
    if (
      !state.selectedCoalition ||
      !state.coalitionOptions.some(
        (entry) => entry.id === state.selectedCoalition,
      )
    ) {
      state.selectedCoalition = strongestCoalition(state.coalitionOptions);
    }
    return;
  }

  if (narrative === "risk-start") {
    if (forceTaskSwitch) {
      state.task = "task2b";
    }
    state.selectedThresholdParty = mostThresholdRiskParty(state.scenarios);
    return;
  }

  if (narrative === "leadership-tension") {
    if (forceTaskSwitch) {
      state.task = "task1";
    }
    state.selectedLeader = dominantLeader(state.scenarios);
  }
}

function isAlternativeOnlyInteractionMode() {
  return (state.variants.entryNarrative ?? "standard") !== "standard";
}

function editorialLanguageVariant() {
  return state.variants.editorialLanguage ?? "standard";
}

function isJournalisticLanguage() {
  const variant = editorialLanguageVariant();
  return (
    variant === "journalistic-optimized" || variant === "journalistic-flow"
  );
}

function isNarrativeFlowLanguage() {
  return editorialLanguageVariant() === "journalistic-flow";
}

function renderVariantPanel() {
  const container = d3.select("#variant-groups");
  const groups = container
    .selectAll("section.variant-group")
    .data(VARIANT_GROUPS)
    .join("section")
    .attr("class", "variant-group");

  groups.html("");

  groups.each(function eachGroup(group) {
    const section = d3.select(this);
    section.append("h2").text(group.title);

    const options = section
      .append("div")
      .attr("class", "variant-options")
      .selectAll("label.variant-option")
      .data(group.options)
      .join("label")
      .attr("class", "variant-option");

    options.each(function eachOption(option) {
      const optionRow = d3.select(this);
      optionRow.html("");

      optionRow
        .append("input")
        .attr("type", "radio")
        .attr("name", `variant-${group.id}`)
        .attr("value", option.value)
        .property("checked", state.variants[group.id] === option.value)
        .on("change", () => {
          state.variants[group.id] = option.value;
          if (group.id === "entryNarrative") {
            applyEntryNarrativeDefaultsIfNeeded(true);
          }
          renderVariantPanel();
          if (group.id === "editorialLanguage") {
            renderHeader();
          }
          if (group.id === "editorialLanguage") {
            renderTaskButtons();
          }
          render();
        });

      optionRow.append("span").text(`${option.label} – ${option.hint}`);
    });
  });
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

function renderHeader() {
  const isJournalistic = isJournalisticLanguage();
  const isNarrativeFlow = isNarrativeFlowLanguage();
  const view = deriveView();
  const eyebrow = isNarrativeFlow
    ? (view.headerEyebrow ?? "Wenn am Sonntag Bundestagswahl wäre")
    : "";

  const title = isNarrativeFlow
    ? (view.headerTitle ??
      "Bundestagswahl 2025: Die politische Lage im Szenarienvergleich")
    : isJournalistic
      ? "Bundestagswahl 2025: Bandbreite möglicher Ergebnisse"
      : "Bundestagswahl-Simulator: mögliche Wahlausgänge";

  const subtitle = isNarrativeFlow
    ? (view.headerSubtitle ?? "")
    : isJournalistic
      ? ""
      : "Jede Kachel zeigt ein mögliches Ergebnis. Alle Kacheln bleiben gleich aufgebaut – die Perspektive ordnet nur neu, damit politische Fragen schneller beantwortet werden können.";

  const header = d3.select(".header");
  header
    .selectAll("p.eyebrow")
    .data(eyebrow ? [eyebrow] : [])
    .join(
      (enter) => enter.insert("p", ".title").attr("class", "eyebrow"),
      (update) => update,
      (exit) => exit.remove(),
    )
    .text((d) => d);

  d3.select(".title").text(title);
  d3.select(".subtitle")
    .text(subtitle)
    .style("display", subtitle ? null : "none");
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

function normalizeReferenceScenarios(rawScenarios) {
  return rawScenarios.map((entry, index) => {
    const seatsByParty = entry.seats ?? {};

    const voteLikeShares = PARTY_ORDER.map((party) => {
      const seats = Number(seatsByParty[party] ?? 0);
      const voteShare = TOTAL_SEATS > 0 ? (seats / TOTAL_SEATS) * 100 : 0;
      return {
        party,
        voteShare,
      };
    });

    const seatShares = PARTY_ORDER.map((party) => {
      const seats = Number(seatsByParty[party] ?? 0);
      return {
        party,
        seats,
        seatShare: TOTAL_SEATS > 0 ? (seats / TOTAL_SEATS) * 100 : 0,
      };
    });

    const sortedVotes = [...voteLikeShares].sort(
      (a, b) => b.voteShare - a.voteShare,
    );
    const first = sortedVotes[0] ?? { party: "cxu", voteShare: 0 };
    const second = sortedVotes[1] ?? { party: "spd", voteShare: 0 };
    const leadMargin = first.voteShare - second.voteShare;
    const rankedSeat = [...seatShares].sort(
      (a, b) => b.seatShare - a.seatShare,
    );

    const threshold = Object.fromEntries(
      PARTY_ORDER.map((party) => {
        const seats = Number(seatsByParty[party] ?? 0);
        return [party, seats <= 0];
      }),
    );

    return {
      id: Number(entry.id ?? index + 1),
      votes: voteLikeShares,
      seatShares,
      firstParty: first.party,
      secondParty: second.party,
      leadMargin,
      rankedSeat,
      threshold,
    };
  });
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
  const eligiblePartySet = new Set(coalitionEligibleParties(scenarios));
  const coalitionPartyPool = COALITION_PARTY_POOL.filter((party) =>
    eligiblePartySet.has(party),
  );

  const candidates = [];

  [2, 3, 4].forEach((size) => {
    combinations(coalitionPartyPool, size).forEach((parties) => {
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

function coalitionEligibleParties(scenarios) {
  return COALITION_PARTY_POOL.filter((party) =>
    scenarios.some((scenario) => seatShareOfParty(scenario, party) > 0),
  );
}

function thresholdRelevantParties(scenarios) {
  return PARTY_ORDER.filter((party) =>
    scenarios.some((scenario) => isBelowThreshold(scenario, party)),
  );
}

function mostThresholdRiskParty(scenarios) {
  const options = thresholdRelevantParties(scenarios);
  if (options.length === 0) {
    return partyAtHurdle(state.parties);
  }

  const ranked = options
    .map((party) => ({
      party,
      belowCount: scenarios.filter((scenario) =>
        isBelowThreshold(scenario, party),
      ).length,
      avgDistance:
        scenarios.reduce(
          (acc, scenario) => acc + Math.abs(shareOf(scenario, party) - 5),
          0,
        ) / Math.max(1, scenarios.length),
    }))
    .sort((a, b) => {
      if (b.belowCount !== a.belowCount) {
        return b.belowCount - a.belowCount;
      }
      return a.avgDistance - b.avgDistance;
    });

  return ranked[0]?.party ?? options[0];
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
  const seats = coalitionSeatTotal(scenario, parties);
  return seats >= Math.floor(TOTAL_SEATS / 2) + 1;
}

function coalitionSurplus(scenario, parties) {
  const seats = coalitionSeatTotal(scenario, parties);
  const majoritySeats = Math.floor(TOTAL_SEATS / 2) + 1;
  return ((seats - majoritySeats) / TOTAL_SEATS) * 100;
}

function coalitionSeatTotal(scenario, parties) {
  return d3.sum(
    scenario.seatShares.filter((entry) => parties.includes(entry.party)),
    (entry) => entry.seats ?? 0,
  );
}

function isBelowThreshold(scenario, party) {
  return scenario.threshold?.[party] ?? shareOf(scenario, party) < 5;
}

function renderTaskButtons() {
  const navTop = d3.select("#task-nav");
  const navInline = d3.select("#task-nav-inline");
  const isJournalistic = isJournalisticLanguage();
  const alternativeOnly = isAlternativeOnlyInteractionMode();

  const taskLabels = isJournalistic
    ? [
        { id: "task1", label: "Wer führt?" },
        { id: "task2b", label: "Wer riskiert 5%?" },
        { id: "task3", label: "Welche Mehrheiten?" },
      ]
    : TASKS;

  const visibleTaskLabels = alternativeOnly
    ? taskLabels.filter((task) => task.id !== state.task)
    : taskLabels;

  const nav = alternativeOnly ? navInline : navTop;
  const inactiveNav = alternativeOnly ? navTop : navInline;

  inactiveNav.selectAll("button").data([]).join("button");

  inactiveNav.style("display", "none");
  nav.style("display", null);

  nav
    .selectAll("button")
    .data(visibleTaskLabels, (d) => d.id)
    .join("button")
    .attr("class", (d) => `task-btn ${d.id === state.task ? "active" : ""}`)
    .text((d) => d.label)
    .on("click", (_, task) => {
      state.task = task.id;
      render();
    });
}

function render() {
  renderHeader();
  renderTaskButtons();
  applyEditorialStyleVariant();
  const view = deriveView();
  applyControlAreaLayout(view);
  renderSubControls(view);
  renderSummary(view);
  renderLandscape(view);
}

function applyEditorialStyleVariant() {
  const style = state.variants.editorialStyle ?? "standard";
  const visualization = document.querySelector("#visualization");
  if (!visualization) return;

  visualization.classList.remove(
    "visual-style-standard",
    "visual-style-calm-serif",
    "visual-style-clear-sans",
  );
  visualization.classList.add(`visual-style-${style}`);
}

function applyControlAreaLayout(view) {
  const container = d3.select("#control-area");
  const activeLayout = state.variants.controlAreaLayout ?? "standard";
  const hasContextControl = view.controls.type !== "none";

  container
    .classed("layout-standard", activeLayout === "standard")
    .classed("layout-perspective-bridge", activeLayout === "perspective-bridge")
    .classed("layout-split-emphasis", activeLayout === "split-emphasis")
    .classed("has-context-control", hasContextControl);
}

function deriveView() {
  if (state.task === "task1") {
    return task1View();
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
  const selectedLeads = state.scenarios.filter(
    (scenario) => scenario.firstParty === selected,
  );

  const clearLead = selectedLeads
    .filter((scenario) => scenario.leadMargin > LEAD_MARGIN_CLEAR_MIN)
    .sort((a, b) => b.leadMargin - a.leadMargin);

  const closeRace = selectedLeads
    .filter((scenario) => scenario.leadMargin <= LEAD_MARGIN_CLEAR_MIN)
    .sort((a, b) => a.leadMargin - b.leadMargin);

  const others = state.scenarios
    .filter((scenario) => scenario.firstParty !== selected)
    .sort((a, b) => b.leadMargin - a.leadMargin);

  const narrative = state.variants.entryNarrative ?? "standard";
  const ordered =
    narrative === "leadership-tension"
      ? [...closeRace, ...clearLead, ...others]
      : [...clearLead, ...closeRace, ...others];
  const groupedOrder = new Map(
    ordered.map((scenario, index) => [scenario.id, index]),
  );

  const selectedCount = leaders.get(selected) ?? 0;
  const languageVariant = editorialLanguageVariant();
  const isJournalistic = languageVariant === "journalistic-optimized";
  const isNarrativeFlow = languageVariant === "journalistic-flow";

  const isExtended =
    state.variants.explanationDepth === "extended-transparency";

  const secondPartyCounts = d3.rollup(
    selectedLeads,
    (arr) => arr.length,
    (scenario) => scenario.secondParty,
  );
  const topSecondParty =
    [...secondPartyCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
    state.scenarios.find((scenario) => scenario.firstParty === selected)
      ?.secondParty ??
    selected;

  const title = isJournalistic
    ? "Wo liegt die gewählte Partei vorn?"
    : "Wer liegt vorn?";
  const headline = isJournalistic
    ? `In ${selectedCount} von ${state.scenarioCount} möglichen Wahlausgängen liegt ${partyName(selected)} an der Spitze.`
    : `${partyName(selected)} liegt in ${selectedCount} von ${state.scenarioCount} Szenarien vorne.`;

  let detail = isJournalistic
    ? `Davon zeigen ${clearLead.length} Szenarien eine klare Führung und ${closeRace.length} ein knappes Rennen.`
    : `Klare Führung: ${clearLead.length} von ${state.scenarioCount} Szenarien. Knappes Rennen: ${closeRace.length} von ${state.scenarioCount} Szenarien.`;

  if (isJournalistic && narrative === "leadership-tension") {
    detail = `${closeRace.length} Szenarien zeigen ein enges Führungsduell. Diese knappen Führungen stehen zuerst, danach die klareren Vorsprünge.`;
  }

  if (isExtended) {
    const notLeading = state.scenarioCount - selectedCount;
    detail = isJournalistic
      ? `${clearLead.length} Szenarien zeigen eine klare Führung, ${closeRace.length} ein knappes Rennen und ${notLeading} liegen bei anderen führenden Parteien. Die Karten bleiben innerhalb der Gruppen nachvollziehbar geordnet.`
      : `Klare Führung: ${clearLead.length} von ${state.scenarioCount}, Knappes Rennen: ${closeRace.length} von ${state.scenarioCount}. Sonstige: ${notLeading} von ${state.scenarioCount}. Innerhalb der Gruppen bleibt die Sortierung politisch nachvollziehbar.`;
  }

  if (isNarrativeFlow) {
    const notLeading = state.scenarioCount - selectedCount;
    const flowHeadline = `${partyName(selected)} führt in ${selectedCount} von ${state.scenarioCount} Szenarien.`;
    const flowDetail = `${closeRace.length} Szenarien bleiben ein enges Duell. In ${notLeading} Szenarien liegt eine andere Partei vorn.`;

    return {
      title: "",
      badge: "Die Führung bleibt umkämpft",
      headline: flowHeadline,
      detail: flowDetail,
      headerTitle: "Union liegt vorn, AfD dicht auf den Fersen",
      headerEyebrow: "Wenn am Sonntag Bundestagswahl wäre",
      headerSubtitle:
        "Viele Szenarien bleiben knapp – schon kleine Verschiebungen können die Reihenfolge an der Spitze ändern.",
      ordered,
      highlight: (d) => d.firstParty === selected,
      cardText: (d) => {
        if (isClarifiedNumericUnits()) {
          return `${partyName(d.firstParty)}: Vorsprung +${d.leadMargin.toFixed(1)} Prozentpunkte`;
        }
        return `${partyName(d.firstParty)} +${d.leadMargin.toFixed(1)} Pkt.`;
      },
      dataMetric: "vote",
      segmentOrder: (scenario) =>
        [...scenario.votes]
          .sort((a, b) => b.voteShare - a.voteShare)
          .map((entry) => entry.party),
      controls: {
        type: "leader",
        options: [...leaders.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([party]) => party),
        selected,
      },
      controlLabel: "Wessen Vorsprung soll im Fokus stehen?",
      customBandTitle: (scenario) => {
        if (scenario.firstParty !== selected) {
          return "Sonstige";
        }
        if (scenario.leadMargin > LEAD_MARGIN_CLEAR_MIN) {
          return "Klare Führung";
        }
        return "Knappes Rennen";
      },
      customBandSort: (a, b) =>
        (groupedOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
        (groupedOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER),
    };
  }

  return {
    title,
    headline,
    detail,
    ordered,
    highlight: (d) => d.firstParty === selected,
    cardText: (d) => {
      if (isClarifiedNumericUnits()) {
        return `${partyName(d.firstParty)}: Vorsprung +${d.leadMargin.toFixed(1)} Prozentpunkte`;
      }
      return `${partyName(d.firstParty)} +${d.leadMargin.toFixed(1)} Pkt.`;
    },
    dataMetric: "vote",
    segmentOrder: (scenario) =>
      [...scenario.votes]
        .sort((a, b) => b.voteShare - a.voteShare)
        .map((entry) => entry.party),
    controls: {
      type: "leader",
      options: [...leaders.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([party]) => party),
      selected,
    },
    customBandTitle: (scenario) => {
      if (scenario.firstParty !== selected) {
        return "Sonstige";
      }
      if (scenario.leadMargin > LEAD_MARGIN_CLEAR_MIN) {
        return "Klare Führung";
      }
      return "Knappes Rennen";
    },
    customBandSort: (a, b) =>
      (groupedOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
      (groupedOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER),
  };
}

function task2bView() {
  const selected = state.selectedThresholdParty;
  const languageVariant = editorialLanguageVariant();
  const isJournalistic = languageVariant === "journalistic-optimized";
  const isNarrativeFlow = languageVariant === "journalistic-flow";
  const narrative = state.variants.entryNarrative ?? "standard";
  const ordered = [...state.scenarios].sort((a, b) => {
    const aShare = shareOf(a, selected);
    const bShare = shareOf(b, selected);
    const aBelow = isBelowThreshold(a, selected);
    const bBelow = isBelowThreshold(b, selected);

    if (narrative === "risk-start") {
      if (aBelow !== bBelow) {
        return aBelow ? -1 : 1;
      }
      return Math.abs(aShare - 5) - Math.abs(bShare - 5);
    }

    if (aBelow !== bBelow) {
      return aBelow ? -1 : 1;
    }
    if (aBelow && bBelow) {
      return 5 - bShare - (5 - aShare);
    }
    return aShare - 5 - (bShare - 5);
  });

  const belowCount = ordered.filter((d) =>
    isBelowThreshold(d, selected),
  ).length;
  const aboveCount = state.scenarioCount - belowCount;

  const isExtended =
    state.variants.explanationDepth === "extended-transparency";

  let detail = `${aboveCount} Szenarien liegen darüber. Die Sortierung zeigt zuerst die klaren Unterschreitungen, danach die knappen Fälle über 5%.`;

  if (narrative === "risk-start") {
    detail = `${aboveCount} Szenarien liegen darüber. Im Fokus stehen zuerst die knappsten Fälle rund um die 5%-Hürde.`;
  }

  if (isExtended) {
    detail = `${aboveCount} Szenarien liegen darüber. Vorne: Szenarien unter 5%, sortiert nach Abstand zur Hürde. Hinten: Szenarien über 5%, ebenfalls nach Abstand.`;
  }

  const title = isJournalistic
    ? "Wo wird die 5%-Hürde knapp?"
    : "Wer rutscht unter 5%?";

  const headline = isJournalistic
    ? `${partyName(selected)} bleibt in ${belowCount} von ${state.scenarioCount} Szenarien unter der 5%-Hürde.`
    : `${partyName(selected)} liegt in ${belowCount} von ${state.scenarioCount} Szenarien unter 5%.`;

  const editorialDetail = isExtended
    ? `${aboveCount} Szenarien liegen darüber. Oben stehen die klaren Unterschreitungen, darunter die knappen Fälle über der Hürde.`
    : `${aboveCount} Szenarien liegen darüber. Die Reihenfolge zeigt zuerst klare Unterschreitungen, danach knappe Fälle über der Hürde.`;

  const narrativeEditorialDetail =
    narrative === "risk-start"
      ? `${aboveCount} Szenarien liegen darüber. Oben stehen die knappsten Fälle an der 5%-Hürde, damit Kippmomente sofort sichtbar werden.`
      : editorialDetail;

  if (isNarrativeFlow) {
    const flowHeadline = `${partyName(selected)} bleibt in ${belowCount} von ${state.scenarioCount} Szenarien unter der 5%-Hürde.`;

    return {
      title: "",
      badge: "Die 5%-Hürde bleibt ein politischer Kipppunkt",
      headline: flowHeadline,
      detail: "",
      headerTitle: "FDP und BSW drohen an der 5%-Hürde zu scheitern",
      headerEyebrow: "Wenn am Sonntag Bundestagswahl wäre",
      headerSubtitle:
        "Rund um die Fünf-Prozent-Marke entscheidet sich, welche Stimmen später parlamentarische Wirkung entfalten.",
      ordered,
      highlight: (d) => isBelowThreshold(d, selected),
      cardText: (d) => {
        if (!isClarifiedNumericUnits()) {
          return `${partyName(selected)}: ${shareOf(d, selected).toFixed(1)}%`;
        }
        const distanceToThreshold = isBelowThreshold(d, selected)
          ? -Math.abs(5 - shareOf(d, selected))
          : Math.abs(shareOf(d, selected) - 5);
        return `${partyName(selected)}: ${formatThresholdDistanceCard(distanceToThreshold)}`;
      },
      dataMetric: "vote",
      thresholdParty: selected,
      segmentOrder: () => [
        selected,
        ...PARTY_ORDER.filter((party) => party !== selected),
      ],
      controls: {
        type: "threshold",
        options: thresholdRelevantParties(state.scenarios),
        selected,
      },
      controlLabel:
        "Welche Partei könnte ebenfalls den Einzug in den Bundestag verpassen?",
    };
  }

  return {
    title,
    headline,
    detail: isJournalistic ? narrativeEditorialDetail : detail,
    ordered,
    highlight: (d) => isBelowThreshold(d, selected),
    cardText: (d) => {
      if (!isClarifiedNumericUnits()) {
        return `${partyName(selected)}: ${shareOf(d, selected).toFixed(1)}%`;
      }
      const distanceToThreshold = isBelowThreshold(d, selected)
        ? -Math.abs(5 - shareOf(d, selected))
        : Math.abs(shareOf(d, selected) - 5);
      return `${partyName(selected)}: ${formatThresholdDistanceCard(distanceToThreshold)}`;
    },
    dataMetric: "vote",
    thresholdParty: selected,
    segmentOrder: () => [
      selected,
      ...PARTY_ORDER.filter((party) => party !== selected),
    ],
    controls: {
      type: "threshold",
      options: thresholdRelevantParties(state.scenarios),
      selected,
    },
  };
}

function task3View() {
  const languageVariant = editorialLanguageVariant();
  const isJournalistic = languageVariant === "journalistic-optimized";
  const isNarrativeFlow = languageVariant === "journalistic-flow";
  const narrative = state.variants.entryNarrative ?? "standard";
  const coalition =
    state.coalitionOptions.find(
      (entry) => entry.id === state.selectedCoalition,
    ) ?? state.coalitionOptions[0];

  if (!coalition) {
    return {
      title: isJournalistic
        ? "Welche Bündnisse hätten eine Mehrheit?"
        : "Welche Mehrheiten sind möglich?",
      headline: isJournalistic
        ? "In dieser Auswahl erreicht derzeit kein zulässiges Bündnis eine parlamentarische Mehrheit."
        : "Keine der zulässigen Koalitionen erreicht in diesen Szenarien eine Mehrheit.",
      detail: isJournalistic
        ? "Wählen Sie ein anderes Bündnis oder ändern Sie die Szenariozahl, um weitere Konstellationen zu prüfen."
        : "Wählen Sie eine andere Perspektive oder ändern Sie die Szenariozahl.",
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

    if (narrative === "majority-start") {
      return Math.abs(aSurplus) - Math.abs(bSurplus);
    }

    if (aMajority && bMajority) {
      return bSurplus - aSurplus;
    }
    return Math.abs(aSurplus) - Math.abs(bSurplus);
  });

  const majorityCount = ordered.filter((d) =>
    coalitionMajority(d, coalition.parties),
  ).length;

  const isExtended =
    state.variants.explanationDepth === "extended-transparency";
  const noMajority = state.scenarioCount - majorityCount;

  let detail =
    "Vorne stehen Szenarien mit Mehrheit. Innerhalb der Gruppen sortiert die Ansicht nach klaren bzw. knappen Mehrheiten.";

  if (narrative === "majority-start") {
    detail =
      "Vorne stehen Szenarien mit Mehrheit. Innerhalb der Gruppen erscheinen zuerst die knappsten Mehrheiten und knappsten Fehlmehrheiten.";
  }

  if (isExtended) {
    detail = `${noMajority} Szenarien erreichen keine Mehrheit. Vorne: Szenarien mit Mehrheit, sortiert nach Sitzüberschuss. Hinten: fehlende Mehrheiten, sortiert nach Abstand. Gezeigt werden realistische Koalitionen. AfD-Bündnisse und Union+LINKE-Konstellationen sind ausgeschlossen.`;
  }

  const title = isJournalistic
    ? "Welche Bündnisse hätten eine Mehrheit?"
    : "Welche Mehrheiten sind möglich?";

  const headline = isJournalistic
    ? `${coalition.label} kommt in ${majorityCount} von ${state.scenarioCount} Szenarien auf eine parlamentarische Mehrheit.`
    : `${coalition.label} erreicht in ${majorityCount} von ${state.scenarioCount} Szenarien eine Mehrheit.`;

  const editorialDetail = isExtended
    ? `${noMajority} Szenarien bleiben ohne Mehrheit. Oben stehen Mehrheiten mit dem größten Sitzpuffer, darunter Konstellationen knapp unter der Mehrheit.`
    : "Die Karten zeigen zuerst Konstellationen mit Mehrheit und danach die Fälle, in denen das Bündnis knapp darunter bleibt.";

  const narrativeEditorialDetail =
    narrative === "majority-start"
      ? `${noMajority} Szenarien bleiben ohne Mehrheit. Im Fokus stehen zuerst die knappsten Mehrheiten und knappsten Fehlmehrheiten, weil sie politisch besonders entscheidend sind.`
      : editorialDetail;

  if (isNarrativeFlow) {
    const flowHeadline = `${coalition.label} erreicht in ${majorityCount} von ${state.scenarioCount} Szenarien eine parlamentarische Mehrheit.`;

    return {
      title: "",
      badge: "Regierungsfähigkeit entscheidet sich an wenigen Sitzen",
      headline: flowHeadline,
      detail: "",
      headerTitle: "Kenia-Koalition gilt aktuell als besonders wahrscheinlich",
      headerEyebrow: "Wenn am Sonntag Bundestagswahl wäre",
      headerSubtitle:
        "Ob eine Koalition regieren kann, entscheidet sich häufig an knappen Sitzabständen zur Mehrheit.",
      ordered,
      highlight: (d) => coalitionMajority(d, coalition.parties),
      cardText: (d) => {
        const value = coalitionSurplus(d, coalition.parties);
        if (isClarifiedNumericUnits()) {
          return formatMajorityDistanceCard(value);
        }
        const label = value >= 0 ? "Mehrheit" : "Fehlt";
        return `${label}: ${Math.abs(value).toFixed(1)} Sitz-%`;
      },
      dataMetric: "seat",
      coalitionParties: coalition.parties,
      segmentOrder: () => [
        ...coalition.parties,
        ...PARTY_ORDER.filter((party) => !coalition.parties.includes(party)),
      ],
      controls: {
        type: "coalition",
        options: state.coalitionOptions.map((d) => d.id),
        selected: coalition.id,
      },
      controlLabel: "Welche Koalition soll im Mehrheitscheck stehen?",
    };
  }

  return {
    title,
    headline,
    detail: isJournalistic ? narrativeEditorialDetail : detail,
    ordered,
    highlight: (d) => coalitionMajority(d, coalition.parties),
    cardText: (d) => {
      const value = coalitionSurplus(d, coalition.parties);
      if (isClarifiedNumericUnits()) {
        return formatMajorityDistanceCard(value);
      }
      const label = value >= 0 ? "Mehrheit" : "Fehlt";
      return `${label}: ${Math.abs(value).toFixed(1)} Sitz-%`;
    },
    dataMetric: "seat",
    coalitionParties: coalition.parties,
    segmentOrder: () => [
      ...coalition.parties,
      ...PARTY_ORDER.filter((party) => !coalition.parties.includes(party)),
    ],
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
  const alternativeOnly = isAlternativeOnlyInteractionMode();

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

  if (view.controls.type !== "none" && !alternativeOnly) {
    const isExtended =
      state.variants.explanationDepth === "extended-transparency";

    let label;
    const isNarrativeFlow = isNarrativeFlowLanguage();
    if (view.controls.type === "leader") {
      label = isNarrativeFlow
        ? (view.controlLabel ?? "Wessen Vorsprung soll im Fokus stehen?")
        : isExtended
          ? "Welche Partei soll im Fokus stehen?"
          : "Fokuspartei Führung:";
    } else if (view.controls.type === "threshold") {
      label = isNarrativeFlow
        ? (view.controlLabel ??
          "Bei welcher Partei ist die 5%-Hürde besonders kritisch?")
        : isExtended
          ? "Für welche Partei den Schwellenwert prüfen?"
          : "Partei an der 5%-Hürde:";
    } else {
      label = isNarrativeFlow
        ? (view.controlLabel ??
          "Welche Koalition soll im Mehrheitscheck stehen?")
        : isExtended
          ? "Welche Koalition untersuchen?"
          : "Mehrheitsoption:";
    }
    controlRows.push({
      id: "context",
      fieldClass: "control-context",
      label,
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
  const isJournalistic = isJournalisticLanguage();
  const isNarrativeFlow = isNarrativeFlowLanguage();
  const summary = d3.select("#summary");
  summary.html("");

  if (isNarrativeFlow && view.badge) {
    summary.append("p").attr("class", "summary-badge").text(view.badge);
  }

  if (view.title) {
    summary.append("h2").text(view.title);
  }

  if (isNarrativeFlow && view.intro) {
    summary.append("p").text(view.intro);
  }

  if (view.headline) {
    summary.append("p").text(view.headline);
  }
  if (view.detail) {
    summary.append("p").style("margin-top", "6px").text(view.detail);
  }

  if (!isJournalistic) {
    summary
      .append("p")
      .style("margin-top", "6px")
      .style("color", "var(--text-muted)")
      .text(
        `Basis: ${state.scenarioCount} von ${state.totalScenarioBase} festen Referenzszenarien (deterministisch).`,
      );
  }

  if (isProbabilityLayoutActive()) {
    summary
      .append("p")
      .style("margin-top", "8px")
      .style("color", "var(--text-main)")
      .text(
        "Die Anordnung zeigt die Häufigkeit über alle Szenarien. Die aktuelle Auswahl hebt passende Szenarien hervor, ohne die Reihenfolge zu ändern.",
      );
  }

  renderInlineFocusComplex(summary, view);
}

function renderInlineFocusComplex(summary, view) {
  if (!isAlternativeOnlyInteractionMode()) {
    return;
  }

  const controls = view.controls ?? {
    type: "none",
    options: [],
    selected: null,
  };
  if (controls.type === "none") {
    return;
  }

  const alternatives = (controls.options ?? []).filter(
    (option) => option !== controls.selected,
  );

  if (alternatives.length === 0) {
    return;
  }

  const isNarrativeFlow = isNarrativeFlowLanguage();

  const focusLabelByType = isNarrativeFlow
    ? {
        leader: "Wer könnte den Vorsprung drehen?",
        threshold:
          "Welche Partei könnte ebenfalls den Einzug in den Bundestag verpassen?",
        coalition: "Welche Koalition ist die wichtigste Alternative?",
      }
    : {
        leader: "Eine weitere Partei liegt dicht auf den Fersen",
        threshold: "Eine weitere Partei droht an der 5%-Hürde zu scheitern",
        coalition: "Eine weitere Koalition könnte entstehen",
      };

  const block = summary
    .append("div")
    .attr("class", "control-field control-context inline-focus-complex")
    .style("margin-top", "10px");

  block
    .append("label")
    .text(focusLabelByType[controls.type] ?? "Auswahl zur aktiven Perspektive");

  const buttonWrap = block.append("div").attr("class", "control-alternatives");

  buttonWrap
    .selectAll("button")
    .data(alternatives)
    .join("button")
    .attr("type", "button")
    .attr("class", "task-btn context-switch-btn")
    .text((d) => {
      if (controls.type === "coalition") {
        const coalitionLabel =
          state.coalitionOptions.find((entry) => entry.id === d)?.label ?? d;
        return isNarrativeFlow
          ? `Alternative prüfen: ${coalitionLabel}`
          : `Blick auf ${coalitionLabel}`;
      }
      return isNarrativeFlow
        ? `Alternative prüfen: ${partyName(d)}`
        : `Blick auf ${partyName(d)}`;
    })
    .on("click", (_, value) => {
      if (controls.type === "leader") {
        state.selectedLeader = value;
      }
      if (controls.type === "threshold") {
        state.selectedThresholdParty = value;
      }
      if (controls.type === "coalition") {
        state.selectedCoalition = value;
      }
      render();
    });
}

function renderLandscape(view) {
  const landscape = d3.select("#landscape");
  landscape.html("");

  const columns = resolveColumns(landscape.node()?.clientWidth ?? 0);
  const ordered = resolveOrderedScenarios(view);
  const rankedCards = rankCards(ordered);

  if (state.variants.probabilityLayout === "frequency-center") {
    renderFrequencyCenterLandscape(landscape, columns, view, rankedCards);
    return;
  }

  if (state.variants.probabilityLayout === "frequency-zones") {
    const bands = buildFrequencyBands(rankedCards, view);
    renderBandLandscape(landscape, bands, columns, view);
    return;
  }

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

  if (state.variants.microchartDisplay === "circle-only-markers") {
    drawCardContentsCircleOnly(cardGroups, view);
    return;
  }

  if (state.variants.microchartDisplay === "compact-icons") {
    drawCardContentsCompact(cardGroups, view);
  } else {
    drawCardContentsStandard(cardGroups, view);
  }
}

function drawCardContentsCircleOnly(cardGroups, view) {
  const radius = markerRadius();
  const centerX = radius + 1;
  const centerY = radius + 1;

  cardGroups.each(function eachMarker(cardData) {
    const group = d3.select(this);
    const sorted = resolveSegments(cardData.scenario, view);

    const total = d3.sum(sorted, (d) => d.value);
    let startAngle = 0;

    sorted.forEach((entry) => {
      const fraction = total > 0 ? entry.value / total : 0;
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
        .attr("fill", PARTY_META[entry.party]?.color ?? "#d1d5db");

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

  cardGroups.call((groups) => appendWrappedCardLabel(groups, view));

  const showMarkers =
    state.variants.thresholdVisualization === "visual-markers";
  const y = 20;
  const barHeight = 16;
  const innerWidth = LAYOUT_TOKENS.cardWidth - 16;

  cardGroups.each(function eachCard(cardData) {
    const group = d3.select(this);
    const sorted = resolveSegments(cardData.scenario, view);
    const boundsByParty = new Map();

    let startX = 8;
    sorted.forEach((entry) => {
      const width = Math.max(0, (entry.value / 100) * innerWidth);
      group
        .append("rect")
        .attr("x", startX)
        .attr("y", y)
        .attr("width", width)
        .attr("height", barHeight)
        .attr("fill", PARTY_META[entry.party]?.color ?? "#d1d5db");
      boundsByParty.set(entry.party, {
        start: startX,
        end: startX + width,
      });
      startX += width;
    });

    if (showMarkers) {
      if (state.task === "task2b") {
        const selectedParty = view.thresholdParty;
        const selectedBounds = selectedParty
          ? boundsByParty.get(selectedParty)
          : null;
        const threshold5X = 8 + (5 / 100) * innerWidth;
        group
          .append("line")
          .attr("x1", threshold5X)
          .attr("x2", threshold5X)
          .attr("y1", y - 2)
          .attr("y2", y + barHeight + 2)
          .attr("stroke", "var(--text-strong)")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "2,2")
          .attr("opacity", 0.6);

        if (selectedBounds) {
          group
            .append("line")
            .attr("x1", selectedBounds.end)
            .attr("x2", selectedBounds.end)
            .attr("y1", y - 2)
            .attr("y2", y + barHeight + 2)
            .attr(
              "stroke",
              PARTY_META[selectedParty]?.color ?? "var(--text-strong)",
            )
            .attr("stroke-width", 1.6)
            .attr("opacity", 0.85);
        }
      }

      if (state.task === "task3") {
        const coalitionShare = coalitionSeatShare(
          cardData.scenario,
          view.coalitionParties ?? [],
        );
        const coalitionX = 8 + (coalitionShare / 100) * innerWidth;
        const threshold50X = 8 + (50 / 100) * innerWidth;
        group
          .append("line")
          .attr("x1", threshold50X)
          .attr("x2", threshold50X)
          .attr("y1", y - 2)
          .attr("y2", y + barHeight + 2)
          .attr("stroke", "var(--text-strong)")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "2,2")
          .attr("opacity", 0.6);

        group
          .append("line")
          .attr("x1", coalitionX)
          .attr("x2", coalitionX)
          .attr("y1", y - 2)
          .attr("y2", y + barHeight + 2)
          .attr("stroke", "var(--text-strong)")
          .attr("stroke-width", 1.8)
          .attr("opacity", 0.85);
      }
    }
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

  cardGroups.call((groups) => appendWrappedCardLabel(groups, view));

  cardGroups.each(function eachCard(cardData) {
    const group = d3.select(this);
    const sorted = resolveSegments(cardData.scenario, view);

    const total = d3.sum(sorted, (d) => d.value);
    let startAngle = 0;

    sorted.forEach((entry) => {
      const fraction = total > 0 ? entry.value / total : 0;
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
        .attr("fill", PARTY_META[entry.party]?.color ?? "#d1d5db");

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
  if (!titlePrefix && view.customBandTitle) {
    const grouped = d3.group(rankedCards, (entry) =>
      view.customBandTitle(entry.scenario),
    );
    const order = ["Klare Führung", "Knappes Rennen", "Sonstige"];

    return order
      .map((label) => {
        const cards = [...(grouped.get(label) ?? [])];
        if (view.customBandSort) {
          cards.sort((a, b) => view.customBandSort(a.scenario, b.scenario));
        }
        return {
          title: `${label} (${cards.length})`,
          cards,
        };
      })
      .filter((band) => band.cards.length > 0);
  }

  if (state.variants.groupingDisplay === "standard") {
    return [
      {
        title: titlePrefix,
        cards: rankedCards,
      },
    ];
  }

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
  const hoverMode = state.variants.hoverBehavior ?? "standard";
  const setHoverState = (node, isHovered) => {
    d3.select(node).classed("variant-hovered", isHovered);
  };

  if (hoverMode === "standard") {
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
    return;
  }

  if (hoverMode === "hover-tooltip") {
    const panel = ensureScenarioHoverPanel();

    cardGroups
      .on("mouseenter", function onEnter(event, cardData) {
        setHoverState(this, true);
        updateScenarioHoverPanel(panel, cardData, view);
        positionScenarioHoverPanel(panel, event);
        panel.classed("visible", true);
      })
      .on("mousemove", function onMove(event) {
        positionScenarioHoverPanel(panel, event);
      })
      .on("mouseleave", function onLeave() {
        setHoverState(this, false);
        panel.classed("visible", false);
      });
    return;
  }
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
  const isSeatView = view.dataMetric === "seat";
  const rows = isSeatView
    ? buildAbsoluteSeatRows(cardData.scenario)
    : buildVoteRows(cardData.scenario, view);

  panel.html("");
  panel
    .append("div")
    .attr("class", "scenario-hover-title")
    .text(
      `${isSeatView ? "Sitzverteilung" : "Stimmenanteile"} · #${cardData.rank} · ${view.cardText(cardData.scenario)}`,
    );

  const seats = panel.append("div").attr("class", "scenario-hover-seats");

  rows.forEach((row) => {
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
      .text(
        isSeatView ? `${row.seats} Sitze` : `${row.voteShare.toFixed(1)} %`,
      );
  });
}

function resolveSegments(scenario, view) {
  const mode = view.dataMetric === "seat" ? "seat" : "vote";
  const valueAccessor =
    mode === "seat"
      ? (party) => seatShareOfParty(scenario, party)
      : (party) => shareOf(scenario, party);

  const order = view.segmentOrder
    ? view.segmentOrder(scenario)
    : [...PARTY_ORDER];

  return order.map((party) => ({
    party,
    value: valueAccessor(party),
  }));
}

function buildVoteRows(scenario, view) {
  return resolveSegments(scenario, view).map((entry) => ({
    party: entry.party,
    voteShare: entry.value,
  }));
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
  return [...scenario.seatShares]
    .map((entry) => ({
      party: entry.party,
      seats: entry.seats ?? 0,
    }))
    .sort((a, b) => b.seats - a.seats);
}

function coalitionSeatShare(scenario, parties) {
  return d3.sum(
    scenario.seatShares.filter((entry) => parties.includes(entry.party)),
    (entry) => entry.seatShare,
  );
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
  if (state.variants.microchartDisplay === "circle-only-markers") {
    const diameter = markerRadius() * 2 + 2;
    return { width: diameter, height: diameter };
  }

  return {
    width: LAYOUT_TOKENS.cardWidth,
    height: LAYOUT_TOKENS.cardHeight,
  };
}

function cardGroupClass(scenario, view) {
  if (state.variants.microchartDisplay === "circle-only-markers") {
    return "card-group";
  }

  return `card-group ${view.highlight(scenario) ? "highlighted" : ""}`;
}

function resolveColumns(containerWidth) {
  return state.variants.layoutStructure === "adaptive-grid"
    ? computeAdaptiveColumns(containerWidth)
    : LAYOUT_TOKENS.baselineColumns;
}

function isProbabilityLayoutActive() {
  return state.variants.probabilityLayout !== "standard";
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

function isClarifiedNumericUnits() {
  return state.variants.numericalUnits === "clarified";
}

function formatThresholdDistanceCard(distanceToThreshold) {
  const direction = distanceToThreshold >= 0 ? "über" : "unter";
  const absValue = Math.abs(distanceToThreshold).toFixed(1);

  if (isClarifiedNumericUnits()) {
    return `${direction} 5%: ${absValue} Prozentpunkte`;
  }
  return `${direction} 5%: ${absValue} Pkt.`;
}

function formatMajorityDistanceCard(value) {
  const direction = value >= 0 ? "über" : "unter";
  const absValue = Math.abs(value).toFixed(1);

  if (isClarifiedNumericUnits()) {
    return `${direction} 50%: ${absValue} Prozentpunkte`;
  }
  return `${direction} 50%: ${absValue} Sitz-%`;
}

function appendWrappedCardLabel(cardGroups, view) {
  const maxWidth = LAYOUT_TOKENS.cardWidth - 16;
  const lineHeight = 10;
  const maxLines = 2;
  const firstLineY = LAYOUT_TOKENS.cardHeight - 18;

  cardGroups.each(function eachCard(cardData) {
    const label = d3
      .select(this)
      .append("text")
      .attr("class", "card-label")
      .attr("x", 8)
      .attr("y", firstLineY);

    wrapCardLabelText(label, view.cardText(cardData.scenario), {
      maxWidth,
      maxLines,
      lineHeight,
    });
  });
}

function wrapCardLabelText(textSelection, content, config) {
  const words = String(content).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return;
  }

  const { maxWidth, maxLines, lineHeight } = config;
  const lines = [];
  let currentLine = [];

  words.forEach((word) => {
    const tentativeLine = [...currentLine, word];
    const tester = textSelection.append("tspan").text(tentativeLine.join(" "));
    const exceeds = tester.node()?.getComputedTextLength() > maxWidth;
    tester.remove();

    if (exceeds && currentLine.length > 0) {
      lines.push(currentLine.join(" "));
      currentLine = [word];
    } else {
      currentLine = tentativeLine;
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine.join(" "));
  }

  const visibleLines = lines.slice(0, maxLines);

  if (lines.length > maxLines) {
    const lastLineIndex = visibleLines.length - 1;
    let trimmed = visibleLines[lastLineIndex];

    while (trimmed.length > 0) {
      const candidate = `${trimmed}…`;
      const tester = textSelection.append("tspan").text(candidate);
      const fits = (tester.node()?.getComputedTextLength() ?? 0) <= maxWidth;
      tester.remove();
      if (fits) {
        visibleLines[lastLineIndex] = candidate;
        break;
      }
      trimmed = trimmed.slice(0, -1).trimEnd();
    }

    if (!visibleLines[lastLineIndex].endsWith("…")) {
      visibleLines[lastLineIndex] = "…";
    }
  }

  visibleLines.forEach((line, index) => {
    textSelection
      .append("tspan")
      .attr("x", 8)
      .attr("dy", index === 0 ? 0 : lineHeight)
      .text(line);
  });
}
