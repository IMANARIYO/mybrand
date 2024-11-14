import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
import Marquee from "react-fast-marquee";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaLinkedinIn, FaSkype, FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

const ContactSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://myportfolioapi-8vku.onrender.com/contact/createContact', data);

      if (response.data.status === "success") {
        toast.success(`Thank you, ${data.name}! Your message has been sent successfully.`, {
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
        });
        toast.info("I’ll review your message and get back to you as soon as possible. Stay tuned!", {
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
        });
        reset(); // Reset form after successful submission
      } else {
        toast.error("Something went wrong. Please try again.", {
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Error sending message. Please try again later.");
    }
  };

  return (
    <section id="contacts" className="section mb-5">
      <div className="container content-container">
        {/* Contact Header */}
        <div className="contact-header text-center">
          <h2 className="content-title">Reach Out and Connect</h2>
          <p className="content-subtitle">
            Your journey to success starts with a single message. Whether you have a new project idea, need tech support, or want professional advice, 
            <strong className="highlight"> I'm here to make it happen!</strong>
          </p>
        </div>

        {/* Contact Wrapper */}
        <div className="contact-wrapper">
          {/* Left Contact (Contact Form) */}
          <div className="left-contact contact-form">
            <h3 className="contact-form-title">Start a Conversation</h3>
            <p className="contact-subtitle">
              Don’t hesitate—send me a message, and let’s begin building something amazing together.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Form Fields */}
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="message text-gray-900"
                  {...register("name", { required: "Name is required.", minLength: { value: 2, message: "Name must be at least 2 characters long." } })}
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="message text-gray-900"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email." }
                  })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Telephone</label>
                <input
                  id="telephone"
                  type="tel"
                  placeholder="Telephone"
                  className="message text-gray-900"
                  {...register("telephone", {
                    required: "Telephone is required.",
                    pattern: { value: /^\+?\d{7,15}$/, message: "Please enter a valid telephone number." }
                  })}
                />
                {errors.telephone && <p className="error-message">{errors.telephone.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  className="message text-gray-900"
                  {...register("subject", { required: "Subject is required." })}
                />
                {errors.subject && <p className="error-message">{errors.subject.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="6"
                  className="message text-gray-900"
                  {...register("message", { required: "Message is required.", minLength: { value: 10, message: "Message must be at least 10 characters long." } })}
                ></textarea>
                {errors.message && <p className="error-message">{errors.message.message}</p>}
              </div>

              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>

          {/* Right Contact (Social Media, Contact Info, and Map) */}
          <div className="right-contact">
            {/* Social Media and Contact Info */}
            <div className="upper-section">
              <div className="holder">
                <h3 className="contact-title">social medias</h3>
                <p>Find me on your favorite platform:</p>
                <div className="social-links">
                  <a href="skype:imanariyo baptiste?chat" title="Skype" className="bannerIcon"><FaSkype /></a>
                  <a href="https://wa.me/250787795163?text=Hello%20Imanariyo!" title="WhatsApp: +250787795163" className="bannerIcon" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                  <a href="https://www.linkedin.com/in/imanariyo-baptiste-046191286/" title="LinkedIn" className="bannerIcon" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                </div>
              </div>

              <div className="holder">
                <h3 className="contact-title">Contact Directly</h3>
                {/* <Marquee gradient={false} speed={50} pauseOnHover={true}>
                  <p className="marquee-text"> Reach out anytime by email or phone for an immediate response!      </p>
                </Marquee> */}
                 <p className="marquee-text">quick Reach out anytime      </p>
                <div className="contact-links">
                  <a href="mailto:imanariyobaptiste@gmail.com" className="bannerIcon" title="Email: imanariyobaptiste@gmail.com"><MdEmail /></a>
                  <a href="tel:+250787795163" title="Phone: +250787795163" className="bannerIcon" target="_blank" rel="noopener noreferrer"><IoCallOutline /></a>
                </div>
              </div>
            </div>

            {/* Lower Section (Map) */}
            <div className="lower-section contact-map">
              <h3 className="contact-map-title">Visit Me in Person</h3>
              <p>If you're nearby, let's schedule a face-to-face meeting.</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4078.3357960016288!2d30.061278236037268!3d-1.957860213369754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5d5b9897711%3A0x34e7b1e5cded7867!2sUR%20College%20of%20Science%20and%20Technology!5e0!3m2!1sen!2srw!4v1725029956505!5m2!1sen!2srw"
                width="100%"
                height="80%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
