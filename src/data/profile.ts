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

export interface ProfileData {
  hero: HeroData;
  synergy: SynergyItem[];
  journey: TimelineNode[];
  insights: InsightCaseStudy[];
  toolbox: ToolboxCategory[];
}

export const profileData: ProfileData = {
  hero: {
    headline: "Precision in Code. Performance in Finance.",
    subtext: "I am Benjamin Sanchez Zebadua, based in Ottawa, ON (Relocated from Mexico). I apply a computing mindset to bridge the gap between complex data and actionable solutions. Whether architecting scalable systems or engineering financial strategies, I deliver precision-driven results for a digital-first economy. My journey took me from the high-traffic tech hubs of Mexico to the Canadian financial landscape, and I bring that same disciplined, global mindset to every project.",
  },

  synergy: [
    {
      id: "computing-mindset",
      title: "Computing Mindset",
      description: "\"With a background in software engineering, I am trained to approach complex financial planning with structured, persistent problem-solving.\"",
      iconName: "Cpu",
      technologies: ["Systematic Risk Analysis", "Algorithmic Efficiency", "Financial Architecture"],
    },
    {
      id: "work-ethic",
      title: "Uncompromising Work Ethic",
      description: "\"Whether handling highly sensitive customer wealth data or enterprise private databases, I operate with strict due diligence to guarantee stakeholder trust.\"",
      iconName: "Briefcase",
      technologies: ["Due Diligence", "Enterprise Compliance", "Data Integrity"],
    },
    {
      id: "learning-machine",
      title: "The Learning Machine",
      description: "\"Both tech and financial sectors are constantly evolving; I rapidly adapt to master new systems and market landscapes—a trait that fueled my successful move from Mexico to Canada.\"",
      iconName: "LineChart",
      technologies: ["Rapid Domain Adaptation", "Cross-Disciplinary Execution", "Continuous Growth"],
    }
  ],

  journey: [
    {
      id: "financial-intern",
      period: "Internship Phase",
      role: "Financial Risk & Advisory Analyst",
      company: "Wealth Management",
      description: "Executed actionable wealth solutions bridging theoretical finance with strictly regulated frameworks.",
      highlights: [
        "Focused on complex tax-minimization strategies.",
        "Developed ESG-compliant investment strategies and portfolios.",
        "Conducted fundamental market analysis to secure high-yield assets."
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
        "Mastered advanced Canadian institutional frameworks.",
        "Obtained Investment Funds in Canada (IFC) Certification.",
        "Translated engineering logic to quantitative portfolio modeling."
      ],
      type: "education"
    },
    {
      id: "bbva-senior-dev",
      period: "2019 — 2024 (Mexico)",
      role: "Senior Software Developer",
      company: "BBVA",
      description: "Spearheaded high-traffic JavaScript applications within robust legacy frameworks.",
      highlights: [
        "Engineered a 30% boost in application reliability across systems.",
        "Led AI-driven efficiency initiatives and development standards.",
        "Maintained zero-margin data error policies on enterprise databases."
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
      skills: ["JavaScript (Lit Element)", "Node.js", "DevOps (GitHub/Bitbucket)", "Agile (Scrum/Jira)", "AWS", "Testing (Mocha/Chai)"]
    },
    {
      title: "Track 2: Finance",
      skills: ["Canadian Tax Law", "Estate Planning", "ESG Risk Profiling", "IFC Certification", "Financial Modeling (Advanced Excel)"]
    }
  ]
};
