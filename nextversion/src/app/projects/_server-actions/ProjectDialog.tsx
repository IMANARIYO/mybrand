"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Code, Database, Server, Globe, CheckCircle, AlertCircle, TrendingUp, Heart } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/db/schema"


interface ProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null

  const techIcons = {
    frontend: Code,
    backend: Server,
    database: Database,
    infrastructure: Globe
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            {project.title}
            <Badge className="bg-primary/10 text-primary">
              {project.category}
            </Badge>
          </DialogTitle>
        </DialogHeader>

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
              <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
            </CardContent>
          </Card>

          {/* Images Gallery */}
          {(project.images.main || project.images.others?.length) && (
            <Card>
              <CardHeader>
                <CardTitle>Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.main && (
                    <div className="relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src={project.images.main}
                        alt={`${project.title} main screenshot`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  {project.images.others?.map((image, index: number) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src={image.url}
                        alt={image.caption || `${project.title} screenshot ${index + 1}`}
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
              <p className="text-muted-foreground leading-relaxed">{project.role}</p>
            </CardContent>
          </Card>

          {/* Technical Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(project.techStack).map(([category, technologies]) => {
                const Icon = techIcons[category as keyof typeof techIcons]
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-semibold capitalize">{category}:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-6">
                      {(technologies as string[]).map((tech: string) => (
                        <Badge key={tech} variant="outline">
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
              <div className="space-y-4">
                {project.architecture.layers.map((layer, index: number) => (
                  <div key={index} className="border-l-4 border-primary/20 pl-4">
                    <h4 className="font-semibold capitalize">{layer.name}</h4>
                    {layer.description && (
                      <p className="text-muted-foreground text-sm">{layer.description}</p>
                    )}
                  </div>
                ))}
                {project.architecture.notes && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground italic">{project.architecture.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Core Features */}
          <Card>
            <CardHeader>
              <CardTitle>Core Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
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
              <ul className="space-y-3">
                {project.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{challenge}</span>
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
              <p className="text-muted-foreground leading-relaxed">{project.results}</p>
            </CardContent>
          </Card>

          {/* Why It Matters */}
          {project.whyItMatters && (
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Why It Matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">{project.whyItMatters}</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {project.liveDemo && (
              <Button asChild className="flex-1">
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.sourceCode && (
              <Button asChild variant="outline" className="flex-1">
                <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}