import matter from "gray-matter";
import type {
  HeaderAST,
  FooterAST,
  FooterColumnAST,
  FragmentLink,
  HeaderDirective,
  FooterDirective,
} from "@/types/fragments";

const STATIC_HEADER_MD = `# LEFT_SIDE_HEADER

[![BENJAMIN // FINTECH ARCHITECT](/favicon.svg)](/)

# RIGHT_SIDE_HEADER

[About Me](/#about)
[Synergy](/#synergy)
[Journey](/#journey)
[Articles](/articles)
[Download CV](/benjamin-cv.pdf)
`;

const STATIC_FOOTER_MD = `# THREE_COLUMN_LAYOUT

## COLUMN

### Connect & Collaborate

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/benjaminsanchezzebadua/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/neobenjax)
[Reach out via email](mailto:hello@benjaminsz.com?subject=Exploration%3A%20Bridging%20Tech%20%26%20Finance%20with%20Benjamin&body=Hi%20Benjamin%2C%20I%20came%20across%20your%20FinTech%20Architect%20portfolio.%20I%E2%80%99m%20interested%20in%20your%20dual-core%20approach%E2%80%94specifically%20how%20you%E2%80%99re%20applying%20a%20computing%20mindset%20to%20financial%20strategy.%20Are%20you%20available%20for%20a%20brief%20sync%20regarding%20%5BProject%2FRole%5D%3F)

## COLUMN

### Navigation

[About Me](/#about)
[Synergy](/#synergy)
[Journey](/#journey)
[Articles](/articles)

## COLUMN

### Platform

[Privacy & Terms](/#privacy)
Ottawa, ON | Relocated from Mexico
`;

function getFragmentFilePath(fileName: string): string | null {
  if (typeof window !== "undefined") return null;
  try {
    // Dynamic node require to prevent client bundle resolution errors in Next.js Turbopack
    const fs = require("fs");
    const path = require("path");
    const FRAGMENTS_DIR = path.join(process.cwd(), "content", "fragments");
    const TEMP_FRAGMENTS_DIR = path.join(process.cwd(), "temp_fragments");

    const primaryPath = path.join(FRAGMENTS_DIR, fileName);
    if (fs.existsSync(primaryPath)) {
      return primaryPath;
    }
    const tempPath = path.join(TEMP_FRAGMENTS_DIR, fileName);
    if (fs.existsSync(tempPath)) {
      return tempPath;
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
  Regex helper to parse a markdown link or image-link:
  1. Image link: [![alt](img_url)](href)
  2. Standard link: [text](href)
*/
function parseLinksFromText(text: string): FragmentLink[] {
  const links: FragmentLink[] = [];

  // Match image link [![alt](imgUrl)](href)
  const imgLinkRegex = /\[\s*!\[([^\]]*)\]\(([^)]+)\)\s*\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  let processedText = text;

  while ((match = imgLinkRegex.exec(text)) !== null) {
    const alt = match[1]?.trim() || "";
    const imgUrl = match[2]?.trim() || "";
    const href = match[3]?.trim() || "";

    links.push({
      text: alt,
      href,
      isExternal: href.startsWith("http://") || href.startsWith("https://"),
      isAction: false,
      isDownload: href.endsWith(".pdf"),
      isMailto: href.startsWith("mailto:"),
      imageUrl: imgUrl,
      imageAlt: alt,
    });
  }

  // Remove already matched image links so standard link regex doesn't double capture
  processedText = processedText.replace(imgLinkRegex, "");

  // Match standard link [text](href)
  const stdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = stdLinkRegex.exec(processedText)) !== null) {
    const linkText = match[1]?.trim() || "";
    const href = match[2]?.trim() || "";
    const isDownload = href.endsWith(".pdf") || linkText.toLowerCase().includes("download");
    const isMailto = href.startsWith("mailto:");

    links.push({
      text: linkText,
      href,
      isExternal: href.startsWith("http://") || href.startsWith("https://"),
      isAction: isDownload || isMailto,
      isDownload,
      isMailto,
    });
  }

  return links;
}

/**
 * Transpiler Engine: Parses header.md markdown content into HeaderAST.
 */
export function parseHeaderMarkdown(markdown: string): HeaderAST {
  const { content } = matter(markdown);
  const lines = content.split("\n");

  let currentSection: "LEFT" | "RIGHT" | null = null;
  const leftLinks: FragmentLink[] = [];
  const rightLinks: FragmentLink[] = [];
  let headerDirective: HeaderDirective = "LEFT_SIDE_HEADER";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("# ")) {
      const heading = line.replace(/^#\s+/, "").trim();
      if (heading.includes("LEFT_SIDE") || heading.includes("BRANDING_LEFT")) {
        currentSection = "LEFT";
        headerDirective = heading as HeaderDirective;
      } else if (heading.includes("RIGHT_SIDE") || heading.includes("NAVIGATION_RIGHT")) {
        currentSection = "RIGHT";
      } else if (heading.includes("CENTERED")) {
        currentSection = "LEFT";
        headerDirective = "CENTERED_HEADER";
      }
      continue;
    }

    const links = parseLinksFromText(line);
    if (currentSection === "LEFT") {
      leftLinks.push(...links);
    } else if (currentSection === "RIGHT") {
      rightLinks.push(...links);
    } else {
      // Default to right side if no heading hit yet
      rightLinks.push(...links);
    }
  }

  // Split rightLinks into standard nav links and action buttons
  const navigation = rightLinks.filter((link) => !link.isAction);
  const actions = rightLinks.filter((link) => link.isAction);

  return {
    layout: headerDirective,
    branding: leftLinks,
    navigation,
    actions,
    rawMarkdown: content,
  };
}

/**
 * Transpiler Engine: Parses footer.md markdown content into FooterAST.
 */
export function parseFooterMarkdown(markdown: string): FooterAST {
  const { content } = matter(markdown);
  const lines = content.split("\n");

  let footerDirective: FooterDirective = "THREE_COLUMN_LAYOUT";
  const columns: FooterColumnAST[] = [];
  let currentColumn: FooterColumnAST | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("# ")) {
      const heading = line.replace(/^#\s+/, "").trim();
      if (
        heading.includes("THREE_COLUMN") ||
        heading.includes("TWO_COLUMN") ||
        heading.includes("FOUR_COLUMN") ||
        heading.includes("CENTERED_FOOTER")
      ) {
        footerDirective = heading as FooterDirective;
      }
      continue;
    }

    if (line.startsWith("## ")) {
      if (currentColumn) {
        columns.push(currentColumn);
      }
      currentColumn = {
        links: [],
        textBlocks: [],
      };
      continue;
    }

    if (line.startsWith("### ")) {
      const title = line.replace(/^###\s+/, "").trim();
      if (!currentColumn) {
        currentColumn = { links: [], textBlocks: [] };
      }
      currentColumn.title = title;
      continue;
    }

    const links = parseLinksFromText(line);
    if (!currentColumn) {
      currentColumn = { links: [], textBlocks: [] };
    }

    if (links.length > 0) {
      currentColumn.links.push(...links);
    } else {
      currentColumn.textBlocks.push(line);
    }
  }

  if (currentColumn) {
    columns.push(currentColumn);
  }

  return {
    layout: footerDirective,
    columns,
    rawMarkdown: content,
  };
}

/**
 * Reads and parses header.md fragment from content/fragments (or temp_fragments fallback).
 */
export function getParsedHeaderFragment(): HeaderAST {
  if (typeof window !== "undefined") {
    return fallbackHeaderAST();
  }
  try {
    const filePath = getFragmentFilePath("header.md");
    if (!filePath) {
      return fallbackHeaderAST();
    }
    const fs = require("fs");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return parseHeaderMarkdown(fileContents);
  } catch (error) {
    console.error("Error reading header fragment:", error);
    return fallbackHeaderAST();
  }
}

/**
 * Reads and parses footer.md fragment from content/fragments (or temp_fragments fallback).
 */
export function getParsedFooterFragment(): FooterAST {
  if (typeof window !== "undefined") {
    return fallbackFooterAST();
  }
  try {
    const filePath = getFragmentFilePath("footer.md");
    if (!filePath) {
      return fallbackFooterAST();
    }
    const fs = require("fs");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return parseFooterMarkdown(fileContents);
  } catch (error) {
    console.error("Error reading footer fragment:", error);
    return fallbackFooterAST();
  }
}

function fallbackHeaderAST(): HeaderAST {
  return parseHeaderMarkdown(STATIC_HEADER_MD);
}

function fallbackFooterAST(): FooterAST {
  return parseFooterMarkdown(STATIC_FOOTER_MD);
}
