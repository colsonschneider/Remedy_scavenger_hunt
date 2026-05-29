# Remedy Engineering — Calgary Scavenger Hunt

A mobile-first, real-time scavenger hunt for the Remedy office at 919 11 Ave SW. One URL, 6 password-gated teams, 17 fully-playable clues.

## File layout

```
scavenger-hunt/
├── index.html                       # Landing — team picker (or clue list once signed in)
├── clue-01.html … clue-17.html      # 17 clues, each a full playable game
├── styles.css                       # Mobile-first Remedy-branded design
├── script.js                        # Teams, clues data, auth, sync, modals
├── package.json                     # Dependency for the Netlify Function
├── netlify.toml                     # Where the functions live
├── netlify/functions/progress.mjs   # Cross-device progress sync
├── assets/
│   ├── remedy-logo.png
│   └── remedy-r.png
└── README.md
```

## Teams

| Team | Emoji | Color | Theme |
|------|-------|-------|-------|
| Boilers | 🔥 | Orange | Hot under pressure |
| Chillers | ❄️ | Blue | Cool under pressure |
| Compressors | 💨 | Purple | Power through pressure |
| Pumps | 💧 | Teal | Keep the flow moving |
| Ductworks | 🌬️ | Olive | Smooth airflow |
| Fans | 🌀 | Red | Spin up the answers |

Set team passwords in the `TEAMS` block of `script.js`. Empty string = no password (handy for testing).

## The 17 clues

| # | Clue | Game | Answer / Spot |
|---|------|------|----------------|
| 1 | The Skyline Sentinel | Wordle | TOWER → Calgary Tower |
| 2 | Pedestrian Promenade | Word Scramble | STEPHEN AVE |
| 3 | Indoor Jungle | Anagram | DEVONIAN → Devonian Gardens |
| 4 | Curious Giant | Emoji Puzzle | WONDERLAND |
| 5 | Five-Ring Ground | Multiple-choice Trivia | 1988 → Olympic Plaza |
| 6 | Cloud Cutter | Word Scramble | TELUS SKY |
| 7 | The Whispering Span | Rhyming Riddle | Peace Bridge |
| 8 | Caesar's Island | Caesar Cipher | Princess Island |
| 9 | Two Words in French | Translation puzzle | Eau Claire |
| 10 | Find the Threads | Connections (4×4 groups) | reveals China Town |
| 11 | Gallows Walls | Hangman | FORT CALGARY |
| 12 | Stacked Stories | Acrostic (7 mini-clues) | LIBRARY |
| 13 | Home of the Flames | Rhyming Riddle | Saddledome |
| 14 | Where We Came From | Math Puzzle | Old Remedy Office (host-configurable) |
| 15 | Smile! Snap! Send! | Photo Challenge | Photo with BEN |
| 16 | Where Was the Party? | Insider trivia | Christmas party venue (host-configurable) |
| 17 | Up the Wall | Rebus | MEC Climbing Wall |

**All 17 are playable end-to-end.** Two of them (Old Office address, Christmas party venue) accept any answer by default — edit the `ACCEPTED` block in `working/generate_clue_pages.py` and re-generate, OR just edit those two clue HTML files directly to enforce a specific answer.

## What's new in this version

- **17 clues** matching the host's location list (Calgary Tower, Stephen Ave, Devonian Gardens, Wonderland, Olympic Plaza, Telus Sky, Peace Bridge, Princess Island, Eau Claire, China Town, Fort Calgary, Public Library, Saddledome, Old Remedy Office, Photo with BEN, Christmas party, MEC Climbing).
- **Every clue is a playable game** — no stubs.
- **Smaller cards** — 3–6 per row depending on screen width.
- **Compact hero** on the hunt view so more clues are visible.
- **? button in the top bar** opens rules + tips as a slide-up modal.
- **Tap your team tag** in the top bar to see the full team list with yours highlighted, plus a Switch button.
- **Animations**: staggered fade-in for cards, pulsing glow on the next unsolved clue, bobbing team emoji, confetti burst when marking a solve.
- **Renamed**: Manifolds → **Fans**.

## How teams work

One URL. Everyone scans the same QR code. They pick their team and enter the team password. From then on, the team identity sticks to their device, and any solve they mark shows up on every teammate's phone within ~8 seconds (via Netlify Function + Blobs).

## Deploy to Netlify (GitHub-connected)

Same as before — push the new files to your existing GitHub repo, Netlify auto-deploys. Step-by-step:

1. Open your repo on GitHub
2. Delete the old `clue-18.html` … `clue-30.html` files (we're down to 17 now). Tap each, hit the trash icon, commit.
3. Click **Add file → Upload files**. Drag everything from this zip into the upload area (the new `clue-01.html`–`clue-17.html`, `index.html`, `styles.css`, `script.js`, and the `assets/` + `netlify/` folders).
4. Commit. Netlify rebuilds within ~30 seconds.

## Customizing

- **Team passwords** → `TEAMS` block in `script.js`
- **Team names / colors** → same block
- **Old Remedy Office address (clue 14)** → open `clue-14.html`, find `const ANSWER` and `const ACCEPT`, and set the actual address
- **Christmas party venue (clue 16)** → same approach in `clue-16.html`
- **Wonder which emoji clue gave you grief?** → search `clue-XX.html` for the puzzle body and tweak directly
