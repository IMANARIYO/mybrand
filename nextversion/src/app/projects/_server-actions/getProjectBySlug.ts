"use server";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProjectBySlug(slug: string) {
  try {
    const project = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.slug, slug))
      .limit(1);

    const foundProject = project[0];
    
    if (!foundProject) {
      return null;
    }

    // Check if project is public
    if (!foundProject.isPublic) {
      return { error: "This project is private" };
    }

    return foundProject;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}