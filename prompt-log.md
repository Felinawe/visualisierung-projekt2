# Prompt Log

This file documents all AI-assisted interactions in the project.

---

### 1. Project Setup - New Vite Project Creation

**Model:** Claude Haiku 4.5

**Request:** Create a new Vite project for a D3 visualization with the following structure:

In the .github folder, create a file named copilot-instructions.md containing the instructions from the previous project.

Create a Dok folder in the project root containing:

visualisierungs-kontext.md containing the context from the previous project.

In the src folder, create two files:

main-stable.js

main-test.js

In the project root, create two entry points:

index-stable.html

index-test.html

Also create:

prompt-log.md

changelog.md

README.md

The folder structure should mirror the previous project exactly, including .vscode, .gitignore, and .nojekyll files.

**Action:**

- ✅ Created directory structure (.github/, Dok/, src/, .vscode/)
- ✅ Copied copilot-instructions.md from previous project to .github/
- ✅ Copied visualisierungs-kontext.md from previous project to Dok/
- ✅ Created main-stable.js and main-test.js in src/ with starter content
- ✅ Created index-stable.html and index-test.html with basic HTML structure
- ✅ Created initial changelog.md with semantic versioning format
- ✅ Created .vscode/settings.json with default preview path
- ✅ Created .gitignore with standard exclusions
- ✅ Created .nojekyll empty file
- ✅ Created prompt-log.md with append anchor

**Status:** ✅ Completed

---

### 2. Prettier Formatter Workspace Configuration

**Model:** Claude Haiku 4.5

**Request:** Please configure this workspace so that the extension "Prettier – Code formatter" (esbenp.prettier-vscode) is used as the default formatter for all relevant file types and enable format on save.

**Action:**

- ✅ Created `.vscode/` directory
- ✅ Created `.vscode/settings.json` with Prettier as default formatter for Markdown, JSON, HTML, and JavaScript files
- ✅ Enabled `editor.formatOnSave` for automatic formatting

**Status:** ✅ Completed

---

### 3. Test Environment - Mehr Whitespace zwischen Panel und Visualisierung

**Model:** GPT-5.3-Codex

**Request:** Please follow copilot-instructions.md. In the test environment (index-test.html / main-test.js), increase whitespace and separation between:
(A) the top test variant system panel and
(B) the D3 visualization area below.

**Action:**

- ✅ `index-test.html` angepasst: separates Top-Panel (`.test-variant-panel`) und separater Visualisierungsbereich (`#visualization`) mit deutlich größerem vertikalem Abstand (`margin-bottom: 32px`) und klaren Begrenzungen.
- ✅ Whitespace erhöht (Body- und Container-Padding auf 24px), damit die Bereiche auch visuell klar getrennt bleiben.
- ✅ Stable/Test-Trennung eingehalten: Änderung nur in Test-Datei, keine Anpassung an `index-stable.html` oder `src/main-stable.js`.

**Status:** ✅ Completed

---

### 4. Start Environment - D3 Szenario-Landschaft nach Kontextregeln

**Model:** GPT-5.3-Codex

**Request:** Use visualisierung-kontext.md (conceptual authority) and copilot-instructions.md (operational rules) as binding references to create the d3 visualization. The visualization concept is fixed: - A landscape of identically structured microcharts/small multiples (Monte Carlo election outcomes). - The task structure is fixed. Work only in the test environment: main-start.js / index-start.html.

**Action:**

- ✅ `index-start.html` von Platzhalter auf eine vollständige Start-Oberfläche umgestellt (deutsche Headline, Aufgaben-Navigation, Steuerbereich, Zusammenfassung, Szenario-Landschaft, Legende).
- ✅ `src/main-start.js` vollständig implementiert: Laden des fixen Datensatzes (`data/poll-data.json`), Erzeugung von 100 Monte-Carlo-Szenarien, identische Microchart-Struktur und Reorganisation nach den festen Aufgaben (Task 1, Task 2a, Task 2b, Task 3).
- ✅ Parteifarben gemäß bindender Farbdefinition verwendet und Szenarien ausschließlich aus den autoritativen Eingangswerten abgeleitet.
- ✅ GitHub-Pages-kompatiblen relativen Script-Pfad in `index-start.html` gesetzt.

**Status:** ✅ Completed

---

### 5. Enhancements: 100/1000 Toggle, Neutral Labels, Coalition Rules

**Model:** Claude Haiku 4.5

**Request:** Goal:
Implement only the changes below.
The rest of the visualization must remain completely unchanged —
no structural, visual, stylistic, logical or architectural changes beyond the explicitly listed modifications are allowed.

Do not refactor, rename, reorganize, redesign, or optimize unrelated parts of the code.

1. Scenario scale: 100 ↔ 1000 toggle (and keep it readable)

- Add a simple UI switch (e.g., segmented control or dropdown) to toggle between 100 and 1000 Monte Carlo scenarios.
- Default can be 100 (fast) but switching to 1000 must be supported.
- Keep the small-multiples structure conceptually identical (many identically structured microcharts).

The visualization must be transformed so it remains understandable with 1000 scenarios:

- maintain clear grouping/sorting
- avoid tiny illegible tiles
- keep the grid scannable (e.g., responsive columns, consistent tile size, paging/virtualization only if necessary—prefer minimal changes)

Constraints:

- Do not alter dataset.
- nsure sorting/grouping logic still works for both sizes.

2. Remove visible task labeling / prototype framing (news-ready)

The visible UI must no longer show prototype-like tab/task navigation:

- "Task 1"
- "Task 2a"
- "Task 2b"
- "Task 3"

Important: This change is label/text-level only, not a redesign. Keep the current interaction pattern (same control count & type) and only replace the visible "Task …" wording with neutral newsroom labels.

Do not change which focus modes exist, only their labels.

After implementation please add this to the language part of copilot-instructions.md: Remove visible task labeling / prototype framing (news-ready). The visible UI must no longer show prototype-like tab/task navigation.

3. Coalition majority view
   Apply these rules only to coalition generation + coalition dropdown/list + coalition majority calculations:

3a) Exclusions

- Exclude any coalition that includes AfD.
- Exclude any coalition that includes both Union and LINKE (Union+LINKE must never appear, also not inside 3- or 4-party coalitions).

3b) Allowed party pool

- Only build coalitions from: Union / SPD / Grüne / FDP / LINKE / BSW

3c) Coalition sizes

- Allow: 2-party, 3-party, and 4-party coalitions.

3d) Visibility rule

- Show all coalition options that achieve a majority in at least 1 scenario (count > 0), subject to exclusions above.
- Do not hide other Linke coalitions (e.g., SPD+Grüne+Linke) unless they violate exclusions or have count = 0.

After implementation add to the language part of Visualization Context & Framework.md exactly:

- Exclude any majority constellation that includes AfD (no "Union + AfD", etc.).

- Exclude any coalition option that combines Union + LINKE (no "Union + LINKE", including 3-party and 4-party coalitions containing both).

Definition of Done:

The work is done when all of the following are true:
No unintended changes

- UI controls (type, order, placement, spacing, styling) are unchanged except:
- Scenario toggle works
  -> A UI control exists to switch between 100 and 1000 scenarios.
  -> Switching updates the visualization correctly (re-render / recompute scenarios as needed).
  -> No dataset modifications occurred.

- 1000 scenarios remain readable
  -> The small-multiples layout remains scannable and not reduced to illegible tiles.
  -> Grouping/sorting logic still functions for both 100 and 1000.

- No visible "Task" framing
  -> The UI shows no "Task 1/2a/2b/3" wording and no task-tab prototype navigation.
  -> The visualization reads like a newsroom-ready graphic with neutral German labels.

- Coalition logic complies
  -> No coalition involving AfD is shown or counted in coalition UI.
  -> Only coalitions from Union/SPD/Grüne/FDP/Linke are considered.
  -> 2- and 3-party coalitions are included.
  -> The coalition selector/list shows all coalitions that occur in ≥1 scenario and none that occur in 0 scenarios.
  -> Works correctly for both 100 and 1000 scenarios.

- Documentation updates are applied
  -> copilot-instructions.md contains the exact additional language rule specified above.
  -> Visualization Context & Framework.md contains the exact coalition restriction text specified above.

- Copilot checklist fulfilled
  -> Errors validated on modified files, changelog updated, prompt-log updated, and stable/test separation remains intact

**Action:**

- ✅ `index-start.html`: Added scrollable landscape (`max-height: 74vh; overflow: auto`) for 1000-scenario readability; updated headline text to remove hard-coded "100".
- ✅ `src/main-start.js`: Implemented 100/1000 toggle in `sub-controls` section; added `scenarioCount` to state; created `regenerateScenarios()` to rebuild scenario set and coalition options dynamically.
- ✅ Removed all visible "Task 1/2a/2b/3" labels. Mode buttons now display: "Führung", "Abstand an der Spitze", "5%-Hürde", "Mehrheiten".
- ✅ Replaced static `COALITION_OPTIONS` with dynamic `buildCoalitionOptions()` function; added `combinations()` helper to generate all 2-, 3-, 4-party options.
- ✅ Applied coalition exclusion rules: filtered out all coalitions including AfD and all Union+LINKE combinations (2-4 party).
- ✅ Coalition selector now only shows options with count > 0 (≥1 majority scenario).
- ✅ All headlines use `state.scenarioCount` dynamically (remove hard-coded "100 Szenarien").
- ✅ `.github/copilot-instructions.md`: Added exact specified language rule to journalistic language section.
- ✅ `Dok/Visualization Context & Framework.md`: Added exact specified coalition exclusion text to Task 3 section.
- ✅ Error validation: All modified files (HTML, JS, MD) report no errors.
- ✅ Changelog updated with version 0.1.3 (PATCH) covering toggle, neutral labels, coalition rules.
- ✅ Stable/Test separation verified: No changes to `index-stable.html` or `src/main-stable.js`.

**Status:** ✅ Completed

---

**Append Anchor:** Do not remove this line. New entries are inserted above it.
