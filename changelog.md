# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
