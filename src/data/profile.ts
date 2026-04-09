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
  // Specific mock data for Recharts sparklines
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
      metrics: ["DCF Modeling", "EBITDA Multiples", "Sentiment Scoring"],
      badgeType: "metric",
      chartData: [
        { date: "M1", value: 12 },
        { date: "M2", value: 15 },
        { date: "M3", value: 18 },
        { date: "M4", value: 14 },
        { date: "M5", value: 24 },
        { date: "M6", value: 29 },
      ]
    },
    {
      id: "lbo-research",
      title: "LBO Structuring Mechanics",
      category: "Corporate Finance",
      description: "A theoretical case study on the mechanics of a Leveraged Buyout within the tech sector, focusing on complex debt schedules.",
      metrics: ["Debt Tranches", "IRR Projections", "Cash Flow"],
      badgeType: "metric",
      chartData: [
        { date: "Y1", value: 100 },
        { date: "Y2", value: 80 },
        { date: "Y3", value: 45 },
        { date: "Y4", value: 20 },
        { date: "Y5", value: 0 },
      ]
    },
    {
      id: "esg-thought-leadership",
      title: "The Future of ESG Data Pipelines",
      category: "Thought Leadership",
      description: "Exploring how automated data pipelines and Large Language Models are reshaping ESG scoring frameworks for wealth managers.",
      metrics: ["ESG Scoring", "LLMs", "React / AWS"],
      badgeType: "reading",
      readingTime: "6 min read"
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
