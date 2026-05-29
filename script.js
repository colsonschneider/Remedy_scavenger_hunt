// ============================================================
// REMEDY ENGINEERING — Scavenger Hunt
// Mobile-first, single-page entry with password gating
// ============================================================

// -------- TEAMS --------
// Edit the password field for each team before the event.
// Leave password blank ("") to skip auth (handy while testing).
const TEAMS = {
  boilers: {
    name: "Boilers",
    emoji: "🔥",
    color: "#F26921",
    tagline: "Hot under pressure.",
    password: "",
  },
  chillers: {
    name: "Chillers",
    emoji: "❄️",
    color: "#3aa1d5",
    tagline: "Cool under pressure.",
    password: "",
  },
  compressors: {
    name: "Compressors",
    emoji: "💨",
    color: "#8a6dd5",
    tagline: "Power through pressure.",
    password: "",
  },
  pumps: {
    name: "Pumps",
    emoji: "💧",
    color: "#21A8B5",
    tagline: "Keep the flow moving.",
    password: "",
  },
  ductworks: {
    name: "Ductworks",
    emoji: "🌬️",
    color: "#A4B54B",
    tagline: "Smooth airflow, smooth solving.",
    password: "",
  },
  manifolds: {
    name: "Manifolds",
    emoji: "⚙️",
    color: "#c0392b",
    tagline: "Many paths, one answer.",
    password: "",
  },
};

// -------- CLUES (Beltline-centric, 919 11 Ave SW) --------
const CLUES = [
  { n: 1,  title: "The Twin-Block Park",        type: "Text Riddle",          cat: "word",   icon: "🗝️", location: "Tomkins Park (8 St & 17 Ave SW)",   answer: "Tomkins Park",        func: true,
    hint: "A short rhyming riddle about a nearby park." },
  { n: 2,  title: "Five-Letter Foothold",       type: "Wordle Game",          cat: "word",   icon: "🔠", location: "Central Memorial Park",              answer: "PARKS",                func: true,
    hint: "Guess the 5-letter word with unlimited tries." },
  { n: 3,  title: "Find the Threads",           type: "Connections",          cat: "logic",  icon: "🧩", location: "Lougheed House",                     answer: "Lougheed House",       func: true,
    hint: "Group 16 Calgary things into 4 hidden categories." },
  { n: 4,  title: "Letters in Chaos",           type: "Word Scramble",        cat: "word",   icon: "🔤", location: "Beltline neighbourhood sign",        answer: "BELTLINE",             func: true,
    hint: "Rearrange the letters to spell your own neighbourhood." },
  { n: 5,  title: "Caesar's Secret",            type: "Cipher Decoder",       cat: "code",   icon: "🏛️", location: "Sheldon M. Chumir Health Centre",   answer: "SHELDON CHUMIR",       func: true,
    hint: "Decode the Caesar cipher to reveal a building." },
  { n: 6,  title: "Speak in Symbols",           type: "Emoji Puzzle",         cat: "visual", icon: "🤔", location: "Mountain Equipment Co-op (MEC)",    answer: "MEC",                  func: true,
    hint: "Decode the emoji clue." },
  { n: 7,  title: "Vault & Arsenal",            type: "Anagram",              cat: "word",   icon: "🔄", location: "Mewata Armoury",                     answer: "Mewata Armoury",       func: true,
    hint: "Rearrange the letters to reveal a heritage military building." },
  { n: 8,  title: "Twin Tiles",                 type: "Memory Match",         cat: "action", icon: "🃏", location: "Connaught Park",                     answer: "Connaught",            func: false,
    hint: "Flip pairs to reveal the answer." },
  { n: 9,  title: "Hidden in Plain Sight",      type: "Visual Riddle",        cat: "visual", icon: "🔍", location: "Wonderland (giant head, The Bow)",  answer: "Wonderland",           func: false,
    hint: "Find a hidden word in the image." },
  { n: 10, title: "Who Did What?",              type: "Logic Puzzle",         cat: "logic",  icon: "🕵️", location: "Olympic Plaza",                     answer: "Olympic Plaza",        func: false,
    hint: "Deduce the answer from the clues." },
  { n: 11, title: "Roast & Bean",               type: "Anagram",              cat: "word",   icon: "🔄", location: "Phil & Sebastian (Beltline)",       answer: "Phil and Sebastian",   func: false,
    hint: "Unscramble to find a popular roastery." },
  { n: 12, title: "Calculate to Conquer",       type: "Math Puzzle",          cat: "logic",  icon: "🧮", location: "919 11 Ave SW (the office!)",       answer: "919",                  func: false,
    hint: "Solve to reveal a familiar address number." },
  { n: 13, title: "What Comes Next?",           type: "Pattern Sequence",     cat: "logic",  icon: "🌀", location: "National on 17th",                  answer: "National",             func: false,
    hint: "Continue the pattern." },
  { n: 14, title: "Gallows Words",              type: "Hangman",              cat: "word",   icon: "🎯", location: "Last Best Brewing",                 answer: "Last Best",            func: false,
    hint: "Guess letter by letter." },
  { n: 15, title: "Picture This",               type: "Rebus Puzzle",         cat: "visual", icon: "🎨", location: "Cassis Bistro",                     answer: "Cassis",               func: false,
    hint: "A picture-word puzzle." },
  { n: 16, title: "Dots and Dashes",            type: "Morse Code",           cat: "code",   icon: "📡", location: "Studio Bell (National Music Centre)", answer: "Studio Bell",        func: false,
    hint: "Decode the Morse." },
  { n: 17, title: "Slide to Solve",             type: "Sliding Puzzle",       cat: "action", icon: "🔢", location: "Stephen Avenue",                    answer: "Stephen Avenue",       func: false,
    hint: "Slide the tiles into order." },
  { n: 18, title: "Tiny Crossword",             type: "Mini Crossword",       cat: "word",   icon: "📋", location: "Native Tongues",                    answer: "Native Tongues",       func: false,
    hint: "A mini crossword." },
  { n: 19, title: "Spot the Change",            type: "Spot the Difference",  cat: "visual", icon: "👀", location: "Anejo Restaurant",                  answer: "Anejo",                func: false,
    hint: "Find the 5 differences." },
  { n: 20, title: "Through the Maze",           type: "Maze",                 cat: "action", icon: "🌀", location: "Beaulieu Gardens (Lougheed House)", answer: "Beaulieu",             func: false,
    hint: "Navigate to the centre." },
  { n: 21, title: "Buzzer Beater",              type: "Speed Trivia",         cat: "action", icon: "⚡", location: "Wurst (German beer hall)",          answer: "Wurst",                func: false,
    hint: "Beat the clock." },
  { n: 22, title: "Twist Your Tongue",          type: "Tongue Twister",       cat: "action", icon: "👅", location: "Bankers Hall",                       answer: "Bankers Hall",         func: false,
    hint: "Say it three times fast." },
  { n: 23, title: "Quote Mosaic",               type: "Quote Unscramble",     cat: "word",   icon: "💬", location: "Calgary Tower",                      answer: "Calgary Tower",        func: false,
    hint: "Put the words in order." },
  { n: 24, title: "Color Echo",                 type: "Simon Says",           cat: "action", icon: "🎨", location: "Devonian Gardens (inside Core)",    answer: "Devonian",             func: false,
    hint: "Repeat the color sequence." },
  { n: 25, title: "Mind the Sequence",          type: "Number Sequence",      cat: "logic",  icon: "🔢", location: "Monogram Coffee",                    answer: "Monogram",             func: false,
    hint: "Find the missing number." },
  { n: 26, title: "Linked Minds",               type: "Word Association",     cat: "word",   icon: "🔗", location: "Cibo",                                answer: "Cibo",                  func: false,
    hint: "One word ties them together." },
  { n: 27, title: "Mirror, Mirror",             type: "Reverse Text",         cat: "code",   icon: "🪞", location: "Holy Trinity Lutheran Church",       answer: "Holy Trinity",         func: false,
    hint: "Read it backwards." },
  { n: 28, title: "Knock Knock",                type: "Wordplay Riddle",      cat: "word",   icon: "🚪", location: "Major Tom (rooftop bar)",            answer: "Major Tom",             func: false,
    hint: "A pun-filled riddle." },
  { n: 29, title: "Vertical Secrets",           type: "Acrostic",             cat: "code",   icon: "📜", location: "Diner Deluxe",                       answer: "Diner Deluxe",         func: false,
    hint: "First letters spell the answer." },
  { n: 30, title: "The Final Treasure",         type: "Master Puzzle",        cat: "logic",  icon: "💎", location: "Back at the Remedy office (919 11 Ave SW)", answer: "Remedy",        func: false,
    hint: "Combine your finds to unlock the grand prize." },
];

const CAT_COLORS = {
  word:   "#6dc4ff",
  logic:  "#c8a6ff",
  visual: "#F26921",
  code:   "#A4B54B",
  action: "#ff6b9a",
};

// ============================================================
// State — synced across team devices via Netlify Function
// (falls back to localStorage if the API is unreachable)
// ============================================================
const TEAM_KEY = "remedy-hunt-team";
const progressKey = (t) => `remedy-hunt-progress-${t || 'none'}`;
const API_URL = "/.netlify/functions/progress";
const POLL_MS = 8000;

function setTeam(id) { localStorage.setItem(TEAM_KEY, id); }
function clearTeam() { localStorage.removeItem(TEAM_KEY); }
function getTeam() { return localStorage.getItem(TEAM_KEY); }
function getTeamInfo() {
  const id = getTeam();
  return id && TEAMS[id] ? { id, ...TEAMS[id] } : null;
}

// In-memory cache of the most recent server state (for the current page)
let _cached = null;

function _localLoad() {
  try { return new Set(JSON.parse(localStorage.getItem(progressKey(getTeam()))) || []); }
  catch (e) { return new Set(); }
}
function _localSave(set) {
  localStorage.setItem(progressKey(getTeam()), JSON.stringify([...set]));
}

// Synchronous local-only load (used by initial render before sync completes)
function loadProgress() { return _localLoad(); }

// Save progress: write locally, push to server if available.
async function saveProgress(set) {
  _localSave(set);
  const team = getTeam();
  if (!team) return;
  try {
    const res = await fetch(`${API_URL}?team=${encodeURIComponent(team)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ solved: [...set] }),
    });
    if (res.ok) {
      const data = await res.json();
      _cached = data;
    }
  } catch (e) {
    // offline / no functions — fine, we'll catch up later
  }
}

// Fetch server state, merge with local cache. Returns Set.
async function fetchProgress() {
  const team = getTeam();
  if (!team) return new Set();
  try {
    const res = await fetch(`${API_URL}?team=${encodeURIComponent(team)}`, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    _cached = data;
    const set = new Set(data.solved || []);
    _localSave(set);
    return set;
  } catch (e) {
    return _localLoad();
  }
}

function authenticate(teamId, password) {
  const team = TEAMS[teamId];
  if (!team) return false;
  return (team.password || "") === (password || "");
}

// ============================================================
// Topbar
// ============================================================
function renderTopbar() {
  const bar = document.getElementById("topbar");
  if (!bar) return;
  const team = getTeamInfo();
  const right = team
    ? `<div style="display: flex; align-items: center; gap: 6px;">
         <span class="team-tag" style="--team-color: ${team.color};">
           <span class="swatch">${team.emoji}</span>
           <span>${team.name}</span>
         </span>
         <button class="switch-btn" id="switchTeam" type="button">Switch</button>
       </div>`
    : '';
  bar.innerHTML = `
    <a href="index.html" aria-label="Home">
      <img src="assets/remedy-logo.png" alt="Remedy Engineering" class="brand-logo" />
    </a>
    ${right}
  `;
  const sw = document.getElementById("switchTeam");
  if (sw) sw.addEventListener("click", () => {
    if (confirm("Switch teams? Your current team's progress stays saved on this device.")) {
      clearTeam();
      window.location.href = "index.html";
    }
  });
}

// ============================================================
// Team picker (landing page when no team set)
// ============================================================
function renderTeamPicker(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  Object.entries(TEAMS).forEach(([id, t]) => {
    const card = document.createElement("button");
    card.className = "team-card";
    card.type = "button";
    card.style.setProperty("--team-color", t.color);
    card.dataset.team = id;
    card.innerHTML = `
      <span class="icon">${t.emoji}</span>
      <span class="body">
        <p class="name">${t.name}</p>
        <p class="sub">${t.tagline}</p>
      </span>
      <span class="chev">›</span>
    `;
    card.addEventListener("click", () => openPasswordModal(id));
    el.appendChild(card);
  });
}

function openPasswordModal(teamId) {
  const t = TEAMS[teamId];
  if (!t) return;
  const modal = document.getElementById("authModal");
  modal.style.setProperty("--team-color", t.color);
  document.getElementById("modalIcon").textContent = t.emoji;
  document.getElementById("modalTitle").textContent = t.name;
  document.getElementById("modalSub").textContent = t.tagline;
  document.getElementById("authError").classList.remove("show");
  const input = document.getElementById("passwordInput");
  input.value = "";
  modal.classList.add("show");
  modal.dataset.team = teamId;
  if (!t.password) {
    document.getElementById("modalHint").textContent = "No password set — tap Enter to start.";
  } else {
    document.getElementById("modalHint").textContent = "Ask your host for the password.";
  }
  setTimeout(() => input.focus(), 100);
}
function closePasswordModal() {
  document.getElementById("authModal").classList.remove("show");
}
function submitPassword() {
  const modal = document.getElementById("authModal");
  const teamId = modal.dataset.team;
  const password = document.getElementById("passwordInput").value;
  if (authenticate(teamId, password)) {
    setTeam(teamId);
    window.location.reload();
  } else {
    const err = document.getElementById("authError");
    err.textContent = "Wrong password — try again.";
    err.classList.add("show");
  }
}

// ============================================================
// Clue grid (sorted: unsolved first, solved at bottom)
// ============================================================
function renderClueGrid() {
  const unsolvedGrid = document.getElementById("clueGridUnsolved");
  const solvedGrid = document.getElementById("clueGridSolved");
  const dividerEl = document.getElementById("solvedDivider");
  if (!unsolvedGrid) return;

  const solved = loadProgress();
  unsolvedGrid.innerHTML = "";
  solvedGrid.innerHTML = "";

  const unsolved = CLUES.filter(c => !solved.has(c.n));
  const done = CLUES.filter(c => solved.has(c.n));

  unsolved.forEach(c => unsolvedGrid.appendChild(makeClueCard(c, false)));
  done.forEach(c => solvedGrid.appendChild(makeClueCard(c, true)));

  document.getElementById("unsolvedCount").textContent = `${unsolved.length} remaining`;
  if (done.length > 0) {
    dividerEl.style.display = "flex";
    dividerEl.querySelector(".divider-text").textContent = `${done.length} solved`;
  } else {
    dividerEl.style.display = "none";
  }
  updateProgressBar(solved);
}
function makeClueCard(clue, isSolved) {
  const card = document.createElement("a");
  card.href = `clue-${String(clue.n).padStart(2, "0")}.html`;
  card.className = "clue-card" + (isSolved ? " solved" : "");
  card.style.setProperty("--card-color", CAT_COLORS[clue.cat]);
  card.innerHTML = `
    <div class="solved-badge" aria-hidden="true">✓</div>
    <div class="card-top">
      <div class="card-number">${String(clue.n).padStart(2, "0")}</div>
      <div class="card-icon">${clue.icon}</div>
    </div>
    <div class="card-bottom">
      <div class="card-type">${clue.type}</div>
      <h3 class="card-title">${clue.title}</h3>
    </div>
  `;
  return card;
}
function updateProgressBar(solved) {
  const total = CLUES.length;
  const count = (solved || loadProgress()).size;
  const fill = document.getElementById("progressFill");
  const label = document.getElementById("progressLabel");
  if (fill) fill.style.width = `${(count / total) * 100}%`;
  if (label) label.textContent = `${count} of ${total}`;
}

// ============================================================
// DOM init
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderTopbar();

  // Index page logic: show team picker OR clue list
  const authView = document.getElementById("authView");
  const huntView = document.getElementById("huntView");
  if (authView && huntView) {
    const team = getTeamInfo();
    if (team) {
      authView.style.display = "none";
      huntView.style.display = "block";
      // populate team header on hunt view
      const teamHeader = document.getElementById("teamWelcome");
      if (teamHeader) {
        teamHeader.style.setProperty("--team-color", team.color);
        teamHeader.innerHTML = `
          <span class="eyebrow" style="color: ${team.color}; border-color: ${team.color}66; background: ${team.color}1a;">
            <span class="dot" style="background: ${team.color};"></span>
            ${team.emoji} ${team.name}
          </span>
          <h1 class="title">Welcome,<br/><span class="accent" style="color: ${team.color};">${team.name}</span></h1>
          <p class="tagline">${team.tagline} <strong>Find each Calgary spot, snap a team photo, mark it done.</strong></p>
        `;
      }
      renderClueGrid();
      // Sync from server and poll for updates
      (async () => {
        await fetchProgress();
        renderClueGrid();
      })();
      setInterval(async () => {
        await fetchProgress();
        renderClueGrid();
      }, POLL_MS);
    } else {
      authView.style.display = "block";
      huntView.style.display = "none";
      renderTeamPicker("teamPicker");
      // Wire up modal buttons
      document.getElementById("modalCancel").addEventListener("click", closePasswordModal);
      document.getElementById("modalSubmit").addEventListener("click", submitPassword);
      document.getElementById("passwordInput").addEventListener("keydown", e => {
        if (e.key === "Enter") submitPassword();
      });
      document.getElementById("authModal").addEventListener("click", e => {
        if (e.target.id === "authModal") closePasswordModal();
      });
    }
  }
});

// Expose for clue pages
window.REMEDY = {
  TEAMS, CLUES, CAT_COLORS,
  getTeam, setTeam, clearTeam, getTeamInfo,
  loadProgress, saveProgress, fetchProgress,
  progressKey,
  renderTopbar,
};
