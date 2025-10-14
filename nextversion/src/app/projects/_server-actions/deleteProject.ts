'use server'

import { db } from '@/db'
import { projects } from '../project.schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id))

    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}