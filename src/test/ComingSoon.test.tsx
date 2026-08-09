import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import FragmentComingSoon from "../components/fragments/FragmentComingSoon";
import {
  parseComingSoonMarkdown,
  getParsedComingSoonFragment,
} from "../lib/fragments";

describe("Coming Soon Fragment Transpiler & Component Suite", () => {
  it("transpiles coming_soon.md markdown into ComingSoonAST correctly", () => {
    const sampleMarkdown = `# HERO_SECTION

## HERO_TITLE
Precision in Code. Performance in Finance.

## HERO_SUBTITLE
< AI Practitioner & FinTech Solutions Architect >

## HERO_STATEMENT
I am Benjamin Sanchez Zebadua. Bridge computing mindset to financial strategy.

## HERO_ACTIONS
[Let's Connect](https://www.linkedin.com/in/benjaminsanchezzebadua/)
[Reach Out via Email](mailto:benjaminsz.work@gmail.com)
[Download CV](/benjamin-cv.pdf)

# COMING_SOON_SECTION

## COMING_SOON_STATEMENT
This site is being crafted meticulously.
/* TODO: Compiling production-grade excellence... Stay tuned! */

## COMING_SOON_ILLUSTRATION
![Architect Diagram](/images/architect-blueprint.svg)
`;

    const ast = parseComingSoonMarkdown(sampleMarkdown);

    expect(ast.heroTitle).toBe("Precision in Code. Performance in Finance.");
    expect(ast.heroSubtitle).toBe("< AI Practitioner & FinTech Solutions Architect >");
    expect(ast.heroStatement).toBe(
      "I am Benjamin Sanchez Zebadua. Bridge computing mindset to financial strategy."
    );
    expect(ast.heroActions.length).toBe(3);
    expect(ast.heroActions[0].text).toBe("Let's Connect");
    expect(ast.heroActions[0].href).toContain("linkedin.com");
    expect(ast.heroActions[1].isMailto).toBe(true);
    expect(ast.heroActions[2].isDownload).toBe(true);
    expect(ast.comingSoonStatement).toContain("crafted meticulously");
    expect(ast.illustrationUrl).toBe("/images/architect-blueprint.svg");
  });

  it("loads actual coming_soon.md fragment from content/fragments/", () => {
    const ast = getParsedComingSoonFragment();
    expect(ast).toBeDefined();
    expect(ast.heroTitle).toContain("Precision in Code");
    expect(ast.heroActions.length).toBe(3);
    expect(ast.comingSoonStatement).toContain("crafted meticulously");
  });

  it("FragmentComingSoon component has zero accessibility (axe-core) violations", async () => {
    const ast = getParsedComingSoonFragment();
    const { container } = render(
      <ThemeProvider>
        <FragmentComingSoon ast={ast} />
      </ThemeProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
