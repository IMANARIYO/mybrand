"use client"

import { MapPin, Mail, Phone, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ContactInfo() {
  return (
    <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-300">
      <CardContent className="p-6 md:p-8 space-y-6">
        <h3 className="text-xl font-bold text-foreground md:text-2xl">Contact Information</h3>

        <div className="space-y-5">
          <a
            href="mailto:hello@digitaliuslab.com"
            className="group flex items-start gap-4 rounded-lg p-3 transition-all hover:bg-muted/50 hover:scale-[1.02] duration-300"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">Email Us</p>
              <p className="text-sm text-primary hover:underline mt-1 break-all">hello@digitaliuslab.com</p>
            </div>
          </a>

          <a
            href="tel:+250788000123"
            className="group flex items-start gap-4 rounded-lg p-3 transition-all hover:bg-muted/50 hover:scale-[1.02] duration-300"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Phone className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">Call Us</p>
              <p className="text-sm text-primary hover:underline mt-1">+250 788 000 123</p>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-lg p-3 transition-all hover:bg-muted/50 duration-300">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">Office Location</p>
              <p className="text-sm text-muted-foreground mt-1">Norrsken House Kigali, Rwanda</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg p-3 transition-all hover:bg-muted/50 duration-300">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <Clock className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">Working Hours</p>
              <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
