/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { submitContactForm } from "../_server-actions/contact-server-actions"
import { toast } from "sonner"

const simpleContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  telephone: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type SimpleContactData = z.infer<typeof simpleContactSchema>

export function SimpleContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SimpleContactData>({
    resolver: zodResolver(simpleContactSchema),
    defaultValues: {
      name: "",
      email: "",
      telephone: "",
      inquiryType: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = (data: SimpleContactData) => {
    setSubmitError(null)

    startTransition(async () => {
      try {
        const result = await submitContactForm({
          ...data,
          inquiryType: data.inquiryType as "general" | "project" | "support" | "consultation" | "service" | "collaboration",
        })

        if (result.success) {
          setIsSubmitted(true)
          form.reset()
          toast.success("Message sent successfully! We'll get back to you soon.")
        } else {
          setSubmitError(result.message)
          toast.error(result.message)
        }
      } catch {
        setSubmitError("Something went wrong. Please try again.")
      }
    })
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
        <h3 className="text-xl font-bold">Message Sent Successfully!</h3>
        <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get in Touch</h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have a question, need a service, or want to discuss a project? Choose your preferred way to connect.
        </p>
      </div>

      {/* Quick Gmail Option */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">Prefer Gmail?</h3>
            <p className="text-xs text-muted-foreground">Send directly from your email client</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const subject = encodeURIComponent("Inquiry from Website")
              const body = encodeURIComponent("Hi Imanariyo,\n\nI'm interested in:\n\n[Please describe your inquiry]\n\nBest regards,\n[Your name]")
              window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=imanariyobaptiste@gmail.com&subject=${subject}&body=${body}`, '_blank')
            }}
            className="text-xs"
          >
            Open Gmail
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {submitError && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4" role="alert" aria-live="polite">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <p className="text-sm text-destructive">{submitError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground required-field">
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name"
                        className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        aria-describedby={field.name + "-error"}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage id={field.name + "-error"} className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground required-field">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com"
                        className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        aria-describedby={field.name + "-error"}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage id={field.name + "-error"} className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Phone Number
                  </FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Optional - For urgent communications
                  </FormDescription>
                  <FormControl>
                    <PhoneInput
                      placeholder="Enter your phone number"
                      value={field.value}
                      onChange={field.onChange}
                      defaultCountry="RW"
                      className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      aria-describedby={field.name + "-error"}
                    />
                  </FormControl>
                  <FormMessage id={field.name + "-error"} className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Inquiry Details */}
          <div className="space-y-4 pt-2 border-t border-border/50">
            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground required-field">
                    Type of Inquiry *
                  </FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    What can I help you with?
                  </FormDescription>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="project">New Project</SelectItem>
                      <SelectItem value="service">Service Inquiry</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground required-field">
                    Subject *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Brief description of your inquiry"
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      aria-describedby={field.name + "-error"}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage id={field.name + "-error"} className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground required-field">
                    Message *
                  </FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Please provide details about your inquiry
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me more about what you need...\n\n• What are you looking for?\n• Any specific requirements?\n• Timeline or budget considerations?\n• Any questions you have?"
                      rows={6}
                      className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                      aria-describedby={field.name + "-error"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id={field.name + "-error"} className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Section */}
          <div className="pt-4 space-y-3">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              aria-describedby="submit-help"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending Message...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Message
                </span>
              )}
            </Button>
            <p id="submit-help" className="text-xs text-muted-foreground text-center">
              We typically respond within 24 hours during business days
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}