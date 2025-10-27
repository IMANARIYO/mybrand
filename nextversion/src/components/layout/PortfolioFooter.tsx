/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Heart, Users, TrendingUp, Award, Phone, Github, Globe, Copy, Check, PhoneCall, Mail } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export function PortfolioFooter() {
  const [copied, setCopied] = useState(false)
  const portfolioUrl = typeof window !== 'undefined' ? window.location.origin : 'https://imanariyo.com'

  const copyPortfolioLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl)
      setCopied(true)
      toast.success("Portfolio link copied! Share it with your network!")
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      console.error("Failed to copy link:", error)
      toast.error("Failed to copy link")
    }
  }

  const shareToLinkedIn = () => {
    const text = "💎 RARE TALENT ALERT: This developer's portfolio showcases the exact quality and innovation our industry desperately needs. Imanariyo Baptiste delivers solutions that don't just work - they excel. This is what exceptional development looks like in 2024."
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}&summary=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToWhatsApp = () => {
    const text = `🔥 FOUND A GAME CHANGER!

This developer's work is exactly what separates good from EXCEPTIONAL:

✅ Solves real business problems
✅ Scales without breaking
✅ Actually delivers results
✅ Sets new industry standards

Imanariyo Baptiste - this is the quality we all need to see more of!

${portfolioUrl}

Your team will thank you for this find!`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareToEmail = () => {
    const subject = "💎 This will change your perspective on quality development"
    const body = `Hi!

I just discovered something that completely shifted my understanding of what exceptional development looks like.

Imanariyo Baptiste isn't just another developer - he's demonstrating the standard our entire industry should aspire to reach.

What makes this special:
✅ Solutions that actually solve business problems (not just look pretty)
✅ Code architecture that scales without constant fixes
✅ Innovation that makes practical sense
✅ Results that can be measured and proven

This is exactly the kind of work that transforms projects from "functional" to "industry-leading."

See the difference: ${portfolioUrl}

You'll understand why I had to share this immediately.

Best`

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const callDirect = () => {
    window.location.href = 'tel:+250787795163'
  }

  return (
    <footer className="bg-gradient-to-t from-primary/5 to-background border-t-2 border-primary/20">
      {/* Aggressive Sharing Section */}
      <section className="container-main py-16">
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 p-8 mb-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Share2 className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                💎 Help Others Discover Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                You've just experienced what exceptional development looks like. Share this standard of quality with others who deserve to see what's possible when talent meets dedication.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
              <Button onClick={copyPortfolioLink} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                <span className="hidden sm:inline">{copied ? "Ready!" : "Copy"}</span>
              </Button>

              <Button onClick={shareToLinkedIn} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <FaLinkedinIn className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">LinkedIn</span>
              </Button>

              <Button onClick={shareToWhatsApp} variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                <FaWhatsapp className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>

              <Button onClick={shareToEmail} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                <MdEmail className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Email</span>
              </Button>

              <Button onClick={callDirect} variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 col-span-2 md:col-span-1">
                <PhoneCall className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Call Now</span>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Elevate your network's standards</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span>Show what excellence looks like</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span>Champion exceptional work</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Imanariyo Baptiste</h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer crafting exceptional digital experiences with modern technologies and innovative solutions.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href="https://github.com/imanariyo" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="https://linkedin.com/in/imanariyo" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="mailto:imanariyobaptiste@gmail.com">
                  <MdEmail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">About Me</Link>
              <Link href="/projects" className="block text-muted-foreground hover:text-primary transition-colors">Projects</Link>
              <Link href="/services" className="block text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Full Stack Development</p>
              <p>Web Applications</p>
              <p>API Development</p>
              <p>Database Design</p>
              <p>Technical Consulting</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>imanariyobaptiste@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+250 787 795 163</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Imanariyo Baptiste. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-muted-foreground">and Next.js</span>
            <Button size="sm" variant="ghost" onClick={copyPortfolioLink} className="text-primary hover:text-primary/80">
              <Share2 className="w-3 h-3 mr-1" />
              Share Portfolio
            </Button>
          </div>
        </div>
      </section>
    </footer>
  )
}