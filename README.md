# TechBridge Intern Management Platform

The final TechBridge Web Development project combines the practical features built across the internship into one responsive intern management platform.

## Project description

TechBridge by Baselink Services Limited provides a 30-Day Practical Internship across **Data Analytics** and **Web Development**. This final Web Development project brings the Web Development learning journey together with an interactive Challenge Hub, intern dashboard, task management API, progress tracking and search.

## Technologies used

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js
- Express.js
- REST API
- JSON
- Git/GitHub

## Main features

- Professional TechBridge landing page
- Data Analytics and Web Development program information
- Eight-stage Web Development internship journey
- Interactive two-track roadmap with no page refresh
- Challenge Hub with 3+ challenges per track
- Challenge filtering by track and difficulty
- Challenge search and detail modal
- Intern dashboard with sample intern details
- API-powered task loading
- GET task list and individual task endpoints
- PUT task status updates
- Dynamic completed/remaining/progress calculations
- Task filters and task detail modal
- Technology Explorer for Next.js, Vue.js, Angular and backend development
- Dashboard search for tasks and challenges
- Loading, API error and empty states
- Responsive navigation and layouts
- Official internship application CTA
- TechBridge community/contact area

## Eight-task Web Development sequence

1. Homepage — Day 1
2. Programs Experience — Day 4
3. Internship Tasks Experience — Day 8
4. Interactive Internship Roadmap — Day 11
5. Challenge Hub — Day 15
6. Intern Dashboard — Day 19
7. Task Management API — Day 22
8. Complete Internship Platform — Day 26

## Project structure

```
techbridge-website/
├── index.html
├── programs.html
├── tasks.html
├── roadmap.html
├── roadmap.js
├── challenges.html
├── challenges.js
├── dashboard.html
├── dashboard.js
├── style.css
├── server.js
├── tasks.json
├── techbridge-logo.png
├── package.json
├── vercel.json
└── README.md
```

## Run locally

From the repository root:

```bash
npm install
npm start
```

Then open:

```
http://localhost:3000
```

The Vercel deployment uses the same Express application.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/status` | Check backend connection |
| GET | `/api/tasks` | Return all 8 task records |
| GET | `/api/tasks/:id` | Return one task |
| PUT | `/api/tasks/:id` | Update a task status |

The dashboard uses `fetch()` to retrieve and update tasks without a full page refresh.

## Final testing checklist

- Homepage and navigation
- Dashboard and API connection
- All 8 tasks
- View Task modal
- Task status updates
- Progress calculation
- Challenge Hub filters
- Challenge search and details
- Dashboard task/challenge search
- Loading and error states
- Responsive mobile navigation
- GitHub repository and deployment

## Official application

https://forms.gle/zA5mzrHbi9oCZbKS7

## Contact

techbridgebaslink@gmail.com

> The WhatsApp Community link will be replaced with the official community URL once provided by TechBridge. No unverified community URL is presented as official.
