"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { Service, ServiceFormData } from "../_types/services-types"
import type { ServiceBenefit, ServiceProcess, ServiceAction } from "@/db/schema"
import { createService, updateService } from "../_server-actions/services-server-actions"
import { useToast } from "@/components/ui/use-toast"
import { ImageUploadField } from "@/components/Uploading/ImageUploadField"


interface ServiceFormProps {
  service?: Service
  onSuccess?: () => void
  onCancel?: () => void
}

export function ServiceForm({ service, onSuccess, onCancel }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serviceImage, setServiceImage] = useState(service?.imageUrl || "")
  const { toast } = useToast()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const benefitsStr = formData.get("benefits") as string
    const processStr = formData.get("process") as string
    const actionsStr = formData.get("actions") as string

    const serviceData: ServiceFormData = {
      title: formData.get("title") as string,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      icon: formData.get("icon") as string,
      category: formData.get("category") as string,
      pricing: formData.get("pricing") as string,
      duration: formData.get("duration") as string,
      featured: formData.get("featured") as string,
      isPublic: formData.get("isPublic") === "true",
      imageUrl: serviceImage,
      skills: [],
      benefits: benefitsStr.split(",").map(b => ({ title: b.trim(), description: "" })),
      process: processStr.split(",").map((p, i) => ({ step: i + 1, title: p.trim(), description: "" })),
      actions: actionsStr.split(",").map(a => ({ label: a.trim(), actionType: "link" as const })),
    }

    try {
      const result = service ? await updateService(service.id, serviceData) : await createService(serviceData)

      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
        })
        onSuccess?.()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Service Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g., Full-Stack Web Development"
          defaultValue={service?.title}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">
          Category <span className="text-destructive">*</span>
        </Label>
        <Select name="category" defaultValue={service?.category} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Backend Development">Backend Development</SelectItem>
            <SelectItem value="DevOps">DevOps</SelectItem>
            <SelectItem value="Consulting">Consulting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Service Image */}
      <ImageUploadField
        label="Service Image"
        value={serviceImage}
        onChange={(url) => {
          setServiceImage(url as string)
        }}
        required
        placeholder="Upload or enter service image URL"
      />

      {/* Tagline */}
      <div className="space-y-2">
        <Label htmlFor="tagline">
          Tagline <span className="text-destructive">*</span>
        </Label>
        <Input
          id="tagline"
          name="tagline"
          placeholder="Brief catchy tagline"
          defaultValue={service?.tagline}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Detailed service description"
          defaultValue={service?.description}
          rows={4}
          required
        />
      </div>

      {/* Icon */}
      <div className="space-y-2">
        <Label htmlFor="icon">
          Icon <span className="text-destructive">*</span>
        </Label>
        <Input
          id="icon"
          name="icon"
          placeholder="Icon name or emoji"
          defaultValue={service?.icon}
          required
        />
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <Label htmlFor="pricing">
          Pricing <span className="text-destructive">*</span>
        </Label>
        <Input
          id="pricing"
          name="pricing"
          placeholder="e.g., $5000 - $15000"
          defaultValue={service?.pricing}
          required
        />
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration">
          Duration <span className="text-destructive">*</span>
        </Label>
        <Input
          id="duration"
          name="duration"
          placeholder="e.g., 4-8 weeks"
          defaultValue={service?.duration}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="benefits">
          Key Benefits <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="benefits"
          name="benefits"
          placeholder="e.g., Cut development time by 50%, Scale to millions of users (comma-separated)"
          defaultValue={service?.benefits.map(b => b.title).join(", ")}
          rows={3}
          required
        />
        <p className="text-xs text-muted-foreground">Benefit-driven bullets that impress clients</p>
      </div>



      <div className="space-y-2">
        <Label htmlFor="process">
          Process Steps <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="process"
          name="process"
          placeholder="e.g., Discovery & Planning, Design & Prototype, Development (comma-separated)"
          defaultValue={service?.process.map(p => p.title).join(", ")}
          rows={3}
          required
        />
        <p className="text-xs text-muted-foreground">Step-by-step process for clients to understand the workflow</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="actions">
          Call-to-Action Buttons <span className="text-destructive">*</span>
        </Label>
        <Input
          id="actions"
          name="actions"
          placeholder="e.g., Hire Me, Book Call, Request Quote (comma-separated)"
          defaultValue={service?.actions.map(a => a.label).join(", ")}
          required
        />
        <p className="text-xs text-muted-foreground">Action-oriented CTAs for conversion</p>
      </div>

      {/* Featured */}
      <div className="space-y-2">
        <Label htmlFor="featured">
          Featured <span className="text-destructive">*</span>
        </Label>
        <Select name="featured" defaultValue={service?.featured || "false"} required>
          <SelectTrigger>
            <SelectValue placeholder="Select featured status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">No</SelectItem>
            <SelectItem value="true">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Public/Private */}
      <div className="space-y-2">
        <Label htmlFor="isPublic">
          Visibility <span className="text-destructive">*</span>
        </Label>
        <Select name="isPublic" defaultValue={service?.isPublic ? "true" : "false"} required>
          <SelectTrigger>
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Private</SelectItem>
            <SelectItem value="true">Public</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {service ? "Update Service" : "Create Service"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
