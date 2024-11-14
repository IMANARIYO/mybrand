import "./Home.css";
import Media from "./Media";
import React, { useEffect, useState } from "react";
import { Camera, Facebook, Layout, Linkedin, MonitorSmartphone, Palette, Twitter } from "lucide-react";
import { Download } from "lucide-react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const Home = () => {
  const roles = [
    "Full Stack Software Engineer",
    "Mobile App Developer ",
    "Web Application Architect",
  ];
  const [text] = useTypewriter({
    words: roles,
    loop: 0,               // Infinite loop
    delaySpeed: 2000,      // Delay between words
    deleteSpeed: 50,       // Speed of delete effect
    typeSpeed: 100,        // Speed of type effect
  });
  return (
    <section className=" section  min-h-screen bg-gradient-to-b  text-gray-100 " id="home">
      <div className=" mx-auto  sm:px-6 lg:px-8 home-containerr">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-8 order-2 lg:order-1 home-content">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-[#49b8e0] opacity-90">
                Hello and Welcome!
              </h4>
              <h1 className="text-5xl font-bold">
                I'm <span className="clip"> IMANARIYO Baptiste</span>
              </h1>
              <h2 className="text-3xl font-semibold">
                A{" "}
                <span className="text-[#35a8f0]">
                {text} 
                <Cursor cursorBlinking="false" cursorStyle="|" cursorColor="#ff014f" />
                </span>
              </h2>
            </div>

            <p className="intro-text">
              Driven by a passion for creating innovative, user-focused solutions,
              I bring ideas to life with clean, scalable code. Whether you need
              a dynamic web application or a seamless mobile experience, I'm ready
              to help transform your vision into reality.
            </p>

            <div className="flex gap-16">
              <a
                href="https://res.cloudinary.com/dorjr1njc/image/upload/v1731425460/fauu76nivqxk5qpniqvy.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#49b8e0] text-white font-medium rounded-lg hover:bg-[#35a8f0] transition-colors duration-300 animated-cv-button flex gap-5"
              >
               <Download className="icon" /> View My CV
              </a>
              <a
                href="#contacts"
                className="px-6 py-3 border-2 border-[#49b8e0] text-[#49b8e0] font-medium rounded-lg hover:bg-[#49b8e0] hover:text-white transition-colors duration-300 animated-cv-button"
              >
                contact me
              </a>
            </div>

        <Media/>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:col-span-4 order-1 lg:order-2 ">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <img
               src="images/myImage.png" alt="Baptiste"
             
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;