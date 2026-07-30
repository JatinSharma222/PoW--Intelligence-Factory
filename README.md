# Data Factory Ops Dashboard

A dashboard for managing human demonstration-data collection operations — the kind of internal tooling a robotics/embodied-AI company needs to run its data-collection pipeline: tracking recording sessions, reviewing capture quality, and monitoring task/environment coverage over time.

**[Live demo →](https://intelligence-factory-five.vercel.app)** &nbsp;·&nbsp; Built by [Jatin Sharma](https://github.com/JatinSharma222)

<img width="1706" height="987" alt="Screenshot 2026-07-30 at 4 39 02 PM" src="https://github.com/user-attachments/assets/a73d60c5-cfd1-4e3c-ba50-3099cf3c5eef" />


## Why this exists

Robotics and embodied-AI companies that collect human demonstration data (via instrumented gloves, teleoperation rigs, etc.) need an operational layer around that data pipeline — session tracking, QA review, and coverage/diversity monitoring — separate from the ML/robotics core itself. This project is a self-directed demo of that operational layer: the internal tool an ops team would open every morning to check what's been captured, what needs review, and where the data gaps are.

It's a **frontend demo built on mock data** — there's no real backend, no real robots, no real telemetry. The focus is the product/ops layer: information architecture, data modeling, and interface design for a workflow like this.

## Features

### Operations Control Tower (`/`)
Daily-overview dashboard: sessions this week, hours captured, pending-review count, and approval rate, alongside a 14-day capture trend chart, a per-task-type coverage breakdown, and a table of recent sessions.

### Sessions Ledger (`/sessions`)
Full session log across all sites with search and filtering by status, task type, and site. A live summary strip shows filtered totals and a status breakdown at a glance.

### QA Review (`/sessions/[id]`)
Per-session review screen — recording stream placeholder, telemetry/capture-quality flags, glove device IDs, and task-outcome status — with Approve / Reject / Discard actions and a reviewer notes field.

### Coverage & Diversity Matrix (`/coverage`)
A task-type × environment heatmap showing captured hours against target, with priority-gap callouts surfacing the combinations most in need of additional data collection.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS**
- **Recharts** for charts
- All data is static/mock, generated in `lib/mock-data.ts` — no backend, database, or auth. Session actions (approve/reject/discard) update local React state only and reset on refresh.

## Running locally

```bash
git clone https://github.com/JatinSharma222/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed on [Vercel](https://vercel.com) with zero configuration — no environment variables needed since all data is mocked client-side.

## Notes

This is a demo project focused on product/ops tooling design, not a production system or a claim of robotics/ML expertise. It's meant to show how I approach building the operational software layer around a data-heavy pipeline.
