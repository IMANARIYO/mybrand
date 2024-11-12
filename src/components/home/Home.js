import "./Home.css";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const Home = () => {

  const roles = ["Full Stack Software Engineer", 
  "Mobile App Developer (iOS & Android)", 
  "Web Application Architect", ];  
  // Use the typewriter effect
  const [text] = useTypewriter({
    words: roles,
    loop: 0,               // Infinite loop
    delaySpeed: 2000,      // Delay between words
    deleteSpeed: 50,       // Speed of delete effect
    typeSpeed: 100,        // Speed of type effect
  });

  return (
    <section id="home" className="section">
      <div className="container content-container">
        <div className="home-container">
          <div className="home-content">
            <h4 className="welcome-text">Hello and Welcome!</h4>
            <p className="text-lg text-[#49b8e0] font-semibold mt-6 opacity-80 hover:opacity-100 transition-opacity duration-500">
              Thank you for visiting my digital space.
            </p>
            <h1 className="name-intro">
              I'm <span className="highlighted-name">Baptiste</span>
            </h1>
            <h2 className="role-intro">
              A <span className="dynamic-role">{text}</span>
              <Cursor cursorBlinking="false" cursorStyle="|" cursorColor="#ff014f" />
            </h2>
            <p className="intro-text">
            Driven by a passion for creating innovative, user-focused solutions, I bring ideas to life with clean, scalable code. Whether you need a dynamic web application or a seamless mobile experience, I'm ready to help transform your vision into reality
            </p>
            <p className="text-lg text-[#35a8f0] font-semibold mt-3 opacity-80 hover:opacity-100 transition-opacity duration-500">
              Let's work together to transform your vision into something extraordinary!
            </p>
            <div className="action-buttons">
              <a
                href="https://res.cloudinary.com/dorjr1njc/image/upload/v1731425460/fauu76nivqxk5qpniqvy.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                View My CV
              </a>
              <a href="#contacts" className="button">Hire Me</a>
            </div>
          </div>
          <div className="home-image">
            <img src="images/myImage.png" alt="Baptiste" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
