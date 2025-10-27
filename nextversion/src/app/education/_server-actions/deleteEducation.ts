"use server"

import { db } from "@/db"
import { education } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function deleteEducation(id: string) {
  try {
    await db.delete(education).where(eq(education.id, id))

    revalidatePath('/dashboard/education')
    revalidatePath('/education')
    
    return { success: true }
  } catch (error) {
    console.error("Error deleting education:", error)
    return { success: false, error: "Failed to delete education" }
  }
}