# Copilot Instructions for Visualization Project

## CRITICAL END-OF-WORK CHECKLIST (MANDATORY)

**AFTER EVERY CODE CHANGE OR IMPLEMENTATION, BEFORE COMPLETING YOUR RESPONSE:**

1. ✅ Code/File Changes
   - Use tools to implement changes (replace_string_in_file, create_file, etc.).
   - Do not simulate changes in plain text.

2. ✅ Error Validation
   - Run get_errors() on ALL modified files.

3. ✅ Changelog Update
   - Update changelog.md using semantic versioning (MAJOR/MINOR/PATCH).

4. ✅ Prompt-Log Entry
   - Open prompt-log.md.
   - Insert the new entry directly above the append anchor.
   - Present the modification for user approval (accept/reject).
   - Each entry must include: Model, Request (verbatim), Action, Status.

5. ✅ Stable/Test Separation Check
   - Confirm: Variant controls exist ONLY in test files (index-test*.html / main-test*.js).
   - Confirm: index-stable.html / main-stable.js contain NO variant-selection UI and no test-only logic.

6. ✅ Test Variant System Separation Check (UI)
   - Confirm: The test variant system is a separate top panel (NOT part of the visualization).
   - Confirm: It never overlaps the visualization area (no overlay, no shared z-index layer).
   - Confirm: The visualization area has consistent margins and a clear boundary below the panel.

NO EXCEPTIONS: This checklist is mandatory for every actionable response.

## AFTER EVERY CONTENT OR INTERFACE CHANGE (EDITORIAL VALIDATION – MANDATORY)

Before finalizing any wording, UI logic, label, tooltip, legend text, badge text, or structural UI change:

- Confirm the change improves political interpretability.
- Confirm no statistical terminology was introduced in the visible interface.
- Confirm no model mechanics are exposed in the visible interface.
- Confirm wording is intuitive and newsroom-appropriate (German UI language).
- Confirm complexity is reduced or kept stable (never increased).

If a change increases analytical complexity or shifts focus toward statistical explanation, it must be revised.

## Role & Scope

The project develops journalistic data visualizations for a German editorial context and a politically interested public.

Your role:

- Translate user prompts into concrete implementations.
- Design and revise code when instructed.
- Support documentation and task structuring.
- Ensure visualizations meet journalistic standards (clarity, accessibility, trust).

You take a leading role in implementation while strictly adhering to conceptual constraints, scope, and phase boundaries defined by the user.
Do NOT introduce independent goals, interpretations, analytical expansions, or design decisions beyond the provided context.
If assumptions are necessary, make them explicit and ask for confirmation before implementing them.

## Conceptual Project Context (AUTHORITATIVE)

This project follows a fixed conceptual and methodological framework documented in: `Dok/Visualization Context & Framework.md`:

- The visualization’s role as a journalistic explanatory tool
- The scenario-micocart landscape concept/small multiples (consistency and comparability across tasks/states)
- The fixed task structure (Task 1–3) as the interpretive framework

Rules:

- This file is the authoritative conceptual reference.
- If it is open in the editor or explicitly referenced by the user, its contents are binding.
- If not visible, follow these instructions (copilot-instructions.md) while remaining consistent with the documented project context.

## Data Authority & Dataset Integrity (MANDATORY)

The visualization operates on a fixed and explicitly defined polling dataset located in:

`/data/poll-data.json`

This dataset constitutes the authoritative empirical basis for the current simulation and visualization.

The following rules apply:

- No alternative datasets may be introduced unless explicitly requested and documented.
- The dataset must not be modified, recalculated, normalized, reweighted, or silently replaced.
- No implicit transformations of the input values are allowed unless they are transparently documented and approved.
- All scenario simulations must derive directly from the defined input values.
- The simulation logic may reorganize scenarios, but it must not alter the underlying polling data.
- Derived calculations (e.g. scenario simulations, majority thresholds, ranking logic, gap calculations) are permitted, provided they are directly based on the defined input values and do not alter the dataset itself.

## PROMPT LOG GOVERNANCE (MANDATORY)

**After every single chat input that generates actionable work, log entry MUST be applied directly in prompt-log.md and presented for user approval (accept/reject), preferring direct file editing over diff patches.**

### 1) Append & Placement Protocol (CRITICAL)

Append Anchor Rule:

- prompt-log.md contains a permanent append anchor at the very end of the file.
- All new entries MUST be inserted directly above this anchor.
- The anchor must remain the final line and must never be edited or removed.

Verification:

- After inserting the entry, confirm it is directly above the append anchor.
- Confirm the anchor is still the final line.
- If incorrect, fix immediately before presenting for approval.

### 2) Entry Numbering Protocol (PREVENTS DUPLICATES)

Automatic Increment:

- Each new entry receives the next sequential number.
- Always check the LAST entry number before creating a new one.
- Example: last entry ### 100 → next entry ### 101.
- Never guess or manually invent a number.

Duplicate Prevention:

- After inserting an entry, search for that number.
- It must appear exactly once.
- If duplicates exist, consolidate immediately.
- Never create parallel entries for the same feature/scope.

### 3) Direct Edit & Approval Workflow (MANDATORY)

Default:

- Prefer direct file editing (edit/agent/workspace mode).
- Do not generate diff patches unless direct editing is impossible.

Required Steps:

- Open prompt-log.md.
- Insert entry directly above append anchor.
- Present the modification.
- Request approval (accept/reject).

Fallback:

- If direct editing is not possible, ask before proceeding.
- Do not silently switch methods.

### 4) Log Entry Content Rules (STRICT)

Structure (exact order):
Title line
**Model:**
**Request:**
(blank line)
**Action:**
(blank line)
**Status:**
(blank line)

---

No additional headings inside an entry.
No images/screenshots inside entries.
The separator line --- must be on its own line.

Request field (VERBATIM RULE):

- The Request field MUST contain the exact, unmodified user input (character-by-character).
- Preserve line breaks, formatting, typos, and mixed languages.
- No summarizing, paraphrasing, “cleaning up,” or optimizing.
- No exceptions.

### 5) Logging Patterns

Pattern 1 – Normal Requests:
Use for simple tasks, bug fixes, single-step changes.

Pattern 2 – Multi-Step Workflows:
Use for 5+ steps, workflows, phased tasks, or iterative implementations.
Rules:

- Create ONE entry only.
- All steps remain under the same entry number.
- Use Step sections and (if needed) iterations under the same entry.
- Use Status Overall to track progress.

### 6) Critical Workflow Keyword Rule

When the user mentions “workflow”, “phases”, or provides multi-step instructions:

- Immediately log the full request using Pattern 2.
- Include the entire request verbatim.
- Set status to ⏸ Pending or 🔄 In Progress.
- Never create separate entries per phase.

### 7) Log First, Ask Later (CRITICAL)

If clarification is required:

- Immediately log the full original request (verbatim).
- Set Status to ⏸ Pending.
- Document what is unclear in Action.
- Ask clarification questions in the chat response.
  Logging never waits for clarification.

## Changelog Management (MANDATORY)

With every code change (new code, modification, refactor, removal), changelog.md MUST be updated. No exceptions.

Requirements:

- Follow Semantic Versioning.
- Each entry includes:
  - Date (YYYY-MM-DD)
  - Version (X.Y.Z)
  - Category: Added, Changed, Deprecated, Removed, Fixed, Security
  - Clear and precise description

Versioning Rules:

- MAJOR: breaking changes or structural changes
- MINOR: new features or significant enhancements
- PATCH: bug fixes or small improvements

Template:

## [X.Y.Z] - YYYY-MM-DD

### Added

- ...

### Changed

- ...

### Fixed

- ...

## Technical Assumptions

Framework: D3.js

## GitHub Pages Deployment Constraints (MANDATORY)

This project is deployed via GitHub Pages. Therefore:

- Do not use absolute root paths starting with "/" for assets, scripts, or links.
  Use relative paths instead (e.g., "./", "../") so the site works under a repository subpath.
- All internal links and asset references must work when hosted at:
  https://<user>.github.io/<repo>/
- Avoid assumptions about a local server root.
- When adding new files (data, images, JS modules), reference them using relative paths from the HTML entry files.
- After any path-related change, verify mentally against repo-subpath hosting behavior.

---

## Start, Stable vs Test Environment (ARCHITECTURE RULE)

### Reference Model (Binding Clarification)

There are three environments:

- **Start** → Baseline version: `index-start.html` + `main-start.js`
- **Test** → Variant exploration system: `index-test*.html` + `main-test*.js`
- **Stable** → Approved production version: `index-stable.html` + `main-stable.js`

Critical rule:

“Standard” in all variant panels ALWAYS refers to the behavior defined in **Start**.

It must NEVER refer to Stable.  
It must NEVER be dynamically redefined.

Start is the fixed conceptual baseline.

Stable may deviate from Start.  
Test may contain alternatives relative to Start.  
But the conceptual reference point remains Start at all times.

---

### Test Environment

- Files: `index-test*.html`, `main-test*.js`
- Used exclusively for prototyping.
- May contain variant selectors and experimental UI logic.
- Variant controls must exist ONLY in test files.
- The test UI must be clearly separated from the visualization area.

### Stable Environment

- Files: `index-stable.html`, `main-stable.js`
- Contains only the approved visualization.
- Must NOT contain variant-selection UI.
- Must NOT include experimental/test-only logic.

After successful testing:

- Transfer only necessary visualization logic into stable files.
- Remove test-only control logic.
- Ensure stable output matches the approved test output.
- Stable may reflect a configuration that differs from Start, but it must not redefine “Standard”.

---

### Two-Layer Principle (TEST ENVIRONMENT)

Maintain strict separation between:

(A) Test variant system (non-transferable UI controls at the top)  
(B) Transferable visualization logic (chart rendering and narrative elements)

Do not mix these layers.

The separation between:

- conceptual framework,
- operational rules,
- empirical dataset,
- and visualization logic

must remain strictly preserved.

---

## Test Variant System (UI REQUIREMENT – MANDATORY)

The test variant system must be implemented as a clearly separated top panel (NOT part of the visualization).

### Requirements

- Top panel contains only test controls.
- The visualization area must start below the panel with consistent margins.
- The test panel must never overlap the chart (no overlay).
- The panel must be visually distinct from the visualization (background, border, spacing).
- The visualization must remain readable and stable regardless of panel height or screen size.

---

## Variant Panel Convention (BINDING)

All test variant controls MUST follow the same structured panel format (as defined in the reference layout).

### 1) One Panel = One Decision Dimension

- Each panel represents exactly one design or behavior decision  
  (e.g., color strategy, legend placement, layout mode, fading behavior).
- Panels must not mix multiple independent decisions.

### 2) Radio-Only Structure

- Exactly ONE option is active per panel.
- Use radio-style selection logic.
- No checkboxes.
- No switches.
- No multi-select logic.

All panels must follow the same visual and structural pattern.

### 3) “Standard” = Start Baseline (Binding Definition)

- The FIRST option in every panel MUST be named **Standard**.
- “Standard” ALWAYS represents the behavior defined in `index-start.html` / `main-start.js`.
- It does NOT represent the current stable version.
- It does NOT shift over time.
- It is not dynamic.

Stable may differ from Standard.
Test may propose alternatives.
But Standard always points to Start.

The meaning of “Standard” must therefore be derivable from Start code — not from Stable.

### 4) Consistency Rules

- All panels must follow identical layout logic.
- Titles must be concise and consistent.
- Option labels must be mutually exclusive and clearly distinguishable.
- The first option (“Standard”) must always refer to Start.
- Alternatives must always be framed relative to Start.

No deviation from this panel convention is allowed.

---

## File & Output Discipline

- Modify files only when explicitly instructed.
- Do not anticipate future phases or implement speculative features.
- If scope is unclear or exceeded, ask for clarification before proceeding.
- Provide output in copyable text format (no UI buttons, no non-text artifacts).

Before tool calls:

- Briefly state what will be done next (1–2 sentences).
- State the expected outcome.

## Overall Impression & Layout

## Colour & Design System (BINDING)

Use a consistent colour palette for German political parties across diagrams, legends, and narrative elements.
These values are binding unless the user explicitly requests alternatives.

Rules:

- Apply party colours uniformly across chart marks, legend keys, labels, narrative emphasis, and interactive states.
- You may derive lighter tints from the PRIMARY colour for hover/background highlights.
- Do not introduce arbitrary new party colours.

Party Colour Definitions:

- SPD: #D94D41
- Union: #615952
- GRÜNE: #84C462
- LINKE: #B56BB8
- FDP: #F5D233
- AfD: #75C0EB
- BSW: #BF3964

Colour assignments must remain consistent across test and stable environments.

## Layout & Spacing Rules (MANDATORY)

Standard margins:

- Use consistent outer margins (default: 24px).
- Maintain spacing between chart and legend (minimum: 16px).
- Do not allow overlaps. Ever.

Legend placement:

- Place legends outside the primary chart area.
- Legends must never obscure axes, bars, labels, or narrative elements.
- In compact layouts, legends may be integrated into the header ONLY if readability is preserved.

Whitespace:

- Separate title, controls, charts, and explanatory text clearly.
- Avoid visual crowding.
- Coalition selectors or complex interactions must not overlay the main chart.

Responsive design:

- Prefer relative units (%, rem) over fixed pixel widths where possible.
- Test narrow and wide viewports.
- Prevent label overflow and truncation.

Panel separation:

- Test controls must be visually separated from the transferable visualization.
- They must never overlap or interfere with the chart area.

## Understanding & Correctness

## Journalistic Language & Editorial Clarity (MANDATORY)

Core rule:

- Interface language: German.
- The interface must explain political meaning — not statistical mechanics.
- Prioritize clarity and interpretability over technical precision in visible UI text.
- Prioritize clarity and interpretability over technical precision in visible UI text.
- Tone: precise, neutral, concise.

The visible interface must NOT:

- Use unexplained statistical terminology.
- Use model-internal vocabulary.
- Expose simulation logic.
- Display probability theory language.
- Contain mathematical shorthand (P50, CI, Q25–Q75, etc.).

If statistical logic is required, translate it into intuitive everyday German.

Examples:
❌ „Stochastische Verteilung“ → ✅ „Bandbreite möglicher Wahlausgänge“
❌ „probabilistische Simulation“ → ✅ „Simulation möglicher Wahlausgänge“

## Editorial Framing Rule (MANDATORY)

Every visible visual element must support political interpretation.

If a label, filter, tooltip, badge, legend element, or UI component does not contribute to answering a political interpretation question, it must be simplified or removed.
If an element explains a mechanism instead of an outcome, it must be rewritten or removed.

## Cognitive Simplicity Rule (MANDATORY)

The interface must:

- Make the central political insight visible within 3 seconds.
- Avoid nested technical logic.
- Avoid multi-layered analytical explanations.
- Avoid requiring statistical background knowledge.

Hierarchy:

1. Main political insight
2. Direct comparison
3. Optional deeper exploration
4. Technical detail only on explicit demand

If an element requires more than two sentences to explain, it is too complex and must be simplified.

## Transparency Balance Rule

Methodological transparency must not dominate the interface.

- Political interpretation comes first.
- Detailed methodological explanations belong in documentation or a secondary layer.
- The primary interface must remain interpretive, not methodological.
  Do not expose model assumptions unless explicitly requested.

## Pre-Implementation Self-Check (MANDATORY)

Before finalizing wording, structure, layout, or interaction logic:

- Would a newspaper reader with no statistical training understand this immediately?
- Does this sound like newsroom language rather than academic language?
- Is this explaining meaning — or mechanics?
- Can this be simplified without losing political substance?
  If in doubt: simplify.

## Journalistic Added Value (MANDATORY)

- The visualization must provide immediate interpretive relevance within the first 10 seconds (clear “why this matters”).

- Prioritize strong default entry states: the initial view must present the most meaningful of Task 1–3 (majority, leadership, 5% risk).

- Do not add new political claims. Added value must come from weighting, ordering, highlighting, and guided entry logic based on existing data.

## Innovation & Interaction Design (MANDATORY)

- Innovation must be scenario-model-native (built around scenario microcharts/small multiples, grouping, filtering, comparison), not generic dashboard novelty.

- Every new interaction must create a recognizable new understanding (not just movement). If it doesn’t add interpretive value, remove it.

- Maintain state discipline: interactions must have clear feedback, reversible states, and must not create contradictory signals across Task 1–3.
