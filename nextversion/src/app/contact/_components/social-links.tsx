"use client"

import { Linkedin, Github, Twitter, Youtube, Instagram, Facebook } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/digitaliuslab",
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2] hover:text-white",
  },
  {
    icon: Github,
    href: "https://github.com/digitaliuslab",
    label: "GitHub",
    color: "hover:bg-[#181717] hover:text-white",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/digitaliuslab",
    label: "Twitter",
    color: "hover:bg-[#1DA1F2] hover:text-white",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@digitaliuslab",
    label: "YouTube",
    color: "hover:bg-[#FF0000] hover:text-white",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/digitaliuslab",
    label: "Instagram",
    color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
  },
  {
    icon: Facebook,
    href: "https://facebook.com/digitaliuslab",
    label: "Facebook",
    color: "hover:bg-[#1877F2] hover:text-white",
  },
]

export function SocialLinks() {
  return (
    <Card className="border-2 shadow-xl animate-fade-in-up animation-delay-400">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-foreground mb-6">Connect With Us</h3>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-14 sm:h-16 items-center justify-center rounded-xl border-2 border-border bg-background transition-all duration-300 hover:scale-105 hover:shadow-lg ${social.color} animate-scale-in`}
                style={{ animationDelay: `${(index + 1) * 50}ms` }}
                aria-label={social.label}
                title={social.label}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-current transition-colors duration-300" />
              </a>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
