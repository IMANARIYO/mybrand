"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import UploadWidget, { type UploadedFileInfo } from "./UploadWidget"
import Image from "next/image"

interface ImageUploadFieldProps {
  label: string
  value: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  required?: boolean
  placeholder?: string
}

export function ImageUploadField({ 
  label, 
  value, 
  onChange, 
  multiple = false, 
  required = false,
  placeholder = "Enter image URL or upload"
}: ImageUploadFieldProps) {
  const [manualUrl, setManualUrl] = useState("")

  const handleUpload = (files: UploadedFileInfo[]) => {
    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : []
      const newUrls = files.map(file => file.url)
      onChange([...currentUrls, ...newUrls])
    } else {
      onChange(files[0]?.url || "")
    }
  }

  const handleManualAdd = () => {
    if (!manualUrl.trim()) return
    
    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : []
      onChange([...currentUrls, manualUrl.trim()])
    } else {
      onChange(manualUrl.trim())
    }
    setManualUrl("")
  }

  const handleRemove = (indexOrUrl: number | string) => {
    if (multiple && Array.isArray(value)) {
      const filtered = typeof indexOrUrl === 'number' 
        ? value.filter((_, i) => i !== indexOrUrl)
        : value.filter(url => url !== indexOrUrl)
      onChange(filtered)
    } else {
      onChange("")
    }
  }

  const urls = multiple ? (Array.isArray(value) ? value : []) : (value ? [value as string] : [])

  return (
    <div className="space-y-4">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      
      {/* Upload Options */}
      <div className="flex gap-2">
        <UploadWidget
          multiple={multiple}
          onUpload={handleUpload}
          trigger={
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image{multiple ? 's' : ''}
            </Button>
          }
        />
        
        <div className="flex flex-1 gap-2">
          <Input
            placeholder={placeholder}
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleManualAdd())}
          />
          <Button type="button" onClick={handleManualAdd} size="sm" variant="outline">
            Add
          </Button>
        </div>
      </div>

      {/* Image Previews */}
      {urls.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video relative overflow-hidden rounded-lg border bg-muted">
                  {url ? (
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={() => {
                        // Handle broken images
                        console.warn(`Failed to load image: ${url}`)
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemove(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs truncate max-w-full">
                    {url.split('/').pop()?.split('?')[0] || 'Image'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={multiple ? `${label.toLowerCase().replace(/\s+/g, '_')}_urls` : `${label.toLowerCase().replace(/\s+/g, '_')}_url`}
        value={multiple ? JSON.stringify(urls) : (urls[0] || "")}
      />
    </div>
  )
}