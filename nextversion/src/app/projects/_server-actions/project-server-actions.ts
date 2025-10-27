"use server";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { TechStack, Architecture, Images } from "@/db/types/projectTypes";

type ProjectInput = {
  title: string;
  description: string;
  overview: string;
  role: string;
  techStack: TechStack;
  architecture: Architecture;
  frontendRendering: "CSR" | "SSR" | "SSG" | "ISR";
  mobileSupport: boolean;
  features: string[];
  challenges: string[];
  results: string[];
  images: Images;
  category: "web" | "mobile" | "fullstack" | "api";
  status: "planned" | "in-progress" | "completed";
  startDate: string;
  endDate?: string;
  tags: string[];
  liveDemo?: string;
  sourceCode?: string;
  whyItMatters?: string;
  isFeatured: boolean;
  isPublic: boolean;
};

export async function createProject(data: ProjectInput) {
  try {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const id = crypto.randomUUID();

    const [project] = await db
      .insert(projectsTable)
      .values({
        id,
        title: data.title,
        description: data.description,
        overview: data.overview,
        role: data.role,
        techStack: data.techStack,
        architecture: data.architecture,
        frontendRendering: data.frontendRendering,
        mobileSupport: data.mobileSupport,
        features: data.features,
        challenges: data.challenges,
        results: data.results,
        images: data.images,
        category: data.category,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate || null,
        tags: data.tags,
        liveDemo: data.liveDemo || null,
        sourceCode: data.sourceCode || null,
        whyItMatters: data.whyItMatters || null,
        isFeatured: data.isFeatured,
        isPublic: data.isPublic,
        slug,
        shareUrl: `/projects/${slug}`,
      })
      .returning();

    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");

    return { success: true, project };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: string, data: ProjectInput) {
  try {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const [project] = await db
      .update(projectsTable)
      .set({
        title: data.title,
        description: data.description,
        overview: data.overview,
        role: data.role,
        techStack: data.techStack,
        architecture: data.architecture,
        frontendRendering: data.frontendRendering,
        mobileSupport: data.mobileSupport,
        features: data.features,
        challenges: data.challenges,
        results: data.results,
        images: data.images,
        category: data.category,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate || null,
        tags: data.tags,
        liveDemo: data.liveDemo || null,
        sourceCode: data.sourceCode || null,
        whyItMatters: data.whyItMatters || null,
        isFeatured: data.isFeatured,
        isPublic: data.isPublic,
        slug,
        shareUrl: `/projects/${slug}`,
        updatedAt: new Date(),
      })
      .where(eq(projectsTable.id, id))
      .returning();

    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    revalidatePath(`/projects/${slug}`);

    return { success: true, project };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, id));

    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
