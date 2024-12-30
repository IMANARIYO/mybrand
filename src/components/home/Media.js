import React from "react";
import { FaFacebookF, FaLinkedinIn, FaReact, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { SiFigma, SiFlutter, SiJavascript, SiNextjsdot, SiNodedotjs, SiTailwindcs } from "react-icons/si";

const IconSection = ({ title, items }) => {
  return (
    <div>
      <h2 className="text-base uppercase font-titleFont mb-4">{title}</h2>
      <div className="flex gap-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={item.target || "_blank"}
            rel={item.rel || "noopener noreferrer"}
            title={item.title}
            className="bannerIcon"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

const Media = () => {
  // Social media links
  const socialLinks = [
    { href: "https://www.linkedin.com/in/imanariyo-baptiste-046191286/", icon: <FaLinkedinIn />, title: "LinkedIn" },
    { href: "tel:+250787795163", icon: <IoCallOutline />, title: "Phone: +250787795163" },
    { href: "https://wa.me/250787795163?text=Hello%20Imanariyo!", icon: <FaWhatsapp />, title: "WhatsApp: +250787795163" },
    { href: "mailto:imanariyobaptiste@gmail.com", icon: <MdEmail />, title: "Email: imanariyobaptiste@gmail.com" },
  ];

  // Skills list
  const skills = [
    { icon: <FaReact />, title: "React js/ts || React Native" },
    { icon: <SiFlutter />, title: "Flutter" },
    { icon: <FaJava />, title: "Java" },
    { icon: <SiNodedotjs />, title: "Node.js" },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
      {/* Social Links Section */}
      <IconSection title="Find me on" items={socialLinks} />

      {/* Skills Section */}
      <IconSection title="Best Skills" items={skills} />
    </div>
  );
};

export default Media;