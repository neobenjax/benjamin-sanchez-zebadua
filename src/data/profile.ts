import { Code, LineChart, Cpu, Briefcase, GraduationCap, BarChart } from "lucide-react";

export interface HeroData {
  headline: string;
  subtext: string;
}

export interface SynergyItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  technologies: string[];
}

export interface TimelineNode {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  type: "engineering" | "finance" | "education";
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface InsightCaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  badgeType: "metric" | "reading";
  readingTime?: string;
  chartData?: ChartDataPoint[];
}

export interface ToolboxCategory {
  title: string;
  skills: string[];
}

export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
}

export interface ProfileData {
  hero: HeroData;
  synergy: SynergyItem[];
  journey: TimelineNode[];
  insights: InsightCaseStudy[];
  toolbox: ToolboxCategory[];
  social: SocialLinks;
}

export const profileData: ProfileData = {
  hero: {
    headline: "Precision in Code. Performance in Finance.",
    subtext: "I am Benjamin Sanchez Zebadua. I apply a computing mindset to bridge the gap between complex data and actionable solutions. Whether architecting scalable systems or engineering financial strategies, I deliver precision-driven results for a digital-first economy. My journey took me from the high-traffic tech hubs of Mexico to the Canadian financial landscape, and I bring that same disciplined, global mindset to every project.",
  },

  synergy: [
    {
      id: "computing-mindset",
      title: "Computing Mindset",
      description: "I approach complex financial planning with the structured, persistent problem-solving of a Senior Developer. I see systems where others see noise.",
      iconName: "Cpu",
      technologies: ["Systematic Risk Analysis", "Algorithmic Efficiency", "Financial Architecture"],
    },
    {
      id: "work-ethic",
      title: "Uncompromising Work Ethic",
      description: "Privacy & Compliance-Aware AI usage: High-efficiency automation guarded by strict data integrity standards.",
      iconName: "Briefcase",
      technologies: ["Due Diligence", "Enterprise Compliance", "Data Integrity"],
    },
    {
      id: "learning-machine",
      title: "The Learning Machine",
      description: "Rapidly mastered diverse domains—from high-traffic JavaScript frameworks at BBVA to Canadian Tax & Estate Planning at Lambton.",
      iconName: "LineChart",
      technologies: ["Rapid Domain Adaptation", "Cross-Disciplinary Execution", "Continuous Growth"],
    }
  ],

  journey: [
    {
      id: "financial-intern",
      period: "Jan 2026 — Apr 2026",
      role: "Financial Risk & Advisory Analyst",
      company: "Lambton College",
      description: "Executed actionable wealth solutions bridging theoretical finance with strictly regulated frameworks.",
      highlights: [
        "Formulated strategic tax-minimization plans and analyzed market funds (T-bills, cash equivalents) for customized growth proposals.",
        "Developed comprehensive retirement projections and estate liability reports for client portfolios.",
        "Collaborated on ESG-compliant investment strategies, evaluating reputational impacts and ethical goal alignment."
      ],
      type: "finance"
    },
    {
      id: "lambton-pg",
      period: "Present Phase (Canada)",
      role: "PG Financial Planning & Wealth Management",
      company: "Lambton College",
      description: "Bridging theoretical finance with real-world client solutions.",
      highlights: [
        "Obtained Investment Funds in Canada (IFC) Certification while mastering advanced Canadian institutional frameworks.",
        "Translated engineering logic to quantitative portfolio modeling.",
        "Specialized in core Canadian tax and estate planning fundamentals."
      ],
      type: "education"
    },
    {
      id: "bbva-senior-dev",
      period: "Oct 2019 — Oct 2024 (Mexico)",
      role: "Senior Software Developer",
      company: "BBVA Mexico",
      description: "Spearheaded high-traffic JavaScript applications within robust legacy frameworks.",
      highlights: [
        "Led AI tool integration to optimize coding efficiency, accelerating implementation and reducing manual errors.",
        "Spearheaded performance initiatives resulting in a 30% boost in application reliability and speed in high-traffic environments.",
        "Established organization-wide best practices, reducing defect rates by 20% and enhancing software quality standards."
      ],
      type: "engineering"
    }
  ],

  insights: [
    {
      id: "undervalued-stock",
      title: "Fundamental Analysis in Mid-Caps",
      category: "Equity Research",
      description: "Using raw data and institutional reporting to identify undervalued market opportunities for Canadian mid-cap equities.",
      metrics: ["DCF Modeling", "EBITDA Multiples", "Value Analysis"],
      badgeType: "metric",
      chartData: [
        { date: "M1", value: 45 },
        { date: "M2", value: 42 },
        { date: "M3", value: 39 },
        { date: "M4", value: 50 },
        { date: "M5", value: 68 },
        { date: "M6", value: 85 },
      ]
    },
    {
      id: "app-reliability",
      title: "Enterprise Reliability & Optimization",
      category: "Software Architecture",
      description: "Analyzing the 30% technical reliability boost at BBVA through the integration of Next-Gen systems and AI efficiency tooling.",
      metrics: ["System Uptime", "AI Integration", "Traffic Loads"],
      badgeType: "metric",
      chartData: [
        { date: "Q1", value: 70 },
        { date: "Q2", value: 82 },
        { date: "Q3", value: 86 },
        { date: "Q4", value: 98 },
        { date: "Q5", value: 99.9 },
      ]
    },
    {
      id: "esg-thought-leadership",
      title: "ESG-Compliant Investment Strategies",
      category: "Thought Leadership",
      description: "Exploring exactly how modern risk frameworks quantify abstract corporate ESG data to drive safer, tax-efficient portfolio yields.",
      metrics: ["ESG Scoring", "Tax Minimization", "Risk Profiling"],
      badgeType: "reading",
      readingTime: "5 min read"
    }
  ],

  toolbox: [
    {
      title: "Track 1: Engineering",
      skills: ["VibeCoding (Google Antigravity)", "AI API Integration (OpenAI, Google)", "Web Development (HTML, CSS, JavaScript, Lit Element)", "Node.js", "DevOps (GitHub/Bitbucket)", "Agile (Scrum/Jira)", "AWS", "Testing (Mocha/Chai)", "Vercel CI/CD", "DNS/Domain Config", "GitHub Actions"]
    },
    {
      title: "Track 2: Finance",
      skills: ["Strategic Tax Minimization", "Estate Planning", "ESG Risk Profiling", "Fundamental Analysis", "DCF Modeling", "IFC Certification", "Retirement Projections", "Wealth Management", "Privacy & Compliance-Aware AI usage", "Real Estate Investment Analysis", "Market Analysis", "Marketing Strategy"]
    }
  ],

  social: {
    email: "hello@benjaminsz.com",
    linkedin: "https://www.linkedin.com/in/benjaminsanchezzebadua/",
    github: "https://github.com/neobenjax"
  }
};
