import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import FAB from "@/components/FAB";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0A192F",
};

export const metadata: Metadata = {
  title: "Benjamin Sanchez Zebadua | FinTech Architect",
  description: "Bridging Software Engineering and Financial Strategy. Delivering precision-driven results for a digital-first economy.",
  keywords: ["FinTech", "Software Engineer", "Wealth Management", "Ottawa", "BBVA", "Financial Strategist"],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Benjamin Sanchez Zebadua | FinTech Architect",
    description: "Precision in Code. Performance in Finance.",
    url: "https://your-vercel-url.com",
    siteName: "Benjamin Sanchez Zebadua",
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
    canonical: "https://your-vercel-url.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-primary text-foreground">
        <Navigation />
        {children}
        <FAB />
      </body>
    </html>
  );
}
