# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm start         # Start production server
```

No test runner is configured.

## What This App Does

**ShortScorecard** is a wildfire resilience assessment tool for communities. It's a collaborative scorecard where teams evaluate 10 dimensions of wildfire preparedness using a 0–4 scale. There is no backend — all data is stored in `localStorage`.

## Architecture

**Two pages:**
- `/` (`src/app/page.tsx`) — Registration form (name, email, organization)
- `/scorecard` (`src/app/scorecard/page.tsx`) — Main assessment with questions, scoring, and results

**State is managed entirely in `src/hooks/useScorecard.ts`** — a single custom hook that reads/writes to localStorage. Storage keys:
- `scorecard_state_v3` — user's local state
- `scorecard_session_[sessionId]` — shared session state for collaboration

**Collaboration model** — localStorage-based only (same device/browser). The hook polls every 3 seconds to merge answers from team members. Shareable links use `?session=[id]` query params.

**Questions** are hardcoded in `src/data/questions.ts` (10 sections: E1–E10, ~40 questions). Each question has a 0–4 scale with labeled anchors, optional N/A, tooltip guidance, and a `Weight` for weighted averaging.

**Schema versioning** — The hook uses `scorecard_state_v3` + a `questionsHash` to detect stale localStorage and reset if questions change.

## Key Files

| Path | Purpose |
|------|---------|
| `src/hooks/useScorecard.ts` | All state logic — answers, scoring, session sync, team members |
| `src/types/scorecard.ts` | TypeScript interfaces for Question, Answer, SectionScore, PersonalInfo, TeamMember |
| `src/data/questions.ts` | Hardcoded question bank + section names |
| `src/components/QuestionCard.tsx` | Renders a single question with score buttons, notes, tooltip |
| `src/components/ResultsModal.tsx` | Radar chart (Canvas API), final scores, submit dialog |
| `src/components/ProgressSidebar.tsx` | Fixed left sidebar with circular SVG progress ring |

## Conventions

- All components are `"use client"` — no server components are used
- Styling uses **inline `style` props** throughout (not Tailwind classes), with dark theme globals in `src/app/globals.css`
- Color palette: black `#000`, orange accent `#f97316`, green `#22c55e`, red `#ef4444`
- Hydration safety: components check `isHydrated` before redirecting or reading localStorage
- Path alias `@/*` maps to `src/*`
