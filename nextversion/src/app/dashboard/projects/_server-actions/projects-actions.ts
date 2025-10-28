"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { projectsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function createProject(data: Record<string, unknown>) {
  try {
    const [project] = await db
      .insert(projectsTable)
      .values({
        id: `proj_${Math.random().toString(36).substr(2, 9)}`,
        title: data.title as string,
        description: data.description as string,
        overview: data.description as string,
        role: "Developer",
        techStack: {
          frontend: ["React"],
          backend: ["Node.js"],
          database: ["PostgreSQL"],
          infrastructure: ["Vercel"],
        },
        architecture: {
          layers: [],
          notes: ""
        },
        frontendRendering: "SSR",
        mobileSupport: false,
        features: [],
        challenges: [],
        results: [data.description as string],
        images: {
          main: "",
          others: []
        },
        category: "web",
        status: "completed",
        startDate: new Date().toISOString().split('T')[0],
        tags: [],
        isFeatured: false,
        viewCount: 0,
        slug: (data.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        isPublic: false,
        shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/projects/${(data.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      })
      .returning();

    revalidatePath("/dashboard/projects");
    return { success: true, project };
  } catch {
    return { success: false, message: "Failed to create project" };
  }
}

export async function getProjects() {
  return await db
    .select()
    .from(projectsTable)
    .orderBy(desc(projectsTable.updatedAt));
}

export async function updateProject(id: string, data: Record<string, unknown>) {
  try {
    await db
      .update(projectsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projectsTable.id, id));
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch {
    return { success: false, message: "Project not found" };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, id));
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch {
    return { success: false, message: "Project not found" };
  }
}

export async function getProjectStats() {
  const allProjects = await db.select().from(projectsTable);

  return {
    total: allProjects.length,
    completed: allProjects.filter((p) => p.status === "completed").length,
    inProgress: allProjects.filter((p) => p.status === "in-progress").length,
    planning: allProjects.filter((p) => p.status === "planned").length,
  };
}