# MindSpace — Build Plan

Execution brief for Claude Code. **Read this entire file at the start of every session and again before starting each phase.** It is the source of truth for constraints; the conversation is not.

---

## 0. Non-negotiables

**Cost.** Everything must run on free tiers. No paid APIs, no paid infrastructure, no "we'll just add a managed Redis". If a task appears to require a paid service, stop and propose a free alternative before writing code.

**The AI provider is Google Gemini.** Not OpenAI, not Groq, not Anthropic. Gemini exposes an OpenAI-compatible endpoint, so the existing `openai` SDK can stay — only the client changes:

```ts
new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
})
```

The native `@google/genai` SDK is also acceptable if a feature needs something the compatibility layer doesn't expose (native audio input, fine-grained safety settings). Prefer the OpenAI-compatible path where it works, because it keeps the diff small.

Model selection: a current Gemini Flash model for user-facing generation, the smallest/fastest Flash variant for classification jobs that run on every request. Check Google's current model list — names change often.

**Gemini's safety filters are a real hazard for this app.** Gemini can block or refuse generations involving self-harm, suicide, and abuse — exactly the content this product exists to handle. A blocked response must never surface as an error or an empty screen to someone in distress.

- Configure `safetySettings` explicitly rather than accepting defaults.
- Always check `promptFeedback.blockReason` and the candidate's `finishReason` — a `SAFETY` finish is not an exception, it's a response you must handle.
- On any block, fall straight into the crisis protocol and the canned empathetic fallback. Never show a raw error.
- The keyword crisis pass in `lib/crisis.ts` must keep running **before** any model call, so the most dangerous path never depends on a model responding at all.

**Never add a `cookies:` block to `authOptions`** in `app/api/auth/[...nextauth]/route.ts`. Hardcoding `sessionToken.name` breaks NextAuth's secure-cookie auto-detection: `withAuth()` in `middleware.ts` calls the same `getToken()` logic and computes a different cookie name in production, so it can never see the session. Login succeeds, `/api/auth/session` returns the user, and every protected route still bounces to `/login`. This bug has been introduced twice already. There is an explanatory comment where the block used to be — leave it there.

**Never gate crisis features.** Crisis detection, helplines, crisis resources, and the ability to export or delete your own data are free forever for every user. Paywalls go on depth — history length, voice quota, guided programs — never on safety.

**Git.** Commits are authored under Ritik's git identity only. Do **not** add `Co-Authored-By`, `Claude-Session`, `Generated with Claude Code`, or any other AI attribution trailer to commit messages or pull request descriptions.

**Branching.** `main` auto-deploys to Vercel production. Never commit directly to `main`. One branch and one PR per phase. Run `npm run build` locally and confirm it passes before every commit.

**Database.** Neon Postgres is the live production database. Migrations must be additive — new tables and nullable columns only. Never drop or rename an existing column. Never run destructive SQL without asking first.

**Working rhythm.** Complete one phase. Run the build. Open the PR. Then **stop and report** — do not begin the next phase without approval. If a phase is large, split it into multiple PRs rather than one giant one.

---

## 1. Current state (verified by reading the code, not assumed)

Genuinely persisted to Postgres:

- signup / login — NextAuth, credentials + Google, JWT session strategy
- onboarding — `POST /api/onboarding`
- journal entries — `POST/GET /api/journal/entry`
- mood logs — `POST/GET /api/mood`

Frontend-only. State lives in `useState` and is destroyed on refresh:

- `app/circles/page.tsx` — the 8 circles come from the hardcoded `CIRCLES` array in `lib/circles.ts`, not from the database
- `app/circles/[id]/page.tsx` — renders the `DEMO_POSTS` constant; newly created posts go into local state and vanish on reload
- `app/chat/page.tsx` — entirely simulated. A `setTimeout` fakes peer matching and `MESSAGES` is a hardcoded array
- `app/habits/page.tsx` — `WEEKLY_DATA` is hardcoded; checkboxes are local state only
- `app/journal/page.tsx` — the History tab reads the `DEMO_ENTRIES` constant and Trends computes from local state, even though the real `GET /api/journal/entry` and `GET /api/mood` endpoints already exist and return the right data
- `app/dashboard/page.tsx` — every stat is hardcoded to `0`
- `app/settings/page.tsx` — "Crisis Contact", "Download My Data" and "Delete Account" are non-functional buttons

Prisma models that exist in the schema with **zero** API routes behind them:
`Circle`, `Post`, `Comment`, `Reaction`, `Resource`, `Progress`, `Habit`, `HabitLog`, `Badge`, `UserBadge`.

The data model is largely designed already. Most of the work below is wiring, not schema design.

---

## Phase 0 — Unbreak production

Ship this first, on its own, today.

**0.1 — Onboarding crash.** A valid, unexpired session JWT can reference a `userId` that no longer exists in the database (this happened after a Neon project was recreated). `getServerSession` happily returns it because the JWT verifies; only a DB round trip catches it. `prisma.profile.upsert` then throws a raw `P2003` foreign-key error which the catch block turns into a generic 500, and the user sees "Something went wrong. Please try again." with no way forward.

In `app/api/onboarding/route.ts`, immediately after extracting `userId` and before any write, check the user exists. If not, return `401` with `{ error: "Your session has expired. Please log in again.", code: "SESSION_STALE" }`.

In `app/onboarding/page.tsx`, in `handleComplete`, when the response is not OK and `data.code === "SESSION_STALE"`, show a toast, call `signOut({ redirect: false })`, and route to `/login` — instead of falling through to the generic error toast.

**0.2 — Confirm the cookie fix is present.** Verify `authOptions` has no `cookies:` block (see Non-negotiables). If one exists, remove it.

**0.3 — Migrate OpenAI to Gemini.** Rewrite `lib/openai.ts` (rename it `lib/ai.ts`) to use Gemini. Keep the existing lazy-initialisation pattern, keep the try/catch that falls back to the canned empathetic response, and keep the crisis short-circuit that runs before any model call.

Additionally, for Gemini specifically: set explicit `safetySettings`, handle `blockReason` and a `SAFETY` finish reason as normal control flow rather than as errors, and add retry-with-backoff on HTTP 429 — Gemini's free tier limits are per-minute, per-day, and per-token.

Add `GEMINI_API_KEY` to Vercel environment variables and remove `OPENAI_API_KEY`.

**Done when:** a fresh signup completes onboarding and lands on the dashboard; a journal entry returns a real AI response rather than the fallback string; an entry containing distressing language returns the crisis response rather than an error or a blank; `/dashboard` returns 200 for a logged-in user.

---

## Phase 1 — Make the demo features real

Nothing below this phase is worth building while the app forgets what users write.

**1.1 Circles.** Seed the `Circle` table from `lib/circles.ts` via a seed script. Build `GET /api/circles`, `GET /api/circles/[id]`, `POST /api/circles/[id]/posts`, `GET /api/circles/[id]/posts` (paginated), `POST /api/posts/[id]/reactions` (toggle, respecting the `@@unique([userId, postId, type])` constraint), and `POST/GET /api/posts/[id]/comments`. Wire both circle pages to real data. Delete `DEMO_POSTS`.

**1.2 Habits.** Seed the `Habit` table. Build `GET /api/habits` (with today's log state) and `POST /api/habits/[id]/log` (toggle for a given date). Wire `app/habits/page.tsx` to real data, including the weekly grid. Delete `WEEKLY_DATA`.

**1.3 Journal history and trends.** Point the History tab at `GET /api/journal/entry` and the Trends tab at `GET /api/mood`. Delete `DEMO_ENTRIES`. Handle empty states properly — a new user should see an inviting empty state, not a chart of zeros.

**1.4 Dashboard stats.** Replace the hardcoded zeros with real counts: journaling streak (from `MoodLog`/`JournalEntry` dates), total entries, circles joined, days since signup. One `GET /api/dashboard` endpoint, one query, no N+1.

**1.5 Retire fake chat.** `app/chat/page.tsx` is a simulation and should not ship as though it works. Either hide the route behind a "coming soon" state or remove the nav entry until Phase 5 replaces it.

**Done when:** a post written in a circle is still there after a hard refresh and in a different browser; habits persist across days; the dashboard numbers change as you use the app.

---

## Phase 2 — Safety

Required before circles carry real traffic, and required before any institution will sign anything.

**2.1 Two-stage crisis detection.** `lib/crisis.ts` is currently a keyword list. It misses "I'm just so tired of all of this", sarcasm, and most Hinglish. Keep the keyword pass as a fast first stage, then add a second stage: a Gemini call using the smallest Flash model with a JSON response schema, classifying risk as `none | medium | high` with a short reason.

The keyword pass short-circuits to `high` — the model can escalate but must never be able to downgrade a keyword hit. If the classification call is blocked by safety filters or fails for any reason, **fail closed**: treat it as `medium` and show support resources. Never let a filter block or a network error silently produce "no risk".

**2.2 Use the crisis contact.** `crisisContact` is collected during onboarding and never read. Define and implement the protocol: what happens on `high`, what the user is shown, what is offered (never done silently — the user must consent in the moment before anyone is contacted), and what is logged.

**2.3 Follow-up check-in.** When an entry is flagged `high`, schedule a gentle check-in 24 hours later. Use GitHub Actions cron hitting a protected API route — Vercel's Hobby plan limits cron to once per day.

**2.4 Moderation.** Now that posts are real, screen them before they appear: keyword pass plus a Gemini classification, auto-hide anything flagged, plus a user report button that increments the existing `reportCount` field and hides a post past a threshold.

**Done when:** a deliberately ambiguous Hinglish distress message is caught by stage two; a safety-filtered response still produces helpful crisis content rather than an error; a flagged post never becomes publicly visible.

---

## Phase 3 — AI that remembers, and voice

**3.1 Contextual memory (Feature 1).** Today every journal reply meets a stranger. Before generating a response, fetch context with plain SQL:

- the user's last 5 entries (content truncated, mood, date)
- up to 5 older entries sharing any tag with the current one
- up to 5 entries with the same mood from the last 90 days

De-duplicate, cap the total context, and pass it to the model with instructions to reference the past naturally and only when relevant — never to force a callback. The target output is a line like *"Last week the placement thing was weighing on you — how did that land?"*

Gemini does offer an embeddings API, so semantic retrieval with pgvector is available on Neon's free tier. **Do not build it yet.** SQL retrieval is simpler, has no extra moving parts, and is close to as good until a single user has hundreds of entries. Revisit once that's actually true.

**3.2 Voice journaling (Feature 2).** Record audio in the browser with `MediaRecorder`, upload, and transcribe it. Gemini accepts audio as native multimodal input, so no separate speech-to-text provider is needed — send the audio and ask for a transcript, then run the normal journal flow on that transcript. Keep transcription and response generation as two distinct calls so the transcript is still stored if the response fails.

Store the transcript; do not store the audio (cheaper, and better for privacy — say so in the UI). Cap recordings at roughly 3 minutes.

**3.3 Hinglish responses.** Detect the language register of the entry and instruct the model to reply in the same register — English to English, Hinglish to Hinglish, Hindi to Hindi. Gemini handles Indic and code-mixed text notably well, which makes this one of the strongest reasons for the provider choice. Still use two or three few-shot examples in the system prompt, and still test against real code-mixed entries before considering this done.

**Done when:** a second entry about an ongoing situation produces a reply that references the first one; a spoken Hinglish entry is transcribed and answered in Hinglish.

---

## Phase 4 — Insight and retention

**4.1 Pattern engine (Feature 3).** Not another mood chart. Compute real correlations from data already being collected: day-of-week averages, mood by tag versus baseline, effect of journaling gaps, trend direction over time. Surface findings only when there is enough data and the effect is meaningful — suppress the section entirely for a user with four entries rather than showing noise. Pure SQL and arithmetic; no model calls, no cost.

**4.2 Guided programs (Feature 6).** The unused `Progress` and `Resource` models are for this. A program is an ordered set of days, each with a micro-task and a journal prompt. Track enrolment, per-day completion, and produce a small completion artifact at the end. Build the engine generically and ship one program — do not hardcode a single program's content into the page.

**4.3 Gentle badges.** `Badge` and `UserBadge` exist. Award for returning, not for streak length, and never show a broken streak or loss-framed message. In a mental health product, streak anxiety is an actual harm — "you came back" beats "you lost your 12-day streak".

**Done when:** a user with 30 days of varied entries sees at least one non-obvious, true insight about themselves.

---

## Phase 5 — Real peer support

**5.1 Async letters (Feature 4).** This replaces the fake live chat. A user writes a letter; it enters a queue; another user opts to answer one and replies within 24 hours. No websockets, no two-people-online problem, and moderation happens before delivery rather than in real time. Works at 20 users, which live chat does not. Rate-limit both writing and answering, and let a recipient decline a letter without it counting against the sender.

**5.2 Scheduled rooms (Feature 5).** Time-boxed, topic-based, capped group sessions — for example "Sunday 9pm, exam stress, 45 minutes, 12 seats, text only". Scheduling is what solves cold start: an always-open room with three people feels dead. Poll every few seconds; do not introduce Socket.io. Require a moderator or a clearly posted set of rules for every room.

**Done when:** two separate accounts can exchange a letter end to end, and a scheduled room opens, fills, runs, and closes.

---

## Phase 6 — Platform and trust

**6.1 Therapy-prep summary (Feature 7).** Generate a one-page summary of the last 60 days — recurring themes, mood trajectory, what seems to help — designed to be handed to a real therapist at a first appointment. This lowers the highest-friction step in getting actual care. Export as PDF.

**6.2 Data export and deletion (Feature 9).** India's DPDP Act treats mental health data as sensitive personal data, and the Settings buttons currently do nothing. "Download My Data" produces a complete JSON export of everything tied to the account. "Delete Account" genuinely cascades and deletes, with a confirmation step and a clear statement of what is removed. This is a legal requirement and it becomes a line in any institutional pitch.

**6.3 Offline-first PWA (Feature 10).** Manifest, service worker, installable. Journal entries written offline queue locally and sync on reconnect. The target users are on patchy tier-2/3 connections, and this also sidesteps app store review entirely.

**Done when:** an export contains every entry the account ever wrote; an entry composed in airplane mode appears in the database after reconnecting.

---

## Ordering summary

| Phase | Contents | Blocking? |
|---|---|---|
| 0 | Onboarding fix, Gemini migration | Yes — production is broken |
| 1 | Circles, habits, history, dashboard — all real | Yes — everything else builds on it |
| 2 | Crisis v2, moderation | Yes, before real users |
| 3 | AI memory, voice, Hinglish | No |
| 4 | Pattern engine, programs, badges | No |
| 5 | Letters, rooms | No |
| 6 | Therapy prep, DPDP, PWA | No |

Do not reorder phases 0–2. Phases 3–6 can be resequenced if there's a reason.
