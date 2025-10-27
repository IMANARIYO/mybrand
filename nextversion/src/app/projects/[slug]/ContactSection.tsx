/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MessageCircle, CheckCircle } from "lucide-react"
import { TechStack } from "@/db/types/projectTypes"

interface ContactSectionProps {
  projectTitle: string
  projectCategory: string
  techStack: TechStack
  status: string
  features: string[]
}

export function ContactSection({ projectTitle, projectCategory, techStack, status, features }: ContactSectionProps) {
  const handleEmailClick = () => {
    const subject = `Collaboration Opportunity - ${projectTitle} Project`
    const body = `Hello Imanariyo,

I was impressed by your ${projectTitle} project and would love to discuss potential collaboration opportunities.

Project Details I Reviewed:
- Category: ${projectCategory}
- Technologies: ${Object.values(techStack).flat().join(', ')}
- Status: ${status}
- Key Features: ${features.slice(0, 3).join(', ')}

I'm particularly interested in your expertise and would like to explore how we could work together on similar or even more ambitious projects.

Could we schedule a call to discuss this further?

Best regards,`

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=imanariyobaptiste@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(gmailUrl, '_blank')
  }

  return (
    <section className="container-main py-20 bg-primary/5 border-t-2 border-primary/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Collaborate on Your Next Project?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            This project demonstrates my capability to deliver professional-grade solutions.
            If you're looking for a technical partner who can transform complex requirements into robust applications,
            let's discuss how we can work together.
          </p>
          <Card className="bg-card border-2 border-border p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Professional Services Offered:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">Full-Stack Development</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">System Architecture Design</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">Performance Optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">Technical Consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">Code Review & Auditing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">Project Management</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-16" onClick={handleEmailClick}>
            <Mail className="w-5 h-5 mr-2" />
            Email Me
          </Button>

          <Button size="lg" variant="outline" className="h-16 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground" asChild>
            <a href={`https://wa.me/250787795163?text=Hi%20Imanariyo!%20I%20reviewed%20your%20${encodeURIComponent(projectTitle)}%20project%20and%20I'm%20impressed%20with%20the%20technical%20implementation.%20I'd%20like%20to%20discuss%20a%20potential%20collaboration.%20When%20would%20be%20a%20good%20time%20for%20a%20professional%20consultation?`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </Button>

          <Button size="lg" variant="outline" className="h-16 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
            <a href="tel:+250787795163">
              <Phone className="w-5 h-5 mr-2" />
              Call Direct
            </a>
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Available for new projects • Professional consultation • 24-hour response guarantee</p>
        </div>
      </div>
    </section>
  )
}