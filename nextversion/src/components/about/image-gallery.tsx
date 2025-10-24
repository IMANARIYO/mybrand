"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Sparkles, Code2, Rocket, Users, User, ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageGalleryProps {
  mainImage?: string;
  thumbnailImages?: string[];
  activeThumbnail?: number;
  onThumbnailClick?: (index: number, src: string) => void;
}

const DEFAULT_IMAGE = "/api/placeholder/400/400";
const FALLBACK_THUMBNAILS = [
  "/api/placeholder/100/100",
  "/api/placeholder/100/100",
  "/api/placeholder/100/100"
];

export const ImageGallery = ({
  mainImage = DEFAULT_IMAGE,
  thumbnailImages = FALLBACK_THUMBNAILS,
  activeThumbnail = 0,
  onThumbnailClick
}: ImageGalleryProps) => {
  const [imageError, setImageError] = useState(false);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleThumbnailError = (index: number) => {
    setThumbnailErrors(prev => new Set(prev).add(index));
  };

  const handleThumbnailClick = (index: number, src: string) => {
    if (onThumbnailClick && !thumbnailErrors.has(index)) {
      onThumbnailClick(index, src);
    }
  };

  const validThumbnails = thumbnailImages.filter((_, index) => !thumbnailErrors.has(index));

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border border-border/50 bg-gradient-to-br from-card/95 to-card shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Imanariyo Baptiste
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-medium">
            Full-Stack Software Engineer
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:p-6">
          {/* Main Image */}
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="relative aspect-square bg-muted/20">
              {imageError ? (
                <div className="flex items-center justify-center h-full bg-muted/10">
                  <div className="text-center space-y-2">
                    <User className="h-16 w-16 text-muted-foreground/50 mx-auto" />
                    <p className="text-xs text-muted-foreground">Image unavailable</p>
                  </div>
                </div>
              ) : (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
                      <div className="animate-pulse">
                        <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    </div>
                  )}
                  <Image
                    src={mainImage}
                    alt="Baptiste Imanariyo - Full Stack Developer"
                    fill
                    className={`object-contain transition-all duration-500 hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                    priority
                    onLoad={() => setIsLoading(false)}
                    onError={handleImageError}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </>
              )}
            </div>
          </Card>

          {/* Thumbnail Gallery */}
          {validThumbnails.length > 0 && (
            <div className="flex gap-2 justify-center flex-wrap">
              {thumbnailImages.map((src, index) => {
                if (thumbnailErrors.has(index)) return null;

                return (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index, src)}
                    disabled={!onThumbnailClick}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed ${activeThumbnail === index
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-border hover:border-primary/50'
                      }`}
                    aria-label={`View gallery image ${index + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`Gallery thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={() => handleThumbnailError(index)}
                      sizes="56px"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Professional Values */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: Code2, label: "Clean Code", color: "text-blue-500" },
              { icon: Rocket, label: "Innovation", color: "text-purple-500" },
              { icon: Users, label: "Collaboration", color: "text-green-500" }
            ].map(({ icon: Icon, label, color }, index) => (
              <Card key={index} className="p-2 sm:p-3 bg-card/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 border-0 shadow-sm">
                <div className="text-center space-y-1">
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 mx-auto ${color}`} aria-hidden="true" />
                  <p className="text-xs font-medium text-foreground/90">{label}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-sm">
            <div className="text-center space-y-2">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-sm sm:text-base text-foreground">Ready to Build Together</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Passionate about creating scalable solutions and delivering exceptional user experiences
              </p>
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};