---
name: Versionierung
description: Versioned backup of stable files
---

Create a versioned backup of the current index-stable.html and main-stable.js files.

Procedure:

- Save the current index-stable.html as index-stable-vX.html.
- Save the current main-stable.js as main-stable-vX.js.
- Automatically increment X sequentially (v1, v2, v3, …).
- Never overwrite existing versioned files.
- The most recent stable version must always remain available under index-stable.html and main-stable.js.

Goal:
Each manually triggered archive should be stored as its own incrementally numbered stable version so that it can later be deployed separately via GitHub Pages. Before saving, check the highest existing version number and increment it accordingly.
