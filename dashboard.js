// TechBridge Intern Dashboard (Task 6) — now backed by the Task 7 API.
// If the backend server isn't running, the dashboard shows a clear error
// state instead of failing silently.

const API_BASE = "http://localhost:3000";

let tasks = [];              // populated from the API
let activeStatusFilter = "all";

const taskGrid = document.getElementById("taskGrid");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const completedCountEl = document.getElementById("completedCount");
const remainingCountEl = document.getElementById("remainingCount");
const percentValueEl = document.getElementById("percentValue");
const progressFillEl = document.getElementById("progressFill");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");

// ---------- API status indicator ----------
async function checkApiStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/status`);
    if (!res.ok) throw new Error("bad response");
    statusDot.className = "status-dot status-connected";
    statusText.textContent = "Backend Status: Connected";
    return true;
  } catch (err) {
    statusDot.className = "status-dot status-offline";
    statusText.textContent = "Backend Status: Offline";
    return false;
  }
}

// ---------- Load tasks from the API ----------
async function loadTasks() {
  loadingState.style.display = "block";
  errorState.style.display = "none";
  taskGrid.innerHTML = "";

  try {
    const res = await fetch(`${API_BASE}/api/tasks`);
    if (!res.ok) throw new Error("Request failed");
    tasks = await res.json();
    loadingState.style.display = "none";
    renderTasks();
    updateProgress();
  } catch (err) {
    loadingState.style.display = "none";
    errorState.style.display = "block";
  }
}

function statusLabel(status) {
  if (status === "completed") return { text: "Completed", pill: "pill-completed" };
  if (status === "in-progress") return { text: "In Progress", pill: "pill-progress" };
  return { text: "Not Started", pill: "pill-not-started" };
}

function renderTaskCard(task) {
  const s = statusLabel(task.status);
  const markBtn = task.status === "completed"
    ? ""
    : `<button class="btn btn-primary btn-sm" data-complete="${task.id}">Mark as Completed</button>`;

  return `
    <div class="card task-card">
      <div class="task-card-top">
        <div>
          <div style="font-size:.78rem; color:var(--slate); font-weight:600;">TASK ${task.id} · DAY ${task.day}</div>
          <h3 style="font-size:1.05rem; margin:2px 0 0;">${task.title}</h3>
        </div>
        <span class="pill ${s.pill}">${s.text}</span>
      </div>
      <p style="margin-bottom:4px;">${task.description}</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-outline btn-sm" data-view="${task.id}">View Task</button>
        ${markBtn}
      </div>
    </div>`;
}

function renderTasks() {
  const filtered = activeStatusFilter === "all"
    ? tasks
    : tasks.filter(t => t.status === activeStatusFilter);

  taskGrid.innerHTML = filtered.length
    ? filtered.map(renderTaskCard).join("")
    : `<div class="empty-state">No tasks match this filter.</div>`;

  document.querySelectorAll("[data-view]").forEach(btn =>
    btn.addEventListener("click", () => viewTask(Number(btn.dataset.view))));

  document.querySelectorAll("[data-complete]").forEach(btn =>
    btn.addEventListener("click", () => markCompleted(Number(btn.dataset.complete))));
}

function updateProgress() {
  const total = tasks.length || 8;
  const completed = tasks.filter(t => t.status === "completed").length;
  const remaining = total - completed;
  const percent = Math.round((completed / total) * 100);

  completedCountEl.textContent = `${completed} / ${total}`;
  remainingCountEl.textContent = remaining;
  percentValueEl.textContent = `${percent}%`;
  progressFillEl.style.width = `${percent}%`;
}

// ---------- View a single task via GET /api/tasks/:id ----------
async function viewTask(id) {
  modalContent.innerHTML = `<p>Loading task details…</p>`;
  modalOverlay.classList.add("open");
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`);
    if (!res.ok) throw new Error("Not found");
    const task = await res.json();
    const s = statusLabel(task.status);
    modalContent.innerHTML = `
      <div style="font-size:.8rem; color:var(--slate); font-weight:600;">TASK ${task.id} · DAY ${task.day}</div>
      <h2 style="margin:4px 0 12px; font-size:1.3rem;">${task.title}</h2>
      <span class="pill ${s.pill}">${s.text}</span>
      <p style="margin-top:14px; margin-bottom:0;">${task.description}</p>
    `;
  } catch (err) {
    modalContent.innerHTML = `<p>Unable to load this task. Please check your connection and try again.</p>`;
  }
}

// ---------- Mark a task complete via PUT /api/tasks/:id ----------
async function markCompleted(id) {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" })
    });
    if (!res.ok) throw new Error("Update failed");
    const updated = await res.json();

    // update local copy so the UI reflects the change immediately
    const idx = tasks.findIndex(t => t.id === updated.id);
    if (idx !== -1) tasks[idx] = updated;

    renderTasks();
    updateProgress();
  } catch (err) {
    alert("Couldn't update this task right now. Please check that the backend server is running.");
  }
}

document.getElementById("statusFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  activeStatusFilter = btn.dataset.status;
  document.querySelectorAll("#statusFilters .filter-btn").forEach(b => b.classList.toggle("active", b === btn));
  renderTasks();
});

document.getElementById("modalClose").addEventListener("click", () => modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove("open"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") modalOverlay.classList.remove("open"); });

// ---------- Modern Web Technologies explorer ----------
const techContent = {
  nextjs: {
    title: "Next.js",
    body: "Next.js is a framework built on top of React for building modern web applications. It adds page routing, server-side rendering and easy deployment on top of the component model developers already know from React — commonly used for production websites and web apps that need to load fast and rank well in search."
  },
  vue: {
    title: "Vue.js",
    body: "Vue.js is a JavaScript framework for building user interfaces. It's known for being approachable to learn while still scaling up to large applications, and is often chosen by teams that want a gentler learning curve than React or Angular."
  },
  angular: {
    title: "Angular",
    body: "Angular is a full front-end framework maintained by Google, commonly used to build large, structured enterprise applications. It comes with more built-in tooling than React or Vue — routing, forms, and HTTP handling are included out of the box."
  },
  backend: {
    title: "Backend Development",
    body: "Backend development is the part of an application that runs on a server rather than in the browser — it manages data, business logic and communication with the frontend, usually through an API like the one built in Task 7. Common backend technologies include Node.js with Express.js, Python's Django or Flask, PHP's Laravel, and Microsoft's .NET."
  }
};

function renderTech(key) {
  const t = techContent[key];
  document.getElementById("techPanel").innerHTML = `
    <h3 style="margin-bottom:8px;">${t.title}</h3>
    <p style="margin-bottom:0;">${t.body}</p>
  `;
}

document.getElementById("techTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll("#techTabs .filter-btn").forEach(b => b.classList.toggle("active", b === btn));
  renderTech(btn.dataset.tech);
});

// ---------- Init ----------
renderTech("nextjs");
checkApiStatus();
loadTasks();
