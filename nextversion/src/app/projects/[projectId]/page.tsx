import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { ArrowLeft, Github, Calendar, Code, Database, Server, Globe, CheckCircle, AlertCircle, TrendingUp, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProject } from "../_server-actions/getProject"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.projectId)

  if (!project) {
    notFound()
  }

  const techIcons = {
    frontend: Code,
    backend: Server,
    database: Database,
    infrastructure: Globe
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/#projects" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Project Header */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary">
                    {project.category}
                  </Badge>
                  <Badge className={
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                  }>
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-4xl font-bold">{project.title}</CardTitle>
                <CardDescription className="text-xl">{project.description}</CardDescription>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{project.startDate} - {project.endDate || 'Present'}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-8">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.overview}</p>
            </CardContent>
          </Card>

          {/* Images Gallery */}
          {project.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg border shadow-lg">
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Role & Contribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                My Role & Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.role}</p>
            </CardContent>
          </Card>

          {/* Technical Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(project.techStack).map(([category, technologies]) => {
                const Icon = techIcons[category as keyof typeof techIcons]
                return (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-lg capitalize">{category}:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {(technologies as string[]).map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Architecture */}
          <Card>
            <CardHeader>
              <CardTitle>Architecture Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.architecture}</p>
            </CardContent>
          </Card>

          {/* Core Features */}
          <Card>
            <CardHeader>
              <CardTitle>Core Features & Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Challenges & Solutions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Challenges & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {project.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground text-lg">{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Results & Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Results & Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.results}</p>
            </CardContent>
          </Card>

          {/* Why It Matters */}
          {project.whyItMatters && (
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Why It Matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed italic">{project.whyItMatters}</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {project.liveDemo && (
                  <Button asChild size="lg" className="flex-1">
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-5 w-5 mr-2" />
                      🌐 Live Demo
                    </a>
                  </Button>
                )}
                {project.sourceCode && (
                  <Button asChild variant="outline" size="lg" className="flex-1">
                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 mr-2" />
                      💻 Source Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}