import { Code, LineChart, Cpu, Briefcase, GraduationCap, BarChart } from "lucide-react";

export interface HeroData {
  headline: string;
  subtext: string;
}

export interface SynergyItem {
  id: string;
  title: string;
  description: string;
  // We'll map string names to lucide-react icons in the component
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

export interface InsightCaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string[];
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
    headline: "Engineering Reliable Wealth Strategies.",
    subtext: "Transitioning a robust foundation as a Senior Software Engineer at BBVA into a nuanced, analytical career as a Canadian Wealth Strategist. Building intelligent financial solutions powered by scalable technology.",
  },
  
  synergy: [
    {
      id: "code-scalability",
      title: "Code Scalability",
      description: "Architecting high-traffic, resilient systems.",
      iconName: "Code",
      technologies: ["LitElement", "Node.js", "Microservices", "AWS"],
    },
    {
      id: "financial-intelligence",
      title: "Financial Intelligence",
      description: "Delivering holistic wealth structuring and advisory.",
      iconName: "LineChart",
      technologies: ["ESG Analysis", "Tax Minimization", "Estate Planning"],
    },
    {
      id: "ai-driven-research",
      title: "AI-Driven Research",
      description: "Leveraging LLMs to extract market data and execute fundamental analysis at scale.",
      iconName: "Cpu",
      technologies: ["Market Data Pipelines", "Prompt Engineering", "Fundamental Analysis"],
    }
  ],

  journey: [
    {
      id: "wil-internship",
      period: "Recent",
      role: "Wealth Management Intern (WIL)",
      company: "Financial Services / Wealth Management",
      description: "Applied academic financial frameworks to real-world client portfolios, focusing on sustainable and tax-efficient growth.",
      highlights: [
        "Authored comprehensive ESG impact reports for client portfolios.",
        "Modeled tax minimization strategies across corporate and personal accounts.",
        "Conducted competitor analysis for improved asset allocation."
      ],
      type: "finance"
    },
    {
      id: "postgrad-finance",
      period: "Transition Phase",
      role: "Postgraduate Student",
      company: "Financial Planning & Wealth Management",
      description: "Pivoted from pure software engineering to holistic wealth strategy through rigorous academic focus.",
      highlights: [
        "Certified in core financial planning frameworks.",
        "Specialized in Canadian taxation and retirement modeling.",
        "Bridged technical analytical skills with equity valuation."
      ],
      type: "education"
    },
    {
      id: "bbva-senior-dev",
      period: "Previous",
      role: "Senior Software Engineer",
      company: "BBVA",
      description: "Led front-end and microservice architecture for high-traffic banking applications.",
      highlights: [
        "Maintained and optimized critical systems processing thousands of transactions.",
        "Spearheaded Agile/Scrum methodologies across cross-functional pods.",
        "Implemented robust CI/CD pipelines and DevOps best practices."
      ],
      type: "engineering"
    }
  ],

  insights: [
    {
      id: "undervalued-stock",
      title: "Undervalued Stock Analysis",
      category: "Equity Research",
      description: "Detailed fundamental analysis of mid-cap Canadian equities combining DCF modeling with sentiment analysis.",
      metrics: ["DCF Modeling", "EBITDA Multiples", "Sentiment Scoring"]
    },
    {
      id: "lbo-research",
      title: "LBO Structuring Research",
      category: "Corporate Finance",
      description: "A theoretical case study on the mechanics of a Leveraged Buyout within the tech sector, focusing on debt schedules.",
      metrics: ["Debt Tranches", "IRR Projections", "Cash Flow Modeling"]
    }
  ],

  toolbox: [
    {
      title: "Software & Technology",
      skills: ["JavaScript / TypeScript", "Node.js", "React / Next.js", "AWS Architecture", "SQL / NoSQL", "Git / DevOps"]
    },
    {
      title: "Financial & Advisory",
      skills: ["Morningstar Direct", "Salesforce CRM", "ESG Frameworks", "NaviPlan", "Tax Optimization", "Portfolio Construction"]
    }
  ]
};
