---
name: Style Transfer
description: Stable Transfer Workflow (Start-Reference Based, with Delta Checklist)
---

Follow `copilot-instructions.md` (binding), especially:

- Stable vs Test Environment (ARCHITECTURE RULE)
- Two-Layer Principle (TEST ENVIRONMENT)
- Test Variant System (UI REQUIREMENT – MANDATORY)
- Variant Panel Convention (BINDING)
- Reference Model (Binding Clarification)

---

## Goal

Transfer selected test variants into Stable so that:

- Stable reflects the chosen configuration by default.
- Stable contains NO variant UI.
- Test remains configurable.
- Test entry view opens with the same configuration preselected.

---

## Important Principles

- Stable must contain no variant UI.
- Stable must not require manual activation of modes.
- Stable becomes a clean preset.
- No redesign.
- No reimplementation.
- Only reuse existing working test logic.
- Maintain strict separation between:
  - Panel logic (test-only)
  - Visualization logic (transferable)

---

# Strict Workflow (Must Follow)

# Pre-Step — Variant Inventory

## 0.1 Inventory

Inspect:

- `index-test.html` + `main-test.js`
- `index-stable.html` + `main-stable.js`

List all variant panels exactly as defined in Test.

Each panel must follow:

- First option = Standard (Start behavior)
- Radio-only logic
- One panel = one decision dimension

---

## 0.2 Generate Delta Checklist (Start vs Stable)

For each panel:

1. . Determine what Stable currently does.
2. Determine which Test option corresponds to Stable behavior.

Now generate a radio checklist that mirrors the Test panels 1:1.

Rules:

- First option = ( ) Standard — describe Start behavior.
- If Stable already differs from Start and matches a Test alternative:
  - Preselect that alternative.
- If Stable still equals Start:
  - Standard remains selected.

Format:

**<Panel Title>**

- ( ) Standard — <Start behavior>
- ( ) <Alternative A> — <description>
- ( ) <Alternative B> — <description>

Then:

- Mark (•) for the option that reflects current Stable behavior.

This checklist must:

- Reflect Test panel structure exactly.
- Not redefine Standard.

---

## 0.3 User Decision (Chat-Based Radio Tick)

Ask the user to:

- Copy the checklist.
- Change only the (•) markers.
- Return the updated selection.

Clarify:

The selection defines:

- What will be hardcoded in Stable.
- What will be preselected in Test entry view.

No implicit assumptions.
Wait for explicit confirmation.

---

# Step 1 — Mapping (NO Code Changes)

After user selection:

1. Identify which Test code paths produce the selected configuration.
2. Identify which logic is UI-only (must stay in Test).
3. Identify what must be removed from Stable.
4. Identify what must be transferred.
5. Identify what must be hardcoded in Stable.
6. Identify what must be adjusted in Test to set the new default selection.

Propose a clear replacement plan.

Stop and ask for confirmation.

---

# Step 2 — Implementation

After approval:

## Stable

- Remove obsolete logic.
- Apply selected configuration.
- Hardcode selected behavior.
- Ensure no variant UI appears.

## Test

- Keep full variant system intact.
- Adjust entry state so selected configuration is preselected.
- Do NOT remove alternatives.
- Do NOT mix panel logic with visualization logic.

---

# Step 3 — Definition of Done

Confirm:

- Stable contains no variant UI.
- Stable reflects selected configuration exactly.
- Test entry view preselects the same configuration.
- No legacy or duplicated logic remains.
- Visualization renders correctly.
- Interactions still function.
- Layout separation between panel and visualization is intact.

Stop and ask for confirmation.
