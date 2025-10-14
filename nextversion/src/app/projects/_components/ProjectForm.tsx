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
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { ProjectFormData } from "../_types/project.types"
import { createProject } from "../_server-actions/createProject"
import { updateProject } from "../_server-actions/updateProject"

interface ProjectFormProps {
  project?: ProjectFormData & { id?: string }
  onSuccess?: () => void
  onCancel?: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [techInputs, setTechInputs] = useState({
    frontend: '',
    backend: '',
    database: '',
    infrastructure: ''
  })

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: project || {
      title: '',
      description: '',
      overview: '',
      role: '',
      techStack: { frontend: [], backend: [], database: [], infrastructure: [] },
      architecture: 'monolithic',
      frontendRendering: 'CSR',
      mobileSupport: false,
      features: [],
      challenges: [],
      results: '',
      images: [],
      category: 'web',
      status: 'planned',
      startDate: '',
      tags: [],
      isFeatured: false
    }
  })

  const watchedValues = watch()

  const addTech = (category: keyof typeof techInputs) => {
    const value = techInputs[category].trim()
    if (value && !watchedValues.techStack[category].includes(value)) {
      setValue(`techStack.${category}`, [...watchedValues.techStack[category], value])
      setTechInputs(prev => ({ ...prev, [category]: '' }))
    }
  }

  const removeTech = (category: keyof typeof techInputs, tech: string) => {
    setValue(`techStack.${category}`, watchedValues.techStack[category].filter(t => t !== tech))
  }

  const addArrayItem = (field: 'features' | 'challenges' | 'images' | 'tags', value: string) => {
    if (value.trim() && !watchedValues[field].includes(value.trim())) {
      setValue(field, [...watchedValues[field], value.trim()])
    }
  }

  const removeArrayItem = (field: 'features' | 'challenges' | 'images' | 'tags', index: number) => {
    setValue(field, watchedValues[field].filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    try {
      const result = project?.id 
        ? await updateProject(project.id, data)
        : await createProject(data)
      
      if (result.success) {
        onSuccess?.()
      }
    } catch (error) {
      console.error('Error submitting project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{project?.id ? 'Edit Project' : 'Create New Project'}</CardTitle>
        <CardDescription>
          Fill in the details about your project
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              <Select onValueChange={(value) => setValue("category", value as any)} defaultValue={watchedValues.category}>
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

          {/* Tech Stack */}
          <div className="space-y-4">
            <Label>Tech Stack</Label>
            {Object.entries(techInputs).map(([category, value]) => (
              <div key={category} className="space-y-2">
                <Label className="capitalize">{category}</Label>
                <div className="flex gap-2">
                  <Input
                    value={value}
                    onChange={(e) => setTechInputs(prev => ({ ...prev, [category]: e.target.value }))}
                    placeholder={`Add ${category} technology`}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech(category as keyof typeof techInputs))}
                  />
                  <Button type="button" onClick={() => addTech(category as keyof typeof techInputs)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.techStack[category as keyof typeof watchedValues.techStack].map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTech(category as keyof typeof techInputs, tech)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture & Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Architecture</Label>
              <Select onValueChange={(value) => setValue("architecture", value as any)} defaultValue={watchedValues.architecture}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monolithic">Monolithic</SelectItem>
                  <SelectItem value="microservices">Microservices</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Frontend Rendering</Label>
              <Select onValueChange={(value) => setValue("frontendRendering", value as any)} defaultValue={watchedValues.frontendRendering}>
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
              <Select onValueChange={(value) => setValue("status", value as any)} defaultValue={watchedValues.status}>
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
                checked={watchedValues.mobileSupport} 
                onCheckedChange={(checked) => setValue("mobileSupport", checked)}
              />
              <Label>Mobile Support</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={watchedValues.isFeatured} 
                onCheckedChange={(checked) => setValue("isFeatured", checked)}
              />
              <Label>Featured Project</Label>
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

          {/* Results */}
          <div className="space-y-2">
            <Label htmlFor="results">Results & Impact</Label>
            <Textarea {...register("results", { required: "Results are required" })} />
            {errors.results && <p className="text-sm text-red-500">{errors.results.message}</p>}
          </div>

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
              {isSubmitting ? 'Saving...' : (project?.id ? 'Update Project' : 'Create Project')}
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