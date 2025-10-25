import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar, Eye } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/db/schema"

interface ProjectCardProps {
  project: Project
  onViewMore: (project: Project) => void
}


export function ProjectCard({ project, onViewMore }: ProjectCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fullstack': return 'bg-primary/10 text-primary'
      case 'web': return 'bg-secondary/10 text-secondary'
      case 'mobile': return 'bg-accent/10 text-accent'
      case 'api': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'planned': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {project.images.main && (
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={project.images.main}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{project.startDate} - {project.endDate || 'Present'}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.techStack.frontend.slice(0, 3).map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.backend.slice(0, 2).map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {(project.techStack.frontend.length + project.techStack.backend.length > 5) && (
              <Badge variant="outline" className="text-xs">
                +{project.techStack.frontend.length + project.techStack.backend.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Button
          onClick={() => onViewMore(project)}
          className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>

        <div className="flex gap-2">
          {project.liveDemo && (
            <Button asChild variant="outline" size="icon">
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.sourceCode && (
            <Button asChild variant="outline" size="icon">
              <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}