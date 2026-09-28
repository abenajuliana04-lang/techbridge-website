# TechBridge — Web Development Internship Platform

A single evolving website covering the TechBridge Web Development internship Tasks 1–7 and the final platform task. The project keeps the complete 8-task journey visible on the site.

## Pages
- `index.html` — polished TechBridge homepage
- `programs.html` — Data Analytics + Web Development programs
- `tasks.html` — all 8 internship tasks
- `roadmap.html` — interactive two-track roadmap
- `challenges.html` — 6 challenge library with filters/search/modal details
- `dashboard.html` — intern dashboard connected to the API
- `server.js` — Express API
- `tasks.json` — task data
- `style.css` — shared design system

## Run locally
From the repository root:
```bash
npm install
npm start
```
Then open `http://localhost:3000`.

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/status` | API health check |
| GET | `/api/tasks` | Return all 8 tasks |
| GET | `/api/tasks/:id` | Return one task |
| PUT | `/api/tasks/:id` | Update a task status |

## Tech used
HTML5, CSS3, vanilla JavaScript, Node.js and Express. No frontend framework is required for the internship tasks.

## Important
The application and WhatsApp URLs currently use the placeholders already present in the project. Replace them with TechBridge's official links before public submission.
