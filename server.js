// TechBridge Task Management API — Task 7

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "tasks.json");

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "TechBridge Task Management API",
    status: "running",
    endpoints: {
      status: "/api/status",
      tasks: "/api/tasks"
    }
  });
});

// Health check
app.get("/api/status", (req, res) => {
  res.json({
    status: "connected"
  });
});

// Read tasks
function readTasks() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

// Write tasks
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// GET /api/tasks
app.get("/api/tasks", (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      error: "Unable to read task data."
    });
  }
});

// GET /api/tasks/:id
app.get("/api/tasks/:id", (req, res) => {
  try {
    const tasks = readTasks();

    const task = tasks.find(
      t => t.id === Number(req.params.id)
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found."
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({
      error: "Unable to read task data."
    });
  }
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
  try {
    const tasks = readTasks();

    const task = tasks.find(
      t => t.id === Number(req.params.id)
    );

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

    task.status = status;

    writeTasks(tasks);

    res.json(task);

  } catch (err) {
    res.status(500).json({
      error: "Unable to update task."
    });
  }
});

// Local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `TechBridge API running at http://localhost:${PORT}`
    );
  });
}

module.exports = app;
