import { db } from "@/db";
import { services } from "../schema";
import { generateSlug, generateShareUrl } from "@/lib/slug-generator";

const servicesData = [
  {
    title: "Full-Stack Web Development",
    tagline: "Transform your vision into reality",
    description:
      "Custom web applications built with modern technologies. From concept to deployment, we create scalable, high-performance solutions tailored to your business needs.",
    imageUrl: "/images/services/fullstack-development.jpg",
    icon: "Code2",
    category: "Development",
    pricing: "Starting at $5,000",
    duration: "4-8 weeks",
    featured: "true",
    status: "featured" as const,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    benefits: [
      {
        title: "Responsive Design",
        description:
          "Mobile-first approach ensuring perfect display on all devices",
        icon: "Smartphone",
      },
      {
        title: "SEO Optimized",
        description:
          "Built-in SEO best practices for maximum search visibility",
        icon: "Search",
      },
      {
        title: "Fast Performance",
        description: "Optimized for speed with lazy loading and caching",
        icon: "Zap",
      },
      {
        title: "Secure & Scalable",
        description:
          "Enterprise-grade security with horizontal scaling capability",
        icon: "Shield",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery Call",
        description: "Understanding your requirements and project goals",
        icon: "Phone",
      },
      {
        step: 2,
        title: "Design Mockups",
        description: "Creating wireframes and visual designs for approval",
        icon: "Palette",
      },
      {
        step: 3,
        title: "Development",
        description: "Building your application with modern technologies",
        icon: "Code",
      },
      {
        step: 4,
        title: "Testing & Launch",
        description: "Quality assurance testing and deployment to production",
        icon: "Rocket",
      },
    ],
    actions: [
      {
        label: "Get Started",
        actionType: "form" as const,
        target: "contact-form",
      },
      {
        label: "View Portfolio",
        actionType: "link" as const,
        target: "/portfolio",
      },
    ],
  },
  {
    title: "Mobile App Development",
    tagline: "Native & cross-platform excellence",
    description:
      "Build powerful mobile applications for iOS and Android. We specialize in React Native and Flutter for efficient cross-platform development.",
    imageUrl: "/images/services/mobile-development.jpg",
    icon: "Smartphone",
    category: "Development",
    pricing: "Starting at $8,000",
    duration: "6-12 weeks",
    featured: "true",
    status: "new" as const,
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    benefits: [
      {
        title: "Cross-Platform",
        description: "Single codebase for both iOS and Android platforms",
        icon: "Smartphone",
      },
      {
        title: "Native Performance",
        description: "Near-native performance with smooth animations",
        icon: "Zap",
      },
      {
        title: "App Store Optimization",
        description: "Optimized for app store approval and ranking",
        icon: "Star",
      },
      {
        title: "Push Notifications",
        description: "Real-time engagement with push notification system",
        icon: "Bell",
      },
    ],
    process: [
      {
        step: 1,
        title: "Planning",
        description: "Market research and feature planning",
        icon: "Target",
      },
      {
        step: 2,
        title: "Design",
        description: "UI/UX design following platform guidelines",
        icon: "Palette",
      },
      {
        step: 3,
        title: "Development",
        description: "Cross-platform development and testing",
        icon: "Code",
      },
      {
        step: 4,
        title: "Testing & Deployment",
        description: "Beta testing and app store submission",
        icon: "Upload",
      },
    ],
    actions: [
      { label: "Get Quote", actionType: "form" as const, target: "quote-form" },
      {
        label: "View Apps",
        actionType: "link" as const,
        target: "/mobile-portfolio",
      },
    ],
  },
];

export async function seedServices() {
  try {
    console.log("🌱 Seeding services...");

    await db.delete(services);
    console.log("🗑️  Cleared existing services");

    const servicesWithSharing = servicesData.map((service) => {
      const slug = generateSlug(service.title);
      const shareUrl = generateShareUrl(slug);
      return {
        ...service,
        slug,
        shareUrl,
        isPublic: true,
      };
    });

    const insertedServices = await db
      .insert(services)
      .values(servicesWithSharing)
      .returning();

    console.log(`✅ Successfully seeded ${insertedServices.length} services`);
    console.log("🎉 Services seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    throw error;
  }
}
