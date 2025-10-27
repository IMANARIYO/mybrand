/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar, Eye, ChevronLeft, ChevronRight, Code2, Layers, Database, Server, Cloud, Monitor } from "lucide-react"
import { ShareButton } from '@/components/share/ShareButton'
import Image from "next/image"
import type { Project } from "@/db/schema"
import { useState } from "react"
import { ProjectDialog } from "./ProjectDialog"

interface ProjectCardProps {
  project: Project
  onViewMore: (project: Project) => void
}


export function ProjectCard({ project, onViewMore }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showActions, setShowActions] = useState(false)
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('all')

  const allImages = [
    project.images.main,
    ...(project.images.others?.map(img => img.url) || [])
  ].filter(Boolean)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }



  const getEngineeringHook = () => {
    const techCount = Object.values(project.techStack).flat().length
    const complexity = project.features.length

    if (project.category === 'fullstack') {
      return `Full-stack architecture with ${techCount} technologies - see how the frontend, backend, and database layers work together seamlessly.`
    } else if (project.category === 'api') {
      return `RESTful API design with ${complexity} endpoints - explore the data modeling and performance optimizations that handle real-world traffic.`
    } else if (project.category === 'mobile') {
      return `Cross-platform mobile solution - discover the state management patterns and native integrations that deliver smooth UX.`
    } else {
      return `Modern web application with ${techCount} integrated technologies - learn the component architecture and optimization strategies used.`
    }
  }
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
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border-2 hover:border-primary/50 bg-gradient-to-br from-card via-card to-primary/5">
      {/* Share Button */}
      <div className="absolute top-4 right-4 z-10">
        <ShareButton
          shareUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/projects/${project.slug}`}
          title={project.title}
          description={project.description}
          variant="default"
          size="sm"
        />
      </div>

      {/* Featured Badge */}
      {/* {project.isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground animate-pulse">
            <Zap className="w-3 h-3 mr-1 fill-current" />
            FEATURED
          </Badge>
        </div>
      )} */}

      <CardHeader className="pb-4 relative">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${getCategoryColor(project.category)} font-semibold animate-pulse`}>
              {project.category.toUpperCase()}
            </Badge>
            <Badge className={`${getStatusColor(project.status)} font-medium`}>
              {project.status}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Eye className="h-3 w-3" />
              <span>{project.viewCount}</span>
            </div>
          </div>
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
            {project.title}
          </CardTitle>
        </div>
        <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
          {project.description}
        </CardDescription>

        {/* Engineering Hook */}
        <div className="mt-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
          <p className="text-sm text-foreground/80 leading-relaxed">
            <Code2 className="w-4 h-4 inline mr-2 text-primary" />
            {getEngineeringHook()}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Interactive Image Slider */}
        {allImages.length > 0 && (
          <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-border group-hover:border-primary/30 transition-colors">
            <Image
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />

            {/* Image Navigation */}
            {allImages.length > 1 && (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  size="sm"
                  variant="secondary"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 hover:bg-black/70 text-white border-0 z-20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  size="sm"
                  variant="secondary"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 hover:bg-black/70 text-white border-0 z-20"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                        ? 'bg-primary scale-125'
                        : 'bg-white/50 hover:bg-white/80'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">{project.startDate} - {project.endDate || 'Present'}</span>
          </div>

          {/* Bold Tech Stack Switcher */}
          <div className="bg-card border-2 border-border rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">Tech Stack</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedTechCategory('frontend')}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 transform ${selectedTechCategory === 'frontend'
                  ? 'bg-blue-500 border-blue-600 text-white shadow-lg scale-105'
                  : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 hover:scale-102'
                  }`}
              >
                <Monitor className="w-5 h-5" />
                <span className="font-bold text-xs">Frontend</span>
                <div className={`text-xs px-2 py-0.5 rounded-full ${selectedTechCategory === 'frontend' ? 'bg-white/20 text-white' : 'bg-blue-200 text-blue-800'
                  }`}>
                  {project.techStack.frontend.length}
                </div>
              </button>

              <button
                onClick={() => setSelectedTechCategory('backend')}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 transform ${selectedTechCategory === 'backend'
                  ? 'bg-green-500 border-green-600 text-white shadow-lg scale-105'
                  : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 hover:scale-102'
                  }`}
              >
                <Server className="w-5 h-5" />
                <span className="font-bold text-xs">Backend</span>
                <div className={`text-xs px-2 py-0.5 rounded-full ${selectedTechCategory === 'backend' ? 'bg-white/20 text-white' : 'bg-green-200 text-green-800'
                  }`}>
                  {project.techStack.backend.length}
                </div>
              </button>

              <button
                onClick={() => setSelectedTechCategory('database')}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 transform ${selectedTechCategory === 'database'
                  ? 'bg-purple-500 border-purple-600 text-white shadow-lg scale-105'
                  : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 hover:scale-102'
                  }`}
              >
                <Database className="w-5 h-5" />
                <span className="font-bold text-xs">Database</span>
                <div className={`text-xs px-2 py-0.5 rounded-full ${selectedTechCategory === 'database' ? 'bg-white/20 text-white' : 'bg-purple-200 text-purple-800'
                  }`}>
                  {project.techStack.database.length}
                </div>
              </button>

              <button
                onClick={() => setSelectedTechCategory('infrastructure')}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 transform ${selectedTechCategory === 'infrastructure'
                  ? 'bg-orange-500 border-orange-600 text-white shadow-lg scale-105'
                  : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300 hover:scale-102'
                  }`}
              >
                <Cloud className="w-5 h-5" />
                <span className="font-bold text-xs">DevOps</span>
                <div className={`text-xs px-2 py-0.5 rounded-full ${selectedTechCategory === 'infrastructure' ? 'bg-white/20 text-white' : 'bg-orange-200 text-orange-800'
                  }`}>
                  {project.techStack.infrastructure.length}
                </div>
              </button>
            </div>
          </div>

          {/* Dynamic Tech Display */}
          <div className="bg-card border-2 border-border rounded-xl p-4 shadow-sm min-h-[4rem]">
            {selectedTechCategory === 'frontend' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-blue-700">Frontend Stack</span>
                </div>
                {project.techStack.frontend.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.frontend.map((tech: string) => (
                      <Badge key={tech} className="bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded italic">No frontend technologies</p>
                )}
              </div>
            )}

            {selectedTechCategory === 'backend' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Server className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-green-700">Backend Stack</span>
                </div>
                {project.techStack.backend.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.backend.map((tech: string) => (
                      <Badge key={tech} className="bg-green-100 border-green-300 text-green-800 hover:bg-green-200 transition-colors cursor-pointer font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded italic">No backend technologies</p>
                )}
              </div>
            )}

            {selectedTechCategory === 'database' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Database className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-purple-700">Database Stack</span>
                </div>
                {project.techStack.database.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.database.map((tech: string) => (
                      <Badge key={tech} className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded italic">No database technologies</p>
                )}
              </div>
            )}

            {selectedTechCategory === 'infrastructure' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-orange-700">DevOps Stack</span>
                </div>
                {project.techStack.infrastructure.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.infrastructure.map((tech: string) => (
                      <Badge key={tech} className="bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200 transition-colors cursor-pointer font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded italic">No infrastructure technologies</p>
                )}
              </div>
            )}

            {selectedTechCategory === 'all' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Layers className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-foreground">Complete Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(project.techStack).flat().slice(0, 10).map((tech: string) => (
                    <Badge key={tech} variant="outline" className="hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer font-medium">
                      {tech}
                    </Badge>
                  ))}
                  {Object.values(project.techStack).flat().length > 10 && (
                    <Badge className="bg-accent/20 text-accent border-accent/30 font-bold">
                      +{Object.values(project.techStack).flat().length - 10} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter
        className="relative pt-4 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <Button
          onClick={() => onViewMore(project)}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
        >
          <Code2 className="h-4 w-4 mr-2" />
          See How It's Built
        </Button>

        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-card/95 backdrop-blur-sm rounded-lg transition-all duration-300 ${showActions ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          <div className="flex items-center justify-center h-full gap-2 p-4">
            {project.liveDemo && (
              <Button asChild variant="outline" size="sm" className="hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300">
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}

            {project.sourceCode && (
              <Button asChild variant="outline" size="sm" className="hover:bg-muted hover:border-foreground hover:text-foreground transition-all duration-300">
                <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            <ProjectDialog project={project}>
              <Button
                // onClick={() => onViewMore(project)}
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Code2 className="h-4 w-4 mr-1" />
                Architecture
              </Button>
            </ProjectDialog>

          </div>
        </div>
      </CardFooter>
    </Card>
  )
}