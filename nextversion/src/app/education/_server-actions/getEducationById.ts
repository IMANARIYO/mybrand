"use server"

import { db } from "@/db"
import { education } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getEducationById(id: string) {
  try {
    const educationRecord = await db
      .select()
      .from(education)
      .where(eq(education.id, id))
      .limit(1)
    
    return educationRecord[0] || null
  } catch (error) {
    console.error("Error fetching education by ID:", error)
    return null
  }
}