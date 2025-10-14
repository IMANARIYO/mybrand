/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ImageGallery } from "./image-gallery";
import { SectionNavigation } from "./section-navigation";
import { SkillsSection } from "./skills-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";

const AboutMe = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState("frontend");
  const [activeNavButton, setActiveNavButton] = useState("experience");
  const [mainImage, setMainImage] = useState("/images/mythirdimg.jpg");
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  const thumbnailImages = [
    "/images/mythirdimg.jpg",
    "/images/mysecondimg.jpg",
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
    <section id="about" className="min-h-screen bg-background px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <Card className="border-2 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <CardHeader className="text-center pb-8 px-4 md:px-0">
            <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Who is{" "}
              <span className="bg-gradient-to-r from-info via-primary to-info/3 bg-clip-text text-transparent ml-2">
                Imanariyo Baptiste
              </span>
              ?
            </CardTitle>
            <CardDescription className="text-lg md:text-xl max-w-3xl md:max-w-4xl mx-auto">
              Full-Stack Software Engineer | Problem Solver | Innovation Driver
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-base md:text-lg leading-relaxed max-w-3xl md:max-w-5xl mx-auto text-foreground/90">
                I'm a passionate full-stack engineer who transforms complex business
                challenges into scalable, user-centered digital solutions. With expertise
                in modern web and mobile technologies, I deliver high-performance applications
                that drive real business impact and create exceptional user experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="lg:col-span-1 w-full">
                <ImageGallery
                  mainImage={mainImage}
                  thumbnailImages={thumbnailImages}
                  activeThumbnail={activeThumbnail}
                  onThumbnailClick={handleThumbnailClick}
                />
              </div>

              <div className="lg:col-span-3 space-y-6">
                <SectionNavigation
                  sections={sections}
                  activeSection={activeNavButton}
                  onSectionChange={setActiveNavButton}
                />
                {renderActiveSection()}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-6 md:space-y-8 pt-8 px-4 md:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <h3 className="font-semibold text-primary text-lg md:text-xl">Ready to Innovate</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Passionate about cutting-edge solutions
                  </p>
                </div>
              </Card>

              <Card className="p-4 bg-secondary/5 border-secondary/20">
                <div className="text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <h3 className="font-semibold text-secondary text-lg md:text-xl">Team Player</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Collaborative and communication-focused
                  </p>
                </div>
              </Card>

              <Card className="p-4 bg-accent/5 border-accent/20">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold text-accent text-lg md:text-xl">Results-Driven</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Delivering measurable business impact
                  </p>
                </div>
              </Card>
            </div>

            <p className="text-center text-sm md:text-base text-muted-foreground max-w-2xl">
              Ready to contribute to high-performing teams and create impactful digital
              solutions that make a difference.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AboutMe;
