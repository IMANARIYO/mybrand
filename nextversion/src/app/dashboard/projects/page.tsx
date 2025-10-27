"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ProjectsPage from "@/app/projects/page"

export default function ProjectsManagementPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Button onClick={() => router.push("/projects/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </div>
      <ProjectsPage />
    </div>
  )
}