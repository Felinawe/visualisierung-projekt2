# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.28] - 2026-02-28

### Changed

- `src/main-test.js`: In `journalistic-flow` wird `Wenn am Sonntag Bundestagswahl wäre` als eigener Eyebrow-Text (Overline-Ebene) im Header geführt, ohne die narrative Subheadline zu ersetzen.
- `src/main-test.js`: Die vorherigen narrativen Subheadlines in allen drei Flow-Perspektiven (`Führung`, `5%-Hürde`, `Mehrheiten`) wiederhergestellt.
- `src/main-test.js`: Summary-Überschriften der Flow-Variante (`Führungsbild in den Szenarien`, `5%-Hürde im Szenarienvergleich`, `Mehrheitscheck im Szenarienvergleich`) entfernt.
- `src/main-test.js`, `index-test.html`: Header-Rendering und Styling für die neue Eyebrow-Zeile ergänzt (Overline-Style).

## [0.4.27] - 2026-02-28

### Changed

- `src/main-test.js`: In `Redaktionelle Sprache` → `Journalistisch optimiert - klarerer narrativer Flow...` Badge-Präfix `Kernaussage:` in allen drei Perspektiven entfernt; Kernbotschaften bleiben im gleichen Badge-Layout erhalten.
- `src/main-test.js`: Flow-Header für `Wer führt?`, `Wer riskiert 5%?`, `Welche Mehrheiten?` auf die vorgegebenen Titel und die Subheadline `Wenn am Sonntag Bundestagswahl wäre` umgestellt.
- `src/main-test.js`: Redundante Flow-Introzeilen unterhalb der Badges entfernt und die beiden als unzutreffend markierten Flow-Detailaussagen in `5%-Hürde` und `Mehrheiten` entfernt.
- `src/main-test.js`: Fokus-Komplex-Label in `5%-Hürde` (Flow) auf `Welche Partei könnte ebenfalls den Einzug in den Bundestag verpassen?` geändert.

## [0.4.26] - 2026-02-28

### Changed

- `prompt-log.md`: Neuer Eintrag `48` ergänzt und die drei Bilder `assets/image-1.jpeg`, `assets/image-2.jpeg` und `assets/image-3.jpeg` direkt unterhalb von Entry 47 sowie oberhalb des Append Anchors eingebunden.

## [0.4.25] - 2026-02-28

### Changed

- `src/main-test.js`: Arbeitsstand auf die erste lokale Version der Flow-Variante zurückgesetzt, inklusive Badge-Texte mit Präfix `Kernaussage:` in allen drei Perspektiven.
- `index-test.html`: Arbeitsstand auf die zugehörige Badge-Layout-Version zurückgesetzt (`#summary .summary-badge`).
- `prompt-log.md`: Arbeitsstand auf die frühere lokale Eintragsfassung zurückgesetzt.

## [0.4.24] - 2026-02-27

### Changed

- `src/main-test.js`: Neue Option im Panel `Redaktionelle Sprache` ergänzt: `Journalistisch optimiert – klarerer narrativer Flow`.
- `src/main-test.js`: Für die neue Sprachvariante in allen drei Perspektiven (`Wer führt?`, `Wer riskiert 5%?`, `Welche Mehrheiten?`) einen eigenen newsroom-nahen Textpfad umgesetzt (Titelstruktur `Bundestagswahl 2025: ...`, optionale Subheadline, Badge, Intro-Absatz, Headline, Detailtext).
- `src/main-test.js`: Dropdown-/Fokus-Texte und Alternative-Buttons in der neuen Sprachvariante sprachlich auf klaren narrativen Lead ausgerichtet, ohne Änderungen an Berechnungen, Sortierung oder Schwellenlogik.
- `index-test.html`: Badge-Styling für den Summary-Bereich ergänzt, genutzt nur durch die neue Sprachvariante.

## [0.4.23] - 2026-02-27

### Removed

- Konfliktkopien im Projekt-Root entfernt, damit nur die Originaldateien verwendet werden:
  - `prompt-log (conflicted copy 2026-02-27 180731).md`
  - `index-test (conflicted copy 2026-02-27 180227).html`
  - `changelog (conflicted copy 2026-02-27 180227).md`
  - `src/main-test (conflicted copy 2026-02-27 180731).js`

## [0.4.22] - 2026-02-27

### Changed

- `src/main-test.js`: In den Entry-Varianten A/B/C wird der Fokus-Komplex nicht mehr im oberen Steuerbereich gerendert, sondern direkt unter dem Badge-Text im Summary-Bereich und damit oberhalb der Szenario-Karten.
- `src/main-test.js`: Reihenfolge für A/B/C im Bereich über den Karten vereinheitlicht: zuerst Fokus-Komplex (nur bei vorhandenen Alternativen), danach Perspektiv-Buttons (`Wer führt?`, `Wer riskiert 5%?`, `Welche Mehrheiten?` ohne aktive Option).
- `src/main-test.js`: Top-`sub-controls` in A/B/C enthalten für Kontextwechsel keine doppelten Fokus-Elemente mehr.

## [0.4.22] - 2026-02-27

### Changed

- `index-test.html`: Zusätzlicher Container `#task-nav-inline` zwischen Summary und Szenariolandschaft ergänzt, um Einstiegs-Buttons in Varianten A/B/C unterhalb des Badge-Bereichs zu zeigen.
- `src/main-test.js`: Task-Buttons werden in A/B/C (`Einstieg & Erzählrichtung` ≠ `Standard`) in den Inline-Container gerendert; in `Standard` weiterhin im oberen Steuerbereich.
- `src/main-test.js`: Aktive/inaktive Task-Container werden dynamisch ein- bzw. ausgeblendet, sodass die Buttons nur an der jeweils gewünschten Position erscheinen.

## [0.4.21] - 2026-02-27

### Changed

- `src/main-test.js`: Kontext-Komplex in Alternative-Only-Modi wird nun vollständig ausgeblendet, wenn keine alternative Partei/Koalition auswählbar ist.
- `src/main-test.js`: Aktive Partei/Koalition wird im Kontext-Komplex nicht mehr als schwarzer aktiver Eintrag angezeigt; sichtbar bleiben nur alternative Umschalt-Buttons.
- `src/main-test.js`: Kontext-Labeltexte im Alternative-Only-Modus angepasst auf:
  - `Eine weitere Partei liegt dicht auf den Fersen`
  - `Eine weitere Partei droht an der 5%-Hürde zu scheitern`
  - `Eine weitere Koalition könnte entstehen`

## [0.4.20] - 2026-02-27

### Changed

- `src/main-test.js`: Interaktionslogik für `Einstieg & Erzählrichtung` (außer `Standard`) auf dynamisches Alternative-Only-Verhalten umgestellt: aktiver Einstieg wird nicht mehr als aktiver Button gezeigt, stattdessen nur alternative Einstiegsoptionen.
- `src/main-test.js`: Kontextsteuerung (`Führung`, `5%-Hürde`, `Mehrheiten`) in Nicht-Standard-Entry-Varianten von Select-Dropdown auf aktive Anzeige + alternative Umschalt-Buttons umgestellt; aktive Auswahl ist nicht mehr auswählbar.
- `src/main-test.js`: Render-Synchronisierung der Task-Buttons mit dem aktuellen State vereinheitlicht, sodass Task-Wechsel und Sichtbarkeit konsistent mit dem aktiven Einstieg bleiben.
- `index-test.html`: Styles für aktive Kontextanzeige und alternative Umschalt-Buttons ergänzt.

## [0.4.19] - 2026-02-27

### Added

- `src/main-test.js`: Neues Test-Panel `Einstieg & Erzählrichtung` mit vier Radio-Optionen (`Standard`, `A – Mehrheits-Start`, `B – Risiko-Start`, `C – Führungs-Spannung`) zur vergleichenden Prüfung unterschiedlicher Einstiegslogiken.

### Changed

- `src/main-test.js`: Narrative Variante steuert nun den Default-Einstieg je Richtung (A → `Mehrheiten`, B → `5%-Hürde`, C → `Führung`) ausschließlich in der Testumgebung.
- `src/main-test.js`: Task-spezifische Emphase-Logik erweitert:
  - C priorisiert in `Führung` knappe Führungen vor klaren Führungen.
  - B priorisiert in `5%-Hürde` knappe Fälle rund um die Schwelle innerhalb der Gruppen.
  - A priorisiert in `Mehrheiten` knappe Mehrheiten und knappe Fehlmehrheiten innerhalb der Gruppen.
- `src/main-test.js`: Summary-Detailtexte je Richtung sprachlich auf die jeweilige politische Einstiegsfrage geschärft.

## [0.4.18] - 2026-02-27

### Changed

- `index-stable.html`, `index-stable-v1.html`: Hover-Highlight-Styles (`.card-group.variant-hovered` inkl. Karten/Kreis/Segment-Regeln) aus der Test-Variante ergänzt, damit `Hover + Tooltip` sichtbar und konsistent wirkt.
- `src/main-stable-v1.js`: Hover-Logik auf den Test-Mechanismus erweitert (`hoverBehavior`-Default `hover-tooltip` + `variant-hovered` Klassensteuerung).

## [0.4.17] - 2026-02-27

### Changed

- `src/main-stable.js`, `src/main-test.js`: In `Redaktionelle Sprache = Journalistisch optimiert` wird die Subheadline im Header nicht mehr angezeigt.
- `index-stable.html`, `index-test.html`: Statischen Initialtext der Subheadline geleert, damit beim Einstieg kein Subheadline-Text vor dem ersten Rendern sichtbar ist.

## [0.4.16] - 2026-02-27

### Changed

- `src/main-stable.js`: Stable auf die deterministische Start/Test-Basislogik umgestellt (inkl. Task-Struktur ohne `task2a`) und als fester Preset auf die ausgewählte Zielkonfiguration gesetzt (`adaptive-grid`, `perspective-bridge`, `segmented-bands`, `calm-serif`, `hover-tooltip`, `journalistic-optimized`, `extended-transparency`, `visual-markers`, `clarified`).
- `src/main-test.js`: Test-Entry-Defaults auf dieselbe ausgewählte Zielkonfiguration gesetzt, während das vollständige Variantensystem unverändert erhalten bleibt.

## [0.4.15] - 2026-02-27

### Added

- `index-stable-v0.html` und `src/main-stable-v0.js` als archivierter Start-Stand (v0) angelegt.

### Changed

- `index-stable-v0.html`: Script-Referenz auf `./src/main-stable-v0.js` umgestellt, damit der archivierte Stand eigenständig lauffähig bleibt.
- `index-start.html`: auf die aus `Standard` (Test) übernommene Baseline umgestellt, ohne Test-Panel/Variantenauswahl; Script-Referenz auf `./src/main-start.js` gesetzt.
- `src/main-start.js`: Logik aus dem `Standard`-Pfad der Testumgebung übernommen und auf festen Standardzustand gesetzt; Variant-Panel-Definition/Rendering entfernt.

## [0.4.14] - 2026-02-27

### Changed

- `src/main-test.js`: Badge-Texte für `Führung`, `5%-Hürde` und `Mehrheiten` sprachlich differenziert – `Standard` bleibt Baseline-Wording, `Redaktionelle Sprache = Journalistisch optimiert` nutzt flüssigere newsroom-nahe Formulierungen.
- `src/main-test.js`: `Basis:`-Hinweis im Summary wird in der journalistischen Variante ausgeblendet, bleibt in der Standard-Variante unverändert sichtbar.

### Changed

- `src/main-test.js`: Szenariologik auf deterministische Referenzbasis (`simulation_reference.scenarios` aus `data/poll-data.json`) umgestellt; keine zufallsbasierte Neugenerierung mehr.
- `src/main-test.js`: Koalitionsmehrheiten werden pro Szenario über absolute Sitzzahlen berechnet und anschließend über die gewählte Szenariobasis aggregiert (`X von N`).
- `src/main-test.js`: 5%-Hürdenauswertung auf per-Szenario-Schwellenstatus umgestellt; Aggregation und Hervorhebung erfolgen konsistent über die feste Referenzbasis.
- `src/main-test.js`: Summary ergänzt um explizite Nennertransparenz (`Basis: N von Gesamt-N Referenzszenarien`) für reproduzierbare Ausgaben.
- `data/poll-data.json`: Simulationsreferenzdaten (`simulation_reference`) als einzige Datenquelle konsolidiert.

### Removed

- `data/Data Reference/simulations.csv` und `data/Data Reference/simulations.json` entfernt, da die Referenzszenarien in `data/poll-data.json` integriert sind.

## [0.4.13] - 2026-02-27

### Changed

- `src/main-start.js`, `src/main-test.js`, `src/main-stable.js`, `src/main-stable-v1.js`: Datenlade-Logik auf direkte Nutzung von `../data/poll-data.json` umgestellt; Mapping auf `metadata.parties` + `data` bleibt konsistent in allen vier Entry-Skripten.

### Removed

- `src/poll-data-foundation.js` entfernt, damit nur noch eine `poll-data`-Datei im Projekt verbleibt: `data/poll-data.json`.

### Fixed

- Benennungs- und Strukturkonflikt zwischen `poll-data-foundation.js` und `poll-data.json` aufgelöst; die Datengrundlage ist wieder eindeutig in `/data` verankert.

## [0.4.12] - 2026-02-27

### Added

- `src/poll-data-foundation.js`: Gemeinsame Datengrundlagen-Logik ergänzt, die ausschließlich `data/poll-data.json` im neuen Schema (`metadata` + `data`) lädt, validiert und in ein einheitliches Party-Mapping überführt.

### Changed

- `data/poll-data.json`: Datenbasis vollständig auf das neue, vorgegebene JSON aktualisiert (inkl. `metadata.parties`, `polls_num`, `polls_hash` und aktualisierten Parteiwerten).
- `src/main-start.js`, `src/main-test.js`, `src/main-stable.js`, `src/main-stable-v1.js`: Direkte, versionsspezifische Datenlade-Logik entfernt und auf das gemeinsame Zugriffsmuster über `loadPollDataFoundation()` vereinheitlicht.
- `index-stable-v1.html`: Skriptverweis auf `./src/main-stable-v1.js` korrigiert, damit die v1-Entry-Point-Datei mit der zugehörigen v1-Logik läuft.

### Fixed

- Inkonsistente Datenpfade und JSON-Struktur-Annahmen zwischen Start/Test/Stable/Stabile-v1 beseitigt; alle vier JS-Einstiege verarbeiten jetzt dieselbe autoritative Datengrundlage ohne Legacy-JSON-Parsing.

## [0.4.11] - 2026-02-26

### Changed

- `src/main-test.js`: In `Führung` reagiert das Summary-Badge jetzt auf die Variante `Redaktionelle Sprache = Journalistisch optimiert` mit einer flüssigeren Formulierung für Titel, Hauptsatz und Detailtext.
- `src/main-test.js`: Die bestehende Mengenlogik (`Klare Führung` / `Knappes Rennen`) bleibt unverändert, wird in der journalistischen Variante aber interpretativer und newsroom-näher formuliert.

## [0.4.10] - 2026-02-26

### Changed

- `src/main-test.js`: Detailtext in `Führung` zeigt jetzt die konkreten Anzahlen für `Klare Führung` und `Knappes Rennen` (jeweils `X von Y`), statt der bisherigen Schwellenwert-Erklärung.
- `src/main-test.js`: Perspektive `Abstand an der Spitze` aus der Test-Task-Navigation entfernt; sichtbar bleiben `Führung`, `5%-Hürde` und `Mehrheiten`.
- `src/main-test.js`: Veraltete Funktion `task2aView()` entfernt, damit die gelöschte Perspektive auch intern nicht mehr verarbeitet wird.

## [0.4.9] - 2026-02-26

### Changed

- `src/main-stable.js`: Perspektive `Führung` neu organisiert; die ausgewählte Partei steuert jetzt direkt Badge, Gruppierung und Sortierung in einem gemeinsamen Modell.
- `src/main-stable.js`: Szenario-Karten in `Führung` werden in drei Abschnitte gegliedert (`Klare Führung`, `Knappes Rennen`, `Sonstige`) und innerhalb der Abschnitte nach politisch interpretierbarer Führungsstärke sortiert.
- `src/main-test.js`: Entsprechende Führungslogik aus Stable in der Testumgebung übernommen, inklusive identischer Bandtitel, Sortierung und Highlight-Verhalten.

### Fixed

- `src/main-stable.js`: Badge in `Führung` zeigt jetzt ausschließlich die ausgewählte Partei (z. B. `Union liegt in X von 100 Szenarien vorne`) und nennt keine zweite Partei mehr.
- `src/main-test.js`: Badge in `Führung` auf dieselbe Logik umgestellt; keine parallele Zweitparteien-Ausgabe mehr.

## [0.4.8] - 2026-02-26

### Fixed

- `src/main-test.js`: Koalitionsoptionen in `Mehrheiten` werden jetzt nur noch aus Parteien gebildet, die in mindestens einem Szenario Sitze erhalten (Bundestagseinzug mindestens 1/100 bzw. 1/1000). Parteien ohne Einzug in allen Szenarien werden aus Koalitionskombinationen ausgeschlossen.
- `src/main-test.js`: Dropdown in `5%-Hürde` zeigt nur noch Parteien, die in mindestens einem Szenario unter 5% liegen; irrelevante Optionen mit 0 Vorkommen werden nicht mehr angeboten.
- `src/main-test.js`: Auswahlzustände für Fokuspartei (`5%-Hürde`) werden beim Neuberechnen der Szenarien validiert und bei ungültiger Auswahl auf eine gültige Option zurückgesetzt.

## [0.4.7] - 2026-02-26

### Fixed

- `src/main-test.js`: Option `Standard` im Panel `Wording in Szenario-Karten` wieder strikt auf Baseline-Verhalten (Start-Logik) zurückgeführt.
- `src/main-test.js`: Baseline-Formulierungen in Szenario-Karten wiederhergestellt:
  - Führung: `Partei +X Pkt.`
  - Abstand: `Partei vor Partei (X Pkt.)`
  - 5%-Hürde: `Partei: X%`
  - Mehrheiten: `Mehrheit/Fehlt: X Sitz-%`

### Changed

- `src/main-test.js`: Journalistische Klarsprache bleibt als alternative globale Variante aktiv und wirkt weiterhin über alle Perspektiven.

## [0.4.6] - 2026-02-26

### Changed

- `src/main-test.js`: Panel `Numerische Einheiten` journalistisch umbenannt zu `Wording in Szenario-Karten`; Variante `Klargestellt` ersetzt durch `Journalistische Klarsprache` mit selbsterklärenden Hinweisen.
- `src/main-test.js`: Numerische Darstellung jetzt global vereinheitlicht – die Auswahl im Panel wirkt auf alle Perspektiven (`Führung`, `Abstand an der Spitze`, `5%-Hürde`, `Mehrheiten`) und aktualisiert alle Szenario-Karten konsistent.
- `src/main-test.js`: Kartenformulierungen über alle Perspektiven auf klare, kompakte journalistische Begriffe umgestellt (inkl. konsistenter Schwellen-Formulierungen `über/unter 5%` und `über/unter 50%`).

### Fixed

- `src/main-test.js`: Kartenlabels unterstützen jetzt automatischen Zeilenumbruch (max. 2 Zeilen mit Ellipse), um Überlappungen bei längeren Formulierungen zu vermeiden.
- `index-test.html`: Kartenlabel-Typografie verdichtet (`.card-label`), damit längere Labels im Card-Layout stabil und ohne Textkollisionen dargestellt werden.

## [0.4.5] - 2026-02-26

### Fixed

- `src/main-test.js`: Datenbasis je Perspektive logisch getrennt:
  - `Führung`, `Abstand an der Spitze`, `5%-Hürde` nutzen Stimmenanteile (Zweitstimmen-%)
  - `Mehrheiten` nutzt Sitzanteile
- `src/main-test.js`: 5%-Hürdenansicht zeigt alle Parteien in den Segmenten (inkl. Parteien unter 5%) und ordnet die gewählte Partei immer an erster Stelle.
- `src/main-test.js`: Mehrheitenansicht gruppiert ausgewählte Koalitionsparteien strukturell am Beginn der Balkensegmente.
- `src/main-test.js`: Hover-Inhalte je View korrigiert:
  - Stimmen-Views zeigen Prozentwerte
  - Mehrheiten-View zeigt Sitze

### Changed

- `src/main-test.js`: Marker-Logik angepasst:
  - 5%-View: Marker auf Basis der ausgewählten Partei + 5%-Referenz
  - Mehrheiten-View: Marker auf aggregiertem Koalitions-Sitzanteil + 50%-Referenz
- `src/main-test.js`: Gemeinsamer Segment-Resolver eingeführt, damit Balken-/Icon-Rendering konsistent dieselbe View-Logik nutzt.

## [0.4.4] - 2026-02-26

### Changed

- `src/main-test.js`: Hover-Variante `Hover-Highlight` aus dem Panel `Hover-Verhalten` entfernt.
- `src/main-test.js`: Hover-Logik vereinfacht auf zwei klare Zustände:
  - `Standard` = bestehender Tooltip
  - `Hover + Tooltip` = Tooltip plus zusätzliche visuelle Hervorhebung

## [0.4.3] - 2026-02-26

### Fixed

- `src/main-test.js`: Hover-Variante `Hover-Highlight` korrigiert, damit die Hervorhebung in allen Mikrochart-Modi zuverlässig sichtbar ist.
- `src/main-test.js`: Hover-Variante `Hover + Tooltip` korrigiert, damit sie klar vom `Standard` unterscheidbar bleibt (Tooltip + deutliche visuelle Hervorhebung).

### Changed

- `index-test.html`: Zusätzliche Styles für `.card-group.variant-hovered` ergänzt (stärkerer Rahmen, Schatten, Kreis-Outline), um die Variantenwirkung deutlich zu machen.

## [0.4.2] - 2026-02-26

### Fixed

- `src/main-test.js`: Hover-Standardverhalten auf den bestehenden Tooltip zurückgesetzt (statt deaktiviert), damit `Standard` wieder dem bisherigen Basisverhalten entspricht.

### Changed

- Panel `Hover-Verhalten` in `src/main-test.js` textlich präzisiert:
  - `Standard` = bestehendes Tooltip-Verhalten
  - `Hover + Tooltip` = Tooltip mit zusätzlicher visueller Hervorhebung

## [0.4.1] - 2026-02-26

### Added

- Allgemeine Governance-Regel in `.github/copilot-instructions.md` ergänzt: einheitliches Header-Format für `prompt-log.md`-Einträge (`### <number>. <title>`), um gemischte Notation zu vermeiden.

## [0.4.0] - 2026-02-26

### Added

- **5 neue Test-Panels für Verständlichkeit & Korrektheit:**
  - Panel "Hover-Verhalten" (Standard, Hover-Highlight, Hover + Tooltip)
  - Panel "Redaktionelle Sprache" (Standard, Journalistisch optimiert)
  - Panel "Erklärungstiefe" (Standard, Erweiterte Transparenz)
  - Panel "Schwellenwert-Visualisierung" (Standard, Mit visuellen Markern)
  - Panel "Numerische Einheiten" (Standard, Klargestellt)
- Dynamische Header-Aktualisierung: Titel und Subtitle ändern sich basierend auf "Redaktionelle Sprache"-Variante.
- Task-Button-Labels ändern sich mit "Redaktionelle Sprache" (z.B. "Wer führt?" statt "Führung").
- Filter-Labels werden interpretativ formuliert bei "Erweiterte Transparenz" (z.B. "Welche Partei soll im Fokus stehen?" statt "Fokuspartei Führung").
- Sortierlogik-Erklärungen in allen Task-Details bei "Erweiterte Transparenz".
- Coalition Pool-Transparenz in Task 3 (AfD-Bündnisse und Union+LINKE ausgeschlossen) bei "Erweiterte Transparenz".
- Visuelle Schwellenwert-Marker (5%-Hürde in Task 2b, 50%-Mehrheit in Task 3) als gestrichelte Linien in Mikrocharts.
- Hover-Highlight-CSS für Karten und Kreismarker (.chart-card.hovered, circle.hovered).
- "Prozentpunkte" statt "Sitz-%" in Task 3 bei "Klargestellt"-Variante.

### Changed

- Text-Varianten in allen Tasks (task1View, task2aView, task2bView, task3View) abhängig von explanationDepth und numericalUnits.
- bindScenarioHover() jetzt variantenabhängig: kein Hover bei "Standard", Highlight bei "hover-highlight", Tooltip bei "hover-tooltip".

### Fixed

- renderVariantPanel() ruft jetzt renderHeader() und renderTaskButtons() auf, wenn editorialLanguage-Variante geändert wird.

## [0.3.15] - 2026-02-25

### Added

- Versioniertes Stable-Backup erstellt: `index-stable-v1.html` als archivierter Stand von `index-stable.html`.
- Versioniertes Stable-Backup erstellt: `src/main-stable-v1.js` als archivierter Stand von `src/main-stable.js`.

### Changed

- Manuelle Archivierung folgt jetzt der fortlaufenden `vX`-Konvention ohne Überschreiben bestehender Versionen.

## [0.3.14] - 2026-02-25

### Added

- `index.html` als Standard-Entrypoint ergänzt, der auf `./index-stable.html` weiterleitet, damit die GitHub-Pages-Projekt-URL ohne Dateiname zuverlässig die stabile Version lädt.

### Changed

- Datenladepfade in allen Einstiegsskripten auf robustes GitHub-Pages-Muster umgestellt (`new URL("../data/poll-data.json", import.meta.url)` in `src/main-start.js`, `src/main-test.js`, `src/main-stable.js`).

### Fixed

- Pfadauflösung für Datendatei unter Repository-Subpfaden stabilisiert, um fehlerhafte Ausspielung in GitHub Pages zu vermeiden.

## [0.3.13] - 2026-02-23

### Fixed

- Header-Breite in Redaktionellen Varianten (Serif & Sans): `max-width: none` auf `.subtitle` für `visual-style-calm-serif` und `visual-style-clear-sans` in Test- und Stable-Umgebung gesetzt, um volle Visualization-Breite auszunutzen. Standard und alle anderen Layouts bleiben unverändert.
- Stable-Text-Struktur mit Test synchronisiert: Header + Intro-Block-Struktur für „Redaktionell Serif" jetzt identisch zwischen Test und Stable.

## [0.3.12] - 2026-02-22

### Fixed

- Live Preview für Stable stabilisiert: Workspace-Einstellungen auf relative Pfade umgestellt (`livePreview.serverRoot: "."`, `livePreview.defaultPreviewPath: "index-stable.html"`), damit `index-stable.html` in neuen Preview-Sessions konsistent aus dem Projektordner geladen wird.

## [0.3.12] - 2026-02-22

### Changed

- Workspace-Konfiguration für Live Preview ergänzt: Server-Root auf `/` und Default-Preview-Pfad auf `/index-stable.html` gesetzt.
- Auto-Refresh der Live Preview auf Speichern aktiviert (`onSave`), damit Änderungen an `index-stable.html` und zugehörigen Dateien unmittelbar sichtbar werden.

## [0.3.11] - 2026-02-22

### Changed

- Stable auf ausgewähltes Preset umgestellt: `Adaptives Raster`, `Perspektive + Fokusblock`, `Standard` bei Häufigkeitsanordnung, `Segmentierte Bänder`, `Standard`-Mikrocharts und `Redaktionell Serif`.
- `index-stable.html` bereinigt: kein Test-Variantensystem mehr im Markup, Skriptbindung auf `./src/main-stable.js`, Steuerbereich startet im Layout `layout-perspective-bridge`.
- `src/main-stable.js` von Varianten-Umschaltung auf feste Konfiguration umgestellt; Variant-Panel-Rendering und zugehörige Umschaltpfade entfernt, Visualisierung läuft als cleanes Stable-Preset ohne Variant-UI.
- `src/main-test.js` Einstiegsauswahl der Variant-Panels auf dieselbe Konfiguration gesetzt, alle Test-Alternativen bleiben vollständig erhalten.

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
