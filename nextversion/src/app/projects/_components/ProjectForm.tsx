"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createProject, updateProject } from "../_server-actions/project-server-actions"
import { Images, type TechStack } from "@/db/types/projectTypes"
import { TechStackSection } from "./form-sections/TechStackSection"
import { StringArraySection } from "./form-sections/StringArraySection"
import { ImageSection } from "./form-sections/ImageSection"
import { ArchitectureSection } from "./form-sections/ArchitectureSection"

type Architecture = {
  layers: {
    name: string
    description?: string
    diagrams?: string[]
  }[]
  notes?: string
}


type ProjectFormData = {
  title: string
  description: string
  overview: string
  role: string
  techStack: TechStack
  architecture: Architecture
  frontendRendering: "CSR" | "SSR" | "SSG" | "ISR"
  mobileSupport: boolean
  features: string[]
  challenges: string[]
  results: string[]
  images: Images
  category: "web" | "mobile" | "fullstack" | "api"
  status: "planned" | "in-progress" | "completed"
  startDate: string
  endDate?: string
  tags: string[]
  liveDemo?: string
  sourceCode?: string
  whyItMatters?: string
  isFeatured: boolean
  isPublic: boolean
}

interface ProjectFormProps {
  project?: ProjectFormData & { id?: string }
  onSuccess?: () => void
  onCancel?: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projectImages, setProjectImages] = useState<Images>(() => {
    if (project?.images) {
      return project.images
    }
    return { main: "", others: [] }
  })
  const [techStack, setTechStack] = useState<TechStack>({
    frontend: project?.techStack?.frontend || [],
    backend: project?.techStack?.backend || [],
    database: project?.techStack?.database || [],
    infrastructure: project?.techStack?.infrastructure || [],
  })
  const [architecture, setArchitecture] = useState<Architecture>(project?.architecture || { layers: [], notes: "" })
  const [formValues, setFormValues] = useState({
    category: project?.category || "web",
    frontendRendering: project?.frontendRendering || "CSR",
    status: project?.status || "planned",
    mobileSupport: project?.mobileSupport || false,
    isFeatured: project?.isFeatured || false,
    isPublic: project?.isPublic || false,
  })
  const [features, setFeatures] = useState<string[]>(project?.features || [])
  const [challenges, setChallenges] = useState<string[]>(project?.challenges || [])
  const [results, setResults] = useState<string[]>(project?.results || [])
  const [tags, setTags] = useState<string[]>(project?.tags || [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      overview: project?.overview || "",
      role: project?.role || "",
      techStack: project?.techStack || { frontend: [], backend: [], database: [], infrastructure: [] },
      architecture: project?.architecture || { layers: [], notes: "" },
      frontendRendering: project?.frontendRendering || "CSR",
      mobileSupport: project?.mobileSupport || false,
      features: project?.features || [],
      challenges: project?.challenges || [],
      results: project?.results || [],
      images: project?.images || { main: "", others: [] },
      category: project?.category || "web",
      status: project?.status || "planned",
      startDate: project?.startDate || "",
      endDate: project?.endDate || "",
      tags: project?.tags || [],
      liveDemo: project?.liveDemo || "",
      sourceCode: project?.sourceCode || "",
      whyItMatters: project?.whyItMatters || "",
      isFeatured: project?.isFeatured || false,
      isPublic: project?.isPublic || false,
    },
  })

  const handleTechStackChange = (newTechStack: TechStack) => {
    setTechStack(newTechStack)
    setValue("techStack", newTechStack)
  }

  const handleArchitectureChange = (newArchitecture: Architecture) => {
    setArchitecture(newArchitecture)
    setValue("architecture", newArchitecture)
  }

  const handleImagesChange = (newImages: Images) => {
    setProjectImages(newImages)
    setValue("images", newImages)
  }

  const handleFeaturesChange = (newFeatures: string[]) => {
    setFeatures(newFeatures)
    setValue("features", newFeatures)
  }

  const handleChallengesChange = (newChallenges: string[]) => {
    setChallenges(newChallenges)
    setValue("challenges", newChallenges)
  }

  const handleResultsChange = (newResults: string[]) => {
    setResults(newResults)
    setValue("results", newResults)
  }

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags)
    setValue("tags", newTags)
  }

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    try {
      const submitData = {
        ...data,
        features,
        challenges,
        results,
        tags,
        images: projectImages,
        techStack,
        architecture,
      }

      let result
      if (project?.id) {
        result = await updateProject(project.id, submitData)
      } else {
        result = await createProject(submitData)
      }

      if (result.success) {
        toast.success(project?.id ? "Project Updated" : "Project Created", {
          description: project?.id
            ? "Your project has been updated successfully."
            : "Your project has been created successfully.",
        })
        onSuccess?.()
      } else {
        toast.error("Error", {
          description: result.error || "There was an error saving your project.",
        })
      }
    } catch (error) {
      console.error("Error submitting project:", error)
      toast.error("Error", {
        description: "There was an error saving your project. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{project?.id ? "Edit Project" : "Create New Project"}</CardTitle>
        <CardDescription>Fill in the details about your project</CardDescription>
      </CardHeader>
      <CardContent className="!h-[80%] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input {...register("title", { required: "Title is required" })} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => {
                  setValue("category", value as "web" | "mobile" | "fullstack" | "api")
                  setFormValues((prev) => ({ ...prev, category: value as "web" | "mobile" | "fullstack" | "api" }))
                }}
                value={formValues.category}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="fullstack">Full Stack</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea {...register("description", { required: "Description is required" })} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Full Overview</Label>
            <Textarea {...register("overview", { required: "Overview is required" })} rows={4} />
            {errors.overview && <p className="text-sm text-red-500">{errors.overview.message}</p>}
          </div>

          <TechStackSection techStack={techStack} onTechStackChange={handleTechStackChange} />

          <ArchitectureSection architecture={architecture} onArchitectureChange={handleArchitectureChange} />

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Frontend Rendering</Label>
              <Select
                onValueChange={(value) => {
                  setValue("frontendRendering", value as "CSR" | "SSR" | "SSG" | "ISR")
                  setFormValues((prev) => ({ ...prev, frontendRendering: value as "CSR" | "SSR" | "SSG" | "ISR" }))
                }}
                value={formValues.frontendRendering}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSR">CSR</SelectItem>
                  <SelectItem value="SSR">SSR</SelectItem>
                  <SelectItem value="SSG">SSG</SelectItem>
                  <SelectItem value="ISR">ISR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                onValueChange={(value) => {
                  setValue("status", value as "planned" | "in-progress" | "completed")
                  setFormValues((prev) => ({ ...prev, status: value as "planned" | "in-progress" | "completed" }))
                }}
                value={formValues.status}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Switches */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formValues.mobileSupport}
                onCheckedChange={(checked) => {
                  setValue("mobileSupport", checked)
                  setFormValues((prev) => ({ ...prev, mobileSupport: checked }))
                }}
              />
              <Label>Mobile Support</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formValues.isFeatured}
                onCheckedChange={(checked) => {
                  setValue("isFeatured", checked)
                  setFormValues((prev) => ({ ...prev, isFeatured: checked }))
                }}
              />
              <Label>Featured Project</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formValues.isPublic}
                onCheckedChange={(checked) => {
                  setValue("isPublic", checked)
                  setFormValues((prev) => ({ ...prev, isPublic: checked }))
                }}
              />
              <Label>Public Project</Label>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input type="date" {...register("startDate", { required: "Start date is required" })} />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input type="date" {...register("endDate")} />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Your Role</Label>
            <Input
              {...register("role", { required: "Role is required" })}
              placeholder="e.g., Full-Stack Developer, Lead Developer"
            />
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>

          <StringArraySection
            label="Features"
            items={features}
            onItemsChange={handleFeaturesChange}
            placeholder="Add a feature"
          />

          <StringArraySection
            label="Challenges"
            items={challenges}
            onItemsChange={handleChallengesChange}
            placeholder="Add a challenge"
          />

          <StringArraySection
            label="Results & Impact"
            items={results}
            onItemsChange={handleResultsChange}
            placeholder="Add a result or impact"
          />

          <StringArraySection
            label="Tags"
            items={tags}
            onItemsChange={handleTagsChange}
            placeholder="Add a tag"
          />

          <ImageSection images={projectImages} onImagesChange={handleImagesChange} />

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveDemo">Live Demo URL</Label>
              <Input {...register("liveDemo")} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sourceCode">Source Code URL</Label>
              <Input {...register("sourceCode")} placeholder="https://github.com/..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyItMatters">Why It Matters</Label>
            <Textarea {...register("whyItMatters")} placeholder="Personal motivation or impact..." />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saving..." : project?.id ? "Update Project" : "Create Project"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}