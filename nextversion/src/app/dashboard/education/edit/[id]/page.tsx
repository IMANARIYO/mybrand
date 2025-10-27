"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { EducationForm } from "../../_components/EducationForm"
import { getEducationById } from "@/app/education/_server-actions/getEducationById"
import type { Education } from "@/db/schema"

export default function EditEducationPage() {
  const params = useParams()
  const [education, setEducation] = useState<Education | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEducation = async () => {
      if (params.id) {
        const data = await getEducationById(params.id as string)
        setEducation(data)
      }
      setLoading(false)
    }
    loadEducation()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading education record...</div>
        </div>
      </div>
    )
  }

  if (!education) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Education record not found</div>
        </div>
      </div>
    )
  }

  return <EducationForm education={education} mode="edit" />
}