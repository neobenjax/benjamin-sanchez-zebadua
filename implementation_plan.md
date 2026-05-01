# Implementation Plan: Behavioral Events & Visibility Tracking

## 1. Section Visibility Tracking
- Create a new hook `src/hooks/useSectionTracking.ts` utilizing `IntersectionObserver`.
- The hook will trigger `window.umami.track('Section View', { name: sectionName })` when the section is visible for more than 1 second.
- Integrate the hook into:
  - `src/components/Hero.tsx` -> 'hero'
  - `src/components/Journey.tsx` -> 'journey'
  - `src/components/Insights.tsx` -> 'strategic-feed'
  - `src/components/Toolbox.tsx` -> 'skills'

## 2. Interaction Tracking (Intent Events)
- In `src/components/Insights.tsx`, add `data-umami-event="article-card-click"` to the post links.
- In `src/components/TagFilterDropdown.tsx`, update the event to `data-umami-event="filter-dropdown-use"`.
- In `src/components/SkillTag.tsx`, add `data-umami-event="tag-pill-click"` to the `Link` element.

## 3. Performance Telemetry
- Modify `src/app/layout.tsx` to include `data-performance="true"` on the Umami `<Script>` tag.
- Ensure the types for `window.umami` are handled via global type declaration or safe checks.

## 4. Error Monitoring
- Create `src/app/not-found.tsx` to automatically trigger `umami.track('System Error', { type: '404', path: window.location.pathname })` on mount.
- Create `src/app/error.tsx` to trigger a similar event for type '500'.
