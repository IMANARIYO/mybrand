"use client"

import type React from "react"
import { FaJava, FaLinkedinIn, FaReact, FaWhatsapp } from "react-icons/fa"
import { IoCallOutline } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import { SiFlutter, SiNodedotjs } from "react-icons/si"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const IconSection = ({
    title,
    items,
    isSkills = false,
}: {
    title: string
    items: Array<{
        href?: string;
        icon: React.ReactNode;
        title: string;
        subtitle?: string;
        target?: string;
        rel?: string;
        description?: string;
        strengths?: string[];
        useCases?: string;
    }>
    isSkills?: boolean
}) => {
    return (
        <div>
            <h2 className="text-base uppercase font-semibold mb-4 text-foreground/80">{title}</h2>
            <div className="flex gap-4 flex-wrap">
                {items.map((item, index) => {
                    const TriggerComponent = isSkills ? 'div' : 'a'
                    const triggerProps = isSkills ? {} : {
                        href: item.href,
                        target: item.target || "_blank",
                        rel: item.rel || "noopener noreferrer"
                    }

                    return (
                        <HoverCard key={index} openDelay={200} closeDelay={100}>
                            <HoverCardTrigger asChild>
                                <TriggerComponent
                                    {...triggerProps}
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary hover:to-primary/80 text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/25 ${isSkills ? 'cursor-pointer hover:rotate-6' : ''
                                        } border border-primary/20 hover:border-primary/50 shadow-lg hover:shadow-xl relative`}
                                >
                                    <div className="text-xl hover:scale-125 transition-transform duration-300">{item.icon}</div>
                                    
                                    {/* Subtle indicator */}
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-70 animate-pulse"></div>
                                </TriggerComponent>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 p-4" side="top" align="center">
                                <div className="space-y-3">
                                    <div className="text-center">
                                        <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                                        {item.subtitle && (
                                            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                                        )}
                                    </div>

                                    {item.strengths && (
                                        <div>
                                            <h4 className="font-semibold text-sm text-foreground mb-2">Core Strengths</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {item.strengths.map((strength, i) => (
                                                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                        {strength}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {item.useCases && (
                                        <div>
                                            <h4 className="font-semibold text-sm text-foreground mb-1">Impact & Applications</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{item.useCases}</p>
                                        </div>
                                    )}

                                    {item.description && (
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    )}
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    )
                })}
            </div>
        </div>
    )
}

const MediaLinks = () => {
    // Professional Contact Channels
    const socialLinks = [
        {
            href: "https://www.linkedin.com/in/imanariyo-baptiste-046191286/",
            icon: <FaLinkedinIn />,
            title: "LinkedIn",
            description: "Professional network for collaborations and career opportunities",
            useCases:
                "Ideal for connecting on strategic partnerships, technical roles, or cross-industry innovation projects that need a results-driven engineer.",
        },
        {
            href: "tel:+250787795163",
            icon: <IoCallOutline />,
            title: "Direct Call",
            subtitle: "+250787795163",
            description: "Executive line for quick coordination and technical discussions",
            useCases:
                "For rapid decision-making, urgent project support, or direct collaboration with engineering teams and business leaders.",
        },
        {
            href: "https://wa.me/250787795163?text=Hi%20Imanariyo!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20potential%20collaboration.",
            icon: <FaWhatsapp />,
            title: "WhatsApp",
            description: "Instant, global communication channel",
            useCases:
                "Perfect for quick coordination, prototype feedback, or short-cycle project communication when speed and clarity matter most.",
        },
        {
            href: "mailto:imanariyobaptiste@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Imanariyo,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20explore%20a%20potential%20collaboration.%0A%0ABest%20regards,",
            icon: <MdEmail />,
            title: "Email",
            subtitle: "imanariyobaptiste@gmail.com",
            description: "Formal communication for project proposals and documentation",
            useCases:
                "Best for sharing detailed requirements, reviewing technical architecture, or setting up structured collaboration agreements.",
        },
    ]

    // Core Technical Expertise that Drives Business Growth
    const skills = [
        {
            icon: <SiNodedotjs />,
            title: "Backend Engineering",
            subtitle: "Node.js • Spring Boot • TypeScript",
            strengths: [
                "GraphQL & REST APIs",
                "Monolithic & Microservice Architectures",
                "Database Design & Optimization",
                "Scalability • Security • Reliability",
            ],
            useCases:
                "I design backend systems that evolve with business growth — from monolithic MVPs to distributed microservices. My APIs deliver sub-100ms latency, robust security, and enterprise-grade uptime.",
        },
        {
            icon: <FaReact />,
            title: "Frontend Engineering",
            subtitle: "React • Next.js • TypeScript",
            strengths: [
                "SSR / SSG / ISR Rendering",
                "Performance Optimization",
                "SEO & Accessibility",
                "Interactive • Intuitive • Modern UI",
            ],
            useCases:
                "I craft user interfaces that are both high-performing and user-centric. My Next.js apps combine intelligent rendering strategies with seamless UX that drives engagement and conversion.",
        },
        {
            icon: <SiFlutter />,
            title: "Mobile Development",
            subtitle: "Flutter • Dart",
            strengths: [
                "Cross-Platform Efficiency",
                "Native-Like Performance",
                "Accelerated Time-to-Market",
                "Modern Mobile UI/UX",
            ],
            useCases:
                "I build Flutter applications that reach iOS and Android users from a single codebase. My solutions cut costs, accelerate releases, and maintain native-level experience across devices.",
        },
        {
            icon: <FaJava />,
            title: "Enterprise Systems",
            subtitle: "Java • Spring Boot Ecosystem",
            strengths: [
                "Enterprise Integration",
                "Security & Compliance",
                "High Availability",
                "API-Driven Architecture",
            ],
            useCases:
                "I engineer backend systems powering financial and enterprise-grade solutions. My Java Spring Boot services provide reliability, maintainability, and compliance for mission-critical platforms.",
        },
    ]


    return (
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 justify-between">
            {/* Social Links Section */}
            <IconSection title="Find me on" items={socialLinks} />

            {/* Skills Section */}
            <IconSection title="Best skilled On" items={skills} isSkills={true} />
        </div>
    )
}

export default MediaLinks
