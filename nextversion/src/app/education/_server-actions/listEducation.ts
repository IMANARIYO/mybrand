"use server"

import { db } from "@/db"
import { education } from "@/db/schema"
import { desc } from "drizzle-orm"

export async function listEducation() {
  try {
    const educationList = await db
      .select()
      .from(education)
      .orderBy(desc(education.startDate))
    
    return educationList
  } catch (error) {
    console.error("Error fetching education:", error)
    return []
  }
}