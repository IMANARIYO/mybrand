import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/app/services/_server-actions/getServiceBySlug"
import { ShareButton } from "@/components/share/ShareButton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, CheckCircle } from "lucide-react"
import Image from "next/image"

interface ServicePageProps {
  params: { slug: string }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  if ('error' in service) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Private Service</h1>
        <p className="text-muted-foreground">{service.error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{service.tagline}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {service.pricing}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {service.duration}
              </div>
            </div>
          </div>
          <ShareButton 
            shareUrl={service.shareUrl}
            title={service.title}
            description={service.tagline}
          />
        </div>
        
        <div className="flex gap-2 mb-6">
          <Badge variant="default">{service.category}</Badge>
          <Badge variant="secondary">{service.status}</Badge>
          {service.featured === "true" && <Badge variant="outline">Featured</Badge>}
        </div>
      </div>

      {/* Service Image */}
      {service.imageUrl && (
        <div className="mb-8">
          <Image
            src={service.imageUrl}
            alt={service.title}
            width={800}
            height={400}
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Description */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Service Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{service.description}</p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skills & Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {service.skills.map((skill: string) => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Key Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {service.process.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {service.actions.map((action, index) => (
              <Button key={index} variant={index === 0 ? "default" : "outline"}>
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}