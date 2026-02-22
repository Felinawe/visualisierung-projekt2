# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.10] - 2026-02-22

### Changed

- Stilvarianten `Redaktionell Serif` und `Redaktionell Sans` auf den Visualisierungsbereich begrenzt: Varianten werden nun über Klassen auf `#visualization` statt global auf `body` angewendet.
- Test-Variantensystem bleibt in Standard-Typografie und Standard-Farbgestaltung; Varianten beeinflussen nur Inhalte innerhalb von `#visualization`.
- Farbverfeinerung in beiden Stilvarianten zurückgenommen: neutrale Grundflächen beibehalten, keine globale Farbtönung, nur subtile Akzentverschiebungen bei aktiven Zuständen, Highlights und Fokusindikatoren.

## [0.3.9] - 2026-02-22

### Added

- Neue Variantendimension `Typografie & Farbklima` im Test-Variantensystem mit drei Optionen: `Standard`, `Redaktionell Serif`, `Redaktionell Sans`.

### Changed

- `index-test.html` auf tokenbasierte Stildefinition erweitert, sodass Schriftfamilie, Gewichts-Hierarchie, Laufweite, Zeilenhöhe, Kontrast und Hintergrundton je Stilvariante umschaltbar sind.
- `src/main-test.js` ergänzt um Stil-Variantenzustand und `applyEditorialStyleVariant()`, das die aktive Stilvariante über Body-Klassen auf die bestehende Oberfläche anwendet.

## [0.3.8] - 2026-02-22

### Added

- Neue Variantendimension `Steuerbereich-Struktur` im Test-Variantensystem mit drei Optionen: `Standard`, `Perspektive + Fokusblock`, `Geteilte Steuerfläche`.

### Changed

- Steuerbereich in `index-test.html` als eigenständige `control-area` strukturiert, damit Primärnavigation und Konfigurationssteuerung räumlich klar getrennt werden können.
- In `src/main-test.js` werden die beiden Selektoren weiterhin mit identischer Logik gerendert, nun aber als gruppierte Felder mit layoutabhängiger Platzierung.
- Fokusauswahl wird in den neuen Layout-Varianten visuell enger an die aktive Perspektive angebunden; die Szenariozahl wird sekundär positioniert.

## [0.3.7] - 2026-02-21

### Fixed

- Corrected hover panel positioning to appear directly adjacent to cursor, matching native browser tooltip behavior.
- Removed duplicate tooltip in circle-only marker mode (old SVG `<title>` element).
- Added `position: relative` to `#visualization` container for proper absolute positioning context.

### Changed

- Reduced hover panel offset from 14px to 12px/8px for closer cursor proximity.

## [0.3.6] - 2026-02-21

### Added

- Structured hover panel for scenario tiles/markers in the test visualization, showing exact seat distribution as absolute seat counts per party.

### Changed

- Hover behavior is now unified across all layout and microchart variants (grid, zoned frequency, circular center layout, compact icons, circle-only markers).
- Added non-intrusive floating panel styling to improve readability without adding permanent interface clutter.

## [0.3.5] - 2026-02-21

### Changed

- Harmonized wording for `Häufigkeit: Zentrum` to match the linguistic structure of `Häufigkeit: Zonen`.
- Updated center-layout panel hint to: "Häufige Sitzbilder im Zentrum, seltene klar im Außenbereich."
- In segmented center mode, the header now explicitly labels inner/outer frequency structure: `Zentrum: häufige Sitzbilder (...) · Außenbereich: seltene Konstellationen (...)`.

## [0.3.4] - 2026-02-21

### Changed

- Refactored panel state resolution in `src/main-test.js` to be modular and composable: ordering, grouping, grid mechanics, and highlighting now run as separate logical dimensions.
- `Häufigkeit: Zonen` now respects both variants of `Gruppendarstellung` consistently, including segmented focus/remaining sub-bands per frequency zone.
- `Häufigkeit: Zentrum` no longer lets grouping override spatial ordering; grouping is applied as structure/layering while frequency-based placement remains intact.
- Circular frequency placement is now deterministic (seeded noise), replacing non-deterministic random jitter and eliminating implicit coupling across re-renders.
- Added explicit cross-panel state rules in `.github/copilot-instructions.md` under `Cross-Panel Consistency (MANDATORY)`.

## [0.3.3] - 2026-02-21

### Added

- Third microchart display variant `Nur Kreis-Marker` in the test variant panel `Mikrochart-Darstellung`.
- Circle-only marker renderer (`drawCardContentsCircleOnly`) with radial seat-share segmentation and optional thin outline per scenario marker.
- Tooltip metadata on marker-only scenarios (`rank + cardText`) to keep political interpretation accessible without card frames.

### Changed

- `Häufigkeit: Zentrum` now applies collision handling in marker-only mode, reducing dense overlap in the center while preserving global frequency-based placement.
- Rendering dimensions are now variant-aware via `getMicrochartFrame()`, so all layout modes (grid, adaptive, zones, center) support marker-only representation consistently.
- In marker-only mode, heavy card framing is removed (no rectangular card background, no card shadows, no card highlight container class).

## [0.3.2] - 2026-02-21

### Added

- New variant panel "Mikrochart-Darstellung" with two microchart display options:
  - `Standard`: Horizontal bar charts (as in Start baseline)
  - `Kompakte Icons`: Circular pie-chart-style icons optimized for dense and radial layouts
- Compact icon rendering function (`drawCardContentsCompact`) using radial arcs to represent seat distributions in a space-efficient circular format.
- Microchart display variants work independently across all layout modes (grid, adaptive, frequency-zones, frequency-center) and respect all active filters and highlighting.

## [0.3.1] - 2026-02-21

### Changed

- Replaced Manhattan-distance center layout with a compact circular frequency layout for variant `Häufigkeit: Zentrum`.
- Scenarios are now arranged radially based on global frequency: high-frequency seat distributions near the center, rare ones at the outer radius.
- Added jitter to reduce visual overlap while maintaining frequency-based radial positioning.
- Added Cross-Panel Consistency rule in `.github/copilot-instructions.md` to enforce independent and combinable variant panels across all test dimensions.

## [0.3.0] - 2026-02-21

### Added

- Two probability-based layout variants in the test variant system:
  - `Häufigkeit: Zentrum` (most frequent seat distributions move toward the visual center)
  - `Häufigkeit: Zonen` (frequent, medium, and rare constellations shown in separate frequency zones)
- Global frequency ranking based on relative occurrence of seat-distribution signatures across the full scenario set.

### Changed

- In probability layouts, filters no longer reorder tiles; they only highlight matching scenarios.
- Added explicit summary hint when a probability layout is active, clarifying that ranking remains globally frequency-based.
- Strengthened visual emphasis for highlighted scenarios (clearer border, background contrast, and elevation).

## [0.2.0] - 2026-02-21

### Added

- Full test-environment visualization in `index-test.html` + `src/main-test.js` with a dedicated top variant panel and complete scenario landscape rendering.
- Test variant system with two structural dimensions and radio-only options:
  - Layout structure: `Standard` / `Adaptives Raster`
  - Group display: `Standard` / `Segmentierte Bänder`

### Changed

- Improved visual hierarchy and section structure in the test UI (header, controls, summary, landscape, legend) with stabilized spacing rules.
- Added centralized layout token configuration in `src/main-test.js` to reduce style drift and improve repeatability across iterations.
- Stabilized interaction-state readability (button states, card highlight behavior, and hover feedback) in the test visualization.
- Updated script paths in test and stable entry files to relative references for GitHub Pages subpath compatibility.
- Added two layout-governance rules in `.github/copilot-instructions.md` for centralized layout constants and responsive small-multiple column logic.

## [0.1.3] - 2026-02-20

### Added

- Scenario count toggle: switch between 100 and 1000 Monte Carlo scenarios with dynamic regeneration.
- Dynamic coalition generation with exclusion rules: no coalitions including AfD; no Union + LINKE combinations in 2, 3, or 4-party options.
- Coalition options now filtered to only show coalitions with ≥1 majority scenario.

### Changed

- Removed visible "Task" prototype labels. Mode navigation now reads: "Führung", "Abstand an der Spitze", "5%-Hürde", "Mehrheiten".
- Updated headline text to use `state.scenarioCount` dynamically (removes hard-coded "100").
- Landscape view now has scrollable viewport (`max-height: 74vh`) for readability with 1000 scenarios.
- Coalition selection now operates on `state.coalitionOptions` (filtered, dynamic list) instead of static `COALITION_OPTIONS`.

## [0.1.2] - 2026-02-20

### Added

- Implemented the start environment visualization in `index-start.html` and `src/main-start.js` as a D3-based landscape of 100 identically structured scenario microcharts.
- Added fixed task views for leadership, competition/5% threshold, and coalition majorities with reordering on the same scenario base.

### Changed

- Replaced placeholder start layout with a structured German editorial interface (task navigation, summary area, scenario landscape, legend).
- Updated script path in `index-start.html` to a relative path for GitHub Pages compatibility.

## [0.1.1] - 2026-02-20

### Changed

- Increased whitespace and visual separation between the top test variant panel and the D3 visualization area in `index-test.html`.

## [0.1.0] - 2026-02-18

### Added

- Initial project setup with Vite
- Project structure created (src/, .github/, Dok/)
- Stable and test entry points (index-stable.html, index-test.html)
- Main JS files for stable and test versions
- Configuration files (.gitignore, .vscode/settings.json)
- Documentation foundation (README.md, prompt-log.md, changelog.md)

---

**Append Anchor:** Do not remove this line. New entries are inserted above it.
