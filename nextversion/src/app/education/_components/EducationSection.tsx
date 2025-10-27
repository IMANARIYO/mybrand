"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { GraduationCap, Calendar, MapPin, Award, BookOpen, Target, Lightbulb, FlaskConical } from "lucide-react"
import Image from "next/image"
import type { Education } from "@/db/schema"
import { listEducation } from "../_server-actions/listEducation"

export function EducationSection() {
  const [educationList, setEducationList] = useState<Education[]>([])

  useEffect(() => {
    const loadEducation = async () => {
      const data = await listEducation()
      setEducationList(data as Education[])
    }
    loadEducation()
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getEducationIcon = (type: string) => {
    switch (type) {
      case 'BACHELOR':
      case 'MASTER':
      case 'DOCTORATE':
        return GraduationCap
      case 'CERTIFICATE':
        return Award
      case 'BOOTCAMP':
      case 'COURSE':
        return BookOpen
      default:
        return GraduationCap
    }
  }

  const getEducationColor = (type: string) => {
    switch (type) {
      case 'BACHELOR':
        return 'bg-blue-500'
      case 'MASTER':
        return 'bg-purple-500'
      case 'DOCTORATE':
        return 'bg-red-500'
      case 'CERTIFICATE':
        return 'bg-green-500'
      case 'BOOTCAMP':
        return 'bg-orange-500'
      case 'COURSE':
        return 'bg-cyan-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <section id="education" className="min-h-screen bg-background  px-4">
      <div className=" mx-auto">
        <Card className="border-2 shadow-2xl">

          <CardContent className="space-y-8">
            {/* Education Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {educationList.map((edu, index) => {
                const Icon = getEducationIcon(edu.educationType)
                const colorClass = getEducationColor(edu.educationType)

                const getEducationHighlights = (type: string) => {
                  if (type === 'BACHELOR' || type === 'MASTER') {
                    return [
                      { label: "GPA", value: "3.8/4.0", description: "Graduated with Honors" },
                      { label: "Focus Areas", value: "Full-Stack Dev", description: "Specialized in web technologies" },
                      { label: "Projects", value: "12+ Academic", description: "Capstone & coursework projects" }
                    ]
                  } else {
                    return [
                      { label: "Certifications", value: "Industry Level", description: "Professional credentials" },
                      { label: "Learning Path", value: "Continuous", description: "Ongoing skill development" },
                      { label: "Technologies", value: "Modern Stack", description: "Latest frameworks & tools" }
                    ]
                  }
                }

                const highlights = getEducationHighlights(edu.educationType)

                return (
                  <AccordionItem key={edu.id} value={`edu-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left w-full">
                        {/* Institution Image */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={edu.institutionImage || '/placeholder-education.jpg'}
                            alt={edu.institution}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-1 right-1">
                            <div className={`p-1 rounded ${colorClass} text-white`}>
                              <Icon className="h-3 w-3" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={`${colorClass} text-white text-xs`}>
                                  {edu.educationType}
                                </Badge>
                                {edu.isOngoing && (
                                  <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                                    Ongoing
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-bold text-lg text-left line-clamp-1">{edu.title}</h3>
                              <p className="text-primary font-semibold text-left">{edu.institution}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">
                                {formatDate(edu.startDate)} - {edu.isOngoing ? 'Present' : formatDate(edu.endDate!)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-6">
                      <Card className="mt-4">
                        <CardContent className="p-6 space-y-6">
                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed">
                            {edu.description}
                          </p>

                          <Separator />

                          {/* Education Highlights */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              Academic Highlights
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {highlights.map((highlight, idx) => (
                                <Card key={idx} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                                  <div className="text-center space-y-2">
                                    <div className="font-bold text-lg text-primary">{highlight.value}</div>
                                    <div className="text-sm font-semibold">{highlight.label}</div>
                                    <div className="text-xs text-muted-foreground">{highlight.description}</div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Key Learning Areas */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Award className="h-4 w-4 text-primary" />
                              Key Learning Areas
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Card className="p-4 bg-primary/5">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-primary/20">
                                    <Lightbulb className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-primary">Technical Foundation</h4>
                                    <p className="text-sm text-muted-foreground">Core CS principles & algorithms</p>
                                  </div>
                                </div>
                              </Card>

                              <Card className="p-4 bg-secondary/5">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-secondary/20">
                                    <FlaskConical className="h-4 w-4 text-secondary" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-secondary">Practical Application</h4>
                                    <p className="text-sm text-muted-foreground">Hands-on project experience</p>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          </div>

                          {/* Skills & Specialization */}
                          <div>
                            <h4 className="font-semibold mb-3">Skills & Knowledge Gained</h4>
                            <div className="space-y-3">
                              {edu.fieldOfStudy && (
                                <div className="flex items-center gap-2">
                                  <Target className="h-4 w-4 text-primary" />
                                  <span className="font-medium">Field of Study:</span>
                                  <span className="text-muted-foreground">{edu.fieldOfStudy}</span>
                                </div>
                              )}
                              {edu.specialization && (
                                <div className="flex items-center gap-2">
                                  <Award className="h-4 w-4 text-secondary" />
                                  <span className="font-medium">Specialization:</span>
                                  <span className="text-muted-foreground">{edu.specialization}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-accent" />
                                <span className="font-medium">Location:</span>
                                <span className="text-muted-foreground">{edu.location}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>

            {/* Education Stats */}
            <Card className="bg-primary/5">
              <CardHeader className="text-center">
                <CardTitle>Educational Journey Overview</CardTitle>
                <CardDescription>Comprehensive learning path and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">{educationList.length}</div>
                    <div className="text-sm text-muted-foreground">Programs Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">
                      {educationList.filter(e => e.educationType === 'BACHELOR' || e.educationType === 'MASTER').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Degrees</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {educationList.filter(e => e.educationType === 'CERTIFICATE').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Certifications</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {educationList.filter(e => e.isOngoing).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Ongoing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </section>
  )
}