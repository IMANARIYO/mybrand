import { Navbar } from "@/components/navbar"
// import { DesignShowcase } from "@/components/design-showcase"
import HomeHero from "@/components/home/home-hero"
import { AboutMe } from "@/components/about"
import { ProjectsSection } from "@/app/projects/_components/projects-section"
import ServicesSection from "./services/landing"
import ContactSection from "./contact/ContactSection"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        <HomeHero />
        <AboutMe />
        <ProjectsSection />
        <ServicesSection />
        {/* <DesignShowcase /> */}
        <ContactSection />
      </main>
    </>
  )
}
