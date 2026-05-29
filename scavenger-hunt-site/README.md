# Remedy Engineering — Calgary Scavenger Hunt

A branded, team-based scavenger hunt for the Calgary office. Players scan a QR code for their team, pick clues in any order, solve a puzzle, walk to the Calgary location it reveals, and upload a team photo.

## File layout

```
scavenger-hunt/
├── index.html              # Landing page — team picker
├── team-compass.html       # Team page (orange)
├── team-blueprint.html     # Team page (blue)
├── team-foundation.html    # Team page (olive)
├── team-toolkit.html       # Team page (red)
├── clue-01.html … clue-30.html  # 30 clues
├── styles.css              # Remedy-branded styling
├── script.js               # Teams + clues data, shared logic
└── assets/
    ├── remedy-logo.png     # Full color
    └── remedy-r.png        # R only (used as favicon)
```

## How teams work

There is one URL per team — each team should be given a QR code pointing at their own team page:

| Team | URL | Color |
|------|-----|-------|
| Compass | `/team-compass.html` | Orange |
| Blueprint | `/team-blueprint.html` | Blue |
| Foundation | `/team-foundation.html` | Olive Green |
| Toolkit | `/team-toolkit.html` | Red |

When someone visits a team URL, that page **saves their team identity in their browser**. From then on, every clue page shows their team in the top bar. Progress and photo uploads are stored per-team — so if multiple devices on the same team visit the same URL, each device tracks its own copy.

The main `index.html` page has a team picker too, in case someone lands there directly.

**Want different team names?** Edit the `TEAMS` block at the top of `script.js`. Then for each new team, create a copy of any `team-*.html` file (just change the team id in the inline script).

## Functioning demo puzzles

These 8 are fully playable in the demo:

| # | Clue | Type | Answer / Location |
|---|------|------|--------------------|
| 1 | The Whispering Span | Text Riddle | **Peace Bridge** |
| 2 | Five-Letter Skyline | Wordle | **TOWER** → Calgary Tower (view of) |
| 3 | Find the Threads | Connections (4×4 groups) | reveals **Riley Park** |
| 4 | Letters in Chaos | Word Scramble | **KENSINGTON** |
| 5 | Caesar's Secret | Caesar Cipher (rotate-to-decode) | **SUNNYSIDE STATION** |
| 6 | Speak in Symbols | Emoji Puzzle | **Prince's Island** |
| 7 | The Riverside Mystery | Anagram | **McHugh House** |

The remaining 22 clues are styled placeholders pointing to real Kensington-area locations (Pages Books, Higher Ground, Hayden Block, Vendome, Pulcinella, Memorial Drive, Crescent Heights, Devonian Gardens, etc.). They show the puzzle type and a "I solved it" button so the hunt remains usable end-to-end.

## Photo uploads

Each clue page has a photo upload area that becomes visible once the puzzle is solved (or, for stubs, immediately). Photos are saved in browser localStorage on the device that uploaded them. **The host should view photos at the finish line on the team's main device.**

Storage limit: ~5 MB per domain in most browsers, so very large photos may not save. The site already compresses preview rendering but doesn't resize the underlying file. If photos are missing, the team probably tried to upload too many full-size images on one device.

## Deploy to Netlify

1. Open [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `scavenger-hunt` folder onto the page (or use the bundled zip)
3. Once deployed, rename the site to something memorable
4. Make 4 QR codes — one per team URL — and print one per team

## Generating QR codes

Any free QR generator works (qr-code-generator.com, qrcode-monkey.com). Make 4:
- `https://your-site.netlify.app/team-compass.html`
- `https://your-site.netlify.app/team-blueprint.html`
- `https://your-site.netlify.app/team-foundation.html`
- `https://your-site.netlify.app/team-toolkit.html`

You can also make a 5th QR code for `/index.html` and post it at the start so anyone who's confused can pick their team manually.

## Customising

- **Change team names or colors** → edit `TEAMS` in `script.js` and rename the `team-*.html` files to match.
- **Change clue titles, answers, or locations** → edit the `CLUES` array at the top of `script.js` AND the corresponding `clue-XX.html` page (for the answer & location).
- **Build a real puzzle for one of the stub clues** → replace the inline puzzle body inside that `clue-XX.html`. The shared scaffolding (photo upload, solve button, team header) keeps working automatically.
- **Brand colors** → CSS variables at the top of `styles.css` (charcoal, orange, olive).
