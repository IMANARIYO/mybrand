"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { projectsTable } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export async function createProject(data: any) {
  try {
    const [project] = await db.insert(projectsTable).values({
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      techStack: {
        frontend: data.technologies || [],
        backend: [],
        database: [],
        infrastructure: []
      },
      architecture: "monolithic",
      frontendRendering: "SSR",
      features: [],
      challenges: [],
      results: data.description,
      images: [],
      tags: data.technologies || [],
      overview: data.description,
      role: "Developer",
      category: "web"
    }).returning()
    
    revalidatePath("/dashboard/projects")
    return { success: true, project }
  } catch (error) {
    return { success: false, message: "Failed to create project" }
  }
}

export async function getProjects() {
  return await db.select().from(projectsTable).orderBy(desc(projectsTable.updatedAt))
}

export async function updateProject(id: string, data: any) {
  try {
    await db.update(projectsTable).set({ ...data, updatedAt: new Date() }).where(eq(projectsTable.id, id))
    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Project not found" }
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, id))
    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Project not found" }
  }
}

export async function getProjectStats() {
  const allProjects = await db.select().from(projectsTable)
  
  return {
    total: allProjects.length,
    completed: allProjects.filter(p => p.status === "completed").length,
    inProgress: allProjects.filter(p => p.status === "in-progress").length,
    planning: allProjects.filter(p => p.status === "planned").length,
  }
}