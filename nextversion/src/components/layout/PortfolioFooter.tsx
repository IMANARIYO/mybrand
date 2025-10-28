/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { siteConfig } from '@/config/site'
import {
  Share2, Heart, Phone, Github, Globe, Copy, Check, PhoneCall, Mail,
} from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'

export function PortfolioFooter() {
  const [copied, setCopied] = useState(false)
  const portfolioUrl = typeof window !== 'undefined' ? window.location.origin : siteConfig.url

  const copyPortfolioLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl)
      setCopied(true)
      toast.success("Portfolio link copied! Share it with your network!")
      setTimeout(() => setCopied(false), 3000)
    } catch {
      toast.error("Failed to copy link")
    }
  }

  const shareToLinkedIn = () => {
    const text = `RARE TALENT ALERT: Discover Imanariyo Baptiste's portfolio — real-world full-stack and mobile excellence redefining modern software engineering.`
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}&summary=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToWhatsApp = () => {
    const text = `
FOUND A GAME CHANGER!

This developer's work is exactly what separates good from EXCEPTIONAL:

- Solves real business problems
- Scales without breaking
- Actually delivers results
- Sets new industry standards

Imanariyo Baptiste - this is the quality we all need to see more of!

${portfolioUrl}

Your team will thank you for this find!
  `.trim()

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }


  const shareToEmail = () => {
    const subject = "Discover a standout Software Engineer"
    const body = `Hi,\n\nI wanted to share something impressive — Imanariyo Baptiste's portfolio showcases innovation, scalability, and craftsmanship in modern web and mobile development.\n\n${portfolioUrl}\n\nBest regards`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const callDirect = () => {
    window.location.href = `tel:${siteConfig.phone}`
  }

  return (
    <footer className="bg-gradient-to-t from-primary/5 to-background border-t-2 border-primary/20">
      <section className="container-main py-16">
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 p-8 mb-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Share2 className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-foreground">Help Others Discover Excellence</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              You've just experienced what exceptional development looks like. Share this standard of quality with others who deserve to see what's possible when talent meets dedication.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
              <Button onClick={copyPortfolioLink} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                <span>{copied ? "Ready!" : "Copy"}</span>
              </Button>

              <Button onClick={shareToLinkedIn} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <FaLinkedinIn className="w-4 h-4 mr-1" /> LinkedIn
              </Button>

              <Button onClick={shareToWhatsApp} variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                <FaWhatsapp className="w-4 h-4 mr-1" /> WhatsApp
              </Button>

              <Button onClick={shareToEmail} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                <MdEmail className="w-4 h-4 mr-1" /> Email
              </Button>

              <Button onClick={callDirect} variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 col-span-2 md:col-span-1">
                <PhoneCall className="w-4 h-4 mr-1" /> Call Now
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              Full Stack & Mobile Developer crafting modern digital experiences.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="w-4 h-4" /></a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={`mailto:${siteConfig.email}`}><MdEmail className="w-4 h-4" /></a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/services">Services</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <p className="text-sm text-muted-foreground">Web & Mobile Development</p>
            <p className="text-sm text-muted-foreground">API Design</p>
            <p className="text-sm text-muted-foreground">Database Architecture</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {siteConfig.email}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {siteConfig.phone}</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> Available Worldwide</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-muted-foreground">and Next.js</span>
            <Button size="sm" variant="ghost" onClick={copyPortfolioLink} className="text-primary hover:text-primary/80">
              <Share2 className="w-3 h-3 mr-1" /> Share Portfolio
            </Button>
          </div>
        </div>
      </section>
    </footer>
  )
}
