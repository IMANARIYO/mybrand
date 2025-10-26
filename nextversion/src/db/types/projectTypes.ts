// Reusable JSON column types for database schema

// Tech Stack Interface
export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
  [key: string]: string[]; // allow extra layers in the future
}

// Architecture Interface
export interface Architecture {
  layers: {
    name: string; // e.g., "frontend", "backend", "database"
    description?: string;
    diagrams?: string[]; // optional multiple images/screenshots per layer
  }[];
  notes?: string; // overall architecture notes
}

// Images Interface
export interface Images {
  main: string; // main image
  others?: {
    url: string;
    type?: "screenshot" | "diagram" | "other";
    caption?: string;
  }[];
}

// Service Benefit Interface
export interface ServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

// Service Process Interface
export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

// Service Action Interface
export interface ServiceAction {
  label: string;
  actionType: "link" | "modal" | "scroll" | "form";
  target?: string;
}

// Generic string array type for features, challenges, tags, skills, etc.
export type StringArray = string[];