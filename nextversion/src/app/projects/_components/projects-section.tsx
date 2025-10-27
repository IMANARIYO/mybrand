"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard, ProjectDialog } from "@/projects"

import { listProjects } from "@/app/projects/_server-actions/listProjects"
import { Code2, Filter } from "lucide-react"
import type { Project } from "@/db/schema"

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await listProjects()
      setProjects(projectsData as Project[])
    }
    loadProjects()
  }, [])

  const handleViewMore = (project: Project) => {
    setSelectedProject(project)
  }

  const categories = ['all', 'fullstack', 'web', 'mobile', 'api']
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project: Project) => project.category === activeFilter)

  return (
    <section id="projects" className="min-h-screen bg-background py-20 px-4">
      <div className=" mx-auto ">
        <Card className="border-2 shadow-2xl">
          <SectionHeader
            title="My Projects"
            subtitle="Explore my portfolio of full-stack applications, showcasing modern technologies, scalable architectures, and real-world problem-solving capabilities."
            icon={<Code2 className="h-12 w-12 text-primary" />}
          />

          <CardContent className="space-y-8">
            {/* Filter Tabs */}
            <Card>
              <CardContent className="pt-6">
                <Tabs value={activeFilter} onValueChange={setActiveFilter}>
                  <TabsList className="grid w-full grid-cols-5">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="capitalize">
                        {category === 'all' ? 'All Projects' : category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewMore={handleViewMore}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground">
                    <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No projects found for this category.</p>
                    <p className="text-sm">Try selecting a different filter.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Stats */}
            <Card className="bg-primary/5">
              <CardHeader className="text-center">
                <CardTitle>Project Portfolio Overview</CardTitle>
                <CardDescription>Comprehensive statistics of my development work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">{projects.length}</div>
                    <div className="text-sm text-muted-foreground">Total Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">
                      {projects.filter((p: Project) => p.status === 'completed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {projects.filter((p: Project) => p.liveDemo).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Live Demos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {new Set(projects.flatMap((p: Project) => [...p.techStack.frontend, ...p.techStack.backend])).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Technologies</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button className="btn-cta" asChild>
                  <a href="#contacts">Start Your Project</a>
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>

        {/* Project Dialog */}
        {selectedProject && (
          <ProjectDialog project={selectedProject}>
            <Button variant="secondary" onClick={() => setSelectedProject(null)}>Close</Button>
          </ProjectDialog>
        )}
      </div>
    </section>
  )
}