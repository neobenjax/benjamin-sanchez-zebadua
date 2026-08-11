import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0A192F",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://benjaminsz.com'),
  title: "Benjamin Sanchez Zebadua | FinTech Architect",
  description: "Bridging Software Engineering and Financial Strategy. Delivering precision-driven results for a digital-first economy.",
  keywords: ["FinTech", "Software Engineer", "Wealth Management", "Ottawa", "BBVA", "Financial Strategist"],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Benjamin Sanchez Zebadua | FinTech Architect",
    description: "Precision in Code. Performance in Finance.",
    url: "https://benjaminsz.com",
    siteName: "Benjamin Sanchez Zebadua | FinTech Architect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Benjamin Sanchez Zebadua | FinTech Architect",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benjamin Sanchez Zebadua | FinTech Architect",
    description: "Precision in Code. Performance in Finance.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://benjaminsz.com",
  },
};

import { ThemeProvider } from "@/context/ThemeContext";
import DevTunerLauncher from "@/components/DevTunerLauncher";
import { HeaderFragment } from "@/components/fragments/FragmentRenderer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth`}
    >
      <head>
        <Script
          id="speculation-rules"
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [
                {
                  source: "list",
                  urls: ["/theme-personalize"]
                }
              ],
              prerender: [
                {
                  source: "document",
                  where: { href_matches: "/entry/*" }
                }
              ]
            })
          }}
        />
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="0349ac64-ebc4-4bb6-9963-617ab54ebf4b"
            data-performance="true"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-primary text-foreground">
        <ThemeProvider>
          <HeaderFragment fallback={<Navigation />} />
          {children}
          <Analytics />
          <DevTunerLauncher />
        </ThemeProvider>
      </body>
    </html>
  );
}
