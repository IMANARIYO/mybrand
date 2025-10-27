"use client"

import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { FileUploadDemo } from "@/components/Uploading/file-uploads"
import { Images } from "@/db/types/projectTypes"


interface ImageSectionProps {
  images: Images
  onImagesChange: (images: Images) => void
}

export function ImageSection({ images, onImagesChange }: ImageSectionProps) {


  console.log("Current images:", images)
  const updateMainImage = (files: { url: string }[]) => {
    const newImages = { ...images, main: files[0]?.url || "" }
    onImagesChange(newImages)
  }

  const updateOtherImages = (files: { url: string }[]) => {
    const newImages = { ...images, others: files }
    onImagesChange(newImages)
  }

  const removeMainImage = () => {
    const newImages = { ...images, main: "" }
    onImagesChange(newImages)
  }

  const removeOtherImage = (index: number) => {
    const newOthers = images.others?.filter((_, i) => i !== index) || []
    const newImages = { ...images, others: newOthers }
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Main Image (required)</Label>
        <FileUploadDemo onChange={updateMainImage} />
        {images.main && (
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              Main Image
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={removeMainImage}
              />
            </Badge>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Additional Images (optional)</Label>
        <FileUploadDemo onChange={updateOtherImages} />
        {images.others && images.others.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.others.map((img, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                Image {index + 2}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeOtherImage(index)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}