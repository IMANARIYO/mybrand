import { Metadata } from 'next'
import { getProjectBySlug } from '@/app/projects/_server-actions/getProjectBySlug'
import { notFound } from 'next/navigation'
import { ProjectNavbar } from './ProjectNavbar'
import { PortfolioFooter } from '@/components/layout/PortfolioFooter'

interface ProjectLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project || 'error' in project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://imanariyo.com'
  const projectUrl = `${baseUrl}/projects/${slug}`
  
  return {
    title: `${project.title} | Imanariyo Baptiste - Full Stack Developer`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      'Imanariyo Baptiste',
      'Full Stack Developer',
      'Software Engineer',
      ...Object.values(project.techStack).flat(),
      ...project.features.slice(0, 5)
    ].join(', '),
    authors: [{ name: 'Imanariyo Baptiste', url: baseUrl }],
    creator: 'Imanariyo Baptiste',
    publisher: 'Imanariyo Baptiste',
    
    // Open Graph
    openGraph: {
      type: 'website',
      url: projectUrl,
      title: `${project.title} - Professional Project by Imanariyo Baptiste`,
      description: `${project.description} | Built with ${Object.values(project.techStack).flat().slice(0, 3).join(', ')} | ${project.status}`,
      siteName: 'Imanariyo Baptiste Portfolio',
      images: [
        {
          url: project.images.main,
          width: 1200,
          height: 630,
          alt: `${project.title} - Project Screenshot`,
          type: 'image/jpeg',
        },
        ...(project.images.others?.slice(0, 3).map(img => ({
          url: img.url,
          width: 1200,
          height: 630,
          alt: img.caption || `${project.title} - Additional Screenshot`,
          type: 'image/jpeg',
        })) || [])
      ],
      locale: 'en_US',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: '@imanariyo',
      creator: '@imanariyo',
      title: `${project.title} - Professional Project`,
      description: project.description,
      images: [project.images.main],
    },

    // Additional meta tags
    robots: {
      index: project.isPublic,
      follow: project.isPublic,
      googleBot: {
        index: project.isPublic,
        follow: project.isPublic,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Structured data
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'article:author': 'Imanariyo Baptiste',
      'article:published_time': project.startDate,
      'article:modified_time': project.endDate || new Date().toISOString(),
      'article:section': 'Technology',
      'article:tag': Object.values(project.techStack).flat().join(','),
    },

    // Canonical URL
    alternates: {
      canonical: projectUrl,
    },

    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project || 'error' in project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectNavbar project={project} />
      {children}
      <PortfolioFooter />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "image": project.images.main,
            "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://imanariyo.com'}/projects/${slug}`,
            "author": {
              "@type": "Person",
              "name": "Imanariyo Baptiste",
              "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://imanariyo.com',
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            },
            "dateCreated": project.startDate,
            "dateModified": project.endDate || new Date().toISOString(),
            "keywords": Object.values(project.techStack).flat().join(', '),
            "genre": project.category,
            "inLanguage": "en-US",
            "isAccessibleForFree": true,
            "license": "All rights reserved"
          })
        }}
      />
    </div>
  )
}