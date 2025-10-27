"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GraduationCap, Plus, Search, Edit, Trash2, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Education } from "@/db/schema"
import { listEducation } from "@/app/education/_server-actions/listEducation"
import { deleteEducation } from "@/app/education/_server-actions/deleteEducation"
import { toast } from "sonner"

export default function EducationManagementPage() {
  const [educationList, setEducationList] = useState<Education[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEducation()
  }, [])

  const loadEducation = async () => {
    try {
      const data = await listEducation()
      setEducationList(data as Education[])
    } catch (error) {
      toast.error("Failed to load education records")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    const result = await deleteEducation(id)
    if (result.success) {
      toast.success("Education record deleted successfully")
      loadEducation()
    } else {
      toast.error("Failed to delete education record")
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getEducationColor = (type: string) => {
    switch (type) {
      case 'BACHELOR': return 'bg-blue-500'
      case 'MASTER': return 'bg-purple-500'
      case 'DOCTORATE': return 'bg-red-500'
      case 'CERTIFICATE': return 'bg-green-500'
      case 'BOOTCAMP': return 'bg-orange-500'
      case 'COURSE': return 'bg-cyan-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredEducation = educationList.filter(edu =>
    edu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edu.institution.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading education records...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            Education Management
          </h1>
          <p className="text-muted-foreground">Manage your educational background and certifications</p>
        </div>
        <Button asChild className="btn-cta">
          <Link href="/dashboard/education/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search education records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Education List */}
      <div className="grid gap-6">
        {filteredEducation.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Education Records Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No records match your search." : "Start by adding your first education record."}
              </p>
              <Button asChild>
                <Link href="/dashboard/education/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredEducation.map((edu) => {
            const colorClass = getEducationColor(edu.educationType)
            
            return (
              <Card key={edu.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    {/* Institution Image */}
                    <div className="relative h-48 lg:h-full">
                      <Image
                        src={edu.institutionImage || '/placeholder-education.jpg'}
                        alt={edu.institution}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${colorClass} text-white`}>
                          {edu.educationType}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{edu.title}</h3>
                            {edu.isOngoing && (
                              <Badge variant="outline" className="border-green-500 text-green-600">
                                Ongoing
                              </Badge>
                            )}
                          </div>
                          <p className="text-primary font-semibold">{edu.institution}</p>
                          {edu.specialization && (
                            <p className="text-sm text-muted-foreground">
                              Specialization: {edu.specialization}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {formatDate(edu.startDate)} - {edu.isOngoing ? 'Present' : formatDate(edu.endDate!)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{edu.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/dashboard/education/edit/${edu.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(edu.id, edu.title)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Education Statistics</CardTitle>
          <CardDescription>Overview of your educational background</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{educationList.length}</div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">
                {educationList.filter(e => e.educationType === 'BACHELOR' || e.educationType === 'MASTER').length}
              </div>
              <div className="text-sm text-muted-foreground">Degrees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                {educationList.filter(e => e.educationType === 'CERTIFICATE').length}
              </div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {educationList.filter(e => e.isOngoing).length}
              </div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}