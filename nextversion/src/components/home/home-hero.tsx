"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
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
        <section className="min-h-screen bg-background py-20 px-4" id="home">
            <div className="container mx-auto max-w-7xl">
                <Card className="border-2 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5">
                    <CardHeader className="text-center pb-6">
                        <div className="mb-4">
                            <p className="text-lg font-medium text-primary mb-2">{t.greeting}</p>
                            <CardTitle className="text-6xl font-bold tracking-tight mb-4">
                                {t.intro}{" "}
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    IMANARIYO Baptiste
                                </span>
                            </CardTitle>
                            <CardDescription className="text-2xl font-semibold">
                                {t.role}{" "}
                                <span className="text-primary">
                                    {text}
                                    <Cursor cursorBlinking={false} cursorStyle="|" cursorColor="hsl(var(--primary))" />
                                </span>
                            </CardDescription>
                        </div>
                        <CardDescription className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t.subtitle}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Content */}
                            <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
                                <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Card className="p-4 bg-primary/5 border-primary/20 hover:shadow-lg transition-all duration-300">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">⚡</div>
                                            <h3 className="font-semibold text-primary">Performance</h3>
                                            <p className="text-sm text-muted-foreground">Optimized & Scalable</p>
                                        </div>
                                    </Card>

                                    <Card className="p-4 bg-secondary/5 border-secondary/20 hover:shadow-lg transition-all duration-300">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">🎯</div>
                                            <h3 className="font-semibold text-secondary">Precision</h3>
                                            <p className="text-sm text-muted-foreground">User-Centered Design</p>
                                        </div>
                                    </Card>

                                    <Card className="p-4 bg-accent/5 border-accent/20 hover:shadow-lg transition-all duration-300">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">🚀</div>
                                            <h3 className="font-semibold text-accent">Innovation</h3>
                                            <p className="text-sm text-muted-foreground">Modern Solutions</p>
                                        </div>
                                    </Card>
                                </div>

                                <MediaLinks />
                            </div>

                            {/* Right Content - Image */}
                            <div className="lg:col-span-4 order-1 lg:order-2">
                                <Card className="overflow-hidden border-2 shadow-xl">
                                    <div className="relative aspect-square">
                                        <Image
                                            src="/images/IMANARIYO_BAPTISTE_PASSPORT.png"
                                            alt="Imanariyo Baptiste profile picture"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col items-center space-y-6 pt-8">
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                <a
                                    href="https://res.cloudinary.com/dorjr1njc/image/upload/v1731425460/fauu76nivqxk5qpniqvy.pdf"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <Download className="w-5 h-5" /> {t.viewCV}
                                </a>
                            </Button>

                            <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                                <a href="#contacts" className="flex items-center gap-2">
                                    <Mail className="w-5 h-5" /> {t.contact}
                                </a>
                            </Button>
                        </div>

                        <div className="text-center max-w-2xl">
                            <p className="text-muted-foreground">
                                Ready to bring your next project to life with cutting-edge technology and exceptional user experience.
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}

export default HomeHero