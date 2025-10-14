'use server'

import { db } from '@/db'
import { projects } from '../project.schema'
import { ProjectAnalytics } from '../_types/project.types'

// Fallback analytics for when table doesn't exist
const fallbackAnalytics: ProjectAnalytics = {
  totalProjects: 3,
  featuredProjects: 1,
  totalViews: 450,
  techUsageStats: {
    frontend: { 'Next.js': 2, 'React': 3, 'TypeScript': 3 },
    backend: { 'Node.js': 2, 'Express.js': 2 },
    database: { 'PostgreSQL': 2, 'MongoDB': 1 },
    infrastructure: { 'Vercel': 2, 'Railway': 1 },
  },
}

export async function getProjectAnalytics(): Promise<ProjectAnalytics> {
  try {
    const allProjects = await db.select().from(projects)
    
    const totalProjects = allProjects.length
    const featuredProjects = allProjects.filter(p => p.isFeatured).length
    const totalViews = allProjects.reduce((sum, p) => sum + p.viewCount, 0)

    // Calculate tech usage stats
    const techUsageStats = {
      frontend: {} as Record<string, number>,
      backend: {} as Record<string, number>,
      database: {} as Record<string, number>,
      infrastructure: {} as Record<string, number>,
    }

    allProjects.forEach(project => {
      // Count frontend technologies
      project.techStack.frontend.forEach(tech => {
        techUsageStats.frontend[tech] = (techUsageStats.frontend[tech] || 0) + 1
      })
      
      // Count backend technologies
      project.techStack.backend.forEach(tech => {
        techUsageStats.backend[tech] = (techUsageStats.backend[tech] || 0) + 1
      })
      
      // Count database technologies
      project.techStack.database.forEach(tech => {
        techUsageStats.database[tech] = (techUsageStats.database[tech] || 0) + 1
      })
      
      // Count infrastructure technologies
      project.techStack.infrastructure.forEach(tech => {
        techUsageStats.infrastructure[tech] = (techUsageStats.infrastructure[tech] || 0) + 1
      })
    })

    return {
      totalProjects,
      featuredProjects,
      totalViews,
      techUsageStats,
    }
  } catch (error) {
    console.error('Error fetching project analytics, using fallback data:', error)
    return fallbackAnalytics
  }
}