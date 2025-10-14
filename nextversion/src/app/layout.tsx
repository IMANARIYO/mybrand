import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imanariyo Baptiste – Full Stack Software Engineer & Mobile Applications Developer | Portfolio",
  description:
    "Discover Imanariyo Baptiste's portfolio featuring Next.js, React, Flutter, Dart, Spring Boot, and interactive design systems. Educated at University of Rwanda – College of Science and Technology, STEM, ICT, Computer Engineering, Kigali, Rwanda. Let's create innovative solutions together!",
  generator: "Next.js",
  authors: [
    { name: "Imanariyo Baptiste", url: "https://imanariyo-brand-portfolio-website.vercel.app" }
  ],
  keywords: [
    "Full Stack Developer",
    "Mobile Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Flutter",
    "Dart",
    "React Native",
    "Spring Boot",
    "Java",
    "Tailwind CSS",
    "Chakra UI",
    "Framer Motion",
    "Figma",
    "Design Systems",
    "Web Development",
    "Mobile Development",
    "Frontend",
    "Backend",
    "DevOps",
    "Agile",
    "Scrum",
    "Git",
    "GitHub",
    "CI/CD",
    "AWS",
    "Docker",
    "Kubernetes",
    "Firebase",
    "SQL",
    "NoSQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Node.js",
    "Express.js",
    "Spring Framework",
    "Microservices",
    "REST API",
    "GraphQL",
    "UI/UX",
    "Portfolio",
    "University of Rwanda",
    "College of Science and Technology",
    "STEM",
    "ICT",
    "Computer Engineering",
    "Kigali developers",
    "Norrnsken Rwanda developers",
    "Nyarugenge District developers",
    "Rwanda developers"
  ],
  openGraph: {
    title: "Imanariyo Baptiste – Full Stack Software Engineer & Mobile Applications Developer | Portfolio",
    description:
      "Check out Imanariyo Baptiste's portfolio: Next.js, React, Flutter, Dart, Spring Boot, and interactive design systems. Educated at University of Rwanda – College of Science and Technology, STEM, ICT, Computer Engineering, Kigali, Rwanda.",
    url: "https://imanariyo-brand-portfolio-website.vercel.app",
    type: "website",
    siteName: "Imanariyo Baptiste – Portfolio",
    images: [
      {
        url: "https://imanariyo-brand-portfolio-website.vercel.app/images/image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imanariyo Baptiste – Full Stack Software Engineer & Mobile Applications Developer | Portfolio",
    description:
      "Explore the portfolio of Imanariyo Baptiste featuring web & mobile projects built with modern frameworks and design systems. University of Rwanda – College of Science and Technology, STEM, ICT, Computer Engineering, Kigali, Rwanda.",
    images: ["https://imanariyo-brand-portfolio-website.vercel.app/images/image.png"],
    creator: "@imanariyo",
    site: "@imanariyo",
  },
  alternates: {
    canonical: "https://imanariyo-brand-portfolio-website.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <LanguageProvider defaultLanguage="en" storageKey="design-system-language">
            <ThemeProvider defaultTheme="light" storageKey="design-system-theme">
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
