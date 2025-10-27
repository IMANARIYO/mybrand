"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { X, Plus, Pencil } from "lucide-react"

interface StringArraySectionProps {
  label: string
  items: string[]
  onItemsChange: (items: string[]) => void
  placeholder?: string
}

export function StringArraySection({ label, items, onItemsChange, placeholder }: StringArraySectionProps) {
  const [input, setInput] = useState("")
  const [editing, setEditing] = useState<{ index: number; value: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addItem = () => {
    const value = input.trim()
    if (!value) return

    if (editing !== null) {
      const newItems = [...items]
      newItems[editing.index] = value
      onItemsChange(newItems)
      setEditing(null)
    } else {
      if (!items.includes(value)) {
        onItemsChange([...items, value])
      }
    }
    setInput("")
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const removeItem = (item: string) => {
    onItemsChange(items.filter((i) => i !== item))
  }

  const editItem = (index: number) => {
    setInput(items[index])
    setEditing({ index, value: items[index] })
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const cancelEdit = () => {
    setEditing(null)
    setInput("")
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder || `Add a ${label.toLowerCase()}`}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addItem())}
        />
        <Button type="button" onClick={addItem}>
          {editing !== null ? "Update" : <Plus className="h-4 w-4" />}
        </Button>
        {editing !== null && (
          <Button type="button" variant="outline" onClick={cancelEdit}>
            Cancel
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={`${item}-${index}`} variant="secondary" className="flex items-center gap-1">
            {item}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                editItem(index)
              }}
              className="ml-1 hover:opacity-70"
            >
              <Pencil className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeItem(item)
              }}
              className="hover:opacity-70"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}