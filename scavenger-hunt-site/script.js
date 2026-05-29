// ============================================================
// REMEDY ENGINEERING — Calgary Scavenger Hunt
// ============================================================

// -------- TEAMS --------
// Each team has its own URL (file). Visiting that URL makes you part of that team.
// Add/remove teams here — the system adapts automatically.
const TEAMS = {
  compass: {
    name: "Team Compass",
    emoji: "🧭",
    color: "#F26921",
    tagline: "Find your way through every clue.",
    url: "team-compass.html",
  },
  blueprint: {
    name: "Team Blueprint",
    emoji: "📐",
    color: "#3a7bd5",
    tagline: "Plan the path. Solve the puzzle.",
    url: "team-blueprint.html",
  },
  foundation: {
    name: "Team Foundation",
    emoji: "🏗️",
    color: "#A4B54B",
    tagline: "Built strong. Set in stone.",
    url: "team-foundation.html",
  },
  toolkit: {
    name: "Team Toolkit",
    emoji: "🔧",
    color: "#c0392b",
    tagline: "Whatever it takes — we've got the tool.",
    url: "team-toolkit.html",
  },
};

// -------- CLUES --------
// `answer` is the canonical answer (used for matching; case/space insensitive).
// `location` is the Calgary spot the team should photograph.
// `func` flag = the puzzle is fully functional in this demo.
const CLUES = [
  { n: 1,  title: "The Whispering Span",     type: "Text Riddle",         cat: "word",   icon: "🗝️", location: "Peace Bridge",                       answer: "Peace Bridge",       func: true,
    hint: "A short rhyming riddle. The answer is a famous Calgary landmark." },

  { n: 2,  title: "Five-Letter Skyline",     type: "Wordle Game",         cat: "word",   icon: "🔠", location: "Calgary Tower (view of)",            answer: "TOWER",              func: true,
    hint: "A Wordle-style game with unlimited guesses. Find the 5-letter word." },

  { n: 3,  title: "Find the Threads",        type: "Connections",         cat: "logic",  icon: "🧩", location: "Riley Park",                          answer: "Riley Park",         func: true,
    hint: "Group 16 Calgary things into 4 hidden categories." },

  { n: 4,  title: "Letters in Chaos",        type: "Word Scramble",       cat: "word",   icon: "🔤", location: "Kensington (the neighbourhood)",      answer: "KENSINGTON",         func: true,
    hint: "Rearrange the letters to spell a familiar place." },

  { n: 5,  title: "Caesar's Secret",         type: "Cipher Decoder",      cat: "code",   icon: "🏛️", location: "Sunnyside Station",                  answer: "SUNNYSIDE STATION",  func: true,
    hint: "A Caesar-shifted message. Find the right shift to decode." },

  { n: 6,  title: "Speak in Symbols",        type: "Emoji Puzzle",        cat: "visual", icon: "🤔", location: "Prince's Island Park",               answer: "Princes Island",     func: true,
    hint: "Decode the emoji clue into a Calgary place." },

  { n: 7,  title: "The Riverside Mystery",   type: "Anagram",             cat: "word",   icon: "🔄", location: "McHugh House",                       answer: "McHugh House",       func: true,
    hint: "Rearrange the letters to spell a heritage building near the office." },

  { n: 8,  title: "Twin Tiles",              type: "Memory Match",        cat: "action", icon: "🃏", location: "The Plaza Theatre",                  answer: "Plaza Theatre",      func: false,
    hint: "Flip pairs to reveal the answer. (Puzzle to be built)" },

  { n: 9,  title: "Hidden in Plain Sight",   type: "Visual Riddle",       cat: "visual", icon: "🔍", location: "Wonderland (giant head sculpture)",  answer: "Wonderland",         func: false,
    hint: "Find a hidden word in the image. (Puzzle to be built)" },

  { n: 10, title: "Who Did What?",           type: "Logic Puzzle",        cat: "logic",  icon: "🕵️", location: "Centre Street Bridge (the lions)",   answer: "Centre Street Bridge", func: false,
    hint: "Use clues to deduce the answer." },

  { n: 11, title: "Counter Letters",         type: "Anagram",             cat: "word",   icon: "🔄", location: "Higher Ground Cafe",                 answer: "Higher Ground",       func: false,
    hint: "Unscramble to find a beloved local cafe." },

  { n: 12, title: "Calculate to Conquer",    type: "Math Puzzle",         cat: "logic",  icon: "🧮", location: "1422 Kensington Rd (the office!)",   answer: "1422",                func: false,
    hint: "Solve to reveal a familiar address." },

  { n: 13, title: "What Comes Next?",        type: "Pattern Sequence",    cat: "logic",  icon: "🌀", location: "Pages Books on Kensington",          answer: "Pages",               func: false,
    hint: "What completes the pattern?" },

  { n: 14, title: "Gallows Words",           type: "Hangman",             cat: "word",   icon: "🎯", location: "Hayden Block Smoke & Whisky",        answer: "Hayden Block",        func: false,
    hint: "Guess letter by letter." },

  { n: 15, title: "Picture This",            type: "Rebus Puzzle",        cat: "visual", icon: "🎨", location: "Lina's Italian Market",              answer: "Linas",               func: false,
    hint: "A picture-word puzzle." },

  { n: 16, title: "Dots and Dashes",         type: "Morse Code",          cat: "code",   icon: "📡", location: "Hillhurst Sunnyside Community Centre", answer: "Hillhurst",          func: false,
    hint: "Decode the Morse to find your destination." },

  { n: 17, title: "Slide to Solve",          type: "Sliding Puzzle",      cat: "action", icon: "🔢", location: "Sunnyside SAIT LRT Station",         answer: "Sunnyside",           func: false,
    hint: "Slide the tiles into the right order." },

  { n: 18, title: "Tiny Crossword",          type: "Mini Crossword",      cat: "word",   icon: "📋", location: "Pulcinella Restaurant",              answer: "Pulcinella",          func: false,
    hint: "A mini crossword with Italian flair." },

  { n: 19, title: "Spot the Change",         type: "Spot the Difference", cat: "visual", icon: "👀", location: "Vendome Cafe",                       answer: "Vendome",             func: false,
    hint: "Spot 5 differences between the photos." },

  { n: 20, title: "Through the Maze",        type: "Maze",                cat: "action", icon: "🌀", location: "Crescent Heights Lookout",           answer: "Crescent Heights",    func: false,
    hint: "Navigate to find the view." },

  { n: 21, title: "Buzzer Beater",           type: "Speed Trivia",        cat: "action", icon: "⚡", location: "Made by Marcus (ice cream)",         answer: "Made by Marcus",      func: false,
    hint: "Quick! Beat the clock." },

  { n: 22, title: "Twist Your Tongue",       type: "Tongue Twister",      cat: "action", icon: "👅", location: "Memorial Drive",                     answer: "Memorial Drive",      func: false,
    hint: "Say the twister three times fast." },

  { n: 23, title: "Quote Mosaic",            type: "Quote Unscramble",    cat: "word",   icon: "💬", location: "Eau Claire Market",                  answer: "Eau Claire",          func: false,
    hint: "Put the words of the quote in the right order." },

  { n: 24, title: "Color Echo",              type: "Simon Says",          cat: "action", icon: "🎨", location: "Annex Ales",                         answer: "Annex Ales",          func: false,
    hint: "Repeat the color sequence." },

  { n: 25, title: "Mind the Sequence",       type: "Number Sequence",     cat: "logic",  icon: "🔢", location: "The Roasterie",                      answer: "Roasterie",           func: false,
    hint: "Find the missing number." },

  { n: 26, title: "Linked Minds",            type: "Word Association",    cat: "word",   icon: "🔗", location: "Cleaver",                            answer: "Cleaver",             func: false,
    hint: "One word connects them all." },

  { n: 27, title: "Mirror, Mirror",          type: "Reverse Text",        cat: "code",   icon: "🪞", location: "Louise Bridge",                       answer: "Louise Bridge",       func: false,
    hint: "Read it backwards to reveal the answer." },

  { n: 28, title: "Knock Knock",             type: "Wordplay Riddle",     cat: "word",   icon: "🚪", location: "St. Patrick's Island",               answer: "St Patricks Island",  func: false,
    hint: "A pun-filled riddle." },

  { n: 29, title: "Vertical Secrets",        type: "Acrostic",            cat: "code",   icon: "📜", location: "Devonian Gardens",                   answer: "Devonian",            func: false,
    hint: "First letters spell the place." },

  { n: 30, title: "The Final Treasure",      type: "Master Puzzle",       cat: "logic",  icon: "💎", location: "Back at the Remedy office!",         answer: "Remedy",              func: false,
    hint: "Combine clues from the journey to unlock the prize." },
];

const CAT_COLORS = {
  word:   "#6dc4ff",
  logic:  "#c8a6ff",
  visual: "#F26921",
  code:   "#A4B54B",
  action: "#ff6b9a",
};

// ============================================================
// State (localStorage)
// ============================================================
const TEAM_KEY = "remedy-hunt-team";
function progressKey(teamId) { return `remedy-hunt-progress-${teamId || 'none'}`; }
function photoKey(teamId, clueN) { return `remedy-hunt-photo-${teamId || 'none'}-${clueN}`; }

function setTeam(teamId) { localStorage.setItem(TEAM_KEY, teamId); }
function getTeam() { return localStorage.getItem(TEAM_KEY); }
function getTeamInfo() {
  const id = getTeam();
  return id && TEAMS[id] ? { id, ...TEAMS[id] } : null;
}

function loadProgress() {
  try {
    const team = getTeam();
    return new Set(JSON.parse(localStorage.getItem(progressKey(team))) || []);
  } catch (e) { return new Set(); }
}
function saveProgress(set) {
  const team = getTeam();
  localStorage.setItem(progressKey(team), JSON.stringify([...set]));
}

// ============================================================
// Topbar
// ============================================================
function renderTopbar() {
  const bar = document.getElementById("topbar");
  if (!bar) return;
  const team = getTeamInfo();
  bar.innerHTML = `
    <a href="index.html" aria-label="Home">
      <img src="assets/remedy-logo.png" alt="Remedy Engineering" class="brand-logo" />
    </a>
    ${team ? `
      <a class="team-tag" href="${team.url}" style="--team-color: ${team.color};">
        <span class="team-swatch"></span>
        <span>${team.emoji} ${team.name}</span>
      </a>
    ` : ''}
  `;
}

// ============================================================
// Team grid (for landing page)
// ============================================================
function renderTeamGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  Object.entries(TEAMS).forEach(([id, t]) => {
    const card = document.createElement("a");
    card.href = t.url;
    card.className = "team-card";
    card.style.setProperty("--team-color", t.color);
    card.innerHTML = `
      <span class="team-emoji">${t.emoji}</span>
      <h3 class="team-name">${t.name}</h3>
      <p class="team-tagline">${t.tagline}</p>
      <span class="team-cta">Start hunting →</span>
    `;
    el.appendChild(card);
  });
}

// ============================================================
// Clue grid
// ============================================================
function renderClueGrid(containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  const solved = loadProgress();
  grid.innerHTML = "";
  CLUES.forEach(clue => {
    const card = document.createElement("a");
    card.href = `clue-${String(clue.n).padStart(2, "0")}.html`;
    card.className = "clue-card";
    if (solved.has(clue.n)) card.classList.add("solved");
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
    grid.appendChild(card);
  });
  updateProgressBar(solved);
}

function updateProgressBar(solved) {
  const total = CLUES.length;
  const count = (solved || loadProgress()).size;
  const fill = document.getElementById("progressFill");
  const label = document.getElementById("progressLabel");
  const bar = document.querySelector(".progress-bar");
  if (fill) fill.style.width = `${(count / total) * 100}%`;
  if (label) label.textContent = `${count} of ${total} solved`;
  if (bar) bar.setAttribute("aria-valuenow", count);
}

function setupReset() {
  const btn = document.getElementById("resetBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (confirm("Reset all progress for this team? This can't be undone.")) {
      const team = getTeam();
      localStorage.removeItem(progressKey(team));
      // also clear photo references
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`remedy-hunt-photo-${team}-`)) localStorage.removeItem(k);
      }
      renderClueGrid("clueGrid");
    }
  });
}

// ============================================================
// Common DOM init
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderTopbar();
  if (document.getElementById("teamGrid")) renderTeamGrid("teamGrid");
  if (document.getElementById("clueGrid")) renderClueGrid("clueGrid");
  setupReset();
});

// Expose for clue pages
window.REMEDY = {
  TEAMS, CLUES, CAT_COLORS,
  getTeam, setTeam, getTeamInfo,
  loadProgress, saveProgress,
  photoKey, progressKey,
};
