import { profileData } from "@/data/profile";

export function generateExecutiveBriefMarkdown(): string {
  const timestamp = new Date().toISOString().split("T")[0];

  const synergySection = profileData.synergy
    .map((item) => `- **${item.title}**: ${item.description} *(Skills: ${item.technologies.join(", ")})*`)
    .join("\n");

  const toolboxSection = profileData.toolbox
    .map((cat) => `### ${cat.title}\n${cat.skills.map((skill) => `- ${skill}`).join("\n")}`)
    .join("\n\n");

  const journeySection = profileData.journey
    .map(
      (node) =>
        `### ${node.role} — ${node.company} (${node.period})\n` +
        `${node.description}\n\n` +
        `**Key Highlights:**\n` +
        node.highlights.map((h) => `- ${h}`).join("\n")
    )
    .join("\n\n");

  const insightsSection = profileData.insights
    .map((ins) => `- **${ins.title}** (${ins.category}): ${ins.description} [Metrics: ${ins.metrics.join(", ")}]`)
    .join("\n");

  return `# EXECUTIVE ARCHITECTURE BRIEF: BENJAMIN SANCHEZ ZEBADUA
Generated: ${timestamp}
Domain: FinTech Architecture | Software Engineering | Wealth & Risk Strategy

---

## 👨‍💻 PROFESSIONAL PROFILE
- **Name**: Benjamin Sanchez Zebadua
- **Headline**: ${profileData.hero.headline}
- **Location**: Based in Ottawa, ON | From Mexico to Canada
- **Executive Summary**: ${profileData.hero.subtext}

---

## ⚡ ARCHITECTURAL SYNERGY & PHILOSOPHY
${synergySection}

---

## 🏛️ TOOLBOX & TECHNICAL COMPETENCIES
${toolboxSection}

---

## 🚀 CAREER JOURNEY & MILESTONES
${journeySection}

---

## 📈 STRATEGIC CASE STUDIES & INSIGHTS
${insightsSection}

---

## 📞 CONTACT & RECRUITMENT SYNCS
- **Email**: ${profileData.social.email}
- **LinkedIn**: ${profileData.social.linkedin}
- **GitHub**: ${profileData.social.github}

---
*Exported directly from https://benjaminsz.com*
`;
}

export function downloadExecutiveBrief(): void {
  const content = generateExecutiveBriefMarkdown();
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Benjamin_Sanchez_Zebadua_FinTech_Architecture_Brief.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

