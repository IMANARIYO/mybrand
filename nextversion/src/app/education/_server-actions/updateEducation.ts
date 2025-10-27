"use server"

import { db } from "@/db"
import { education, type Education } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateEducation(id: string, data: Partial<Omit<Education, 'id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const updateData = { ...data }
    
    if (data.title) {
      updateData.slug = data.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const updatedEducation = await db
      .update(education)
      .set(updateData)
      .where(eq(education.id, id))
      .returning()

    revalidatePath('/dashboard/education')
    revalidatePath('/education')
    
    return { success: true, data: updatedEducation[0] }
  } catch (error) {
    console.error("Error updating education:", error)
    return { success: false, error: "Failed to update education" }
  }
}