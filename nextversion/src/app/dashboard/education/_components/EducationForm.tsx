"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Upload, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Education } from "@/db/schema"
import { createEducation } from "@/app/education/_server-actions/createEducation"
import { updateEducation } from "@/app/education/_server-actions/updateEducation"
import { toast } from "sonner"

interface EducationFormProps {
  education?: Education
  mode: 'create' | 'edit'
}

interface FormData {
  title: string
  institution: string
  institutionImage: string
  educationType: string
  fieldOfStudy: string
  specialization: string
  location: string
  startDate: string
  endDate: string
  isOngoing: boolean
  description: string
}

export function EducationForm({ education, mode }: EducationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: education?.title || "",
      institution: education?.institution || "",
      institutionImage: education?.institutionImage || "",
      educationType: education?.educationType || "",
      fieldOfStudy: education?.fieldOfStudy || "",
      specialization: education?.specialization || "",
      location: education?.location || "",
      startDate: education?.startDate || "",
      endDate: education?.endDate || "",
      isOngoing: education?.isOngoing || false,
      description: education?.description || "",
    }
  })

  const isOngoing = watch("isOngoing")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    try {
      // Simulate upload - replace with actual Cloudinary upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'your_upload_preset')
      
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      setValue('institutionImage', data.secure_url)
      toast.success("Image uploaded successfully")
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setImageUploading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const result = mode === 'create' 
        ? await createEducation(data)
        : await updateEducation(education!.id, data)

      if (result.success) {
        toast.success(`Education ${mode === 'create' ? 'created' : 'updated'} successfully`)
        router.push('/dashboard/education')
      } else {
        toast.error(result.error || `Failed to ${mode} education`)
      }
    } catch (error) {
      toast.error(`Failed to ${mode} education`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/education">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            {mode === 'create' ? 'Add Education' : 'Edit Education'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'create' ? 'Add a new education record' : 'Update education information'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details of your education</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g., Bachelor of Science in Computer Engineering"
                />
                {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution *</Label>
                <Input
                  id="institution"
                  {...register("institution", { required: "Institution is required" })}
                  placeholder="e.g., University of Rwanda"
                />
                {errors.institution && <p className="text-sm text-red-600">{errors.institution.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="educationType">Education Type *</Label>
                <Select onValueChange={(value) => setValue("educationType", value)} defaultValue={education?.educationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BACHELOR">Bachelor&apos;s Degree</SelectItem>
                    <SelectItem value="MASTER">Master&apos;s Degree</SelectItem>
                    <SelectItem value="DOCTORATE">Doctorate</SelectItem>
                    <SelectItem value="BOOTCAMP">Bootcamp</SelectItem>
                    <SelectItem value="CERTIFICATE">Certificate</SelectItem>
                    <SelectItem value="DIPLOMA">Diploma</SelectItem>
                    <SelectItem value="COURSE">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  placeholder="e.g., Kigali, Rwanda"
                />
                {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  {...register("fieldOfStudy")}
                  placeholder="e.g., Computer Engineering"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  {...register("specialization")}
                  placeholder="e.g., Software Engineering & Web Development"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Institution Image</CardTitle>
            <CardDescription>Upload an image representing the institution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institutionImage">Image URL</Label>
              <Input
                id="institutionImage"
                {...register("institutionImage")}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUpload">Or Upload Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                />
                <Button type="button" variant="outline" disabled={imageUploading}>
                  <Upload className="h-4 w-4 mr-2" />
                  {imageUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Specify the duration of your education</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  {...register("startDate", { required: "Start date is required" })}
                />
                {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  {...register("endDate")}
                  disabled={isOngoing}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isOngoing"
                checked={isOngoing}
                onCheckedChange={(checked) => setValue("isOngoing", !!checked)}
              />
              <Label htmlFor="isOngoing">Currently ongoing</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Provide details about your education experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe your education experience, key learnings, achievements, etc."
                rows={6}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="btn-cta">
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : mode === 'create' ? 'Create Education' : 'Update Education'}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/education">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}