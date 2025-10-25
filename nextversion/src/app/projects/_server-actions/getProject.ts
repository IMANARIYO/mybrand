"use server";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getProject(id: string) {
  try {
    const project = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id))
      .limit(1);
    return project[0] || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function incrementViewCount(id: string) {
  try {
    await db
      .update(projectsTable)
      .set({ viewCount: sql`${projectsTable.viewCount} + 1` })
      .where(eq(projectsTable.id, id));
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
}
