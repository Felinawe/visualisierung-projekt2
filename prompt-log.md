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

**Append Anchor:** Do not remove this line. New entries are inserted above it.
