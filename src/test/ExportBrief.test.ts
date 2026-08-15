import { describe, it, expect, vi } from "vitest";
import { generateExecutiveBriefMarkdown, downloadExecutiveBrief } from "@/lib/exportBrief";
import { profileData } from "@/data/profile";

describe("Export Executive Brief Utility", () => {
  it("generates markdown containing complete profile data structure", () => {
    const markdown = generateExecutiveBriefMarkdown();

    expect(markdown).toContain("# EXECUTIVE ARCHITECTURE BRIEF: BENJAMIN SANCHEZ ZEBADUA");
    expect(markdown).toContain("Benjamin Sanchez Zebadua");
    expect(markdown).toContain(profileData.hero.headline);
    expect(markdown).toContain(profileData.social.email);
    expect(markdown).toContain(profileData.social.linkedin);
    expect(markdown).toContain(profileData.social.github);
  });

  it("includes synergy items, toolbox categories, and journey milestones", () => {
    const markdown = generateExecutiveBriefMarkdown();

    // Check synergy
    expect(markdown).toContain("## ⚡ ARCHITECTURAL SYNERGY & PHILOSOPHY");
    expect(markdown).toContain(profileData.synergy[0].title);

    // Check toolbox
    expect(markdown).toContain("## 🏛️ TOOLBOX & TECHNICAL COMPETENCIES");
    expect(markdown).toContain(profileData.toolbox[0].title);

    // Check journey
    expect(markdown).toContain("## 🚀 CAREER JOURNEY & MILESTONES");
    expect(markdown).toContain(profileData.journey[0].company);

    // Check insights
    expect(markdown).toContain("## 📈 STRATEGIC CASE STUDIES & INSIGHTS");
    expect(markdown).toContain(profileData.insights[0].title);
  });

  it("executes downloadExecutiveBrief without runtime error in DOM environment", () => {
    const createObjectURLMock = vi.fn(() => "blob:http://localhost/mock-blob");
    const revokeObjectURLMock = vi.fn();
    window.URL.createObjectURL = createObjectURLMock;
    window.URL.revokeObjectURL = revokeObjectURLMock;

    expect(() => downloadExecutiveBrief()).not.toThrow();
    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledTimes(1);
  });
});
