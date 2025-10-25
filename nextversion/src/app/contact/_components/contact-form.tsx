"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Briefcase,
  User,
  AtSign,
  FileText,
  HelpCircle,
  Users,
  Zap,
} from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { submitContactForm, type ContactFormData } from "../_server-actions/contact-server-actions"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  inquiryType: z.enum(["general", "project", "partnership", "support", "careers"]),
  projectType: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "general",
      projectType: "",
      budgetRange: "",
      message: "",
    },
  })

  const inquiryType = form.watch("inquiryType")
  const messageLength = form.watch("message")?.length || 0

  const onSubmit = (data: ContactFormData) => {
    setSubmitError(null)
    
    startTransition(async () => {
      try {
        const result = await submitContactForm(data)
        
        if (result.success) {
          setIsSubmitted(true)
          form.reset()
        } else {
          setSubmitError(result.message)
        }
      } catch {
        setSubmitError("Something went wrong. Please try again.")
      }
    })
  }

  return (
    <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-200">
      <CardContent className="p-6 md:p-8">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h3>
              <p className="text-muted-foreground max-w-md">
                Thanks for reaching out! Our team will review your message and get back to you within 24 hours.
              </p>
            </div>
            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4">
              Send Another Message
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
              <p className="text-sm text-muted-foreground">
                Fill out the form below and {"we'll"} respond as soon as possible.
              </p>
            </div>

            {submitError && (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 animate-scale-in">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">Submission Failed</p>
                  <p className="text-sm text-destructive/80 mt-1">{submitError}</p>
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Inquiry Type */}
                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        What can we help you with?
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all duration-200 hover:border-primary">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">
                            <div className="flex items-center gap-2">
                              <HelpCircle className="h-4 w-4" />
                              General Inquiry
                            </div>
                          </SelectItem>
                          <SelectItem value="project">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4" />
                              Project Request
                            </div>
                          </SelectItem>
                          <SelectItem value="partnership">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Partnership
                            </div>
                          </SelectItem>
                          <SelectItem value="support">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Support
                            </div>
                          </SelectItem>
                          <SelectItem value="careers">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              Careers
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name & Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            className="transition-all duration-200 hover:border-primary focus:scale-[1.01]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <AtSign className="h-4 w-4 text-muted-foreground" />
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="transition-all duration-200 hover:border-primary focus:scale-[1.01]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Project-Specific Fields */}
                {inquiryType === "project" && (
                  <div className="space-y-6 p-4 bg-primary/5 rounded-lg border border-primary/20 animate-scale-in">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Zap className="h-4 w-4" />
                      Project Details
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              Project Type
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="healthtech">🏥 HealthTech</SelectItem>
                                <SelectItem value="fintech">💰 FinTech</SelectItem>
                                <SelectItem value="socialtech">👥 SocialTech</SelectItem>
                                <SelectItem value="edtech">📚 EdTech</SelectItem>
                                <SelectItem value="ecommerce">🛒 E-Commerce</SelectItem>
                                <SelectItem value="saas">☁️ SaaS Platform</SelectItem>
                                <SelectItem value="other">✨ Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budgetRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              Budget Range
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="<5k">💵 &lt; $5,000</SelectItem>
                                <SelectItem value="5k-10k">💰 $5,000 - $10,000</SelectItem>
                                <SelectItem value="10k-50k">💎 $10,000 - $50,000</SelectItem>
                                <SelectItem value="50k+">🏆 $50,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      💡 <strong>Want a detailed project plan?</strong> Try our{" "}
                      <Link href="/project-wizard" className="text-primary hover:underline font-medium">
                        AI Requirements Engineer
                      </Link>{" "}
                      for a comprehensive project specification.
                    </div>
                  </div>
                )}

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Message *
                        </span>
                        <span
                          className={`text-xs transition-colors duration-200 ${
                            messageLength > 1000
                              ? "text-destructive"
                              : messageLength > 800
                                ? "text-warning"
                                : "text-muted-foreground"
                          }`}
                        >
                          {messageLength}/1000
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder={
                            inquiryType === "project"
                              ? "Tell us about your project vision, goals, timeline, or any specific requirements..."
                              : "How can we help you today? Please provide as much detail as possible..."
                          }
                          className="resize-none transition-all duration-200 hover:border-primary focus:scale-[1.01]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Minimum 10 characters. Be as detailed as possible.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-6 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      {inquiryType === "project" ? "Send Project Request" : "Send Message"}
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
