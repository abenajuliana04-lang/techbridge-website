# TechBridge — Web Development Internship Project (Tasks 1–7)

A single, evolving website built across the TechBridge Web Development internship. Each task below adds to the same project rather than starting over.

## Project structure

```
techbridge/
├── index.html
├── programs.html
├── tasks.html
├── roadmap.html
├── challenges.html
├── dashboard.html
├── style.css
├── roadmap.js
├── challenges.js
├── dashboard.js
├── server.js
├── package.json
├── tasks.json
├── techbridge-logo.png
└── vercel.json
```

## Running it

**Frontend only (Tasks 1–5, and Task 6/dashboard visuals without live data):**
Just open `index.html` in a browser, or serve the folder with any static server (e.g. the VS Code "Live Server" extension, or `npx serve`).

**Full stack (Task 7 — dashboard with live task data):**
```bash
cd backend
npm install
npm start
```
This starts the API at `http://localhost:3000`. With the server running, open `dashboard.html` (via a local server, not `file://`) — it will fetch live task data, let you mark tasks complete, and update the progress bar in real time. If the server isn't running, the dashboard shows a clear "Unable to load tasks" message instead of a blank page.

## API endpoints (Task 7)

| Method | Endpoint          | Purpose                        |
|--------|-------------------|---------------------------------|
| GET    | /api/tasks        | Get all internship tasks        |
| GET    | /api/tasks/:id    | Get one task by id               |
| PUT    | /api/tasks/:id    | Update a task's status           |
| GET    | /api/status       | Health check for the status dot |

## Developer notes

**Task 1 — Homepage:** I went with a navy-and-circuit-green identity that echoes the TechBridge logo, built around one clear idea: what TechBridge is, what it offers, and how to apply, all reachable within one scroll. I learned how much a consistent type scale (Space Grotesk for display, IBM Plex Sans for body) does for a page that otherwise has very simple layout. The main challenge was keeping the hero honest to real TechBridge content rather than filler copy.

**Task 2 — Programs:** I presented Data Analytics and Web Development as parallel, equally-weighted cards so neither reads as the "default" choice, then added a short "which track is for you" section to help a visitor self-select. Reusing the Task 1 design tokens made this fast. The main challenge was writing skill lists that were accurate to the brief without inventing extra topics.

**Task 3 — Internship Journey:** I used a vertical timeline with expandable `<details>` cards so the 8-task sequence reads clearly without needing any JavaScript, per the brief. Day markers and difficulty pills communicate progression at a glance. The challenge was keeping each task description short enough to scan while still being specific about what it involves.

**Task 4 — Interactive Roadmap:** I stored each track's 8 tasks as an array of objects and wrote a single `renderTrack()` function that both tracks share, driven by a `currentTrack` variable and one event listener per toggle button. Switching tracks re-renders the task list and the "currently viewing" label without a page reload. The main challenge was keeping the two datasets (Data Analytics vs. Web Development) visually distinguishable using the same card template.

**Task 5 — Challenge Hub:** I built 6 challenges (3 per track) as a JS array and implemented two independent filters (track, difficulty) that combine with simple `.filter()` logic, plus a modal that populates from the clicked challenge's id. The main challenge was designing the "no results" state so filtering never feels broken when a combination has zero matches.

**Task 6 — Intern Dashboard:** I built the dashboard to read task data from a single source of truth rather than hardcoding cards in HTML, with client-side status filters and a details modal. Progress numbers (completed / remaining / percent) are calculated from that data and recompute on every change. Because Task 7 immediately asks this same data to come from an API, I designed the render functions to work whether the data source is a local array or an API response.

**Task 7 — Task Management API:** I built a small Express server with `GET /api/tasks`, `GET /api/tasks/:id` and `PUT /api/tasks/:id`, backed by a JSON file, and pointed the Task 6 dashboard at it with `fetch()`. I added a loading state while the first request is in flight and a clear error state if the backend is unreachable, plus a live "Backend Status" indicator. The main challenge was CORS — opening the dashboard directly as a local file blocked the API calls, so the backend now sends permissive CORS headers for local development, and the README documents running the frontend through a local server rather than `file://`.
