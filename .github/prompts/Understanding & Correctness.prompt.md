---
name: Understanding & Correctness
description: Task: Understanding & Correctness. Use this prompt when refining interpretability, conceptual clarity, and state consistency without changing data logic.
---

---

## Goal

Ensure conceptual clarity and correctness across Task 1–3.

Users must understand:

- what is shown
- what changes when interacting
- how states relate to each other
- how thresholds and comparisons function

This is a controlled refinement phase (Phase 2).

---

## Anchor: Binding Rules (Do not restate — enforce)

All work in this iteration must comply with the **Understanding & Correctness** section and general practices in `copilot-instructions.md` and must remain consistent with the project’s conceptual framework in `Dok/Visualization Context & Framework.md`, specifically:

- **Journalistic Language & Editorial Clarity (MANDATORY)**
- **Editorial Framing Rule (MANDATORY)**
- **Cognitive Simplicity Rule (MANDATORY)**
- **Transparency Balance Rule**
- **Data Authority & Dataset Integrity (MANDATORY)**
- **Start, Stable vs Test Environment (ARCHITECTURE RULE)**

- In `Dok/Visualization Context & Framework.md`:
  - The visualization’s role as a journalistic explanatory tool
  - The scenario-card landscape concept (consistency and comparability across tasks/states)
  - The fixed task structure (Task 1–3) as the interpretive framework

---

## Scope

This iteration focuses on **interpretability, state consistency, and conceptual robustness**.

You are allowed to:

- Improve labels, tooltips, legends, and interaction feedback
- Clarify threshold logic (e.g., 5% rule presentation)
- Remove ambiguous terminology
- Improve state transparency (hover, filter, selected)
- Reduce misinterpretation risk

Data logic remains unchanged unless a correctness error is explicitly identified.

---

## When to Introduce Test Variants

Do **not** automatically create interpretability variants.

However, if you identify **multiple plausible explanation strategies**, such as:

- Persistent vs contextual guidance
- Compact vs expanded legend logic
- Inline vs tooltip-based explanations
- Static vs dynamic interaction feedback

Then:

- Propose 2–3 clearly differentiated alternatives.
- Describe them as selectable variants in the test variant system (main-test.js / index-test.html).
- Clearly explain what differs and what remains identical.
- Do not implement until approval.

Small wording or clarity improvements should be proposed as direct refinements, not variants.

---

## Constraints (Phase 2 Discipline)

- No hidden logic changes
- No new terminology without explanation
- No exposure of model mechanics
- No regression of existing stable behaviors
- All conceptual adjustments must reduce ambiguity

If a change alters interpretive emphasis, surface it explicitly.

---

## Procedure (Do not implement yet)

### Step 1 — Reader Question Audit

For each task (1–3), identify:

- Likely entry-state questions
- Hover-state questions
- Click/filter questions
- Potential misinterpretations

Be concrete.

---

### Step 2 — Conceptual Stability Plan

Propose structural clarity rules such as:

- How thresholds must always be visually referenced
- How state changes must be signaled
- How denominators/base sets must remain transparent
- How scenario counts remain consistent across filters

---

### Step 3 — Concrete Improvements

List concrete refinements.

For each improvement:

- What changes
- What ambiguity it resolves
- Which tasks/states it affects
- Risk assessment (low / medium / structural)

Minor adjustments may be grouped.

---

### Step 4 — Interpretability Alternatives (Only if necessary)

If a genuine explanation strategy decision arises:

Present:

#### Variant A

- Explanation structure
- State transparency logic
- What remains unchanged

#### Variant B

- Explanation structure
- State transparency logic
- What remains unchanged

Explain integration into test variant system:

- Variant label
- Which UI components toggle
- How baseline comparison works

Do not force variants if refinement suffices.

---

## Instruction File Enhancements (Optional, only if warranted)

If your audit reveals that the existing section **Understanding & Correctness** is:

- ambiguous,
- incomplete for recurring edge cases,
- or repeatedly causing regressions,

then propose **small, concrete additions** to the editorial- and language-related part of `copilot-instructions.md`.

Rules:

- Propose enhancements as short bullet points (“Add rule: …”)
- Do not modify the file without approval
- Only propose enhancements that reduce future regressions or resolve ambiguity

If no enhancement is needed, state: “No instruction update needed.”

---

## Definition of Done

The iteration is successful when:

- Users can describe each task’s purpose in one sentence
- Threshold logic is clear and non-misleading
- No state produces contradictory signals
- No new ambiguity is introduced
- No regression in interaction stability
- Structural explanation decisions are either justified or variant-tested
- Any needed instruction enhancements are identified (or explicitly ruled out)

---

## Pre-Check

Before implementation, output:

1. Reader question audit
2. Conceptual stability rules
3. Concrete improvement list
4. Interpretability alternatives (if any)
5. Instruction enhancement suggestions (if any)

Then ask:

“Do you approve implementing these clarity and correctness refinements in the test environment (main-test.js / index-test.html)?
If alternatives were proposed, which variant should be added to the test variant system for comparison?”

Wait for explicit approval.
