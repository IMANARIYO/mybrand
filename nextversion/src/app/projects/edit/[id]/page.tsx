"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProjectForm from "../../../_components/ProjectForm"
import { toast } from "sonner"
import { getProjectById } from "../../../_server-actions/project-server-actions"
import type { Project } from "@/db/schema"

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const resolvedParams = await params
        const result = await getProjectById(resolvedParams.id)
        if (result.success && result.data) {
          setProject(result.data)
        } else {
          toast.error("Project not found")
          router.push("/dashboard/projects")
        }
      } catch (error) {
        console.error("Error loading project:", error)
        toast.error("Failed to load project")
        router.push("/dashboard/projects")
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [params, router])

  const handleSuccess = () => {
    toast.success("Project updated successfully!")
    router.push("/dashboard/projects")
  }

  const handleCancel = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading project...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">Update your project details</p>
      </div>
      
      <ProjectForm 
        project={project}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}