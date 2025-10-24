/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

import { ImageGallery } from "./image-gallery";
import { SectionNavigation } from "./section-navigation";
import { SkillsSection } from "./skills-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import {
  Rocket, Users, Code2, Heart,
  User,
} from "lucide-react";
import { SectionHeader } from "../ui/section-header";

const AboutMe = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState("frontend");
  const [activeNavButton, setActiveNavButton] = useState("experience");
  const [mainImage, setMainImage] = useState("/images/mythirdimg.jpg");
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const funFacts = [
    { icon: Code2, text: "4+ Years of Coding", color: "text-blue-500" },
    { icon: Rocket, text: "25+ Projects Delivered", color: "text-green-500" },
    { icon: Users, text: "10,000+ Users Impacted", color: "text-purple-500" },
    { icon: Heart, text: "Passionate Problem Solver", color: "text-red-500" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [funFacts.length]);

  const thumbnailImages = [
    "/images/mythirdimg.jpg",
    "/images/mysecondimg.jpg",
    "/images/MyFirstImg.jpg",
    "/images/myImage.png",
  ];
  const sections = ["skills", "education", "experience"];

  const handleThumbnailClick = (index: number, src: string) => {
    setActiveThumbnail(index);
    setMainImage(src);
  };

  const renderActiveSection = () => {
    switch (activeNavButton) {
      case "skills":
        return (
          <SkillsSection
            activeSkillCategory={activeSkillCategory}
            onSkillCategoryChange={setActiveSkillCategory}
          />
        );
      case "education":
        return <EducationSection />;
      case "experience":
      default:
        return <ExperienceSection />;
    }
  };

  return (
    <section id="about" className="min-h-screen bg-background px-4 py-12 md:py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-accent/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/5 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Card className={`border-2 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <CardHeader className="text-center pb-8 px-4 md:px-0 relative">
            {/* Floating Fun Fact */}
            <div className="absolute top-4 right-4 hidden lg:block">
              <Card className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 animate-pulse">
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const CurrentIcon = funFacts[currentFactIndex].icon;
                    return <CurrentIcon className={`h-4 w-4 ${funFacts[currentFactIndex].color}`} />;
                  })()}
                  <span className="font-medium">{funFacts[currentFactIndex].text}</span>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 animate-in slide-in-from-top duration-1000">


                <SectionHeader
                  title={
                    <>
                      Who is{" "}
                      <span className="bg-gradient-to-r from-info via-primary to-info/3 bg-clip-text text-transparent animate-pulse">
                        Imanariyo Baptiste
                      </span>
                      ?
                    </>
                  }
                  subtitle="Passionate Full Stack Developer building scalable, modern web applications with clean architecture."
                  icon={<User className="h-12 w-12 text-primary animate-fade-in" />}
                />
              </CardTitle>

            </div>
          </CardHeader>

          <CardContent className="px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12 space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 animate-in fade-in duration-1000 text-start" style={{ animationDelay: '800ms' }}>
                I'm a passionate full-stack engineer who transforms complex business
                challenges into scalable, user-centered digital solutions. With expertise
                in modern web and mobile technologies, I deliver high-performance applications
                that drive real business impact and create exceptional user experiences.
              </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="lg:col-span-1 w-full animate-in slide-in-from-left duration-1000" style={{ animationDelay: '1200ms' }}>
                <div className="sticky top-8">
                  <ImageGallery
                    mainImage={mainImage}
                    thumbnailImages={thumbnailImages}
                    activeThumbnail={activeThumbnail}
                    onThumbnailClick={handleThumbnailClick}
                  />

                  <Card className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-center">Quick Facts</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="font-medium">4+ Years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Projects:</span>
                          <span className="font-medium">25+ Completed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Focus:</span>
                          <span className="font-medium">Full-Stack</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6 animate-in slide-in-from-right duration-1000" style={{ animationDelay: '1400ms' }}>
                <SectionNavigation
                  sections={sections}
                  activeSection={activeNavButton}
                  onSectionChange={setActiveNavButton}
                />
                <div className="transition-all duration-500 ease-in-out">
                  {renderActiveSection()}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-6 md:space-y-8 pt-8 px-4 md:px-0">

          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AboutMe;
