'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink, Github, Home, User, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { ShareButton } from '@/components/share/ShareButton'
import { PortfolioShareButton } from './PortfolioShareButton'

interface ProjectNavbarProps {
  project: {
    title: string
    category: string
    status: string
    isFeatured: boolean
    liveDemo?: string | null
    sourceCode?: string | null
    shareUrl: string
    description: string
  }
}

export function ProjectNavbar({ project }: ProjectNavbarProps) {
  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-main py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back button and project info */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-px h-6 bg-border" />
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
              <Badge
                variant={project.status === 'completed' ? 'default' : 'outline'}
                className="text-xs"
              >
                {project.status}
              </Badge>
              {project.isFeatured && (
                <Badge variant="outline" className="text-xs border-accent text-accent">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Center: Project title (hidden on mobile) */}
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-foreground truncate max-w-md">
              {project.title}
            </h1>
          </div>

          {/* Right: Navigation and actions */}
          <div className="flex items-center gap-2">
            {/* Main navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/about">
                  <User className="w-4 h-4 mr-2" />
                  About
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/projects">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Projects
                </Link>
              </Button>
            </div>

            <div className="w-px h-6 bg-border hidden md:block" />

            {/* Project actions */}
            <div className="flex items-center gap-2">
              {project.liveDemo && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Live Demo</span>
                  </a>
                </Button>
              )}

              {project.sourceCode && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Code</span>
                  </a>
                </Button>
              )}

              <ShareButton
                shareUrl={project.shareUrl}
                title={project.title}
                description={project.description}
                variant="outline"
                size="sm"
              />

              <PortfolioShareButton />
            </div>
          </div>
        </div>

        {/* Mobile project info */}
        <div className="md:hidden mt-3 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {project.category}
          </Badge>
          <Badge
            variant={project.status === 'completed' ? 'default' : 'outline'}
            className="text-xs"
          >
            {project.status}
          </Badge>
          {project.isFeatured && (
            <Badge variant="outline" className="text-xs border-accent text-accent">
              Featured
            </Badge>
          )}
        </div>
      </div>
    </nav>
  )
}