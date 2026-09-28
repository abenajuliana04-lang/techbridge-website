// TechBridge Task Management API — Task 7

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "tasks.json");

app.use(express.json());

// Serve the frontend files from the same Vercel deployment.
app.use(express.static(__dirname));

// CORS Setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Load initial tasks into memory to avoid Vercel filesystem errors
let tasks = [];

function loadTasks() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      tasks = JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading initial tasks file:", err);
    tasks = [];
  }
}

// Initial load
loadTasks();

// Health check
app.get("/api/status", (req, res) => {
  res.json({
    status: "connected"
  });
});

// GET /api/tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      error: "Task not found."
    });
  }

  res.json(task);
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      error: "Task not found."
    });
  }

  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      error: "A 'status' field is required."
    });
  }

  // Update in-memory object
  task.status = status;

  // Attempt to write back locally (ignored safely on read-only environments like Vercel)
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.warn("File write skipped (read-only filesystem):", err.message);
  }

  res.json(task);
});

// Local development server execution
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TechBridge API running at http://localhost:${PORT}`);
  });
}

// Critical export for Vercel
module.exports = app;
