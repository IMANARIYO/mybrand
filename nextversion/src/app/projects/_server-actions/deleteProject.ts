"use server";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, id));

    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
