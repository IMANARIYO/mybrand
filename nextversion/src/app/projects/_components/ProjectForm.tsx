"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { X, Plus, Pencil } from "lucide-react"
import { toast } from "sonner"
import { FileUploadDemo } from "@/components/Uploading/file-uploads"
import { createProject, updateProject } from "../_server-actions/project-server-actions"
import {
  FRONTEND_TECHNOLOGIES,
  BACKEND_TECHNOLOGIES,
  DATABASE_TECHNOLOGIES,
  INFRASTRUCTURE_TECHNOLOGIES,
  type TechStack
} from "@/db/types/projectTypes"

type Architecture = {
  layers: {
    name: string
    description?: string
    diagrams?: string[]
  }[]
  notes?: string
}

type Images = {
  main: string
  others?: {
    url: string
    type?: "screenshot" | "diagram" | "other"
    caption?: string
  }[]
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

  const featureInputRef = useRef<HTMLInputElement>(null)
  const challengeInputRef = useRef<HTMLInputElement>(null)
  const resultInputRef = useRef<HTMLInputElement>(null)
  const tagInputRef = useRef<HTMLInputElement>(null)
  const layerInputRef = useRef<HTMLInputElement>(null)

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
  const [layerInput, setLayerInput] = useState({ name: "", description: "" })
  const [editingLayer, setEditingLayer] = useState<{
    index: number
    value: { name: string; description: string }
  } | null>(null)

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
  const [featureInput, setFeatureInput] = useState("")
  const [challengeInput, setChallengeInput] = useState("")
  const [resultInput, setResultInput] = useState("")
  const [tagInput, setTagInput] = useState("")


  const [editingFeature, setEditingFeature] = useState<{ index: number; value: string } | null>(null)
  const [editingChallenge, setEditingChallenge] = useState<{ index: number; value: string } | null>(null)
  const [editingResult, setEditingResult] = useState<{ index: number; value: string } | null>(null)
  const [editingTag, setEditingTag] = useState<{ index: number; value: string } | null>(null)

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



  const removeTech = (category: keyof TechStack, tech: string) => {
    const newTechStack = { ...techStack, [category]: techStack[category].filter((t) => t !== tech) }
    setTechStack(newTechStack)
    setValue("techStack", newTechStack)
  }



  const addLayer = () => {
    const name = layerInput.name.trim()
    if (!name) return

    if (editingLayer !== null) {
      const newLayers = [...architecture.layers]
      newLayers[editingLayer.index] = { name, description: layerInput.description }
      const newArchitecture = { ...architecture, layers: newLayers }
      setArchitecture(newArchitecture)
      setValue("architecture", newArchitecture)
      setEditingLayer(null)
    } else {
      const newArchitecture = {
        ...architecture,
        layers: [...architecture.layers, { name, description: layerInput.description }],
      }
      setArchitecture(newArchitecture)
      setValue("architecture", newArchitecture)
    }
    setLayerInput({ name: "", description: "" })
    setTimeout(() => layerInputRef.current?.focus(), 0)
  }

  const removeLayer = (index: number) => {
    const newLayers = architecture.layers.filter((_: Architecture['layers'][0], i: number) => i !== index)
    const newArchitecture = { ...architecture, layers: newLayers }
    setArchitecture(newArchitecture)
    setValue("architecture", newArchitecture)
  }

  const editLayer = (index: number) => {
    const layer = architecture.layers[index]
    setLayerInput({ name: layer.name, description: layer.description || "" })
    setEditingLayer({ index, value: { name: layer.name, description: layer.description || "" } })
    setTimeout(() => layerInputRef.current?.focus(), 0)
  }

  const cancelEditLayer = () => {
    setEditingLayer(null)
    setLayerInput({ name: "", description: "" })
  }

  const addFeature = () => {
    const value = featureInput.trim()
    if (!value) return

    if (editingFeature !== null) {
      const newFeatures = [...features]
      newFeatures[editingFeature.index] = value
      setFeatures(newFeatures)
      setValue("features", newFeatures)
      setEditingFeature(null)
    } else {
      if (!features.includes(value)) {
        const newFeatures = [...features, value]
        setFeatures(newFeatures)
        setValue("features", newFeatures)
      }
    }
    setFeatureInput("")
    setTimeout(() => featureInputRef.current?.focus(), 0)
  }

  const removeFeature = (feature: string) => {
    const newFeatures = features.filter((f) => f !== feature)
    setFeatures(newFeatures)
    setValue("features", newFeatures)
  }

  const editFeature = (index: number) => {
    setFeatureInput(features[index])
    setEditingFeature({ index, value: features[index] })
    setTimeout(() => featureInputRef.current?.focus(), 0)
  }

  const cancelEditFeature = () => {
    setEditingFeature(null)
    setFeatureInput("")
  }

  const addChallenge = () => {
    const value = challengeInput.trim()
    if (!value) return

    if (editingChallenge !== null) {
      const newChallenges = [...challenges]
      newChallenges[editingChallenge.index] = value
      setChallenges(newChallenges)
      setValue("challenges", newChallenges)
      setEditingChallenge(null)
    } else {
      if (!challenges.includes(value)) {
        const newChallenges = [...challenges, value]
        setChallenges(newChallenges)
        setValue("challenges", newChallenges)
      }
    }
    setChallengeInput("")
    setTimeout(() => challengeInputRef.current?.focus(), 0)
  }

  const removeChallenge = (challenge: string) => {
    const newChallenges = challenges.filter((c) => c !== challenge)
    setChallenges(newChallenges)
    setValue("challenges", newChallenges)
  }

  const editChallenge = (index: number) => {
    setChallengeInput(challenges[index])
    setEditingChallenge({ index, value: challenges[index] })
    setTimeout(() => challengeInputRef.current?.focus(), 0)
  }

  const cancelEditChallenge = () => {
    setEditingChallenge(null)
    setChallengeInput("")
  }

  const addResult = () => {
    const value = resultInput.trim()
    if (!value) return

    if (editingResult !== null) {
      const newResults = [...results]
      newResults[editingResult.index] = value
      setResults(newResults)
      setValue("results", newResults)
      setEditingResult(null)
    } else {
      if (!results.includes(value)) {
        const newResults = [...results, value]
        setResults(newResults)
        setValue("results", newResults)
      }
    }
    setResultInput("")
    setTimeout(() => resultInputRef.current?.focus(), 0)
  }

  const removeResult = (result: string) => {
    const newResults = results.filter((r) => r !== result)
    setResults(newResults)
    setValue("results", newResults)
  }

  const editResult = (index: number) => {
    setResultInput(results[index])
    setEditingResult({ index, value: results[index] })
    setTimeout(() => resultInputRef.current?.focus(), 0)
  }

  const cancelEditResult = () => {
    setEditingResult(null)
    setResultInput("")
  }

  const addTag = () => {
    const value = tagInput.trim()
    if (!value) return

    if (editingTag !== null) {
      const newTags = [...tags]
      newTags[editingTag.index] = value
      setTags(newTags)
      setValue("tags", newTags)
      setEditingTag(null)
    } else {
      if (!tags.includes(value)) {
        const newTags = [...tags, value]
        setTags(newTags)
        setValue("tags", newTags)
      }
    }
    setTagInput("")
    setTimeout(() => tagInputRef.current?.focus(), 0)
  }

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag)
    setTags(newTags)
    setValue("tags", newTags)
  }

  const editTag = (index: number) => {
    setTagInput(tags[index])
    setEditingTag({ index, value: tags[index] })
    setTimeout(() => tagInputRef.current?.focus(), 0)
  }

  const cancelEditTag = () => {
    setEditingTag(null)
    setTagInput("")
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
        images: [projectImages.main, ...(projectImages.others?.map((img) => img.url) || [])].filter(Boolean),
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

          {/* Tech Stack */}
          <div className="space-y-4">
            <Label>Tech Stack</Label>
            {Object.entries({
              frontend: FRONTEND_TECHNOLOGIES,
              backend: BACKEND_TECHNOLOGIES,
              database: DATABASE_TECHNOLOGIES,
              infrastructure: INFRASTRUCTURE_TECHNOLOGIES
            }).map(([category, options]) => (
              <div key={category} className="space-y-2">
                <Label className="capitalize">{category}</Label>
                <div className="flex gap-2">
                  <Select
                    onValueChange={(value) => {
                      const categoryKey = category as keyof TechStack
                      if (!techStack[categoryKey].includes(value as never)) {
                        const newTechStack = {
                          ...techStack,
                          [category]: [...techStack[categoryKey], value]
                        }
                        setTechStack(newTechStack)
                        setValue("techStack", newTechStack)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${category} technology`} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack[category as keyof typeof techStack].map((tech, index) => (
                    <Badge key={`${tech}-${index}`} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeTech(category as keyof TechStack, tech)
                        }}
                        className="hover:opacity-70"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Label>Architecture Layers</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  ref={layerInputRef}
                  value={layerInput.name}
                  onChange={(e) => setLayerInput((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Layer name (e.g., Frontend, Backend)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLayer())}
                />
                <Input
                  value={layerInput.description}
                  onChange={(e) => setLayerInput((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Description (optional)"
                />
                <Button type="button" onClick={addLayer}>
                  {editingLayer !== null ? "Update" : <Plus className="h-4 w-4" />}
                </Button>
                {editingLayer !== null && (
                  <Button type="button" variant="outline" onClick={cancelEditLayer}>
                    Cancel
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {architecture.layers.map((layer: Architecture['layers'][0], index: number) => (
                  <Badge key={`${layer.name}-${index}`} variant="secondary" className="flex items-center gap-1">
                    {layer.name}
                    {layer.description && <span className="text-xs opacity-70">: {layer.description}</span>}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        editLayer(index)
                      }}
                      className="ml-1 hover:opacity-70"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeLayer(index)
                      }}
                      className="hover:opacity-70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="architectureNotes">Architecture Notes</Label>
              <Textarea
                value={architecture.notes || ""}
                onChange={(e) => {
                  const newArchitecture = { ...architecture, notes: e.target.value }
                  setArchitecture(newArchitecture)
                  setValue("architecture", newArchitecture)
                }}
                placeholder="Overall architecture notes..."
                rows={3}
              />
            </div>
          </div>

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

          {/* Features */}
          <div className="space-y-4">
            <Label>Features</Label>
            <div className="flex gap-2">
              <Input
                ref={featureInputRef}
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature}>
                {editingFeature !== null ? "Update" : <Plus className="h-4 w-4" />}
              </Button>
              {editingFeature !== null && (
                <Button type="button" variant="outline" onClick={cancelEditFeature}>
                  Cancel
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={`${feature}-${index}`} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      editFeature(index)
                    }}
                    className="ml-1 hover:opacity-70"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFeature(feature)
                    }}
                    className="hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-4">
            <Label>Challenges</Label>
            <div className="flex gap-2">
              <Input
                ref={challengeInputRef}
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                placeholder="Add a challenge"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addChallenge())}
              />
              <Button type="button" onClick={addChallenge}>
                {editingChallenge !== null ? "Update" : <Plus className="h-4 w-4" />}
              </Button>
              {editingChallenge !== null && (
                <Button type="button" variant="outline" onClick={cancelEditChallenge}>
                  Cancel
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {challenges.map((challenge, index) => (
                <Badge key={`${challenge}-${index}`} variant="secondary" className="flex items-center gap-1">
                  {challenge}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      editChallenge(index)
                    }}
                    className="ml-1 hover:opacity-70"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeChallenge(challenge)
                    }}
                    className="hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <Label>Results & Impact</Label>
            <div className="flex gap-2">
              <Input
                ref={resultInputRef}
                value={resultInput}
                onChange={(e) => setResultInput(e.target.value)}
                placeholder="Add a result or impact"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addResult())}
              />
              <Button type="button" onClick={addResult}>
                {editingResult !== null ? "Update" : <Plus className="h-4 w-4" />}
              </Button>
              {editingResult !== null && (
                <Button type="button" variant="outline" onClick={cancelEditResult}>
                  Cancel
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {results.map((result, index) => (
                <Badge key={`${result}-${index}`} variant="secondary" className="flex items-center gap-1">
                  {result}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      editResult(index)
                    }}
                    className="ml-1 hover:opacity-70"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeResult(result)
                    }}
                    className="hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                ref={tagInputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>
                {editingTag !== null ? "Update" : <Plus className="h-4 w-4" />}
              </Button>
              {editingTag !== null && (
                <Button type="button" variant="outline" onClick={cancelEditTag}>
                  Cancel
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      editTag(index)
                    }}
                    className="ml-1 hover:opacity-70"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeTag(tag)
                    }}
                    className="hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Main Image (required)</Label>
              <FileUploadDemo
                onChange={(images) => {
                  const newImages = { ...projectImages, main: images[0]?.url || "" }
                  setProjectImages(newImages)
                  setValue("images", newImages)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Images (optional)</Label>
              <FileUploadDemo
                onChange={(images) => {
                  const newImages = { ...projectImages, others: images }
                  setProjectImages(newImages)
                  setValue("images", newImages)
                }}
              />
            </div>
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
