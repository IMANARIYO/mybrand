import { Navbar } from "@/components/navbar"
import { DesignShowcase } from "@/components/design-showcase"
import HomeHero from "@/components/home/home-hero"
import { AboutMe } from "@/components/about"
import { ProjectsSection } from "@/components/projects-section"
import ServicesSection from "./services/landing"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        <HomeHero />
        <AboutMe />
        <ProjectsSection />
        <ServicesSection />
        <DesignShowcase />
      </main>
    </>
  )
}
