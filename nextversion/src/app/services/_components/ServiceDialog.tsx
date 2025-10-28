/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code2, Phone, Mail, User, Loader2,
  DollarSign, Clock, Star, CheckCircle, Zap, Calendar, ArrowRight,
  MessageSquare, Settings, Lightbulb, Shield, Rocket,
  NotebookPen
} from "lucide-react"
import { BadgeInfo } from 'lucide-react';
import type { Service, ServiceRequestFormData } from "../_types/services-types"

import { createServiceRequest } from "../_server-actions/services-server-actions"

import { MdNumbers } from "react-icons/md"
import { ServiceBenefit } from "@/db/types/projectTypes"
import { ServiceAction, ServiceProcess } from "@/db/types/serviceTypes"
import { toast } from "sonner"


interface ServiceDialogProps {
  service: Service
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ServiceDialog({ service, open, onOpenChange }: ServiceDialogProps) {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const requestData: ServiceRequestFormData = {
      serviceId: service.id,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("telephone") as string,
      message: formData.get("message") as string || undefined,
    }

    const result = await createServiceRequest(requestData)

    if (result.status === "success") {
      toast.success(result.message)
      setShowRequestForm(false)
      onOpenChange(false)
        ; (e.target as HTMLFormElement).reset()
    } else {
      toast.error(result.message)
    }

    setIsSubmitting(false)
  }

  const getStatusBadge = () => {
    const status = service.status || (service.featured === "true" ? "featured" : "available")

    switch (status) {
      case "featured":
        return { label: "Featured", icon: Star, color: "bg-yellow-500" }
      case "new":
        return { label: "New", icon: Zap, color: "bg-green-500" }
      case "completed":
        return { label: "Completed", icon: CheckCircle, color: "bg-blue-500" }
      case "in-progress":
        return { label: "In Progress", icon: Clock, color: "bg-orange-500" }
      default:
        return { label: "Available", icon: Rocket, color: "bg-primary" }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-8xl max-h-[95vh] overflow-y-auto p-0">
        {/* Hero Section */}
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={service.imageUrl || "/placeholder.svg"}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Status Badge */}
          {(() => {
            const statusBadge = getStatusBadge()
            const IconComponent = statusBadge.icon
            return (
              <Badge className={`absolute top-6 left-6 ${statusBadge.color} text-white border-0`}>
                <IconComponent className="h-3 w-3 mr-1" />
                {statusBadge.label}
              </Badge>
            )
          })()}

          <div className="absolute bottom-6 left-6 right-6">
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
              {service.category}
            </Badge>
            <DialogTitle className="text-4xl font-bold text-white drop-shadow-lg mb-2">
              {service.title}
            </DialogTitle>
            <DialogDescription className="text-xl text-white/90 drop-shadow mb-4">
              {service.tagline}
            </DialogDescription>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">{service.pricing}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{service.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NotebookPen className="h-5 w-5 text-primary" />
                Service Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </CardContent>
          </Card>

          {/* Key Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeInfo className="h-5 w-5 text-primary" />

                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {(service.benefits || []).map((benefit: ServiceBenefit, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MdNumbers className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Our Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(service.process || []).map((step: ServiceProcess, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index < (service.process?.length || 0) - 1 && (
                      <ArrowRight className="h-5 w-5 text-muted-foreground mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills & Technologies */}
          {service.skills && service.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Technologies & Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          {!showRequestForm ? (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Ready to Get Started?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Transform your ideas into reality. Let's discuss your project and create something amazing together.
                </p>
                <div className="flex flex-wrap gap-3">
                  {(service.actions || []).map((action: ServiceAction, index: number) => {
                    const isForm = action.actionType === "form"
                    return (
                      <Button
                        key={index}
                        size="lg"
                        variant={isForm ? "default" : "outline"}
                        onClick={() => {
                          if (action.actionType === "form") {
                            setShowRequestForm(true)
                          } else if (action.actionType === "link" && action.target) {
                            window.open(action.target, '_blank')
                          }
                        }}
                        className="flex-1 min-w-[150px]"
                      >
                        {isForm ? <MessageSquare className="mr-2 h-4 w-4" /> : <Calendar className="mr-2 h-4 w-4" />}
                        {action.label}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Request This Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name *
                      </Label>
                      <Input id="name" name="name" required placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email *
                      </Label>
                      <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input id="telephone" name="telephone" type="tel" required placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Project Details (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Send Request
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setShowRequestForm(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}