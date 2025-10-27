"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { 
  FRONTEND_TECHNOLOGIES, 
  BACKEND_TECHNOLOGIES, 
  DATABASE_TECHNOLOGIES, 
  INFRASTRUCTURE_TECHNOLOGIES,
  type TechStack 
} from "@/db/types/projectTypes"

interface TechStackSectionProps {
  techStack: TechStack
  onTechStackChange: (newTechStack: TechStack) => void
}

export function TechStackSection({ techStack, onTechStackChange }: TechStackSectionProps) {
  const addTech = (category: keyof TechStack, value: string) => {
    const categoryKey = category as keyof TechStack
    if (!techStack[categoryKey].includes(value as never)) {
      const newTechStack = {
        ...techStack,
        [category]: [...techStack[categoryKey], value]
      }
      onTechStackChange(newTechStack)
    }
  }

  const removeTech = (category: keyof TechStack, tech: string) => {
    const newTechStack = { ...techStack, [category]: techStack[category].filter((t) => t !== tech) }
    onTechStackChange(newTechStack)
  }

  return (
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
            <Select onValueChange={(value) => addTech(category as keyof TechStack, value)}>
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
  )
}