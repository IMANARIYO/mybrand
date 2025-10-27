"use client"

import type React from "react"
import { FaJava, FaLinkedinIn, FaReact, FaWhatsapp } from "react-icons/fa"
import { IoCallOutline } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import { SiFlutter, SiNodedotjs } from "react-icons/si"
import { EnhancedHoverCard, type EnhancedHoverCardItem } from "@/components/ui/enhanced-hover-card"

const IconSection = ({
    title,
    items,
    isSkills = false,
}: {
    title: string
    items: EnhancedHoverCardItem[]
    isSkills?: boolean
}) => {
    const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
        e.preventDefault()
        // Extract email from mailto: link
        const emailMatch = href.match(/mailto:([^?]+)/)
        const email = emailMatch ? emailMatch[1] : ''

        // Extract subject and body from the mailto link
        const subjectMatch = href.match(/subject=([^&]+)/)
        const bodyMatch = href.match(/body=([^&]+)/)

        const subject = subjectMatch ? decodeURIComponent(subjectMatch[1].replace(/\+/g, ' ')) : ''
        const body = bodyMatch ? decodeURIComponent(bodyMatch[1].replace(/\+/g, ' ')) : ''

        // Build Gmail compose URL
        let gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`
        if (subject) gmailUrl += `&su=${encodeURIComponent(subject)}`
        if (body) gmailUrl += `&body=${encodeURIComponent(body)}`

        // Open Gmail in new tab
        window.open(gmailUrl, '_blank')
    }

    const handleSkillTriggerClick = (skillTitle: string) => {
        const hireEmailHref = `mailto:imanariyobaptiste@gmail.com?subject=Collaboration%20Opportunity%20-%20${encodeURIComponent(skillTitle)}&body=Hello%20Imanariyo,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20by%20your%20expertise%20in%20${encodeURIComponent(skillTitle)}.%20I%20would%20love%20to%20discuss%20how%20your%20technical%20stack%20and%20experience%20could%20contribute%20to%20our%20upcoming%20projects.%0A%0ACould%20we%20schedule%20a%20brief%20conversation%20to%20explore%20potential%20collaboration%20opportunities?%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,`
        
        // Create a fake event to reuse existing email handler
        const fakeEvent = { preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
        handleEmailClick(fakeEvent, hireEmailHref)
    }

    return (
        <div>
            <h2 className="text-base uppercase font-semibold mb-4 text-foreground/80">{title}</h2>
            <div className="flex gap-4 flex-wrap">
                {items.map((item, index) => (
                    <EnhancedHoverCard
                        key={index}
                        item={item}
                        isSkills={isSkills}
                        onEmailClick={handleEmailClick}
                        onSkillTriggerClick={isSkills ? handleSkillTriggerClick : undefined}
                    />
                ))}
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
            isEmail: true, // Flag to identify email link
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