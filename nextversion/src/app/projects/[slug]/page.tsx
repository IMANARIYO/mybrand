import { notFound } from "next/navigation"
import { getProjectBySlug } from "@/app/projects/_server-actions/getProjectBySlug"
import { ShareButton } from "@/components/share/ShareButton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Globe, Calendar, Eye } from "lucide-react"
import Image from "next/image"

interface ProjectPageProps {
  params: { slug: string }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  if ('error' in project) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Private Project</h1>
        <p className="text-muted-foreground">{project.error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.startDate} - {project.endDate || 'Present'}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {project.viewCount} views
              </div>
            </div>
          </div>
          <ShareButton 
            shareUrl={project.shareUrl}
            title={project.title}
            description={project.description}
          />
        </div>
        
        <div className="flex gap-2 mb-6">
          <Badge variant="default">{project.category}</Badge>
          <Badge variant="secondary">{project.status}</Badge>
          {project.isFeatured && <Badge variant="outline">Featured</Badge>}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {project.liveDemo && (
            <Button asChild>
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {project.sourceCode && (
            <Button variant="outline" asChild>
              <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Main Image */}
      {project.images.main && (
        <div className="mb-8">
          <Image
            src={project.images.main}
            alt={project.title}
            width={800}
            height={400}
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(project.techStack).map(([category, technologies]) => (
            <div key={category}>
              <h4 className="font-semibold capitalize mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech: string) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {project.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Results & Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{project.results}</p>
        </CardContent>
      </Card>
    </div>
  )
}