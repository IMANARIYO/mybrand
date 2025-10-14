"use server";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";

import { eq, desc } from "drizzle-orm";

// Fallback data for when table doesn't exist
const fallbackProjects = [
  {
    id: "my-docta",
    title: "My Docta - Digital Health Platform",
    description:
      "A comprehensive digital health platform streamlining medical screenings and doctor-patient interactions.",
    overview:
      "My Docta is a digital health platform designed to streamline medical screenings, lab test workflows, and doctor-patient interactions for underserved communities.",
    role: "I led the full-stack development — architected the backend with Node.js (TypeScript) using Drizzle ORM, designed scalable database schemas, and implemented role-based dashboards in React.",
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "Drizzle ORM"],
      database: ["PostgreSQL", "Redis"],
      infrastructure: ["Vercel", "Railway", "Cloudinary"],
    },
    architecture: "monolithic" as const,
    frontendRendering: "SSR" as const,
    mobileSupport: true,
    features: [
      "Role-based dashboards",
      "Secure authentication",
      "File upload management",
    ],
    challenges: [
      "Optimized slow lab result queries",
      "Implemented secure file upload",
    ],
    results:
      "Reduced data entry time by 40% during screenings and improved doctor review turnaround by 60%.",
    images: ["/images/projects/mydocta-1.jpg"],
    liveDemo: "https://mydocta-demo.vercel.app",
    sourceCode: "https://github.com/imanariyo/mydocta",
    category: "fullstack" as const,
    status: "completed" as const,
    startDate: "2023-06-01",
    endDate: "2024-01-01",
    tags: ["Healthcare", "TypeScript", "Next.js"],
    whyItMatters:
      "Built to demonstrate how technology can bridge healthcare gaps in emerging communities.",
    isFeatured: true,
    viewCount: 150,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export async function listProjects() {
  try {
    const allProjects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.createdAt));
    return allProjects;
  } catch (error) {
    console.error("Error fetching projects, using fallback data:", error);
    return fallbackProjects;
  }
}

export async function listFeaturedProjects() {
  try {
    const featuredProjects = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.isFeatured, true))
      .orderBy(desc(projectsTable.createdAt));
    return featuredProjects;
  } catch (error) {
    console.error(
      "Error fetching featured projects, using fallback data:",
      error
    );
    return fallbackProjects.filter((p) => p.isFeatured);
  }
}
