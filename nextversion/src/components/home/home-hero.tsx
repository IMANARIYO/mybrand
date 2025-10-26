"use client"

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import MediaLinks from "./media-links"
import { Download, Mail } from "lucide-react"
import { Cursor, useTypewriter } from "react-simple-typewriter"
import { useLanguage } from "../language-provider"
import Image from "next/image"

const HomeHero = () => {
    const { language } = useLanguage()

    const roles = ["Full Stack Software Engineer", "Mobile App Developer", "Web Application Architect"]

    const [text] = useTypewriter({
        words: roles,
        loop: 0,
        delaySpeed: 2000,
        deleteSpeed: 50,
        typeSpeed: 100,
    })

    const translations = {
        en: {
            greeting: "Hello and Welcome!",
            intro: "I'm",
            role: "A",
            description: "Versatile and results-oriented Software Engineer specializing in full-stack and mobile development. I bring a strong foundation in modern technologies and microservices architecture — combining scalability, performance, and user-centered design.",
            viewCV: "View My CV",
            contact: "Contact Me",
            subtitle: "Transforming Ideas into Digital Reality"
        },
        fr: {
            greeting: "Bonjour et Bienvenue!",
            intro: "Je suis",
            role: "Un",
            description: "Ingénieur logiciel polyvalent et axé sur les résultats, spécialisé en développement full-stack et mobile. Je possède une solide maîtrise des technologies modernes et de l'architecture microservices.",
            viewCV: "Voir Mon CV",
            contact: "Me Contacter",
            subtitle: "Transformer les idées en réalité numérique"
        },
        rw: {
            greeting: "Muraho kandi Murakaza Neza!",
            intro: "Ndi",
            role: "Umukozi wa",
            description: "Injeniyeri w'imikoranire ya mudasobwa wuzuye kandi ukora ashingiye ku musaruro, wihariye mu gukora porogaramu zuzuye no mu mikorere ya telefoni.",
            viewCV: "Reba CV Yanjye",
            contact: " Nyandikira",
            subtitle: "Guhindura ibitekerezo mu bikorwa bya digitale"
        },
    }

    const t = translations[language]

    return (
        <section className="min-h-screen bg-background py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-2 sm:px-4" id="home">
            <div className="container mx-auto max-w-7xl">
                <Card className="border border-border sm:border-2 shadow-lg sm:shadow-xl lg:shadow-2xl bg-background">
                    <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                            {/* Left Content - Main Focus */}
                            <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
                                {/* Header Section */}
                                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                    <p className="text-sm sm:text-base md:text-lg font-medium text-primary">{t.greeting}</p>
                                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground">
                                        {t.intro}{" "}
                                        <span className="text-primary ">
                                            IMANARIYO Baptiste
                                        </span>
                                    </CardTitle>
                                    <CardDescription className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground">
                                        {t.role}{" "}
                                        <span className="text-primary">
                                            {text}
                                            <Cursor cursorBlinking={false} cursorStyle="|" cursorColor="hsl(var(--primary))" />
                                        </span>
                                    </CardDescription>
                                    <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium">
                                        {t.subtitle}
                                    </CardDescription>
                                </div>

                                {/* Description */}
                                <div className="space-y-3 sm:space-y-4">
                                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                                        {t.description}
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="btn-cta w-full sm:w-auto text-sm sm:text-base font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
                                    >
                                        <a
                                            href="https://res.cloudinary.com/dorjr1njc/image/upload/v1731425460/fauu76nivqxk5qpniqvy.pdf"
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4 sm:w-5 sm:h-5" /> {t.viewCV}
                                        </a>
                                    </Button>

                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto text-sm sm:text-base font-semibold px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                                    >
                                        <a href="#contacts" className="flex items-center justify-center gap-2">
                                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> {t.contact}
                                        </a>
                                    </Button>
                                </div>

                                {/* Social Media Links */}
                                <div className="pt-2 sm:pt-4">
                                    <MediaLinks />
                                </div>

                                {/* Bottom Message */}
                                <div className="pt-2 sm:pt-4 border-t border-border/50">
                                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                                        Ready to bring your next project to life with cutting-edge technology and exceptional user experience.
                                    </p>
                                </div>
                            </div>

                            {/* Right Content - Image */}
                            <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center lg:justify-end">
                                <Card className="overflow-hidden border-2 border-primary/20  w-full max-w-sm lg:max-w-none">
                                    <div className="relative aspect-[3/4]">
                                        <Image
                                            src="/images/imanariyo_baptiste_picture.png"
                                            alt="Imanariyo Baptiste full body picture"
                                            fill
                                            className="object-contain p-1"
                                            priority
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default HomeHero