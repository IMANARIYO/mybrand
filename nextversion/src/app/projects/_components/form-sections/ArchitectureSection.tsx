"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Pencil } from "lucide-react"

type Architecture = {
  layers: {
    name: string
    description?: string
    diagrams?: string[]
  }[]
  notes?: string
}

interface ArchitectureSectionProps {
  architecture: Architecture
  onArchitectureChange: (architecture: Architecture) => void
}

export function ArchitectureSection({ architecture, onArchitectureChange }: ArchitectureSectionProps) {
  const [layerInput, setLayerInput] = useState({ name: "", description: "" })
  const [editingLayer, setEditingLayer] = useState<{
    index: number
    value: { name: string; description: string }
  } | null>(null)
  const layerInputRef = useRef<HTMLInputElement>(null)

  const addLayer = () => {
    const name = layerInput.name.trim()
    if (!name) return

    if (editingLayer !== null) {
      const newLayers = [...architecture.layers]
      newLayers[editingLayer.index] = { name, description: layerInput.description }
      const newArchitecture = { ...architecture, layers: newLayers }
      onArchitectureChange(newArchitecture)
      setEditingLayer(null)
    } else {
      const newArchitecture = {
        ...architecture,
        layers: [...architecture.layers, { name, description: layerInput.description }],
      }
      onArchitectureChange(newArchitecture)
    }
    setLayerInput({ name: "", description: "" })
    setTimeout(() => layerInputRef.current?.focus(), 0)
  }

  const removeLayer = (index: number) => {
    const newLayers = architecture.layers.filter((_, i) => i !== index)
    const newArchitecture = { ...architecture, layers: newLayers }
    onArchitectureChange(newArchitecture)
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

  const updateNotes = (notes: string) => {
    const newArchitecture = { ...architecture, notes }
    onArchitectureChange(newArchitecture)
  }

  return (
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
          {architecture.layers.map((layer, index) => (
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
          onChange={(e) => updateNotes(e.target.value)}
          placeholder="Overall architecture notes..."
          rows={3}
        />
      </div>
    </div>
  )
}