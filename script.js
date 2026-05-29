// ============================================================
// REMEDY ENGINEERING — Scavenger Hunt
// 6 password-gated teams, 17 clues, real-time team sync
// ============================================================

// -------- TEAMS --------
const TEAMS = {
  boilers: {
    name: "Boilers", emoji: "🔥", color: "#F26921",
    tagline: "Hot under pressure.", password: "",
  },
  chillers: {
    name: "Chillers", emoji: "❄️", color: "#3aa1d5",
    tagline: "Cool under pressure.", password: "",
  },
  compressors: {
    name: "Compressors", emoji: "💨", color: "#8a6dd5",
    tagline: "Power through pressure.", password: "",
  },
  pumps: {
    name: "Pumps", emoji: "💧", color: "#21A8B5",
    tagline: "Keep the flow moving.", password: "",
  },
  ductworks: {
    name: "Ductworks", emoji: "🌬️", color: "#A4B54B",
    tagline: "Smooth airflow, smooth solving.", password: "",
  },
  fans: {
    name: "Fans", emoji: "🌀", color: "#c0392b",
    tagline: "Spin up the answers.", password: "",
  },
};

// -------- CLUES (17 downtown Calgary spots) --------
const CLUES = [
  { n: 1,  title: "The Skyline Sentinel",       type: "Wordle",            cat: "word",   icon: "🗼", location: "Calgary Tower",                          answer: "TOWER",                func: true },
  { n: 2,  title: "Pedestrian Promenade",       type: "Word Scramble",     cat: "word",   icon: "🚶", location: "Stephen Avenue Walk",                    answer: "STEPHEN AVE",          func: true },
  { n: 3,  title: "Indoor Jungle",              type: "Anagram",           cat: "word",   icon: "🌿", location: "Devonian Gardens",                       answer: "DEVONIAN",             func: true },
  { n: 4,  title: "Curious Giant",              type: "Emoji Puzzle",      cat: "visual", icon: "🗿", location: "The Bow (Wonderland Sculpture)",         answer: "Wonderland",           func: true },
  { n: 5,  title: "Five-Ring Ground",           type: "Trivia",            cat: "logic",  icon: "🥇", location: "Olympic Plaza",                          answer: "1988",                 func: true },
  { n: 6,  title: "Cloud Cutter",               type: "Word Scramble",     cat: "word",   icon: "☁️", location: "Telus Sky",                              answer: "TELUS SKY",            func: true },
  { n: 7,  title: "The Whispering Span",        type: "Text Riddle",       cat: "word",   icon: "🌉", location: "Peace Bridge",                           answer: "Peace Bridge",         func: true },
  { n: 8,  title: "Caesar's Island",            type: "Caesar Cipher",     cat: "code",   icon: "🏝️", location: "Princess Island Park",                   answer: "PRINCESS ISLAND",      func: true },
  { n: 9,  title: "Two Words in French",        type: "Translation",       cat: "code",   icon: "💧", location: "Eau Claire",                             answer: "Eau Claire",           func: true },
  { n: 10, title: "Find the Threads",           type: "Connections",       cat: "logic",  icon: "🧩", location: "China Town",                             answer: "China Town",           func: true },
  { n: 11, title: "Gallows Walls",              type: "Hangman",           cat: "action", icon: "🏰", location: "Fort Calgary",                           answer: "FORT CALGARY",         func: true },
  { n: 12, title: "Stacked Stories",            type: "Acrostic",          cat: "code",   icon: "📚", location: "Calgary Public Library",                 answer: "LIBRARY",              func: true },
  { n: 13, title: "Home of the Flames",         type: "Text Riddle",       cat: "word",   icon: "🏒", location: "Saddledome",                             answer: "Saddledome",           func: true },
  { n: 14, title: "Where We Came From",         type: "Math Puzzle",       cat: "logic",  icon: "📍", location: "Old Remedy Office",                      answer: "OLD OFFICE",           func: true },
  { n: 15, title: "Smile! Snap! Send!",         type: "Photo Challenge",   cat: "visual", icon: "📸", location: "Photo with BEN",                         answer: "BEN",                  func: true },
  { n: 16, title: "Where Was the Party?",       type: "Trivia",            cat: "logic",  icon: "🎉", location: "This year's Christmas party venue",      answer: "PARTY",                func: true },
  { n: 17, title: "Up the Wall",                type: "Rebus",             cat: "visual", icon: "🧗", location: "MEC Climbing Wall",                      answer: "MEC",                  func: true },
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

function _localLoad() {
  try { return new Set(JSON.parse(localStorage.getItem(progressKey(getTeam()))) || []); }
  catch (e) { return new Set(); }
}
function _localSave(set) {
  localStorage.setItem(progressKey(getTeam()), JSON.stringify([...set]));
}
function loadProgress() { return _localLoad(); }

async function saveProgress(set) {
  _localSave(set);
  const team = getTeam();
  if (!team) return;
  try {
    await fetch(`${API_URL}?team=${encodeURIComponent(team)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ solved: [...set] }),
    });
  } catch (e) { /* offline */ }
}

async function fetchProgress() {
  const team = getTeam();
  if (!team) return new Set();
  try {
    const res = await fetch(`${API_URL}?team=${encodeURIComponent(team)}`, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const set = new Set(data.solved || []);
    _localSave(set);
    return set;
  } catch (e) { return _localLoad(); }
}

function authenticate(teamId, password) {
  const team = TEAMS[teamId];
  if (!team) return false;
  return (team.password || "") === (password || "");
}

// ============================================================
// Topbar — logo, team tag, help button
// ============================================================
function renderTopbar() {
  const bar = document.getElementById("topbar");
  if (!bar) return;
  const team = getTeamInfo();
  bar.innerHTML = `
    <a href="index.html" aria-label="Home">
      <img src="assets/remedy-logo.png" alt="Remedy Engineering" class="brand-logo" />
    </a>
    <div class="topbar-right">
      ${team ? `
        <button class="team-tag" id="teamTag" type="button" style="--team-color: ${team.color};">
          <span class="swatch">${team.emoji}</span>
          <span>${team.name}</span>
        </button>
      ` : ''}
      <button class="help-btn" id="helpBtn" type="button" aria-label="Rules and tips">?</button>
    </div>
  `;
  const helpBtn = document.getElementById("helpBtn");
  if (helpBtn) helpBtn.addEventListener("click", () => openHelpModal());
  const teamTag = document.getElementById("teamTag");
  if (teamTag) teamTag.addEventListener("click", () => openTeamModal());
}

// ============================================================
// Team picker (landing)
// ============================================================
function renderTeamPicker(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  Object.entries(TEAMS).forEach(([id, t], idx) => {
    const card = document.createElement("button");
    card.className = "team-card";
    card.type = "button";
    card.style.setProperty("--team-color", t.color);
    card.style.animationDelay = `${idx * 50}ms`;
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
  document.getElementById("modalHint").textContent = !t.password
    ? "No password set — tap Enter to start."
    : "Ask your host for the password.";
  setTimeout(() => input.focus(), 100);
}
function closePasswordModal() { document.getElementById("authModal").classList.remove("show"); }
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
// Help modal (rules & tips)
// ============================================================
function openHelpModal() {
  const modal = document.getElementById("helpModal");
  if (modal) modal.classList.add("show");
}
function closeHelpModal() {
  const modal = document.getElementById("helpModal");
  if (modal) modal.classList.remove("show");
}

// ============================================================
// Team modal (see which team you're on + switch)
// ============================================================
function openTeamModal() {
  const modal = document.getElementById("teamModal");
  if (!modal) return;
  const list = document.getElementById("teamModalList");
  const currentId = getTeam();
  list.innerHTML = "";
  Object.entries(TEAMS).forEach(([id, t]) => {
    const row = document.createElement("div");
    row.className = "team-row" + (id === currentId ? " current" : "");
    row.style.setProperty("--team-color", t.color);
    row.innerHTML = `
      <span class="row-icon">${t.emoji}</span>
      <span class="row-body">
        <p class="row-name">${t.name}</p>
        <p class="row-sub">${t.tagline}</p>
      </span>
      ${id === currentId ? '<span class="row-current">You</span>' : ''}
    `;
    list.appendChild(row);
  });
  modal.classList.add("show");
}
function closeTeamModal() {
  const modal = document.getElementById("teamModal");
  if (modal) modal.classList.remove("show");
}

// ============================================================
// Clue grid (unsolved first, solved at bottom, animated)
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

  unsolved.forEach((c, i) => unsolvedGrid.appendChild(makeClueCard(c, false, i)));
  done.forEach((c, i) => solvedGrid.appendChild(makeClueCard(c, true, i)));

  const remainEl = document.getElementById("unsolvedCount");
  if (remainEl) remainEl.textContent = `${unsolved.length} of ${CLUES.length} remaining`;
  if (dividerEl) {
    if (done.length > 0) {
      dividerEl.style.display = "flex";
      const dt = dividerEl.querySelector(".divider-text");
      if (dt) dt.textContent = `${done.length} solved`;
    } else dividerEl.style.display = "none";
  }
  updateProgressBar(solved);
}
function makeClueCard(clue, isSolved, idx) {
  const card = document.createElement("a");
  card.href = `clue-${String(clue.n).padStart(2, "0")}.html`;
  card.className = "clue-card" + (isSolved ? " solved" : "");
  card.style.setProperty("--card-color", CAT_COLORS[clue.cat]);
  card.style.animationDelay = `${idx * 30}ms`;
  card.innerHTML = `
    <div class="solved-badge" aria-hidden="true">✓</div>
    <div class="card-top">
      <div class="card-number">${String(clue.n).padStart(2, "0")}</div>
      <div class="card-icon">${clue.icon}</div>
    </div>
    <div class="card-bottom">
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
// Confetti burst (for solve celebration)
// ============================================================
function confettiBurst() {
  const colors = ['#F26921', '#A4B54B', '#3aa1d5', '#8a6dd5', '#c0392b'];
  const c = document.createElement('div');
  c.className = 'confetti-layer';
  for (let i = 0; i < 36; i++) {
    const p = document.createElement('span');
    p.style.background = colors[i % colors.length];
    p.style.left = (50 + (Math.random() - 0.5) * 30) + '%';
    p.style.animationDelay = (Math.random() * 0.15) + 's';
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.setProperty('--dx', ((Math.random() - 0.5) * 240) + 'px');
    p.style.setProperty('--dy', (-200 - Math.random() * 200) + 'px');
    c.appendChild(p);
  }
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 1800);
}

// ============================================================
// DOM init
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderTopbar();

  const authView = document.getElementById("authView");
  const huntView = document.getElementById("huntView");

  if (authView && huntView) {
    const team = getTeamInfo();
    if (team) {
      authView.style.display = "none";
      huntView.style.display = "block";
      const teamHeader = document.getElementById("teamWelcome");
      if (teamHeader) {
        teamHeader.style.setProperty("--team-color", team.color);
        teamHeader.innerHTML = `
          <span class="eyebrow" style="color: ${team.color}; border-color: ${team.color}66; background: ${team.color}1a;">
            <span class="dot" style="background: ${team.color};"></span>
            <span class="team-emoji-anim">${team.emoji}</span> ${team.name}
          </span>
          <h1 class="title">Welcome,<br/><span class="accent" style="color: ${team.color};">${team.name}</span></h1>
          <p class="tagline">${team.tagline}</p>
        `;
      }
      renderClueGrid();
      (async () => { await fetchProgress(); renderClueGrid(); })();
      setInterval(async () => { await fetchProgress(); renderClueGrid(); }, POLL_MS);
    } else {
      authView.style.display = "block";
      huntView.style.display = "none";
      renderTeamPicker("teamPicker");
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

  // Help modal wiring (any page)
  const helpClose = document.getElementById("helpClose");
  if (helpClose) helpClose.addEventListener("click", closeHelpModal);
  const helpModal = document.getElementById("helpModal");
  if (helpModal) helpModal.addEventListener("click", e => {
    if (e.target.id === "helpModal") closeHelpModal();
  });

  // Team modal wiring (any page)
  const teamClose = document.getElementById("teamClose");
  if (teamClose) teamClose.addEventListener("click", closeTeamModal);
  const teamSwitch = document.getElementById("teamSwitch");
  if (teamSwitch) teamSwitch.addEventListener("click", () => {
    if (confirm("Switch teams? Your team's progress stays saved.")) {
      clearTeam();
      window.location.href = "index.html";
    }
  });
  const teamModal = document.getElementById("teamModal");
  if (teamModal) teamModal.addEventListener("click", e => {
    if (e.target.id === "teamModal") closeTeamModal();
  });
});

window.REMEDY = {
  TEAMS, CLUES, CAT_COLORS,
  getTeam, setTeam, clearTeam, getTeamInfo,
  loadProgress, saveProgress, fetchProgress,
  confettiBurst,
};
