# Visualization Context & Framework

This file defines the binding project context. It serves as the leading reference for all other project files. All other files (e.g., prompts, code, visualizations) are conceptually subordinate to this context and implicitly reference the guidelines formulated here.

This document functions as a stable thinking and decision-making framework for the development of interactive data visualizations and for AI-assisted work within this project.

---

## 1. Project Context & Objectives

This project develops **journalistic data visualizations** with a focus on analysis, insight generation, and explanatory presentation for a **journalistic target audience**.

Visualizations are not primarily understood as finished products, but as tools for exploration, interpretation, and communication of data to the general public and media professionals.

Special emphasis is placed on:

- Traceability of design decisions
- Visible handling of uncertainties, assumptions, and data gaps
- Iterative development of visualization concepts
- Journalistic standards: clarity, accuracy, transparency, and accessibility

### Specific Visualization Objectives

The central visualization aims to present possible election outcomes for the German federal election (Bundestag) based on polling data.

The focus is not on a single predicted result, but on the **range of plausible outcomes** and the **rationale for that range**.

The result is an interactive D3 visualization:  
**Bundestag Election Simulator**

Target audience: journalistic audience (media professionals and politically interested public), German-speaking.

#### Core Aspects

**Simulation of Possible Election Outcomes**

The visualization should make election results understandable as outcomes of sampling processes and make associated uncertainty visible — including implicitly.

**Uncertainty as Central Storytelling Element**

Uncertainty is not treated as marginal information but as a constitutive component of the presentation. The goal is an intuitive explanation of why uncertainty is crucial for understanding election results and how it influences interpretation.

**Explorative Narrative Spaces**

Users should be able to derive their own plausible interpretations through interaction (e.g., exploring unexpected outcomes). A clear information hierarchy ensures that central statements are immediately understandable, while deeper detail becomes accessible through interaction.

**Innovative Presentation Forms**

The visualization should distinguish itself from classic election graphics and explore interactive approaches that make uncertainty and diversity of outcomes experienceable.

**Intuitive Usability**

Interactive elements should be largely self-explanatory. The structure follows the principle of automatic interpretability, supported by clear structure, reduced design, and concise usage hints where necessary.

---

## 2. Scenario Landscape Structure (Binding Concept)

The central design element of the Bundestag Election Simulator is a **landscape of identically structured microcharts/small multiples**.

Each microchart represents one plausible election outcome generated through Monte Carlo simulation.

The following structural principles apply:

- All microchart are formally identical in structure.
- Each microchart must remain visually recognizable at a glance.
- Microcharts function as comparable, icon-like representations of possible outcomes.
- The underlying scenario set remains constant across all views.
- Reorganization changes structure and emphasis, not data content.

The visualization communicates uncertainty through the distribution of many plausible scenarios rather than through a single forecast value.

---

## 3. Fixed Task-Based Structure (Interpretive Framework)

The visualization is structured by three clearly defined interpretive tasks.  
These tasks function as a stable analytical framework to reorganize and interpret the same scenario landscape from different political perspectives.

The tasks define _what kinds of political questions can be answered_ —  
not how they must be spatially arranged or prioritized in the interface.

Tasks must not introduce new data or alternative scenario sets.  
They operate exclusively on the identical simulation base.

The order and prioritization of tasks (i.e., which is shown first, second, or third) remain an editorial decision and may vary depending on the political context of the election.

---

## Ordering Logic vs. Spatial Layout (Binding Clarification)

Where tasks define ordering principles such as “appear first”, “primary grouping”, “reversed group”, or sorting from “largest to smallest”, this refers strictly to **logical ranking criteria within the data**.

These formulations define analytical precedence — not spatial geometry.

They do **not** prescribe a fixed spatial or geometric interpretation.

The following aspects remain intentionally open and must not be implicitly predetermined:

- Whether the scenario grid is interpreted linearly (e.g. left → right, top → bottom)
- Whether central positions indicate higher probability or importance
- Whether a radial, clustered, segmented, or linear layout is used
- Whether “first” corresponds to spatial front, visual center, leftmost position, or a highlighted grouping
- Whether logical groups must be spatially contiguous

The conceptual ranking logic must remain transparent and comprehensible.  
However, its spatial translation is a design decision and may vary depending on layout, innovation, or presentation goals.

No implicit geometric hierarchy should be assumed from logical ordering rules alone.

---

# Tasks for the prototype

What do we enable people to find out about the election poll results?

→ The order and prioritization of tasks depend on the political context and editorial focus of the election.

---

## Task 1 — Who’s leading?

(Number of scenarios in which Party X (and other relevant parties) are in the lead – only parties that have a realistic chance of leading)

Begin with the most intuitive question: Which party is leading the election polls? Provide a clear summary that states how many of the 100 simulated scenarios are led by that party (e.g. Leads in 80/100 scenarios = 80%).

### Microchart/Small Multiples ordering

- **Primary grouping:** Order scenario microcharts so that all scenarios in which the most frequently leading party is ahead appear first.
- **Within that group:** Sort microchart from the most decisive lead to the least decisive, using the margin to the second-placed party as the ranking metric (largest margin → smallest margin).

→ Optionally highlight the scenario microchart of this group to signal they represent the most likely winner. Each microchart may additionally display the lead margin to second place to indicate how clear or fragile the lead is.

- **Reversed group (Party X not leading):** Within the reversed group, the scenario microchart are sorted from closest to the lead to furthest from the leading party.

### Additional task (only when relevant): Alternative leaders

If another party leads in a non-negligible number of scenarios, this is explicitly communicated (e.g. Party Y leads in 20/100 scenarios). This allows users to quickly explore plausible alternative outcomes without leaving the main view.

### Selecting this party reorganizes the microcharts:

- Scenarios where this party leads move to the front; reorganisation within this and reversed group follows the same logical principle.

---

## Task 2 — How secure are parties’ positions?

It helps answer questions such as:

- Which parties are consistently close to each other (competition and proximity)?
- Where is the race tight — and where are gaps usually large? (2a)
- Which parties are operating near a critical threshold, where small changes matter most? (2b)
- Which parties appear structurally safe, and which remain vulnerable across scenarios?

This task is about **relative position and security** in the party landscape — from competitive proximity at the top to vulnerability near 5%.

---

### Task 2a — How do parties compare to each other?

(Number of scenarios in which the gap between the leading parties is small, moderate, or decisive)

Begin with the central question:  
How tight is the race between the strongest parties across the 100 simulated scenarios?

Provide a concise overview such as:

- How often the lead margin is very small (e.g. close races),
- How often the lead is clearly established,
- Whether competition at the top is structurally stable or volatile.

#### Scenario microchart/Small multiples ordering

- **Primary grouping:** Order scenario microcharts based on the size of the margin between the two leading parties (smallest gap → largest gap).
- **Within that structure:** The ordering should make competitive intensity visible — scenarios with narrow leads appear distinctly from scenarios with comfortable leads.

→ Optionally highlight particularly close races to signal fragile power balances. Each microcharts may display the lead margin to illustrate how tight or secure the competition is.

- **Alternative ordering logic (if selected):** Microcharts may instead be organized around a selected party, showing how close it typically is to the leading position.

No fixed grouping is required, but the structure must make competitive dynamics clearly visible.

### Additional task (only when relevant): Focus on specific party rivalries

If two parties are frequently close competitors across scenarios, this may be explicitly communicated (e.g. Party X and Party Y are within two percentage points in 35/100 scenarios).

Selecting a party reorganizes the scenario microcharts to show:

- How often it is within striking distance of the lead,
- How often it clearly outruns competitors,
- How often it is decisively behind.

Reorganisation must remain consistent with the chosen comparison logic.

---

### Task 2b — Which parties risk falling below the 5% electoral threshold?

(Number of scenarios in which Party X reaches the 5% threshold – only parties that are close to the hurdle)

Start with the party most at risk of falling below the 5% threshold across the simulated scenarios, and indicate how often this happens out of 100 simulations.

#### Scenario microchart/small multiples ordering

- **Primary grouping:** Order scenario microchart in which the party most at risk falls below 5% first.
- **Within that group:** Sort microcharts from the most decisive to least decisive, based on the margin to the 5% threshold.

→ Optionally highlight the scenario microchart of this group to signal the proportion in contrast to the scenarios in which the party clears the threshold. Each microchart may display the distance to the threshold.

- **Reversed group (party clears 5%):** Within the reversed group, scenario microcharts are sorted from closest to the threshold to furthest from it.

### Additional task (only when relevant): Other parties at risk

If another party risks falling below the threshold in a non-negligible number of scenarios, this is explicitly communicated (e.g. Party Y falls below the threshold in 12/100 scenarios).

### Selecting this party reorganizes the scenario microchart:

- Scenarios where this party falls below the 5% threshold move to the front; reorganisation follows the same logical principle.

---

## Task 3 — What are possible coalitions?

(Number of scenarios in which coalition X is capable of securing a majority)

Start with the coalition or single party that either  
(a) achieves an absolute majority in the largest number of scenarios, or  
(b) represents the most politically interesting possible outcome.

#### Scenario microchart ordering

- **Primary grouping:** Order scenario microchart where the coalition achieves a majority first.
- **Within that group:** Sort microcharts from the largest surplus (biggest number of seats above the majority threshold) to the smallest surplus (narrowest majority).

→ Optionally highlight the scenario microcharts of this group to signal the proportion of scenarios with and without an absolute majority. Each microcharts may display the surplus above the majority threshold.

- **Reversed group (coalition fails to achieve a majority):** Within the reversed group, scenario microcharts are sorted from closest to the majority threshold to furthest from it.

### Additional task (only when relevant): Other majority constellations

If another party or coalition achieves an absolute majority in a non-negligible number of scenarios, this is explicitly communicated (e.g. Party Y achieves a majority in 12/100 scenarios).

### Selecting this coalition reorganizes the scenario microcharts:

- Scenarios in which this coalition achieves a majority move to the front; reorganisation follows the same logical principle.

## 4. Editorial Entry Logic

The entry state of the visualization is a deliberate editorial decision.

The initial view must:

- Provide immediate political orientation.
- Highlight a relevant constellation or structural insight.
- Avoid purely technical or neutral sorting.
- Make interpretive relevance visible within seconds.

Entry logic may prioritize dominance, fragility, or structural tension — but must always remain grounded in the dataset.

---

## 5. Interaction Principles (Scenario-Native)

Interaction must remain native to the scenario landscape model.

Interactive elements are justified only if they:

- Reveal structural dependencies between scenarios.
- Clarify differences between dominant and fragile outcomes.
- Improve comparison across tasks.
- Make uncertainty more comprehensible.

Interaction must not:

- Introduce ornamental movement without insight.
- Create contradictory states.
- Add interpretive claims beyond the dataset.

All interactions operate on the same scenario base and must preserve structural consistency.

---

## 6. Methodological Guidelines

### Iterative Approach

- Visualizations emerge step by step and may be unfinished or experimental.
- Earlier versions serve as thinking and discussion tools.
- Adjustments are part of the knowledge process.

### Understandability Before Perfection

- Clarity and interpretability take precedence over aesthetic or technical optimization.
- Design decisions must be justifiable, not necessarily final.
- Reduction is preferred when it supports understanding.

### Handling Uncertainty

- Uncertainties, assumptions, and ranges should be made visible where appropriate.
- The goal is not elimination of uncertainty, but communicative contextualization.
- Visualizations may deliberately leave questions open.

### Tone & Language for UI Text

- German language
- Factual-explanatory tone
- Short and clear labels
- Error messages simple and action-oriented

---

## 7. Role of AI in the Project

Copilot is used in a supportive capacity, especially for:

- Idea generation for visualization concepts
- Suggestions regarding structure, interaction, and presentation
- Reflection and critical questioning of design decisions
- Assistance with textual documentation

The following principles apply:

- AI does not make final decisions.
- Suggestions are critically examined and may be rejected.
- Technical implementations occur only after conscious decision.
- AI contributions are documented in `prompt-log.md`.

---

## 8. Design Principles

### Clarity & Understandability

- Visualizations should be readable without additional explanation.
- Axes, scales, and key quantities must be clearly labeled.
- Titles and subtitles must clearly state the content focus.

### Interaction

- Interactive elements (e.g., hover, filter, slider) must serve knowledge gain.
- Interaction may support simplification but must not obscure content.
- Tooltips can provide context but are not a substitute for clear design.

### Accessibility (Quality Criterion)

- Colors should be high-contrast and distinguishable.
- Information must not be conveyed exclusively through color.
- Accessibility is understood as a quality criterion, not full formal compliance.

These criteria function as conceptual guidelines. Their weighting may vary depending on visualization type, project phase, and knowledge objective.

---

## 9. Relationship to Other Project Files

### visualisierung-kontext.md

- Defines objectives, attitude, and methodological framework
- Is conceptually leading and normative

### copilot-instructions.md

- Controls operational behavior of GitHub Copilot
- Implements the context technically
- Does not define independent content decisions
- Is subordinate to this context file

### prompt-log.md

- Documents AI interactions
- Makes decisions and iterations traceable
- Implicitly references both context and instructions

### Code and Visualization Files

- Implement decisions practically
- Are results of the process
- Are not normative documents

This separation ensures a clear distinction between context, process, and implementation.

---

## 10. Documentation & Traceability

### prompt-log.md

Relevant AI interactions are documented including:

- Prompt / Request
- Response / Suggestion
- Model used
- Status or classification

### Visualization Documentation

Each visualization should at minimum record:

- Goal of the presentation
- Central design decisions
- Open questions, assumptions, or uncertainties

---

## 11. Evolution of Context

This context file is not static. It may be adapted when:

- Project goals change
- New methodological insights emerge
- The handling of AI evolves

All adaptations must preserve structural coherence and conceptual clarity.
