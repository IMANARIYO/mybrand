// For forms (CRUD) – without id & timestamps
export interface ProjectFormData {
  title: string;
  description: string;
  overview: string;
  role: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  architecture: "monolithic" | "microservices";
  frontendRendering: "CSR" | "SSR" | "SSG" | "ISR";
  mobileSupport: boolean;
  features: string[];
  challenges: string[];
  results: string;
  images: string[];
  liveDemo?: string;
  sourceCode?: string;
  category: "web" | "mobile" | "fullstack" | "api";
  status: "completed" | "in-progress" | "planned";
  startDate: string;
  endDate?: string;
  tags: string[];
  whyItMatters?: string;
  isFeatured: boolean;
  isPublic: boolean;
}

// For hover cards or project dialogs
export interface ProjectHoverInfo {
  title: string;
  description: string;
  techStack: {
    frontend: string[];
    backend: string[];
  };
  architecture: string;
  frontendRendering: string;
  mobileSupport: boolean;
  useCases?: string; // Why this project exists / target audience
  strengths?: string[]; // Key features / impact
}

// Analytics & Admin view
export interface ProjectAnalytics {
  totalProjects: number;
  featuredProjects: number;
  totalViews: number;
  techUsageStats: {
    frontend: Record<string, number>;
    backend: Record<string, number>;
    database: Record<string, number>;
    infrastructure: Record<string, number>;
  };
}
