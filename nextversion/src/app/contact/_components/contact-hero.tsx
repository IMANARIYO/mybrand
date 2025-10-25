"use client"

import { MessageSquare } from "lucide-react"

export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-scale-in">
            <MessageSquare className="h-4 w-4" />
            <span>{"We're Here to Help"}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance animation-delay-100 animate-fade-in-up">
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed md:text-xl animation-delay-200 animate-fade-in-up">
            Whether you have a question, need support, or want to discuss a project — {"we're"} here to help.
          </p>
        </div>
      </div>
    </section>
  )
}
