
import { notFound } from "next/navigation"
import { getProjectBySlug } from "@/app/projects/_server-actions/getProjectBySlug"
import { incrementViewCount } from "@/app/projects/_server-actions/incrementViewCount"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Globe, Calendar, Eye, TrendingUp, Award, Target, CheckCircle, Star, Briefcase, Code, Database, Server, Layers, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import { ContactSection } from "./ContactSection"
import { ImageGallery } from "@/components/ui/image-gallery"


interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

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

  // Increment view count for shared projects
  await incrementViewCount(slug)

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container-main py-16 border-b">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="default" className="bg-primary text-primary-foreground">
                <Code className="w-3 h-3 mr-1" />
                {project.category.toUpperCase()}
              </Badge>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {project.status}
              </Badge>
              {project.isFeatured && (
                <Badge variant="outline" className="border-accent text-accent">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{project.startDate} - {project.endDate || 'Present'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-secondary" />
                <span>{project.viewCount} views</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {project.liveDemo && (
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.sourceCode && (
                <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            {project.images.main && (
              <div className="relative overflow-hidden rounded-2xl border-2 border-border shadow-lg">
                <Image
                  src={project.images.main}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="container-main py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Project Gallery</h2>
            <p className="text-lg text-muted-foreground">Interactive visual showcase of the complete project</p>
          </div>

          <ImageGallery images={project.images} projectTitle={project.title} />
        </div>
      </section>

      {/* Project Overview */}
      <section className="container-main py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Project Overview</h2>
            <p className="text-lg text-muted-foreground">Comprehensive breakdown of the project development and implementation</p>
          </div>

          <div className="grid gap-8">
            <Card className="p-8 bg-card border-2 border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Project Challenge</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card border-2 border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">My Role & Responsibilities</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.role}</p>
                </div>
              </div>
            </Card>

            {project.whyItMatters && (
              <Card className="p-8 bg-card border-2 border-border">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Business Impact</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.whyItMatters}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="container-main py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Technical Implementation</h2>
            <p className="text-lg text-muted-foreground">Professional-grade technology stack and system architecture</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technology Stack */}
            <Card className="p-6 bg-card border-2 border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Code className="w-5 h-5 text-primary" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(project.techStack).map(([category, technologies]) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-3">
                      {category === 'frontend' && <Globe className="w-4 h-4 text-primary" />}
                      {category === 'backend' && <Server className="w-4 h-4 text-secondary" />}
                      {category === 'database' && <Database className="w-4 h-4 text-accent" />}
                      {category === 'infrastructure' && <Layers className="w-4 h-4 text-muted-foreground" />}
                      <h4 className="font-semibold capitalize text-foreground">{category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="bg-muted text-muted-foreground border border-border">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Architecture */}
            <Card className="p-6 bg-card border-2 border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Layers className="w-5 h-5 text-secondary" />
                  System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.architecture.layers.map((layer, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{layer.name}</h4>
                      {layer.description && <p className="text-sm text-muted-foreground mt-1">{layer.description}</p>}
                    </div>
                  </div>
                ))}
                {project.architecture.notes && (
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm text-muted-foreground">{project.architecture.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container-main py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Key Features & Capabilities</h2>
            <p className="text-lg text-muted-foreground">Professional-grade features engineered for excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature: string, index: number) => (
              <Card key={index} className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium leading-relaxed text-foreground">{feature}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Challenges */}
      {project.challenges.length > 0 && (
        <section className="container-main py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Technical Challenges Solved</h2>
              <p className="text-lg text-muted-foreground">Complex problems require innovative solutions</p>
            </div>

            <div className="space-y-6">
              {project.challenges.map((challenge: string, index: number) => (
                <Card key={index} className="p-6 bg-card border-2 border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium leading-relaxed text-foreground">{challenge}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Results */}
      <section className="container-main py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Measurable Results & Impact</h2>
            <p className="text-lg text-muted-foreground">Quantifiable success metrics and business outcomes</p>
          </div>

          <Card className="p-8 bg-card border-2 border-border">
            <div className="space-y-6">
              {project.results.map((result: string, index: number) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-success/5 rounded-lg border border-success/20">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-lg leading-relaxed text-foreground">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>


      {/* Professional Contact Section */}
      <ContactSection
        projectTitle={project.title}
        projectCategory={project.category}
        techStack={project.techStack}
        status={project.status}
        features={project.features}
      />
    </div>
  )
}