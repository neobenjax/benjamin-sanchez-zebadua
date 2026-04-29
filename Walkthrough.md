# Metadata Update Walkthrough

The portfolio project has been successfully updated to use the production domain (`benjaminsz.com`) for all metadata and Open Graph tags.

## What Was Changed

1. **`src/app/layout.tsx`**
   - Added `metadataBase: new URL('https://benjaminsz.com')` to auto-resolve relative metadata paths.
   - Replaced `https://your-vercel-url.com` with `https://benjaminsz.com` for `openGraph.url` and `alternates.canonical`.
   - Updated `openGraph.siteName` to "Benjamin Sanchez Zebadua | FinTech Architect" for consistent branding.

2. **`src/app/entry/[slug]/page.tsx`**
   - Configured `generateMetadata` to explicitly pass `/entry/${slug}` for `canonical` and `openGraph.url`.
   - Thanks to Next.js's native features, these relative URLs combine with `metadataBase` to automatically form complete production URLs like `https://benjaminsz.com/entry/some-article-slug`.

## How to Test Manually

Once the application is running locally (or in your production environment), you can verify the meta tags in your browser.

1. **Start the Development Server**
   Run the project using `npm run dev` and navigate to `http://localhost:3000`.

2. **Inspect the `<head>` of the Homepage**
   - Right-click anywhere on the page and select **"Inspect"** or **"Inspect Element"**.
   - Open the `<head>` section of the HTML document.
   - Look for the following elements:
     - `<link rel="canonical" href="https://benjaminsz.com">`
     - `<meta property="og:url" content="https://benjaminsz.com">`
     - `<meta property="og:image" content="https://benjaminsz.com/og-image.png">`
     - `<meta property="og:site_name" content="Benjamin Sanchez Zebadua | FinTech Architect">`

3. **Inspect a Dynamic Route (e.g., an article page)**
   - Click on any blog post or case study (e.g., `http://localhost:3000/entry/003-intentionality-and-milestones`).
   - Right-click and inspect the `<head>` element again.
   - Look for the updated dynamic URLs:
     - `<link rel="canonical" href="https://benjaminsz.com/entry/003-intentionality-and-milestones">`
     - `<meta property="og:url" content="https://benjaminsz.com/entry/003-intentionality-and-milestones">`

4. **Test with Social Sharing Debuggers (Production Only)**
   Once the site is deployed, you can use these tools to preview how the card will look when shared:
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator) (or X's current equivalent)
   - Simply paste your domain or an article URL into these tools, and they will fetch and display the preview image (`/og-image.png`), title, description, and canonical URL.
