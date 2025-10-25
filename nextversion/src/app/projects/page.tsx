import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectTable } from "./_components/ProjectTable"
import { listProjects } from "./_server-actions/listProjects"
import { getProjectAnalytics } from "./_server-actions/projectAnalytics"
import { Briefcase, TrendingUp, Star, Eye } from "lucide-react"
import type { Project as DbProject } from "@/db/schema"

async function ProjectsPage() {
  const [projects, analytics] = await Promise.all([
    listProjects(),
    getProjectAnalytics()
  ])

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Card className="mb-8 border-2 shadow-xl bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold flex items-center justify-center gap-3">
              <Briefcase className="h-10 w-10 text-primary" />
              Project Management
            </CardTitle>
            <CardDescription className="text-lg">
              Manage your portfolio projects and track analytics
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
    </div>
  )
}

export default ProjectsPage