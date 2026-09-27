// TechBridge Task Management API — Task 7
// Run with: node server.js  (after `npm install` inside /backend)

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data", "tasks.json");

app.use(express.json());

// Allow the frontend (served from a different origin/port, e.g. Live Server or GitHub Pages)
// to call this API during local development.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

function readTasks() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Health check / status indicator
app.get("/api/status", (req, res) => {
  res.json({ status: "connected" });
});

// GET /api/tasks — all tasks
app.get("/api/tasks", (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Unable to read task data." });
  }
});

// GET /api/tasks/:id — one task
app.get("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found." });
  res.json(task);
});

// PUT /api/tasks/:id — update a task's status
app.put("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found." });

  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "A 'status' field is required." });

  task.status = status;
  writeTasks(tasks);
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`TechBridge API running at http://localhost:${PORT}`);
});
