# Implementation Plan: Synchronize Social Metadata & Domain Branding

## Objective
Update the portfolio's Next.js metadata to use the production domain (`benjaminsz.com`), replacing placeholder Vercel URLs. This ensures that sharing the site link on social media or mobile apps displays the correct branding, images, and canonical URLs.

## Tasks

### 1. Update Root Metadata (`src/app/layout.tsx`)
- Add `metadataBase: new URL('https://benjaminsz.com')` to the `metadata` object.
- Update `openGraph.url` to `'https://benjaminsz.com'`.
- Update `openGraph.siteName` to `'Benjamin Sanchez Zebadua | FinTech Architect'`.
- Update `alternates.canonical` to `'https://benjaminsz.com'`.

### 2. Verify Asset Sync (Public Folder)
- The files `/og-image.png`, `/apple-touch-icon.png`, and `/favicon.ico` have been verified to exist in the `/public` directory. They are already correctly referenced in the `layout.tsx` metadata config.

### 3. Update Dynamic Route Metadata (`src/app/entry/[slug]/page.tsx`)
- Enhance the `generateMetadata` function to include explicit canonical and openGraph relative URLs (`/entry/${slug}`). By combining this with the `metadataBase` from the root layout, Next.js will automatically generate fully qualified URLs (e.g., `https://benjaminsz.com/entry/my-post`) for individual articles.

## Walkthrough Generation
After implementing these changes, I will generate a walkthrough guide on how to manually test and verify the metadata using browser tools.

## Approval Request
Please review the proposed plan above. If you agree with these changes, please approve and I will proceed with the implementation.
