import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

interface ImageGalleryProps {
  mainImage: string;
  thumbnailImages: string[];
  activeThumbnail: number;
  onThumbnailClick: (index: number, src: string) => void;
}

export const ImageGallery = ({ mainImage, thumbnailImages, activeThumbnail, onThumbnailClick }: ImageGalleryProps) => {
  return (
    <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Imanariyo Baptiste</CardTitle>
        <CardDescription>Full-Stack Software Engineer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={mainImage}
              alt="Baptiste Imanariyo - Full Stack Developer"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </Card>
        
        <div className="flex gap-2 justify-center">
          {thumbnailImages.map((src, index) => (
            <button
              key={index}
              onClick={() => onThumbnailClick(index, src)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                activeThumbnail === index 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
        
        <Card className="p-4 bg-background/50">
          <div className="text-center space-y-2">
            <div className="text-2xl">🌟</div>
            <h3 className="font-semibold">Ready to Collaborate</h3>
            <p className="text-sm text-muted-foreground">
              Passionate about creating impactful solutions and contributing to high-performing teams
            </p>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};