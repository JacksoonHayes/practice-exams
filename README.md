# aws-claude-practice-exams

A single-page web app of realistic practice exams covering both technical
certifications and English-language proficiency tests, with optional AI-powered
study aids.

## Exams

**Technical certifications**

- **AWS Certified Cloud Practitioner (CLF-C02)**
- **AWS Certified Developer – Associate (DVA-C02)**
- **Claude Certified Architect – Foundations (CCA-F)**

**Language exams** — each with Reading, Writing, Grammar, and Connecting-words sections:

- **IELTS Academic**
- **IELTS General Training**
- **PTE Academic**

## AI features (optional)

The language exams include AI-assisted study tools, powered by the OpenAI API:

- **Writing feedback** — on writing tasks and short-answer questions, the app
  generates personalized, encouraging feedback written in Argentinian
  (Rioplatense) Spanish, with corrected English shown in English. Feedback
  streams in live.
- **Translate panel** — a fixed panel for looking up the Spanish translation of
  any English word or phrase. It only calls the API on demand (and caches
  results) to keep usage low.

These features require an OpenAI API key (see Configuration below). The rest of
the app — all exams, questions, and auto-grading — works without one.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (dev server and build)
- **Tailwind CSS v4** + daisyUI
- **react-markdown** (renders AI feedback)
- **OpenAI API** (writing feedback and translation)

## Getting started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Configuration

The AI features read an OpenAI API key from a `VITE_OPENAI_KEY` environment
variable. Copy the example file and fill in your key:

```bash
cp .env.example .env
```

```
VITE_OPENAI_KEY=sk-proj-your-key-here
```

> **Note:** Because this is a static front-end with no backend, a `VITE_`-prefixed
> key is bundled into the client and is visible to anyone who opens the deployed
> site. This setup is intended for local or personal use only. For a public
> deployment, move the OpenAI calls (in `src/services/feedback.ts`) behind a
> backend endpoint that holds the key server-side. `.env` is gitignored.

### Running the project

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173
is in use).

### Other scripts

```bash
npm run build     # type-check and build for production (output in dist/)
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
  App.tsx                              # root component / view switching
  components/
    dashboard.tsx                      # exam selection screen
    exams/
      awsCloudPractitioner.tsx         # technical exams
      awsDeveloper.tsx
      claudeArchitect.tsx
      language/
        examKit.tsx                    # shared UI kit, exam shell, translate panel
        ieltsAcademic.tsx              # language exams
        ieltsGeneral.tsx
        pteAcademic.tsx
  services/
    feedback.ts                        # OpenAI calls (writing feedback + translation)
  types/
```
