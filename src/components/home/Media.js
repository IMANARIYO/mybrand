import React from "react";
import { FaFacebookF, FaLinkedinIn, FaReact, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { SiFigma, SiFlutter, SiJavascript, SiNextjsdot, SiNodedotjs, SiTailwindcs } from "react-icons/si";

const Media = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
      {/* Contact Links */}
      <div>
        <h2 className="text-base uppercase font-titleFont mb-4">Find me on</h2>
        <div className="flex gap-4">
          {/* <a href="https://www.facebook.com/your-profile" title="Facebook" className="bannerIcon">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com/your-profile" title="Twitter" className="bannerIcon">
            <FaTwitter />
          </a> */}
          <a href="https://www.linkedin.com/in/imanariyo-baptiste-046191286/"  target="_blank" rel="noopener noreferrer" title="LinkedIn" className="bannerIcon">
            <FaLinkedinIn />
          </a>
          <a href="tel:+250787795163" target="_blank" rel="noopener noreferrer" title="tel:+250787795163" className="bannerIcon">
            <IoCallOutline />
          </a>
          <a href="https://wa.me/250787795163?text=Hello%20Imanariyo!" title="WhatsApp: +250787795163" className="bannerIcon" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
           <a   href="mailto:imanariyobaptiste@gmail.com" className="bannerIcon" title="email: imanariyobaptiste@gmail.com" >
                  <MdEmail />
                  </a>
        </div>
      </div>

      {/* Skills Icons */}
      <div>
        <h2 className="text-base uppercase font-titleFont mb-4">Best Skills</h2>
        <div className="flex gap-4">
          <span title="React js/ts || react native" className="bannerIcon">
            <FaReact />
          </span>
         
          <span title="Flutter" className="bannerIcon">
            <SiFlutter />
          </span>
          <span title="Java" className="bannerIcon">
          <FaJava />
          </span>
          <span title="Node.js" className="bannerIcon">
            <SiNodedotjs />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Media;
