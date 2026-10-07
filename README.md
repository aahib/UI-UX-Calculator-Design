# Figma Calculator — VS Code Prototype

This project generates a provided Figma calculator as a functional web prototype.

## Files

- `index.html` — calculator structure
- `style.css` — Figma-matched sizing, spacing, colors, and left/right handed layout
- `script.js` — calculator functionality and handedness toggle
- `app.py` — optional Python/Flask local server
- `requirements.txt` — Flask dependency

## Run in VS Code

### Option 1 — easiest
Open `index.html` directly in a browser, or use the VS Code Live Server extension.

### Option 2 — Python/Flask
Open the VS Code terminal in this folder:

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

Install Flask:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
python app.py
```

Then open:

http://127.0.0.1:5000

## Toggle behavior

- OFF: right-handed layout, with operators on the right.
- ON: toggle becomes `#ED8114` and the keypad mirrors horizontally.
- The calculator panel stays in the same position.
- The toggle itself stays in the same top-right position; only the keypad layout changes.
- The label changes from `Left-handed` to `Right-handed` to match the current action/state shown in the supplied design.

## Design dimensions

The main calculator panel is set to approximately:

- Width: `380px`
- Height: `620px`

The CSS is based on the supplied 807 × 658 Figma reference image.
