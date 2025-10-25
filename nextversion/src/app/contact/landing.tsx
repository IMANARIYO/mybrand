/* eslint-disable react/no-unescaped-entities */
import { SimpleContactForm } from "./_components/simple-contact-form"
import { FaSkype, FaWhatsapp, FaLinkedinIn } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { IoCallOutline } from "react-icons/io5"


export default function ContactSection() {
  return (
    <section id="contacts" className="mb-20">
      <div className="container mx-auto px-4">
        {/* Contact Header */}
        <div className="text-center mb-12">
          <h2 className="text-foreground">Reach Out and Connect</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
            Your journey to success starts with a single message. Whether you have a new project idea, need tech support, or want professional advice,
            <strong className="text-primary"> I'm here to make it happen!</strong>
          </p>
        </div>

        {/* Contact Wrapper */}
        <div className="flex flex-col lg:flex-row gap-5 z-10 text-primary">
          {/* Left Contact (Contact Form) */}
          <div className="w-full bg-card rounded-lg p-5 shadow-custom-lg">
            <SimpleContactForm />
          </div>

          {/* Right Contact (Social Media, Contact Info, and Map) */}
          <div className="w-full bg-card rounded-lg p-5 shadow-custom-lg flex flex-col gap-5">
            {/* Social Media and Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-5">
              <div className="p-1.5 grid justify-items-center rounded-xl shadow-custom-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-custom-xl text-center">
                <h3 className="text-2xl mb-2.5 font-bold">social medias</h3>
                <p className="mb-4">Find me on your favorite platform:</p>
                <div className="flex gap-4 justify-start mt-4">
                  <a href="skype:imanariyo baptiste?chat" title="Skype" className="text-2xl p-2 rounded-lg bg-info/10 hover:bg-info hover:text-info-foreground transition-colors">
                    <FaSkype />
                  </a>
                  <a href="https://wa.me/250787795163?text=Hello%20Imanariyo!" title="WhatsApp: +250787795163" className="text-2xl p-2 rounded-lg bg-success/10 hover:bg-success hover:text-success-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp />
                  </a>
                  <a href="https://www.linkedin.com/in/imanariyo-baptiste-046191286/" title="LinkedIn" className="text-2xl p-2 rounded-lg bg-info/10 hover:bg-info hover:text-info-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>

              <div className="p-1.5 grid justify-items-center rounded-xl shadow-custom-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-custom-xl text-center">
                <h3 className="text-2xl mb-2.5 font-bold">Contact Directly</h3>
                <p className="text-base my-2.5">quick Reach out anytime</p>
                <div className="flex gap-4 justify-start mt-4">
                  <a href="mailto:imanariyobaptiste@gmail.com" className="text-2xl p-2 rounded-lg bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground transition-colors" title="Email: imanariyobaptiste@gmail.com">
                    <MdEmail />
                  </a>
                  <a href="tel:+250787795163" title="Phone: +250787795163" className="text-2xl p-2 rounded-lg bg-success/10 hover:bg-success hover:text-success-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                    <IoCallOutline />
                  </a>
                </div>
              </div>
            </div>

            {/* Lower Section (Map) */}
            <div className="flex flex-col justify-around h-full">
              <h3 className="text-2xl font-bold mb-2">Visit Me in Person</h3>
              <p className="mb-4">If you're nearby, let's schedule a face-to-face meeting.</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5050597124923!2d30.057418273505217!3d-1.9511665367111837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5a86d814c61%3A0x7d3b83e12b1c11a9!2sNorrsken%20House%20Kigali!5e0!3m2!1sen!2srw!4v1760267690710!5m2!1sen!2srw"
                width="100%"
                height="80%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}