

import { SectionHeader } from "@/components/ui/section-header"
import { RocketIcon } from "lucide-react"
import { getAllServices } from "./_server-actions/services-server-actions"
import { ServiceCard } from "./_components/ServiceCard"

export default async function ServicesSection() {
    const services = await getAllServices()
    const activeServices = services ?? []

    return (
        <div className="min-h-screen bg-background">

            {/* Services Section */}
            <section id="services" className="px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        title={
                            <>
                                Services <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">I delivery</span>
                            </>
                        }
                        subtitle="Delivering modern, scalable solutions across web and mobile platforms to meet your business needs."
                        icon={<RocketIcon className="h-12 w-12 text-primary animate-fade-in" />}
                    />

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
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No featured services available at the moment.</p>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-20 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-12">
                        <SectionHeader
                            title="Let's Build Something Amazing Together"
                            subtitle="Choose a service above and fill out the request form. We'll get back to you within 24 hours with a detailed proposal and timeline."
                        />
                    </div>
                </div>
            </section>


        </div>
    )
}
