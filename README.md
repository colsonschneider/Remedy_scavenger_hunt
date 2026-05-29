# Remedy Engineering — Calgary Scavenger Hunt

A mobile-first scavenger hunt for the Remedy office at 919 11 Ave SW (Beltline). One URL, six password-gated teams, 30 clues, real-time progress sync across team devices.

## File layout

```
scavenger-hunt/
├── index.html                       # Landing — team picker (or clue list once signed in)
├── clue-01.html … clue-30.html      # 30 clues
├── styles.css                       # Mobile-first Remedy-branded design
├── script.js                        # All teams, clues, auth, sync logic
├── package.json                     # Dependency for the Netlify Function
├── netlify.toml                     # Tells Netlify where the functions live
├── netlify/
│   └── functions/
│       └── progress.mjs             # Cross-device progress sync
├── assets/
│   ├── remedy-logo.png
│   └── remedy-r.png
└── README.md
```

## How teams work

There's **one shared URL** for everyone. When a teammate opens it, they:
1. Pick their team (one of six)
2. Enter the team's password
3. Land on their team's clue board

All devices on the same team see the **same progress in real time** — when one teammate marks a clue solved, every other teammate's clue board updates within ~8 seconds.

Team identity persists on the device, so a teammate doesn't re-enter the password unless they tap the **Switch** button in the corner.

## Teams

| Team | Emoji | Color | Theme |
|------|-------|-------|-------|
| Boilers | 🔥 | Orange | Hot under pressure |
| Chillers | ❄️ | Blue | Cool under pressure |
| Compressors | 💨 | Purple | Power through pressure |
| Pumps | 💧 | Teal | Keep the flow moving |
| Ductworks | 🌬️ | Olive | Smooth airflow |
| Manifolds | ⚙️ | Red | Many paths, one answer |

## Setting team passwords

Open `script.js` and look for the `TEAMS` block near the top:

```js
const TEAMS = {
  boilers: { name: "Boilers", ..., password: "" },     // ← set passwords here
  chillers: { name: "Chillers", ..., password: "" },
  ...
};
```

- Empty string `""` = no password needed (handy for testing)
- Any other string = teammates must enter that exact string

These are stored client-side, so they're not secret-grade — fine for a casual office event, not for protecting real data.

## Functioning demo puzzles

These 8 clues are fully playable in the demo:

| # | Clue | Type | Answer / Location |
|---|------|------|--------------------|
| 1 | The Twin-Block Park | Text Riddle | **Tomkins Park** |
| 2 | Five-Letter Foothold | Wordle | **PARKS** → Central Memorial Park |
| 3 | Find the Threads | Connections | reveals **Lougheed House** |
| 4 | Letters in Chaos | Word Scramble | **BELTLINE** |
| 5 | Caesar's Secret | Caesar Cipher | **SHELDON CHUMIR** |
| 6 | Speak in Symbols | Emoji Puzzle | **MEC** |
| 7 | Vault & Arsenal | Anagram | **Mewata Armoury** |

The other 22 clues are styled placeholders pointing at real Beltline-area spots (Studio Bell, Stephen Avenue, Calgary Tower, Phil & Sebastian, National on 17th, Last Best Brewing, Native Tongues, Major Tom, Diner Deluxe, etc.) so the hunt remains usable end-to-end. The host can build out the actual puzzle logic for any of these later.

## Deploy to Netlify

This site needs Netlify (or equivalent) because of the Function for progress sync. Drag-and-drop a zip will not enable Functions — you need a git-connected deploy OR the Netlify CLI.

**Easiest path: connect a GitHub repo.**

1. Push this folder to a GitHub repo
2. In Netlify → Add new site → Import from Git → select the repo
3. Build settings are read from `netlify.toml` (`publish = "."`, `functions = "netlify/functions"`)
4. Netlify installs the dependency in `package.json` (`@netlify/blobs`) automatically
5. Deploy. Test by visiting `https://your-site.netlify.app/.netlify/functions/progress?team=boilers` — you should see `{"solved":[],"v":0}` (or similar). If you see that, sync is working.

**If sync isn't working** (clues solve locally but other devices don't see them):

- Check Netlify → Functions tab — `progress` should appear there with a green status
- If it's missing or red, check the deploy log for errors during `npm install`
- If you want to skip sync entirely (single-device mode), delete the `netlify/`, `package.json`, and `netlify.toml` files. The site still works; team progress just won't sync across devices.

## Customising

- **Change team names / colors / passwords** → edit `TEAMS` in `script.js`
- **Change clue titles, answers, locations** → edit the `CLUES` array in `script.js` AND the corresponding `clue-XX.html` for the answer & location
- **Build a real puzzle for one of the stub clues** → replace the `<div class="puzzle-box">…</div>` block in that `clue-XX.html`. The shared back link, solve button, and sync hooks keep working automatically
- **Brand colors** → CSS variables at the top of `styles.css`
- **Add / remove teams** → just edit the `TEAMS` object; the team picker generates from it

## Notes

- Progress is stored under `Netlify Blobs` keyed by team id. There's no auth on the API — anyone who knows a team id can read or post that team's state. This is fine for a one-day office event.
- Photo uploads were removed in this version (they'd require photo storage + sharing infrastructure beyond Blobs).
- The Netlify free tier covers ~125K function invocations per month, more than enough for a 6-team office hunt that polls every 8 seconds.
