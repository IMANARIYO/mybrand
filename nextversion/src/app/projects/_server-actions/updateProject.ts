'use server'

import { db } from '@/db'
import { projects } from '../project.schema'
import { ProjectFormData } from '../_types/project.types'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateProject(id: string, data: ProjectFormData) {
  try {
    await db.update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))

    revalidatePath('/projects')
    revalidatePath(`/projects/${id}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}