// TechBridge — Interactive Two-Track Roadmap (Task 4)

// ---- Data: arrays of task objects for each track ----
const webDevTasks = [
  { number: 1, title: "Build the TechBridge Homepage", day: 1, description: "Create the first version of the TechBridge website using HTML and CSS.", difficulty: "Beginner" },
  { number: 2, title: "Build the TechBridge Programs Experience", day: 4, description: "Create a Programs experience presenting TechBridge's available learning programs.", difficulty: "Beginner" },
  { number: 3, title: "Build the Internship Tasks Experience", day: 8, description: "Create an interface that presents the internship tasks and journey.", difficulty: "Beginner → Intermediate" },
  { number: 4, title: "Build an Interactive Internship Roadmap", day: 11, description: "Use JavaScript to let visitors switch between the two internship tracks.", difficulty: "Beginner → Intermediate" },
  { number: 5, title: "Build the Intern Registration Experience", day: 15, description: "Create a professional registration and onboarding interface for interns.", difficulty: "Intermediate" },
  { number: 6, title: "Build the Task Submission System", day: 19, description: "Create an interface through which interns can prepare and submit their work.", difficulty: "Intermediate" },
  { number: 7, title: "Build the Intern Dashboard", day: 22, description: "Create a dashboard where an intern can view profile, progress, tasks and submissions.", difficulty: "Intermediate" },
  { number: 8, title: "Build the Complete TechBridge Internship Platform", day: 26, description: "Combine everything built during the internship into one complete platform.", difficulty: "Intermediate" }
];

const dataAnalyticsTasks = [
  { number: 1, title: "Data Cleaning Basics", day: 1, description: "Clean a messy dataset in Google Sheets or Excel — duplicates, blanks, formatting, data types.", difficulty: "Beginner" },
  { number: 2, title: "Formulas & Pivot Tables", day: 4, description: "Use spreadsheet formulas and Pivot Tables to extract useful insights from a dataset.", difficulty: "Beginner" },
  { number: 3, title: "Data Visualization", day: 8, description: "Create charts and a simple dashboard that communicate useful insights.", difficulty: "Beginner → Intermediate" },
  { number: 4, title: "Introduction to SQL", day: 11, description: "Practice basic SQL queries to answer real-world questions about data.", difficulty: "Beginner → Intermediate" },
  { number: 5, title: "SQL Joins & Aggregations", day: 15, description: "Use JOIN, GROUP BY and aggregate functions to analyze data across tables.", difficulty: "Intermediate" },
  { number: 6, title: "Lookup Functions & Data Wrangling", day: 19, description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle mismatches.", difficulty: "Intermediate" },
  { number: 7, title: "Mini Analysis Project", day: 22, description: "Complete a small end-to-end analysis: cleaning, formulas, Pivot Tables, charts, recommendations.", difficulty: "Intermediate" },
  { number: 8, title: "Capstone Project", day: 26, description: "Complete a larger project combining spreadsheet analysis and SQL across at least two tables.", difficulty: "Intermediate" }
];

// Variable tracking the currently selected track
let currentTrack = "webdev";

const taskListEl = document.getElementById("taskList");
const viewingLabelEl = document.getElementById("viewingLabel");
const trackButtons = document.querySelectorAll(".track-btn");

// Function: returns the correct array + label based on the selected track
function getTrackData(track) {
  if (track === "data") {
    return { tasks: dataAnalyticsTasks, label: "Data Analytics" };
  }
  return { tasks: webDevTasks, label: "Web Development" };
}

// Function: builds the HTML for one task
function renderTask(task) {
  return `
    <div class="rtask">
      <div class="rday">DAY ${task.day}</div>
      <div>
        <div style="font-weight:600; font-family:var(--font-display); margin-bottom:4px;">
          Task ${task.number} — ${task.title}
        </div>
        <p style="margin:0;">${task.description}</p>
      </div>
      <span class="badge-outline">${task.difficulty}</span>
    </div>`;
}

// Function: renders the full task list + updates "currently viewing" label
function renderTrack(track) {
  currentTrack = track;
  const { tasks, label } = getTrackData(track);

  viewingLabelEl.textContent = label;
  taskListEl.innerHTML = tasks.map(renderTask).join("");

  // Update which toggle button looks active
  trackButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.track === track);
  });
}

// Event listeners: respond when a track button is clicked
trackButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.track; // conditional logic lives inside renderTrack/getTrackData
    renderTrack(selected);
  });
});

// Initial render on page load
renderTrack(currentTrack);
