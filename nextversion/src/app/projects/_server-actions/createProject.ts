'use server'

import { db } from '@/db'
import { projects } from '../project.schema'
import { ProjectFormData } from '../_types/project.types'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'

export async function createProject(data: ProjectFormData) {
  try {
    const projectId = nanoid()
    
    await db.insert(projects).values({
      id: projectId,
      ...data,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath('/projects')
    return { success: true, id: projectId }
  } catch (error) {
    console.error('Error creating project:', error)
    return { success: false, error: 'Failed to create project' }
  }
}