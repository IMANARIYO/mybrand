'use server'

import { db } from '@/db'
import { projects } from '../project.schema'
import { eq } from 'drizzle-orm'

export async function getProject(id: string) {
  try {
    const project = await db.select().from(projects).where(eq(projects.id, id)).limit(1)
    return project[0] || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function incrementViewCount(id: string) {
  try {
    await db.update(projects)
      .set({ viewCount: projects.viewCount + 1 })
      .where(eq(projects.id, id))
  } catch (error) {
    console.error('Error incrementing view count:', error)
  }
}