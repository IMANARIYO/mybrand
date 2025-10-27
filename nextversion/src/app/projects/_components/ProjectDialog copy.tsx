/* eslint-disable react/no-unescaped-entities */
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Code, Database, Server, Globe, CheckCircle, AlertCircle, Heart, X, Mail, MessageCircle } from "lucide-react"

import type { Project } from "@/db/schema"
import { useState } from "react"
import { ShareButton } from "@/components/share/ShareButton"
import { ImageGallery } from "@/components/ui/image-gallery"

interface ProjectDialogProps {
  project: Project
  children: React.ReactNode
}

export function ProjectDialog({ project, children }: ProjectDialogProps) {
  const [open, setOpen] = useState(false)

  const techIcons = {
    frontend: Code,
    backend: Server,
    database: Database,
    infrastructure: Globe
  }

  const handleHireMe = () => {
    // Replace with your actual email address
    const recipientEmail = "imanariyobaptiste@gmail.com";
    const subject = `Hire Me for ${project.title} Type Project`;
    const body = `Hi,

I saw your ${project.title} project and I'm impressed! I need something similar.

What I liked:
• ${project.features.slice(0, 3).join('\n• ')}

Can we discuss:
1. My project requirements
2. Timeline and cost
3. Your availability

When can we chat?

Thanks!`;

    console.log('Hire Me clicked:', { subject, body });

    // Fixed mailto URL with recipient email
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    console.log('Mailto URL:', mailtoUrl);

    // Use window.open for better compatibility
    window.open(mailtoUrl, '_blank');
  }

  const handleDiscuss = () => {
    const subject = `About ${project.title} Project`
    const body = `Hi,

I saw your ${project.title} project. Very cool!

I'd love to chat about:
• How you built ${project.techStack.frontend.slice(0, 2).join(' and ')}
• Your development process
• Possible collaboration

Free for a quick call?

Thanks!`

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-foreground">
                {project.title}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {project.category}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{Object.values(project.techStack).flat().length} technologies</span>
                  <span>{project.features.length} features</span>
                  <span>{project.viewCount || 0} views</span>
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Overview */}
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.liveDemo && (
              <Button asChild className="btn-cta">
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.sourceCode && (
              <Button asChild variant="outline">
                <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            <Button
              onClick={(e) => {
                e.preventDefault()
                console.log('Button clicked')
                handleHireMe()
              }}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Mail className="h-4 w-4 mr-2" />
              Hire Me for Similar Work
            </Button>
            <ShareButton
              shareUrl={`${window.location.origin}/projects/${project.slug}`}
              title={project.title}
              description={project.overview.slice(0, 120) + '...'}
              variant="outline"
            />
          </div>

          {/* Images Gallery */}
          {(project.images.main || project.images.others?.length) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Project Screenshots</h3>
              <ImageGallery images={project.images} projectTitle={project.title} />
            </div>
          )}

          {/* Technical Stack */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Technologies Used</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(project.techStack).map(([category, technologies]) => {
                const Icon = techIcons[category as keyof typeof techIcons]
                return (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold capitalize">{category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(technologies as string[]).map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My Role */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">My Role</h3>
            <p className="text-muted-foreground leading-relaxed">{project.role}</p>
          </div>

          {/* Challenges & Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Challenges Solved</h3>
              <div className="space-y-3">
                {project.challenges.map((challenge: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Results & Impact</h3>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="leading-relaxed">{project.results}</p>
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          {project.whyItMatters && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Why This Project Matters
              </h3>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="leading-relaxed italic">{project.whyItMatters}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-6 mt-8">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button onClick={handleDiscuss} className="btn-cta flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Let's Discuss This Project
            </Button>
            <ShareButton
              shareUrl={`${window.location.origin}/projects/${project.slug}`}
              title={project.title}
              description={project.overview.slice(0, 120) + '...'}
              variant="outline"
              size="sm"
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}