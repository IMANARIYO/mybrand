'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Images } from '@/db/types/projectTypes'

interface ImageGalleryProps {
  images: Images
  projectTitle: string
}

export function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  
  // Combine main image with others
  const allImages = [
    { url: images.main, caption: `${projectTitle} - Main View`, type: 'main' as const },
    ...(images.others || [])
  ]

  const openModal = (index: number) => setSelectedIndex(index)
  const closeModal = () => setSelectedIndex(null)
  const nextImage = () => setSelectedIndex(prev => prev !== null ? (prev + 1) % allImages.length : 0)
  const prevImage = () => setSelectedIndex(prev => prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0)

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allImages.map((image, index) => (
          <Card 
            key={index} 
            className="group overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="relative aspect-video">
              <Image
                src={image.url}
                alt={image.caption || `${projectTitle} screenshot ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Main
                  </span>
                </div>
              )}
            </div>
            {image.caption && (
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{image.caption}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <Image
                src={allImages[selectedIndex].url}
                alt={allImages[selectedIndex].caption || `${projectTitle} screenshot ${selectedIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {allImages[selectedIndex].caption || `${projectTitle} - Image ${selectedIndex + 1}`}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {selectedIndex + 1} of {allImages.length}
                  </p>
                </div>
                {selectedIndex === 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Main View
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}