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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { submitContactForm } from "../_server-actions/contact-server-actions"
import { toast } from "sonner"

const simpleContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  telephone: z.string().min(10, "Please enter a valid phone number"),
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
          inquiryType: "general" as const,
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
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Start a Conversation</h2>
        <p className="text-muted-foreground">
          Ready to discuss your project? Fill out the form below and let's get started.
        </p>
      </div>

      {submitError && (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{submitError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
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
                <FormControl>
                  <Input type="email" placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="tel" placeholder="Telephone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    rows={5}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-6 text-base font-semibold"
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
        </form>
      </Form>
    </div>
  )
}