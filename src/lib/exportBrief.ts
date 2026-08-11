import { profileData } from "@/data/profile";

export function generateExecutiveBriefMarkdown(): string {
  const timestamp = new Date().toISOString().split('T')[0];
  
  return `# EXECUTIVE ARCHITECTURE BRIEF: BENJAMIN SANCHEZ ZEBADUA
Generated: ${timestamp}
Domain: FinTech Architecture | Software Engineering | Wealth & Risk Strategy

---

## 👨‍💻 PROFESSIONAL PROFILE
- **Name**: ${profileData.name}
- **Role**: ${profileData.title}
- **Location**: ${profileData.location}
- **Focus**: ${profileData.tagline}

---

## 🏛️ CORE COMPETENCIES & ARCHITECTURE MASTERY
${profileData.skills.map((s) => `- **${s.name}**: ${s.level} Level (${s.years} yrs) - Category: ${s.category}`).join('\n')}

---

## 🚀 KEY ACHIEVEMENTS & MILESTONES
${profileData.highlights.map((h) => `- **${h.title}**: ${h.description}`).join('\n')}

---

## 📞 CONTACT & RECRUITMENT SYNCS
- **Email**: hello@benjaminsz.com
- **LinkedIn**: ${profileData.social.linkedin}
- **GitHub**: ${profileData.social.github}

---
*Exported directly from https://benjaminsz.com*
`;
}

export function downloadExecutiveBrief(): void {
  const content = generateExecutiveBriefMarkdown();
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Benjamin_Sanchez_Zebadua_FinTech_Architecture_Brief.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
