# Walkthrough: Behavioral Events & Visibility Tracking

## Summary of Changes
1. **Section Visibility Tracking**:
   - Created `src/hooks/useSectionTracking.ts`. This custom hook utilizes the `IntersectionObserver` API to monitor elements on the screen. It triggers an `umami.track("Section View", { name: "..." })` event whenever the bound section remains visible on screen for more than 1 second.
   - Connected this hook to four primary architectural components:
     - `Hero.tsx` -> Tracks as `hero`
     - `Journey.tsx` -> Tracks as `journey`
     - `Insights.tsx` (Strategic Feed) -> Tracks as `strategic-feed`
     - `Toolbox.tsx` (Skills) -> Tracks as `skills`

2. **Interaction Tracking (Intent Events)**:
   - Modified `Insights.tsx` to add `data-umami-event="article-card-click"` to the post preview links.
   - Modified `TagFilterDropdown.tsx` to utilize `data-umami-event="filter-dropdown-use"` for tracking usage of the insight filtering mechanism.
   - Modified `SkillTag.tsx` to utilize `data-umami-event="tag-pill-click"` to track direct clicks on the skill pills.

3. **Performance Telemetry**:
   - Updated the `next/script` in `src/app/layout.tsx` to include `data-performance="true"`. This allows Umami to automatically capture core web vitals and overall page performance metrics out-of-the-box.

4. **Error Monitoring**:
   - Created `src/app/not-found.tsx` to provide a visually congruent "404 Not Found" experience that automatically logs a `System Error` event to Umami containing the requested path.
   - Created `src/app/error.tsx` as a Next.js error boundary to catch internal application errors (500s) and log a `System Error` to Umami before presenting the user with an option to recover the application state.
   - Implemented an elegant visual language matching the `bg-primary` and `accent` aesthetic for both error pages.

5. **Type Safety**:
   - Added `src/types/global.d.ts` to cleanly extend the `Window` interface, preventing TypeScript errors related to accessing `window.umami` throughout the codebase.

## How to Test Manually

1. **Verify Development Tracking**:
   - By default, Umami doesn't execute its script in `development` mode (due to `NODE_ENV === "production"` in `layout.tsx`). To test locally:
     - Run `npm run build && npm start`.
     - Alternatively, temporarily remove `{process.env.NODE_ENV === "production" && (` in `layout.tsx` and run `npm run dev`.

2. **Test Section Visibility Tracking**:
   - Load the homepage. Keep the Hero section in view for >1 second.
   - Scroll down slowly. Stop at the Journey timeline, the Strategic Feed, and The Toolbox. Ensure you pause for at least 1 second on each.
   - Open your browser's **Network tab** (F12 > Network). You should see `POST` requests to `https://cloud.umami.is/api/send` containing `"name": "Section View"` and `"data": { "name": "..." }`.

3. **Test Intent Events (Interactions)**:
   - On the homepage or Insights page, click an Article Card Link ("Read Analysis").
   - Click a "Skill Pill" (e.g., "Next.js" or "Wealth Management").
   - Change a selection in the Tag Filter Dropdown on the Insights page.
   - In the Network tab, look for the `POST` requests recording these direct event names (`article-card-click`, `tag-pill-click`, `filter-dropdown-use`).

4. **Test Error Boundaries**:
   - Navigate to a non-existent URL (e.g., `http://localhost:3000/does-not-exist`). You should see the custom "404" screen. Check the Network tab to ensure a `System Error` event with `type: '404'` fired.

5. **Test Performance Telemetry**:
   - Performance metrics are collected automatically when the page load lifecycle completes. Reload the homepage and look for the final `POST` event to Umami; its payload should contain additional variables related to Core Web Vitals (LCP, CLS, etc.).
