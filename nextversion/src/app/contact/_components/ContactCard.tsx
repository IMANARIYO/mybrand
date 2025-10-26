import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface ContactLink {
  href: string
  title: string
  icon: ReactNode
  bgColor: string
  hoverColor: string
  hoverTextColor: string
}

interface ContactCardProps {
  title: string
  links: ContactLink[]
  variant: "primary" | "secondary"
}

export function ContactCard({ title, links, variant }: ContactCardProps) {
  const gradientClass = variant === "primary" 
    ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
    : "bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20"

  return (
    <Card className={gradientClass}>
      <CardHeader className="p-2 sm:p-3 pb-1">
        <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3 pt-0">
        <div className="flex justify-center gap-1 sm:gap-2 md:gap-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              title={link.title}
              className={`p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg md:rounded-xl ${link.bgColor} ${link.hoverColor} ${link.hoverTextColor} transition-all duration-300 hover:scale-110`}
              target={link.href.startsWith('http') ? "_blank" : undefined}
              rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
            >
              <div className="text-sm sm:text-base md:text-lg lg:text-xl">
                {link.icon}
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}