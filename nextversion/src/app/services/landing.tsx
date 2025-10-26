

import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RocketIcon } from "lucide-react"
import { getAllServices } from "./_server-actions/services-server-actions"
import { ServiceCard } from "./_components/ServiceCard"

export default async function ServicesSection() {
    const services = await getAllServices()
    const activeServices = services ?? []

    return (
        <section id="services" className="min-h-screen bg-background py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <Card className="border-2 shadow-2xl">
                    <SectionHeader
                        title="Services I Deliver"
                        subtitle="Delivering modern, scalable solutions across web and mobile platforms to meet your business needs."
                        icon={<RocketIcon className="h-12 w-12 text-primary" />}
                    />

                    <CardContent className="space-y-8">
                        {/* Services Grid */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {activeServices.map((service) => (
                                <ServiceCard key={service.id} service={{
                                    ...service,
                                    imageUrl: service.imageUrl ?? null,
                                    featured: service.featured ?? "false",
                                    status: service.status ?? "available"
                                }} />
                            ))}
                        </div>

                        {activeServices.length === 0 && (
                            <Card className="text-center py-12">
                                <CardContent>
                                    <p className="text-muted-foreground">No featured services available at the moment.</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* CTA Section */}
                        <Card className="mt-12 bg-primary/5">
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl">Let's Build Something Amazing Together</CardTitle>
                                <CardDescription className="text-lg">
                                    Choose a service above and fill out the request form. We'll get back to you within 24 hours with a detailed proposal and timeline.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="justify-center">
                                <Button className="btn-cta" asChild>
                                    <a href="#contacts">Get Started Today</a>
                                </Button>
                            </CardFooter>
                        </Card>
                    </CardContent>
                </Card>
                </div>
            </section>
    )
}
