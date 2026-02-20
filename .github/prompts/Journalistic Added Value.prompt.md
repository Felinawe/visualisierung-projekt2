---
name: Journalistic Added Value
description: Task: Journalistic Added Value. Use this prompt when refining entry logic and narrative emphasis without changing task logic.
---

---

## Goal

Strengthen journalistic relevance through differentiated entry logic and interpretive emphasis.

The visualization must:

- foreground politically meaningful constellations
- guide interpretation
- reduce passive exploration

This is a controlled refinement phase.

---

## Anchor: Binding Rules (Do not restate — enforce)

All work in this iteration must comply with the **Journalistic Added Value** section and general practices in `copilot-instructions.md` and must remain consistent with the project’s conceptual framework in `Dok/Visualization Context & Framework.md`, specifically:

- In `copilot-instructions.md`:
  - **Journalistic Added Value**
  - **Data Authority & Dataset Integrity (MANDATORY)**
  - **Start, Stable vs Test Environment (ARCHITECTURE RULE)**

- In `Dok/Visualization Context & Framework.md`:
  - The visualization’s role as a journalistic explanatory tool
  - The scenario-card landscape concept (consistency and comparability across tasks/states)
  - The fixed task structure (Task 1–3) as the interpretive framework

---

## Scope

This iteration focuses on **entry state logic and narrative emphasis**, not layout redesign.

You are allowed to:

- Adjust entry sorting/highlighting
- Rebalance emphasis across scenarios
- Reorder visible elements for stronger interpretive clarity
- Clarify default states

---

## When to Introduce Test Variants

If multiple plausible entry strategies exist, such as:

- Dominant outcomes first vs borderline outcomes first
- Stability-focused vs fragility-focused entry
- Coalition-first vs party-first emphasis
- Sorted by probability vs sorted by impact

Then:

- Propose 2–3 clearly distinct narrative directions, e.g. with different defaukt states/starting point of visualization.
- Describe them as selectable variants in the test variant system.
- Clearly explain structural differences and constants.
- Do not implement until approval.

Minor emphasis tuning does not require variants.

---

## Constraints (Phase 2 Discipline)

- No hidden logic changes
- No artificial dramatization
- No regression of clarity

---

## Procedure (Do not implement yet)

### Step 1 — Relevance Diagnosis

Identify:

- What feels technically correct but not yet meaningful
- Where interpretive emphasis is weak
- Where entry state fails to guide

---

### Step 2 — Entry Strategy Proposal

If refinement suffices → propose direct improvements.

If multiple structural entry strategies exist → present alternatives.

For each alternative:

- Central political focus
- Entry ordering logic
- Highlight logic
- What remains unchanged

---

### Step 3 — Impact Assessment

For each direction:

- What insight becomes clearer
- Misinterpretation risk
- Interaction consequences
- Regression risk

---

## Definition of Done

The iteration is successful when:

- Entry state communicates a clear interpretive direction
- Users know where to look first
- Emphasis matches political relevance
- No data logic changes occurred
- Narrative decisions are justified or consciously variant-tested

---

## Pre-Check

Before implementation, output:

1. Relevance diagnosis
2. Direct refinements or entry alternatives
3. Impact assessment

Then ask:

“Do you approve implementing these entry refinements in the test environment?
If narrative variants were proposed, which direction should be added to the test variant system for comparison?”

Wait for explicit approval.
