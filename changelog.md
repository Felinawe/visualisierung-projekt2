# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.60] - 2026-03-02

### Fixed

- `src/main-test-vorlage.js`: Bei fehlenden täglichen `averages` wird die Szenario-Streuung nicht mehr künstlich auf `0.12` begrenzt, sondern aus `ci_lower/ci_upper` der Fallback-Daten abgeleitet. Dadurch entstehen wieder plausible Führungswechsel (inkl. AfD-Führungen) statt faktisch deterministischer Union-Führung in allen Szenarien.

## [0.4.59] - 2026-03-02

### Fixed

- `src/main-test-vorlage.js`: In `Wer riskiert 5%?` die Bandzuordnung auf denselben gerundeten Abstand (1 Nachkommastelle) wie in der Kartenanzeige umgestellt, damit angezeigte `2,0` konsequent als `Knappes Rennen` statt `Klares Scheitern` klassifiziert wird.
- `src/main-vorlage-archiv.js`: Gleiche Rundungs-/Bandlogik für den Archivstand synchronisiert.

## [0.4.58] - 2026-03-02

### Fixed

- `src/main-test-vorlage.js`: Bandlogik in `Wer riskiert 5%?` korrigiert: `Klares Scheitern` gilt jetzt nur bei mehr als 2,0 Prozentpunkten unter 5%; `Knappes Rennen` gilt für alle Fälle bis einschließlich 2,0 Prozentpunkte unter 5%.
- `src/main-vorlage-archiv.js`: Gleiche Grenzwertkorrektur für die 5%-Bandlogik im Archivstand umgesetzt.

## [0.4.57] - 2026-03-02

### Changed

- `src/main-test-vorlage.js`: Dateninitialisierung von festen Referenzszenarien auf deterministisch generierte Szenarien aus Jahresmittelwerten (`averages`, Zeitraum 28.02.2025–28.02.2026) umgestellt; Koalitions-, Schwellen- und Panel-Logik unverändert beibehalten.
- `src/main-test-vorlage.js`: Parteikenngrößen (`avg`, `ciLower`, `ciUpper`, `diff`) werden jetzt direkt aus den täglichen Zeitreihen abgeleitet und als Basis für die Szenariogenerierung verwendet.
- `src/main-test-vorlage.js`: Narrative Texte/Overline dynamisiert; Overline auf `Neue Dynamiken ein Jahr nach der Bundestagswahl` gesetzt und task-spezifische Headertexte aus aktiver Auswahl und Szenariozählung erzeugt.
- `src/main-test-vorlage.js`: Vorlagenmodus deaktiviert (`TEMPLATE_MODE = false`), damit Karten, Fokus-Komplex und Narrative vollständig datengetrieben arbeiten.
- `index-test-vorlage.html`: Statische Platzhalterbezeichnungen im Header/Panel entfernt und auf datenbezogene Testdarstellung aktualisiert.
- `data/poll-data-vorlage.json`: Auf realen Timeline-Datensatz umgestellt und Metadaten um `timeline` (Start/Ende) sowie `timestamp: 2026-02-28` ergänzt.

## [0.4.56] - 2026-03-02

### Changed

- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Summary-Titel-Platzhalter `Platzhalter: Wer führt?/Wer riskiert 5%?/Welche Mehrheiten?` entfernt.
- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Badge-Texte von `Platzhalter: ...` auf neutrale Kurzlabels (`Führungsbild`, `5%-Hürde`, `Mehrheitsbild`) umgestellt.
- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Header-Overline und Header-Titel im Vorlagenmodus auf perspektivspezifische Platzhaltertexte gesetzt (je Auswahl `Wer führt?`, `Wer riskiert 5%?`, `Welche Mehrheiten?`).

## [0.4.55] - 2026-03-02

### Changed

- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Cluster-Titel im Vorlagenmodus auf Platzhalter ohne numerische Counts umgestellt (inkl. Gruppenbänder in allen drei Perspektiven).
- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Szenario-Kartenwortlaut auf aufgabenbezogene Platzhalter vereinheitlicht (`Wer führt?`, `Wer riskiert 5%?`, `Welche Mehrheiten?`) ohne konkrete Zahlenangaben (`Prozentpunkte`, `Sitze`).
- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Fokus-Komplex im Vorlagenmodus in allen Perspektiven mit vollständigen Auswahloptionen aktiviert (Parteien + Koalitionsoptionen gemäß Koalitionsregeln); außerhalb Vorlagenmodus bleibt die bestehende datengestützte Filterung erhalten.
- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Header im Vorlagenmodus auf Overline+Headline+Subheadline-Platzhalter im gleichen Layoutmuster wie Test umgestellt.
- `src/main-test-vorlage.js`, `src/main-vorlage-archiv.js`: Cluster-Meta-/Curation-Texte und Toggle-Beschriftungen im Vorlagenmodus auf datenneutrale Platzhalter ohne Counts umgestellt.

## [0.4.54] - 2026-03-02

### Added

- `index-vorlage-archiv.html` als Archivkopie der Vorlagen-HTML erstellt.
- `src/main-vorlage-archiv.js` als Archivkopie der Vorlagen-JS erstellt.
- `data/poll-data-vorlage-archiv.json` als Archivkopie der Vorlagen-Daten erstellt.

### Changed

- `index-vorlage-archiv.html`: Script-Referenz auf `./src/main-vorlage-archiv.js` gesetzt.
- `src/main-vorlage-archiv.js`: Datenpfad auf `../data/poll-data-vorlage-archiv.json` gesetzt.
- `data/poll-data-vorlage-archiv.json`: `metadata.template_entrypoints` auf die Archivdateien umgestellt.

## [0.4.53] - 2026-03-02

### Changed

- `src/main-test-vorlage.js`: Vorlagen-Vorauswahl für `Häufigkeitsanordnung` auf `Standard` zurückgesetzt (`probabilityLayout: standard`).
- `src/main-test-vorlage.js`: Vorlagen-Vorauswahl für `Mikrochart-Darstellung` auf `Standard` zurückgesetzt (`microchartDisplay: standard`).
- `src/main-test-vorlage.js`: Szenario-Karten im Vorlagenmodus auf reine Platzhalterdarstellung umgestellt (keine datengetriebene Kartenbeschriftung, keine datengetriebenen Tooltip-Werte, keine datenbasierten Schwellenmarker).

## [0.4.52] - 2026-03-02

### Added

- `index-test-vorlage.html` als wiederverwendbarer Test-Template-Entrypoint ergänzt.
- `src/main-test-vorlage.js` als eigenständige Vorlagen-Logik ergänzt (identische Panel-/UI-Struktur, data-ready Scaffold).
- `data/poll-data-vorlage.json` als strukturgleiche Datengrundlage mit 1000 Referenzszenarien für `spd/cxu/gru/fdp/afd/lin/bsw` ergänzt.

### Changed

- `index-test-vorlage.html`: Script-Referenz auf `./src/main-test-vorlage.js` gesetzt und Vorlagen-Headlines/-Hinweise als Platzhalter für spätere Dateneinspielung ergänzt.
- `src/main-test-vorlage.js`: Datenquelle auf `../data/poll-data-vorlage.json` umgestellt.
- `src/main-test-vorlage.js`: In allen Variantengruppen konkrete (nicht-`Standard`) Vorauswahl gesetzt (`probabilityLayout: frequency-zones`, `microchartDisplay: compact-icons`, übrige wie bestehende Test-Vorauswahl).
- `src/main-test-vorlage.js`: Header- und Summary-Texte im Vorlagenmodus als journalistisch strukturierte Platzhalter vorbereitet; Szenario-/Kartenberechnungslogik bleibt unverändert.

## [0.4.51] - 2026-03-01

### Changed

- `index-stable.html`, `index-test.html`: Vertikale Abstände zwischen Subheadline, Szenario-Toggle und Summary-Box reduziert (Header-Abstand und Control-Area-Gap/Margin verringert), um den Block kompakter zu machen.

## [0.4.50] - 2026-03-01

### Changed

- `index-stable.html`, `index-test.html`: Box-Optik des Szenario-Toggles entfernt (kein Rahmen/kein Hintergrund), übrige Text- und Interaktionslogik unverändert beibehalten.

## [0.4.49] - 2026-03-01

### Changed

- `src/main-stable.js`, `src/main-test.js`: Szenario-Toggle auf reinen Einzeilentext reduziert (`In x Szenarien ↑/↓`), Overline `Szenarien` entfernt.
- `index-stable.html`, `index-test.html`: Toggle-Text näher an den Boxrand gesetzt (kleineres Padding), bei erhaltenem kompakten Box-Layout.

## [0.4.48] - 2026-03-01

### Changed

- `src/main-stable.js`, `src/main-test.js`: Separate Überschrift `Szenarien` oberhalb des Controls entfernt; stattdessen kleines Overline-Label direkt im Szenario-Toggle.
- `index-stable.html`, `index-test.html`: Szenario-Steuerung auf boxloses, minimaleres Layout umgestellt (kleinere Schrift, kein umrahmtes Feld, reduzierte visuelle Fläche).

## [0.4.47] - 2026-03-01

### Changed

- `src/main-stable.js`, `src/main-test.js`: Szenario-Steuerung von Dropdown auf kompakten Toggle umgestellt (`In 100 Szenarien ↑` / `In 1000 Szenarien ↓`) mit Klickwechsel zwischen 100 und 1000.
- `index-stable.html`, `index-test.html`: Styling für die neue Szenario-Steuerung ergänzt (kleine Label-Zeile über der Box, kompakte Toggle-Fläche).

## [0.4.46] - 2026-02-28

### Fixed

- `src/main-stable.js`: Perspektivspezifisches Clustering in der Stable-D-Ansicht korrigiert, sodass `Wer riskiert 5%?` und `Welche Mehrheiten?` nicht mehr generische Gruppen (`Im Fokus`) zeigen, sondern die Test-äquivalenten Kategorien (`Klares Scheitern`/`Knappes Rennen`/`Sonstige` sowie `Klare Mehrheit`/`Knappe Mehrheit`/`Sonstige`).
- `src/main-stable.js`: `buildGroupedBands()` auf `customBandOrder` umgestellt, damit jede Perspektive ihre eigene Cluster-Reihenfolge wie in `main-test.js` nutzt.

## [0.4.45] - 2026-02-28

### Changed

- `src/main-stable.js`: Stable-Landschaft auf festes Preset `D – Merge von A und C` umgestellt (Cluster-Überblick mit sichtbarer Reorganisation bei Perspektivwechseln), ohne Variant-UI.
- `src/main-stable.js`: Kontinuierliches Cluster-Rendering mit persistenter Kartenpositionsspeicherung ergänzt, damit Umordnungen zwischen Perspektiven sowie bei `100`/`1000` sichtbar und nachvollziehbar bleiben.
- `src/main-stable.js`: Kuratierte Vorschau in Cluster-Bändern (`Weitere Szenarien anzeigen`) als fester Stable-Standard übernommen; Test-Panel-Logik bleibt unverändert in Test.

## [0.4.44] - 2026-02-28

### Changed

- `src/main-test.js`: Test-Einstiegsvorauswahl für `Innovation & Interaktion` auf `D – Merge von A und C` (`concept-d`) gesetzt, damit Test-Entry und Stable-Preset übereinstimmen.
- `src/main-stable.js`: Innovationsmodus im Stable-Code auf das gewählte Preset (`concept-d`) fest verdrahtet und die dafür obsolet gewordene `innovationPanel`-State-Referenz entfernt.

## [0.4.43] - 2026-02-28

### Added

- `src/main-test.js`: Innovationsoption `D – Merge von A und C` ergänzt (Cluster-Überblick plus Kontinuitäts-Resortierung).

### Changed

- `src/main-test.js`: D so umgesetzt, dass Cluster (`Klares Scheitern`, `Knappes Rennen`, `Klare Mehrheit` etc.) erhalten bleiben und Karten bei Perspektivwechseln sichtbar reorganisieren.
- `src/main-test.js`: Bei Wechsel der Szenariozahl (`100` ↔ `1000`) in D werden zusätzliche Szenarien sichtbar in die Darstellung eingeblendet statt nur hart neu gezeichnet.
- `src/main-test.js`: Cluster-Rendering von reinem Rebuild auf persistente, key-basierte Joins erweitert, um kontinuierliche Übergänge zu ermöglichen.
- `index-test.html`: Innovationspanel-Text auf `Standard, A, B, C und D` aktualisiert.

## [0.4.41] - 2026-02-28

### Changed

- `src/main-test.js`: In `Innovation & Interaktion` Variante `C – Cluster-Überblick` den zusätzlichen Summary-Satz entfernt, damit die Variante ausschließlich Interaktions- und Strukturverhalten ändert und keine Textänderung auslöst.

## [0.4.40] - 2026-02-28

### Added

- `src/main-test.js`: Neues Innovationsmuster `C – Cluster-Überblick` im Testpanel `Innovation & Interaktion` ergänzt.

### Changed

- `src/main-test.js`: Für Variante C ein clusterbasiertes Explorationsmodell umgesetzt: Kategorien als eigene Blöcke mit `X von Y`-Einordnung, Verteilungsindikator und kuratierter Vorschau (`8` Karten) mit Inline-Aufklappen über `Weitere Szenarien anzeigen`.
- `src/main-test.js`: Summary-Hinweis ergänzt, dass zunächst kuratierte Ausschnitte gezeigt werden und alle Szenarien per Interaktion erreichbar bleiben.
- `index-test.html`: Styles für die neue Cluster-Darstellung ergänzt; bestehende Testpanel-Beschreibung auf `Standard, A, B und C` aktualisiert.

## [0.4.39] - 2026-02-28

### Changed

- `src/main-stable-v2.js`, `src/main-stable-v3.js`: `Wer führt?` – Sortierung in `Sonstige` auf aufsteigenden Abstand zur Führung umgestellt (von knapp zu deutlich) und Kartenwortlaut für diese Gruppe auf `x Prozentpunkte Abstand zur Führung` geändert.
- `src/main-stable-v2.js`, `src/main-stable-v3.js`: `Welche Mehrheiten?` – Sortierung in `Klare Mehrheit` und `Knappe Mehrheit` auf größten Sitzüberschuss zuerst umgestellt; `Sonstige` bleibt von knapp unter Mehrheit zu deutlich darunter sortiert.
- `src/main-stable-v2.js`, `src/main-stable-v3.js`: Grammatik in Mehrheitskarten korrigiert (`1 Sitz` statt `1 Sitze`).

## [0.4.38] - 2026-02-28

### Changed

- `src/main-test.js`: `Wer führt?` – Sortierung in `Sonstige` auf aufsteigenden Abstand zur Führung umgestellt (von knapp zu deutlich) und Kartenwortlaut für diese Gruppe auf `x Prozentpunkte Abstand zur Führung` geändert.
- `src/main-test.js`: `Welche Mehrheiten?` – Sortierung in `Klare Mehrheit` und `Knappe Mehrheit` auf größten Sitzüberschuss zuerst umgestellt; `Sonstige` bleibt von knapp unter Mehrheit zu deutlich darunter sortiert.
- `src/main-test.js`: Grammatik in Mehrheitskarten korrigiert (`1 Sitz` statt `1 Sitze`).

## [0.4.37] - 2026-02-28

### Changed

- `src/main-test.js`: In `Innovation & Interaktion` Variante `B – Kapitel-Scroll-Fokus` startet die Ansicht ohne initiale Kapitel-Dimmung; die Hervorhebung (`chapter-active`/`chapter-passive`) greift erst nach dem ersten echten Scroll-Event.
- `src/main-test.js`: Zusätzlicher Summary-Satz für Variante B entfernt, damit die Variantenwahl keine Textänderung im Summary auslöst.

## [0.4.36] - 2026-02-28

### Changed

- `src/main-stable-v2.js`, `src/main-stable-v3.js`: Szenario-Kartentexte in `Wer führt?` auf kurze Form ohne Parteinamen umgestellt (`+x Prozentpunkte Vorsprung`).
- `src/main-stable-v2.js`, `src/main-stable-v3.js`: Szenario-Kartentexte in `Wer riskiert 5%?` auf klare Distanzform zur Hürde ohne Parteinamen umgestellt (`x Prozentpunkte unterhalb/oberhalb 5%-Hürde`).
- `src/main-stable-v2.js`, `src/main-stable-v3.js`: Szenario-Kartentexte in `Welche Mehrheiten?` auf Sitzabstand zur absoluten Mehrheit umgestellt (`x Sitze über/unter der absoluten Mehrheit`).
- `src/main-stable-v2.js`, `src/main-stable-v3.js`: Bandgruppierung für `Wer riskiert 5%?` redaktionell kategorisiert (`Klares Scheitern`, `Knappes Rennen`, `Sonstige`).
- `src/main-stable-v2.js`, `src/main-stable-v3.js`: Bandgruppierung für `Welche Mehrheiten?` redaktionell kategorisiert (`Klare Mehrheit`, `Knappe Mehrheit`, `Sonstige`).
- `src/main-stable-v2.js`, `src/main-stable-v3.js`: `buildGroupedBands` erweitert, sodass pro View eine explizite Band-Reihenfolge (`customBandOrder`) genutzt werden kann.

## [0.4.35] - 2026-02-28

### Changed

- `src/main-test.js`: Szenario-Kartentexte in `Wer führt?` auf kurze Form ohne Parteinamen umgestellt (`+x Prozentpunkte Vorsprung`).
- `src/main-test.js`: Szenario-Kartentexte in `Wer riskiert 5%?` auf klare Distanzform zur Hürde ohne Parteinamen umgestellt (`x Prozentpunkte unterhalb/oberhalb 5%-Hürde`).
- `src/main-test.js`: Szenario-Kartentexte in `Welche Mehrheiten?` auf Sitzabstand zur absoluten Mehrheit umgestellt (`x Sitze über/unter der absoluten Mehrheit`).
- `src/main-test.js`: Bandgruppierung für `Wer riskiert 5%?` redaktionell kategorisiert (`Klares Scheitern`, `Knappes Rennen`, `Sonstige`) statt generischem Fokuslabel.
- `src/main-test.js`: Bandgruppierung für `Welche Mehrheiten?` redaktionell kategorisiert (`Klare Mehrheit`, `Knappe Mehrheit`, `Sonstige`) statt generischem Fokuslabel.
- `src/main-test.js`: `buildGroupedBands` erweitert, sodass pro View eine explizite Band-Reihenfolge (`customBandOrder`) genutzt werden kann.

## [0.4.34] - 2026-02-28

### Fixed

- `src/main-test.js`, `src/main-stable.js`, `src/main-stable-v2.js`, `src/main-stable-v3.js`: Korrektur der Stimmenrekonstruktion aus Referenzszenarien für Parteien ohne Sitze (insb. FDP/BSW) in der 5%-Hürden-Perspektive.
- Unter-5%-Parteien werden für die Stimmenanzeige nicht mehr pauschal als `0%` dargestellt, sondern deterministisch aus den vorhandenen CI-Grenzen (`ci_lower`/`ci_upper`) der autoritativen Datengrundlage abgeleitet.
- Sitzverteilung, Mehrheitslogik und Koalitionsberechnungen bleiben unverändert auf Basis der Referenzsitze.

## [0.4.33] - 2026-02-28

### Fixed

- `src/main-stable-v2.js`: Inhalt auf den Stable-Stand aus Commit `e500d39` (`Version 2.1.1 - Verständnis & Korrektheit, Style Transfer, inkl. Nachjustierung`) korrigiert.
- `index-stable-v2.html`: Inhalt auf denselben Commit-Stand korrigiert und Script-Referenz auf `./src/main-stable-v2.js` gesetzt, damit die v2-Version eigenständig lauffähig bleibt.

## [0.4.32] - 2026-02-28

### Added

- `index-test.html`: Neues separates Innovations-Testpanel innerhalb des Test-Variantensystems ergänzt (`Innovations-Testpanel`) mit eigener Ausgabezone `#innovation-variant-group`.
- `src/main-test.js`: Neue Innovations-Variantengruppe `Innovation & Interaktion` mit den Optionen `Standard`, `A – Kontinuitäts-Resortierung` und `B – Kapitel-Scroll-Fokus` ergänzt.

### Changed

- `src/main-test.js`: Konzept A umgesetzt: bandbasierte Szenario-Karten ordnen sich bei Perspektivwechseln mit weicher Positions-Transition neu; Fokus- und Restgruppen werden kontextuell abgestuft dargestellt.
- `src/main-test.js`: Konzept B umgesetzt: scrollbasierte Kapitel-Betonung für Bandgruppen ergänzt (aktive Gruppe hervorgehoben, übrige Gruppen gedimmt).
- `src/main-test.js`: Summary-Feedback ergänzt, damit aktive Innovationslogik in verständlicher, journalistischer Sprache sichtbar ist.
- `index-test.html`: Styles für beide Innovationsmodi ergänzt (sanfte Fokusabstufung und Kapitel-Scroll-Hervorhebung), ohne Änderungen an Stable-Dateien.

## [0.4.31] - 2026-02-28

### Added

- `index-stable-v3.html` als neue archivierte Stable-Version aus dem aktuellen Stand von `index-stable.html` erstellt.
- `src/main-stable-v3.js` als zugehörige archivierte Logikdatei aus dem aktuellen Stand von `src/main-stable.js` erstellt.

### Changed

- `index-stable-v3.html`: Script-Referenz auf `./src/main-stable-v3.js` umgestellt, damit die Version `v3` eigenständig und separat deploybar bleibt.

## [0.4.30] - 2026-02-28

### Changed

- `src/main-stable.js`: Stable auf die ausgewählte Konfiguration festgesetzt (`entryNarrative: leadership-tension`, `editorialLanguage: journalistic-flow`) und die zugehörigen Test-Logikpfade für Header, Task-Navigation, Summary-Badge, alternative Fokussteuerung und C-spezifische Führungsreihenfolge ohne Variant-UI übernommen.
- `index-stable.html`: Für den festen Flow-Modus nur die benötigte Darstellungsstruktur ergänzt (Eyebrow, Summary-Badge, Inline-Task-Container `#task-nav-inline`, zugehörige Styles), ohne Test-Panel oder Variantenauswahl.
- `src/main-test.js`: Entry-Defaults auf dieselbe Zielkonfiguration vorselektiert (`leadership-tension` + `journalistic-flow`), bei vollständig erhaltenem Variantensystem.

## [0.4.29] - 2026-02-28

### Added

- `index-stable-v2.html` und `src/main-stable-v2.js` als neue archivierte Stable-Version (`v2`) aus dem aktuellen Stand von `index-stable.html` und `src/main-stable.js` angelegt (ohne Überschreiben bestehender Versionen).

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
