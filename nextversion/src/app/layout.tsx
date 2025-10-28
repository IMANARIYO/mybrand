import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

import { Toaster } from "sonner";
import { PortfolioFooter } from "@/components/layout/PortfolioFooter";
import { siteMetadata } from "@/config/site-metadata";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  generator: "Next.js",
  authors: [{ name: siteMetadata.name, url: siteMetadata.url }],
  keywords: [
    "Full Stack Developer",
    "Mobile Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Flutter",
    "Dart",
    "Spring Boot",
    "Node.js",
    "PostgreSQL",
    "Java",
    "UI/UX",
    "Portfolio",
    "Web Development",
    "Mobile Development",
    "Rwanda developers",
  ],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    type: "website",
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
    creator: siteMetadata.twitterHandle,
    site: siteMetadata.twitterHandle,
  },
  alternates: {
    canonical: siteMetadata.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Suspense fallback={null}>
          <LanguageProvider
            defaultLanguage="en"
            storageKey="design-system-language"
          >
            <ThemeProvider
              defaultTheme="light"
              storageKey="design-system-theme"
            >
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
        <PortfolioFooter />
        <Toaster />
      </body>
    </html>
  );
}
