// TechBridge — Challenge Hub (Task 5)

const challenges = [
  {
    id: 1, name: "Monthly Sales Dashboard", track: "Data Analytics", difficulty: "Beginner",
    description: "Clean a small monthly sales dataset and build a dashboard showing key trends.",
    outcome: "A simple dashboard showing important sales insights.",
    objective: "Analyze sales records and identify the trends that matter most to the business.",
    skills: "Spreadsheets, data cleaning, basic charts.",
    tools: "Google Sheets or Excel.",
    deliverable: "One spreadsheet with a cleaned dataset and a summary dashboard tab.",
    time: "3–4 hours"
  },
  {
    id: 2, name: "Customer Churn Snapshot", track: "Data Analytics", difficulty: "Intermediate",
    description: "Use a customer dataset to identify which customers are likely to stop using a service.",
    outcome: "A short report flagging at-risk customers with supporting numbers.",
    objective: "Practice segmenting and filtering a dataset to answer a specific business question.",
    skills: "Pivot tables, filtering, basic SQL.",
    tools: "Spreadsheets or a SQL playground.",
    deliverable: "A one-page findings summary with a supporting table or chart.",
    time: "4–5 hours"
  },
  {
    id: 3, name: "Employee Data Cleanup & Insights", track: "Data Analytics", difficulty: "Beginner",
    description: "Take a messy employee dataset and clean it, then answer a few basic questions about the workforce.",
    outcome: "A clean dataset plus three answered questions with supporting numbers.",
    objective: "Practice identifying and fixing duplicate rows, blanks and inconsistent formatting.",
    skills: "Data cleaning, formulas, basic aggregation.",
    tools: "Google Sheets or Excel.",
    deliverable: "A cleaned spreadsheet with a short notes section.",
    time: "3 hours"
  },
  {
    id: 4, name: "Personal Portfolio Landing Page", track: "Web Development", difficulty: "Beginner",
    description: "Design and build a single-page portfolio site introducing yourself and your work.",
    outcome: "A responsive landing page ready to publish online.",
    objective: "Practice structuring a page with HTML and styling it with CSS.",
    skills: "HTML, CSS, responsive layout.",
    tools: "Any code editor + a browser.",
    deliverable: "An index.html and style.css file, deployed to a free host.",
    time: "3–4 hours"
  },
  {
    id: 5, name: "Contact Form UI", track: "Web Development", difficulty: "Beginner",
    description: "Build a styled, accessible contact form with name, email and message fields.",
    outcome: "A working front-end form with clear validation states.",
    objective: "Practice form structure, labels, and basic client-side validation.",
    skills: "HTML forms, CSS, basic JavaScript.",
    tools: "Any code editor + a browser.",
    deliverable: "A single HTML page with the styled form.",
    time: "3 hours"
  },
  {
    id: 6, name: "Interactive Pricing Page", track: "Web Development", difficulty: "Advanced",
    description: "Build a pricing page where visitors can toggle between monthly and yearly plans and see prices update instantly.",
    outcome: "A polished, interactive pricing section with working JavaScript toggles.",
    objective: "Practice DOM manipulation and event-driven UI updates.",
    skills: "JavaScript, DOM manipulation, CSS layout.",
    tools: "Any code editor + a browser.",
    deliverable: "A single HTML/CSS/JS page with the interactive toggle.",
    time: "4–5 hours"
  }
];

let activeTrack = "All";
let activeDifficulty = "All";

const grid = document.getElementById("challengeGrid");
const emptyState = document.getElementById("emptyState");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");

function trackClass(track){
  return track === "Data Analytics" ? "program-tag" : "program-tag";
}

function renderCard(c){
  return `
    <div class="card challenge-card">
      <div class="challenge-top">
        <span class="program-tag">${c.track}</span>
        <span class="pill diff-${c.difficulty}">${c.difficulty}</span>
      </div>
      <h3 style="font-size:1.1rem; margin-bottom:0;">${c.name}</h3>
      <p style="margin-bottom:4px;">${c.description}</p>
      <p style="font-size:.85rem; color:var(--ink-soft); margin-bottom:10px;"><strong>Outcome:</strong> ${c.outcome}</p>
      <button class="btn btn-outline btn-sm" data-view="${c.id}">View Challenge</button>
    </div>`;
}

function applyFilters(){
  const filtered = challenges.filter(c =>
    (activeTrack === "All" || c.track === activeTrack) &&
    (activeDifficulty === "All" || c.difficulty === activeDifficulty)
  );

  if (filtered.length === 0){
    grid.innerHTML = "";
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
    grid.innerHTML = filtered.map(renderCard).join("");
  }

  // wire up View Challenge buttons after re-render
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => openModal(Number(btn.dataset.view)));
  });
}

function openModal(id){
  const c = challenges.find(item => item.id === id);
  if (!c) return;
  modalContent.innerHTML = `
    <span class="program-tag">${c.track}</span>
    <h2 style="margin-top:12px; font-size:1.4rem;">${c.name}</h2>
    <p style="margin-bottom:16px;"><span class="pill diff-${c.difficulty}">${c.difficulty}</span> &nbsp; <span class="badge-outline">${c.time}</span></p>
    <p><strong>Objective:</strong> ${c.objective}</p>
    <p><strong>Skills:</strong> ${c.skills}</p>
    <p><strong>Tools:</strong> ${c.tools}</p>
    <p><strong>What you'll produce:</strong> ${c.deliverable}</p>
    <p style="margin-bottom:0;"><strong>Expected result:</strong> ${c.outcome}</p>
  `;
  modalOverlay.classList.add("open");
}

function closeModal(){
  modalOverlay.classList.remove("open");
}

document.getElementById("modalClose").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

document.getElementById("trackFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  activeTrack = btn.dataset.track;
  document.querySelectorAll("#trackFilters .filter-btn").forEach(b => b.classList.toggle("active", b === btn));
  applyFilters();
});

document.getElementById("difficultyFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  activeDifficulty = btn.dataset.difficulty;
  document.querySelectorAll("#difficultyFilters .filter-btn").forEach(b => b.classList.toggle("active", b === btn));
  applyFilters();
});

applyFilters();
