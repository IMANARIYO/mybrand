"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, Type, Layout, Zap, Sparkles } from "lucide-react"

export function DesignShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-20">
        <SectionHeader
          title="Complete Design System Showcase"
          subtitle="A comprehensive design system with light, dark, and custom themes. Built with shadcn/ui and Tailwind CSS v4."
        />
      </section>


      {/* Typography */}
      <section id="projects" className="container mx-auto px-4 py-20 border-t border-border">
        <div className="space-y-8">
          <SectionHeader
            title="Typography"
            subtitle="Clean, readable typography with proper hierarchy and spacing."
          />

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <h1>Heading 1 - The quick brown fox</h1>
                <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
              </div>
              <div className="space-y-2">
                <h2>Heading 2 - The quick brown fox</h2>
                <p className="text-sm text-muted-foreground">text-3xl font-semibold</p>
              </div>
              <div className="space-y-2">
                <h3>Heading 3 - The quick brown fox</h3>
                <p className="text-sm text-muted-foreground">text-2xl font-semibold</p>
              </div>
              <div className="space-y-2">
                <h4>Heading 4 - The quick brown fox</h4>
                <p className="text-sm text-muted-foreground">text-xl font-semibold</p>
              </div>
              <div className="space-y-2">
                <p className="text-lg">
                  Large paragraph text - The quick brown fox jumps over the lazy dog. This is a sample of body text at a
                  larger size.
                </p>
                <p className="text-sm text-muted-foreground">text-lg</p>
              </div>
              <div className="space-y-2">
                <p>
                  Base paragraph text - The quick brown fox jumps over the lazy dog. This is the default body text size
                  with comfortable line height for optimal readability.
                </p>
                <p className="text-sm text-muted-foreground">text-base leading-relaxed</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">Small text - The quick brown fox jumps over the lazy dog.</p>
                <p className="text-sm text-muted-foreground">text-sm</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Components */}
      <section id="services" className="container mx-auto px-4 py-20 border-t border-border">
        <div className="space-y-8">
          <SectionHeader
            title="UI Components"
            subtitle="Pre-built components following our design system principles."
          />

          <Tabs defaultValue="buttons" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>

            <TabsContent value="buttons" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Different button styles for various use cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Standard Variants</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>

                  {/* Semantic Variants */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Semantic Variants</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-success text-success-foreground hover:bg-success/90">Success</Button>
                      <Button className="bg-warning text-warning-foreground hover:bg-warning/90">Warning</Button>
                      <Button className="bg-info text-info-foreground hover:bg-info/90">Info</Button>
                      <Button className="bg-cta text-cta-foreground hover:bg-cta/90">Call to Action</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </div>

                  {/* Outline Semantic Variants */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Outline Semantic Variants</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="outline"
                        className="border-success text-success hover:bg-success hover:text-success-foreground bg-transparent"
                      >
                        Success
                      </Button>
                      <Button
                        variant="outline"
                        className="border-warning text-warning hover:bg-warning hover:text-warning-foreground bg-transparent"
                      >
                        Warning
                      </Button>
                      <Button
                        variant="outline"
                        className="border-info text-info hover:bg-info hover:text-info-foreground bg-transparent"
                      >
                        Info
                      </Button>
                      <Button
                        variant="outline"
                        className="border-cta text-cta hover:bg-cta hover:text-cta-foreground bg-transparent"
                      >
                        CTA
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-3">Button Sizes</h4>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon">
                        <Zap className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <Alert className="border-info text-info">
                <Info className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription className="text-foreground">
                  This is an informational alert with helpful context.
                </AlertDescription>
              </Alert>
              <Alert className="border-success text-success">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription className="text-foreground">Your action was completed successfully!</AlertDescription>
              </Alert>
              <Alert className="border-warning text-warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription className="text-foreground">
                  Please review this important information.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="forms" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                  <CardDescription>Input fields and form controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Input id="message" placeholder="Your message here..." />
                  </div>
                  <Button className="w-full">Submit</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cards" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This is a standard card component with header, content, and footer sections.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full bg-transparent">
                      Action
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle>Featured Card</CardTitle>
                    <CardDescription className="text-primary-foreground/80">With custom styling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Cards can be customized with different background colors and styles.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Spacing & Layout */}
      <section id="testimonial" className="container mx-auto px-4 py-20 border-t border-border">
        <div className="space-y-8">
          <SectionHeader
            title="Spacing & Shadows"
            subtitle="Consistent spacing and elevation system for depth and hierarchy."
          />

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="shadow-custom-sm">
              <CardContent className="pt-6 text-center">
                <p className="font-semibold">Small Shadow</p>
                <p className="text-sm text-muted-foreground">shadow-custom-sm</p>
              </CardContent>
            </Card>
            <Card className="shadow-custom-md">
              <CardContent className="pt-6 text-center">
                <p className="font-semibold">Medium Shadow</p>
                <p className="text-sm text-muted-foreground">shadow-custom-md</p>
              </CardContent>
            </Card>
            <Card className="shadow-custom-lg">
              <CardContent className="pt-6 text-center">
                <p className="font-semibold">Large Shadow</p>
                <p className="text-sm text-muted-foreground">shadow-custom-lg</p>
              </CardContent>
            </Card>
            <Card className="shadow-custom-xl">
              <CardContent className="pt-6 text-center">
                <p className="font-semibold">XL Shadow</p>
                <p className="text-sm text-muted-foreground">shadow-custom-xl</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="blog" className="container mx-auto px-4 py-20 border-t border-border">
        <Card className="bg-cta text-cta-foreground">
          <CardContent className="pt-12 pb-12">
            <SectionHeader
              title="Ready to Get Started?"
              subtitle="Use this design system to build beautiful, consistent interfaces with ease."
            />
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer id="contacts" className="container mx-auto px-4 py-12 border-t border-border">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">© 2025 IMANARIYO Baptiste. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
