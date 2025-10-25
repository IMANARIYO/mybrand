/* eslint-disable react/no-unescaped-entities */
"use client"

import { ContactHero } from "./_components/contact-hero"
import { ContactForm } from "./_components/contact-form"
import { ContactInfo } from "./_components/contact-info"
import { SocialLinks } from "./_components/social-links"


export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-muted/30">
            {/* Hero Section */}
            <ContactHero />

            {/* Main Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column: Contact Form */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-semibold tracking-tight">Send us a message</h2>
                            <p className="text-muted-foreground text-lg">
                                We'd love to hear from you. Please fill out the form below and our team will get back to you shortly.
                            </p>
                            <div className="mt-8 bg-card shadow-xl rounded-xl p-8 border">
                                <ContactForm />
                            </div>
                        </div>

                        {/* Right Column: Contact Info */}
                        <div className="space-y-10">
                            <h2 className="text-3xl font-semibold tracking-tight">Our Contact Details</h2>
                            <ContactInfo />

                        </div>
                    </div>
                </div>
            </section>

            <section className="relative mt-20">

                <div className="pt-4">
                    <h3 className="text-2xl font-medium mb-4">Connect with us</h3>
                    <SocialLinks />
                </div>
            </section>
        </div>
    )
}
