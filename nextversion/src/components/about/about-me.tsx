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
    <section id="about" className="min-h-screen bg-background py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-2 sm:px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-secondary/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-20 sm:bottom-40 left-8 sm:left-20 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-accent/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-primary/5 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <Card className={`border border-border sm:border-2 shadow-lg sm:shadow-xl lg:shadow-2xl bg-background transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8 px-3 sm:px-4 md:px-6 lg:px-8 relative">
            {/* Floating Fun Fact */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 hidden md:block">
              <Card className="p-2 sm:p-3 bg-primary/10 border-primary/20 animate-pulse">
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  {(() => {
                    const CurrentIcon = funFacts[currentFactIndex].icon;
                    return <CurrentIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${funFacts[currentFactIndex].color}`} />;
                  })()}
                  <span className="font-medium">{funFacts[currentFactIndex].text}</span>
                </div>
              </Card>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <SectionHeader
                title="Who is Imanariyo Baptiste?"
                subtitle="Passionate Full Stack Developer building scalable, modern web applications with clean architecture."
                icon={<User className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-primary" />}
              />
            </div>
          </CardHeader>

          <CardContent className="px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8 md:mb-12 space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 animate-in fade-in duration-1000 text-left" style={{ animationDelay: '800ms' }}>
                I'm a passionate full-stack engineer who transforms complex business
                challenges into scalable, user-centered digital solutions. With expertise
                in modern web and mobile technologies, I deliver high-performance applications
                that drive real business impact and create exceptional user experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="lg:col-span-1 w-full animate-in slide-in-from-left duration-1000" style={{ animationDelay: '1200ms' }}>
                <div className="sticky top-4 sm:top-8">
                  <ImageGallery
                    mainImage={mainImage}
                    thumbnailImages={thumbnailImages}
                    activeThumbnail={activeThumbnail}
                    onThumbnailClick={handleThumbnailClick}
                  />

                  <Card className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/5 border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-sm sm:text-base font-semibold text-center">Quick Facts</h4>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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

              <div className="lg:col-span-3 space-y-4 sm:space-y-6 animate-in slide-in-from-right duration-1000" style={{ animationDelay: '1400ms' }}>
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

          <CardFooter className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 pt-4 sm:pt-6 md:pt-8 px-3 sm:px-4 md:px-6 lg:px-8">

          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AboutMe;
