"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { ProjectForm } from "../_components/ProjectForm"

export default function CreateProjectPage() {
  const router = useRouter()

  const handleSuccess = () => {
    toast.success("Project created successfully!")
    router.push("/dashboard/projects")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground">Add a new project to your portfolio</p>
      </div>

      <ProjectForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}