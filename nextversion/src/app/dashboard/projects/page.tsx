import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProjectTable } from "@/app/projects/_components/ProjectTable"
import { listProjects } from "@/app/projects/_server-actions/listProjects"
import { getProjectAnalytics } from "@/app/projects/_server-actions/projectAnalytics"
import { Briefcase, TrendingUp, Star, Eye, Plus } from "lucide-react"
import Link from "next/link"
import type { Project as DbProject } from "@/db/schema"

export default async function ProjectsManagementPage() {
  const [projects, analytics] = await Promise.all([
    listProjects(),
    getProjectAnalytics()
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Button asChild>
          <Link href="/projects/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Link>
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold text-primary">{analytics.totalProjects}</p>
              </div>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Featured</p>
                <p className="text-3xl font-bold text-secondary">{analytics.featuredProjects}</p>
              </div>
              <Star className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-3xl font-bold text-accent">{analytics.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Technologies</p>
                <p className="text-3xl font-bold text-primary">
                  {Object.values(analytics.techUsageStats).reduce((total, category) =>
                    total + Object.keys(category).length, 0
                  )}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectTable projects={projects as DbProject[]} />
      </Suspense>
    </div>
  )
}