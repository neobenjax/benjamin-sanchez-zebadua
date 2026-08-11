import { describe, it, expect } from "vitest";
import {
  parseHeaderMarkdown,
  parseFooterMarkdown,
  getParsedHeaderFragment,
  getParsedFooterFragment,
} from "../lib/fragments";

describe("Markdown Fragment Transpiler Engine", () => {
  it("transpiles header markdown into HeaderAST correctly", () => {
    const sampleHeader = `
# LEFT_SIDE_HEADER

[![Website Logo](/logo.svg)](/)

# RIGHT_SIDE_HEADER

[About Me](/about)
[Articles](/articles)
[Download CV](/resume.pdf)
`;

    const ast = parseHeaderMarkdown(sampleHeader);
    expect(ast.layout).toBe("LEFT_SIDE_HEADER");
    expect(ast.branding.length).toBe(1);
    expect(ast.branding[0].imageUrl).toBe("/logo.svg");
    expect(ast.branding[0].href).toBe("/");

    expect(ast.navigation.length).toBe(2);
    expect(ast.navigation[0].text).toBe("About Me");
    expect(ast.navigation[1].text).toBe("Articles");

    expect(ast.actions.length).toBe(1);
    expect(ast.actions[0].text).toBe("Download CV");
    expect(ast.actions[0].isDownload).toBe(true);
  });

  it("transpiles footer markdown into FooterAST correctly", () => {
    const sampleFooter = `
# THREE_COLUMN_LAYOUT

## COLUMN
### Connect
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2)](https://linkedin.com)
[Reach out by email](mailto:hello@example.com)

## COLUMN
### Navigation
[About Me](/about)
[Projects](/projects)

## COLUMN
### Location
Ottawa, ON
[Theme Tuner](/theme-personalize)
`;

    const ast = parseFooterMarkdown(sampleFooter);
    expect(ast.layout).toBe("THREE_COLUMN_LAYOUT");
    expect(ast.columns.length).toBe(3);

    expect(ast.columns[0].title).toBe("Connect");
    expect(ast.columns[0].links.length).toBe(2);
    expect(ast.columns[0].links[1].isMailto).toBe(true);

    expect(ast.columns[1].title).toBe("Navigation");
    expect(ast.columns[1].links.length).toBe(2);

    expect(ast.columns[2].title).toBe("Location");
    expect(ast.columns[2].textBlocks).toContain("Ottawa, ON");
  });

  it("loads actual fragments from content/fragments/", () => {
    const header = getParsedHeaderFragment();
    expect(header).toBeDefined();
    expect(header.actions.length).toBeGreaterThan(0);

    const footer = getParsedFooterFragment();
    expect(footer).toBeDefined();
    expect(footer.columns.length).toBeGreaterThan(0);
  });
});
