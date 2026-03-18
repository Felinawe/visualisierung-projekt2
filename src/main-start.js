// Main start entry point
// This file contains the start/baseline version of the D3 visualization

// Import D3 and other dependencies as needed
// import * as d3 from 'd3';

// Initialize visualization here

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
