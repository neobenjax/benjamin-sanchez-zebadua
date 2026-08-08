import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  HeaderAST,
  FooterAST,
  FooterColumnAST,
  FragmentLink,
  HeaderDirective,
  FooterDirective,
} from "@/types/fragments";

const FRAGMENTS_DIR = path.join(process.cwd(), "content", "fragments");
const TEMP_FRAGMENTS_DIR = path.join(process.cwd(), "temp_fragments");

function getFragmentFilePath(fileName: string): string {
  const primaryPath = path.join(FRAGMENTS_DIR, fileName);
  if (fs.existsSync(primaryPath)) {
    return primaryPath;
  }
  return path.join(TEMP_FRAGMENTS_DIR, fileName);
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
  try {
    const filePath = getFragmentFilePath("header.md");
    if (!fs.existsSync(filePath)) {
      return fallbackHeaderAST();
    }
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
  try {
    const filePath = getFragmentFilePath("footer.md");
    if (!fs.existsSync(filePath)) {
      return fallbackFooterAST();
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    return parseFooterMarkdown(fileContents);
  } catch (error) {
    console.error("Error reading footer fragment:", error);
    return fallbackFooterAST();
  }
}

function fallbackHeaderAST(): HeaderAST {
  return {
    layout: "LEFT_SIDE_HEADER",
    branding: [
      {
        text: "BENJAMIN // FINTECH ARCHITECT",
        href: "/",
        isExternal: false,
        isAction: false,
        isDownload: false,
        isMailto: false,
      },
    ],
    navigation: [
      { text: "About Me", href: "/#about", isExternal: false, isAction: false, isDownload: false, isMailto: false },
      { text: "Synergy", href: "/#synergy", isExternal: false, isAction: false, isDownload: false, isMailto: false },
      { text: "Journey", href: "/#journey", isExternal: false, isAction: false, isDownload: false, isMailto: false },
      { text: "Articles", href: "/articles", isExternal: false, isAction: false, isDownload: false, isMailto: false },
    ],
    actions: [
      { text: "Download CV", href: "/benjamin-cv.pdf", isExternal: false, isAction: true, isDownload: true, isMailto: false },
    ],
    rawMarkdown: "# LEFT_SIDE_HEADER\n[BENJAMIN // FINTECH ARCHITECT](/)\n# RIGHT_SIDE_HEADER\n[About Me](/#about)\n[Download CV](/benjamin-cv.pdf)",
  };
}

function fallbackFooterAST(): FooterAST {
  return {
    layout: "THREE_COLUMN_LAYOUT",
    columns: [
      {
        title: "Connect & Collaborate",
        links: [
          { text: "Reach out via email", href: "mailto:hello@benjaminsz.com", isExternal: false, isAction: true, isDownload: false, isMailto: true },
        ],
        textBlocks: [],
      },
      {
        title: "Navigation",
        links: [
          { text: "About Me", href: "/#about", isExternal: false, isAction: false, isDownload: false, isMailto: false },
          { text: "Articles", href: "/articles", isExternal: false, isAction: false, isDownload: false, isMailto: false },
        ],
        textBlocks: [],
      },
      {
        title: "Platform",
        links: [
          { text: "Theme Tuner", href: "/theme-personalize", isExternal: false, isAction: false, isDownload: false, isMailto: false },
        ],
        textBlocks: ["Ottawa, ON | Relocated from Mexico"],
      },
    ],
    rawMarkdown: "# THREE_COLUMN_LAYOUT\n## COLUMN\n[Reach out via email](mailto:hello@benjaminsz.com)",
  };
}
