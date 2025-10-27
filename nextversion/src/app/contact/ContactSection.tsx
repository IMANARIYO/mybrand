/* eslint-disable react/no-unescaped-entities */
"use client"

import { SimpleContactForm } from "./_components/simple-contact-form"
import { ContactCard } from "./_components/ContactCard"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaSkype, FaWhatsapp, FaLinkedinIn } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { IoCallOutline } from "react-icons/io5"
import { MessageCircle } from "lucide-react"


export default function ContactSection() {
  return (
    <section id="contacts" className="min-h-screen bg-background py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4">
      <div className=" mx-auto ">
        <Card className="border border-border sm:border-2 shadow-lg sm:shadow-2xl">
          <SectionHeader
            title="Reach Out and Connect"
            subtitle="Your journey to success starts with a single message. Whether you have a new project idea, need tech support, or want professional advice, I'm here to make it happen!"
            icon={<MessageCircle className="h-8 w-8 sm:h-10 md:h-12 text-primary" />}
          />

          <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Contact Wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Left Contact (Contact Form) */}
              <Card className="border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl">Send a Message</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Fill out the form and I'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                  <SimpleContactForm />
                </CardContent>
              </Card>

              {/* Right Contact (Social Media, Contact Info, and Map) */}
              <Card className="border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl">Get in Touch</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Connect with me through various channels</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0 space-y-4 sm:space-y-6 h-full flex flex-col">
                  {/* Contact Methods Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <ContactCard
                      title="Connect Socially"
                      variant="primary"
                      links={[
                        {
                          href: "skype:imanariyo baptiste?chat",
                          title: "Skype",
                          icon: <FaSkype />,
                          bgColor: "bg-info/20",
                          hoverColor: "hover:bg-info",
                          hoverTextColor: "hover:text-info-foreground"
                        },
                        {
                          href: "https://wa.me/250787795163?text=Hello%20Imanariyo!%20I%20found%20your%20contact%20through%20your%20website%20and%20would%20like%20to%20discuss%20a%20project.",
                          title: "WhatsApp",
                          icon: <FaWhatsapp />,
                          bgColor: "bg-success/20",
                          hoverColor: "hover:bg-success",
                          hoverTextColor: "hover:text-success-foreground"
                        },
                        {
                          href: "https://www.linkedin.com/in/imanariyo-baptiste-046191286/",
                          title: "LinkedIn",
                          icon: <FaLinkedinIn />,
                          bgColor: "bg-info/20",
                          hoverColor: "hover:bg-info",
                          hoverTextColor: "hover:text-info-foreground"
                        }
                      ]}
                    />

                    <ContactCard
                      title="Direct Contact"
                      variant="primary"
                      links={[
                        {
                          href: "mailto:imanariyobaptiste@gmail.com?subject=Project%20Inquiry%20from%20Website&body=Hello%20Imanariyo,%0D%0A%0D%0AI%20found%20your%20website%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you.%0D%0A%0D%0AProject%20Details:%0D%0A-%20Type:%20[Web%20Development/Mobile%20App/Consultation/Other]%0D%0A-%20Timeline:%20[Your%20timeline]%0D%0A-%20Budget:%20[Your%20budget%20range]%0D%0A%0D%0APlease%20let%20me%20know%20your%20availability%20for%20a%20discussion.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]",
                          title: "Email",
                          icon: <MdEmail />,
                          bgColor: "bg-destructive/20",
                          hoverColor: "hover:bg-destructive",
                          hoverTextColor: "hover:text-destructive-foreground"
                        },
                        {
                          href: "tel:+250787795163",
                          title: "Phone",
                          icon: <IoCallOutline />,
                          bgColor: "bg-success/20",
                          hoverColor: "hover:bg-success",
                          hoverTextColor: "hover:text-success-foreground"
                        }
                      ]}
                    />
                  </div>

                  {/* Quick Gmail Button */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">Quick Gmail Access</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">Open Gmail with pre-filled professional message</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const subject = encodeURIComponent("Professional Inquiry from Website")
                          const body = encodeURIComponent("Hello Imanariyo,\n\nI hope this email finds you well. I came across your website and I'm impressed with your portfolio and expertise.\n\nI would like to discuss:\n• [Your project/service needs]\n• [Timeline and requirements]\n• [Budget considerations]\n\nCould we schedule a call or meeting to explore how we can work together?\n\nLooking forward to hearing from you.\n\nBest regards,\n[Your Name]\n[Your Company]\n[Your Contact Information]")
                          window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=imanariyobaptiste@gmail.com&subject=${subject}&body=${body}`, '_blank')
                        }}
                        className="text-xs sm:text-sm"
                      >
                        Open Gmail
                      </Button>
                    </div>
                  </div>

                  {/* Map Section - Takes remaining space */}
                  <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 flex-1 min-h-[200px]">
                    <CardHeader className="p-3 pb-2">
                      <CardTitle className="text-sm sm:text-base lg:text-lg">Visit Me in Person</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Norrsken House Kigali - Innovation Hub</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 h-full">
                      <div className="w-full h-full min-h-[150px] rounded-md sm:rounded-lg overflow-hidden shadow-sm sm:shadow-md">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5050597124923!2d30.057418273505217!3d-1.9511665367111837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5a86d814c61%3A0x7d3b83e12b1c11a9!2sNorrsken%20House%20Kigali!5e0!3m2!1sen!2srw!4v1760267690710!5m2!1sen!2srw"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          className="rounded-md sm:rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}