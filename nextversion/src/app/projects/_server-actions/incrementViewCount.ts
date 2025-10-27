'use server'

import { db } from '@/db'
import { projectsTable } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export async function incrementViewCount(slug: string) {
  try {
    await db
      .update(projectsTable)
      .set({ 
        viewCount: sql`${projectsTable.viewCount} + 1`
      })
      .where(eq(projectsTable.slug, slug))
    
    return { success: true }
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return { success: false, error: 'Failed to increment view count' }
  }
}