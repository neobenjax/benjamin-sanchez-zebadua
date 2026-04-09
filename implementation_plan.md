# Implementation Plan: Benjamin's Portfolio

## 1. Context & Objectives
Build a production-ready, mobile-first personal portfolio for Benjamin, a FinTech Strategist transitioning from Senior Software Engineer to Canadian Wealth Management. The design language is "Institutional Trust" (similar to Goldman Sachs or Stripe) featuring a default dark mode, navy primary colors, and success green accents.

## 2. Tech Stack Setup
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide-React
- **Architecture**: Modular components driven by a central `src/data/profile.ts` file.

## 3. Execution Phases

### Phase 1: Project Initialization & Configuration (Current Step)
- Create Next.js application using `create-next-app`.
- Install necessary dependencies (`framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`).
- Configure `tailwind.config.ts` with custom color palette:
  - Primary: Navy (`#0A192F`)
  - Secondary: Charcoal (Dark Grays)
  - Accent: Success Green (`#10B981`)
- Set up global CSS (`globals.css`) for default dark mode, typography, and glassmorphism utilities.
- Create the responsive **Navigation Component** as a foundation.

### Phase 2: Core Data Engine
- Establish `src/data/profile.ts`.
- Define typing and populate initial drafted data for:
  - Hero Data
  - Synergy Competencies
  - Journey Timeline Nodes
  - Insights / Case Studies
  - Toolbox (Tech/Finance)

### Phase 3: UI Component Assembly
- **Hero Section**: Implement with Framer Motion for weighted, sophisticated entrance.
- **The Synergy Grid**: Glassmorphism cards displaying core competencies.
- **Journey Timeline**: Interactive timeline showing phase transitions.
- **Insights Grid**: Cards focusing on financial case studies instead of typical code repos.
- **The Toolbox**: Combined grid layout using subtle hover state micro-animations.

### Phase 4: Integration & UX Polish
- Assemble sections into the main page (`src/app/page.tsx`).
- Refine mobile responsiveness (hamburger menus, stacking grids).
- Add scroll-triggered animations and scroll spy for navigation.
- Audit performance and SEO metadata.

### Phase 5: Testing, Walkthrough & Delivery
- Write detailed walkthrough guide for manual testing.
- Obtain user approval for functionality and design.
- Create git feature branch, stash, commit, push, merge, and clean up.
