"use server"

import { db } from "@/db"
import { education, type NewEducation } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createEducation(data: Omit<NewEducation, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const slug = data.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const newEducation = await db.insert(education).values({
      ...data,
      slug,
    }).returning()

    revalidatePath('/dashboard/education')
    revalidatePath('/education')
    
    return { success: true, data: newEducation[0] }
  } catch (error) {
    console.error("Error creating education:", error)
    return { success: false, error: "Failed to create education" }
  }
}