---
name: Overall Layout
description: Task: Overall Impression & Layout. Use this prompt when refining structural layout quality and design consistency.
---

---

## Goal

Improve the visualization’s **overall impression** so it clearly functions as a **journalistic explanatory tool** — calm, structured, engaging — rather than a technical statistical graphic.

Strengthen:

- visual hierarchy
- spatial organization
- layout stability
- consistency across Task 1–3
- robustness across repeated iterations

This is a controlled refinement phase.

---

## Anchor: Binding Rules (Do not restate — enforce)

All work in this iteration must comply with the **Overall Impression & Layout** section and general practices in `copilot-instructions.md` and must remain consistent with the project’s conceptual framework in `Dok/Visualization Context & Framework.md`, specifically:

- In `copilot-instructions.md`:
  - **Colour & Design System (BINDING)**
  - **Layout & Spacing Rules (MANDATORY)**
  - **Data Authority & Dataset Integrity (MANDATORY)**
  - **Start, Stable vs Test Environment (ARCHITECTURE RULE)**

- In `Dok/Visualization Context & Framework.md`:
  - The visualization’s role as a journalistic explanatory tool
  - The scenario-card landscape concept (consistency and comparability across tasks/states)
  - The fixed task structure (Task 1–3) as the interpretive framework

Do **not** repeat those rules in your response.  
Instead, **audit against them** and **apply them with a sharpened eye**.

---

## Scope

This iteration focuses on **layout, structure, and design system coherence**.

You are allowed to:

- Identify and fix structural weaknesses
- Improve hierarchy and grouping
- Adjust spacing, alignment, and visual emphasis
- Clarify component relationships
- Remove layout regressions
- Strengthen consistency through explicit rules (without changing meaning)

Data mapping and interaction logic remain stable unless a minimal UI adjustment is strictly necessary.

---

## When to Introduce Test Variants

Do **not** automatically create layout variants.

However, if you identify a **structural decision point** with multiple plausible directions (i.e., a choice that changes the layout architecture rather than fixing a defect), such as:

- Small multiples arrangement (row vs. column vs. grid)
- Filter placement architecture (top bar vs. side panel)
- Panel grouping logic
- Entry hierarchy distribution
- Comparison layout structures

Then:

- Propose 2–3 clearly differentiated structural alternatives.
- Describe them as selectable variants for the existing test variant system (`main-test.js` / `index-test.html`).
- Clearly explain what differs structurally and what remains identical.
- Do not implement until approval.

Minor layout improvements (spacing fixes, alignment corrections, typography adjustments, hierarchy tuning, overlap prevention) should be proposed as direct refinements, not variants.

---

## Constraints (Phase 2 Discipline)

- No hidden logic changes
- No implicit design decisions
- No regression of stable features
- All structural changes must be justified with a concrete problem they solve
- If multiple plausible solutions exist: surface them explicitly (variants only if architectural)

---

## Procedure (Do not implement yet)

### Step 1 — Layout Diagnosis (Audit Mode)

Identify concrete layout issues grouped by:

- Visual hierarchy (primary vs. secondary elements)
- Structural grouping (logical clustering of components)
- Consistency across states (incl. hover/selected/filtered)
- Spatial rhythm and whitespace
- Alignment and grid coherence
- Responsiveness (narrow + wide)
- Stability across Task switching (Task 1–3)
- Regression risks (what tends to break again)

Be specific. Tie each issue back to a binding principle (without re-quoting it).

---

### Step 2 — Design System Stabilization Plan (Enforcement Mode)

Propose **explicit stabilization rules** that prevent “style drift” _while staying within the binding system_, e.g.:

- Where colour mapping must be centralized/locked
- Which spacing constants should be unified
- Which layout constraints should be made invariant (no-overlap, legend boundaries, panel boundary)
- Which component positioning rules must remain stable across tasks
- How reset/controls placement stays consistent without crowding

Focus on rules that can survive repeated iterations.

---

### Step 3 — Concrete Improvements (Refinement Mode)

List concrete layout improvements.

For each improvement:

- What changes
- Which problem it solves
- Which tasks/states it affects
- Risk assessment (low / medium / structural)
- How it reduces future regressions

Minor improvements can be grouped.

---

### Step 4 — Structural Alternatives (Only if necessary)

If you identify a genuine structural decision point:

Present:

#### Variant A

- Structural logic
- Visual hierarchy impact
- What remains unchanged (must stay identical)

#### Variant B

- Structural logic
- Visual hierarchy impact
- What remains unchanged (must stay identical)

For each variant, explain how it integrates into the test variant system:

- Variant label (as shown in the test panel)
- What layout rules toggle
- What stays identical to baseline
- How comparison with baseline works

Do not force variants where direct refinement is sufficient.

---

## Instruction File Enhancements (Optional, only if warranted)

If your audit reveals that the existing binding section **Overall Impression & Layout**is:

- ambiguous,
- incomplete for recurring edge cases,
- or repeatedly causing regressions,

then propose **small, concrete additions** to the layout-related part of `copilot-instructions.md`.

Rules:

- Propose enhancements as short bullet points (“Add rule: …”)
- Do not modify the file without approval
- Only propose enhancements that reduce future regressions or resolve ambiguity

If no enhancement is needed, state: “No instruction update needed.”

---

## Definition of Done

The layout iteration is successful when:

- No overlaps or unstable rendering occur (including dynamic states)
- Visual hierarchy is clear within 3 seconds
- Binding colour + spacing logic is consistently enforced across Task 1–3
- Test panel separation is clean and never interferes with the visualization area
- No layout regressions appear after interaction
- Structural decisions are either clearly justified or consciously variant-tested
- Any needed instruction enhancements are identified (or explicitly ruled out)

---

## Pre-Check (Approval Gate)

Before implementation, output:

1. Diagnosis summary
2. Stabilization rules
3. Concrete improvement list
4. Structural alternatives (if any)
5. Instruction enhancement suggestions (if any)

Then ask:

“Do you approve implementing these layout refinements in the test environment (main-test.js / index-test.html)?
If structural variants were proposed, which variant should be added to the test variant system for comparison?”

Wait for explicit approval.
