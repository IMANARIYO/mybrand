"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, Pencil, Trash2, Heart, Share2, Clock, DollarSign, Star, Calendar, Zap, CheckCircle } from "lucide-react"
import type { Service } from "../_types/services-types"
import { ServiceDialog } from "./ServiceDialog"
import { deleteService } from "../_server-actions/services-server-actions"
import { toast } from "sonner"


interface ServiceCardProps {
  readonly service: Service
  readonly onEdit?: (service: Service) => void
  readonly isAdmin?: boolean
  readonly onTagClick?: (tag: string) => void
}

export function ServiceCard({ service, onEdit, isAdmin = false, onTagClick }: ServiceCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service?")) return

    setIsDeleting(true)
    const result = await deleteService(service.id)

    if (result.status === "success") {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
    setIsDeleting(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: service.title,
        text: service.tagline,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites")
  }

  const getTags = () => {
    return service.benefits ? service.benefits.slice(0, 3) : []
  }

  const getStatusBadge = () => {
    const status = service.status || (service.featured === "true" ? "featured" : "available")

    switch (status) {
      case "featured":
        return { label: "Featured", variant: "default" as const, icon: Star, color: "bg-yellow-500" }
      case "new":
        return { label: "New", variant: "secondary" as const, icon: Zap, color: "bg-green-500" }
      case "completed":
        return { label: "Completed", variant: "outline" as const, icon: CheckCircle, color: "bg-blue-500" }
      case "in-progress":
        return { label: "In Progress", variant: "destructive" as const, icon: Clock, color: "bg-orange-500" }
      default:
        return null
    }
  }

  const getSkills = () => {
    return service.skills || []
  }

  return (
    <TooltipProvider>
      <Card
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={service.imageUrl || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-fill transition-transform duration-500 group-hover:scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Top badges and actions */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex gap-2">
              {(() => {
                const statusBadge = getStatusBadge()
                if (!statusBadge) return null
                const IconComponent = statusBadge.icon
                return (
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                        <IconComponent className="h-3 w-3" />
                        {statusBadge.label}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {statusBadge.label === "Featured" && "This service is highlighted and recommended"}
                        {statusBadge.label === "New" && "Recently added service offering"}
                        {statusBadge.label === "Completed" && "Service delivery completed successfully"}
                        {statusBadge.label === "In Progress" && "Currently working on this service"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              })()}
            </div>

            <div className={`flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFavorite()
                    }}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFavorited ? 'Remove from favorites' : 'Add to favorites'}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare()
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this service</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Category Badge */}
          <Badge className="absolute bottom-4 left-4 z-10 bg-background/90 text-foreground">
            {service.category}
          </Badge>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-xl line-clamp-1">{service.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-medium">
            {service.tagline}
          </CardDescription>
          <CardDescription className="line-clamp-2 text-xs">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Service Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">{service.pricing}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{service.duration}</span>
            </div>
          </div>

          {/* Skills/Tags */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Skills & Technologies:</div>
            <div className="flex flex-wrap gap-1">
              {getSkills().map((skill: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    onTagClick?.(skill)
                  }}
                >
                  {skill}
                </Badge>
              ))}
              {getSkills().length === 0 && (
                <span className="text-xs text-muted-foreground italic">No specific skills listed</span>
              )}
            </div>
          </div>

          {/* Hover Benefits Preview */}
          {isHovered && (
            <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                <span>Key Benefits:</span>
              </div>
              <div className="space-y-1">
                {getTags().slice(0, 2).map((benefit, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <span>{benefit.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 pt-4">
          <Button
            variant="default"
            size="sm"
            className="flex-1 transition-all duration-300 hover:scale-105"
            onClick={() => setIsDialogOpen(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Schedule consultation</p>
            </TooltipContent>
          </Tooltip>

          {isAdmin && (
            <>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="sm" onClick={() => onEdit?.(service)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit service</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="sm" onClick={handleDelete} disabled={isDeleting}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete service</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </CardFooter>
      </Card>

      <ServiceDialog service={service} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </TooltipProvider>
  )
}
