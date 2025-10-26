import { db } from "@/db";
import { projectsTable } from "../schema";
import { generateSlug, generateShareUrl } from "@/lib/slug-generator";

const projects = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with modern UI and secure payments",
    overview:
      "A comprehensive e-commerce platform built with Next.js and TypeScript, featuring user authentication, product management, shopping cart functionality, and integrated payment processing. The platform includes an admin dashboard for inventory management and order tracking.",
    role: "Full-Stack Developer - Designed and implemented the entire application architecture, from database design to frontend components. Integrated Stripe for payments and implemented real-time order tracking.",
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "React Hook Form"],
      backend: ["Node.js", "tRPC", "Prisma"],
      database: ["PostgreSQL"],
      infrastructure: ["Vercel", "Railway"],
    },
    architecture: {
      layers: [
        {
          name: "Frontend",
          description: "Next.js with TypeScript for type-safe development",
        },
        { name: "API Layer", description: "tRPC for end-to-end type safety" },
        { name: "Database", description: "PostgreSQL with Prisma ORM" },
      ],
      notes: "Monolithic architecture with clear separation of concerns",
    },
    frontendRendering: "SSR" as const,
    mobileSupport: true,
    features: [
      "User authentication and authorization",
      "Product catalog with search and filtering",
      "Shopping cart and wishlist functionality",
      "Secure payment processing with Stripe",
      "Order tracking and history",
      "Admin dashboard for inventory management",
      "Responsive design for all devices",
    ],
    challenges: [
      "Implementing secure payment processing while maintaining good UX",
      "Optimizing database queries for large product catalogs",
      "Managing complex state across multiple cart and checkout steps",
      "Ensuring mobile responsiveness across different screen sizes",
    ],
    results:
      "Successfully launched platform handling 500+ daily transactions with 99.9% uptime. Reduced checkout abandonment by 35% through streamlined UX.",
    images: {
      main: "/projects/ecommerce-main.jpg",
      others: [
        {
          url: "/projects/ecommerce-dashboard.jpg",
          type: "screenshot" as const,
          caption: "Admin Dashboard",
        },
        {
          url: "/projects/ecommerce-mobile.jpg",
          type: "screenshot" as const,
          caption: "Mobile View",
        },
      ],
    },
    liveDemo: "https://ecommerce-demo.vercel.app",
    sourceCode: "https://github.com/username/ecommerce-platform",
    category: "fullstack" as const,
    status: "completed" as const,
    startDate: "2024-01-15",
    endDate: "2024-03-20",
    tags: [
      "E-commerce",
      "Payment Processing",
      "Admin Dashboard",
      "Mobile-First",
    ],
    whyItMatters:
      "This project demonstrates my ability to build complex, real-world applications that handle sensitive data and financial transactions securely.",
    isFeatured: true,
    viewCount: 245,
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates and team features",
    overview:
      "A modern task management application inspired by tools like Trello and Asana. Features include drag-and-drop kanban boards, real-time collaboration, team management, and detailed project analytics. Built with performance and user experience as top priorities.",
    role: "Lead Frontend Developer - Led the frontend development team, implemented the drag-and-drop interface, real-time features using WebSockets, and created a comprehensive component library.",
    techStack: {
      frontend: ["React", "TypeScript", "Zustand", "React DnD", "Socket.io"],
      backend: ["Express.js", "Socket.io", "JWT"],
      database: ["MongoDB", "Redis"],
      infrastructure: ["Docker", "AWS EC2", "CloudFront"],
    },
    architecture: {
      layers: [
        {
          name: "Client",
          description: "React SPA with real-time WebSocket connections",
        },
        {
          name: "API Server",
          description:
            "Express.js REST API with Socket.io for real-time features",
        },
        {
          name: "Database",
          description:
            "MongoDB for data persistence, Redis for caching and sessions",
        },
      ],
      notes:
        "Microservices architecture with separate services for authentication, notifications, and file uploads",
    },
    frontendRendering: "CSR" as const,
    mobileSupport: true,
    features: [
      "Drag-and-drop kanban boards",
      "Real-time collaboration and updates",
      "Team and project management",
      "Task assignments and due dates",
      "File attachments and comments",
      "Project analytics and reporting",
      "Dark/light theme support",
    ],
    challenges: [
      "Implementing smooth drag-and-drop across different board columns",
      "Managing real-time state synchronization across multiple users",
      "Optimizing performance with large datasets and many concurrent users",
      "Creating an intuitive UX for complex project management workflows",
    ],
    results:
      "Deployed to 50+ teams with average 40% increase in project completion rates. Achieved sub-100ms real-time update latency.",
    images: {
      main: "/projects/taskmanager-main.jpg",
      others: [
        {
          url: "/projects/taskmanager-kanban.jpg",
          type: "screenshot" as const,
          caption: "Kanban Board View",
        },
        {
          url: "/projects/taskmanager-analytics.jpg",
          type: "screenshot" as const,
          caption: "Analytics Dashboard",
        },
      ],
    },
    liveDemo: "https://taskmanager-demo.netlify.app",
    sourceCode: "https://github.com/username/task-management-app",
    category: "web" as const,
    status: "completed" as const,
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    tags: ["Real-time", "Collaboration", "Drag & Drop", "Team Management"],
    whyItMatters:
      "This project showcases my expertise in building complex interactive applications with real-time features and excellent user experience.",
    isFeatured: false,
    viewCount: 128,
  },
];

export async function seedProjects() {
  try {
    console.log("🌱 Seeding projects...");

    for (const project of projects) {
      const slug = generateSlug(project.title);
      const shareUrl = generateShareUrl(slug);

      const projectWithSharing = {
        ...project,
        slug,
        shareUrl,
        isPublic: true,
      };

      await db
        .insert(projectsTable)
        .values(projectWithSharing)
        .onConflictDoUpdate({
          target: projectsTable.id,
          set: {
            title: project.title,
            description: project.description,
            overview: project.overview,
            role: project.role,
            techStack: project.techStack,
            architecture: project.architecture,
            frontendRendering: project.frontendRendering,
            mobileSupport: project.mobileSupport,
            features: project.features,
            challenges: project.challenges,
            results: project.results,
            images: project.images,
            liveDemo: project.liveDemo,
            sourceCode: project.sourceCode,
            category: project.category,
            status: project.status,
            startDate: project.startDate,
            endDate: project.endDate,
            tags: project.tags,
            whyItMatters: project.whyItMatters,
            isFeatured: project.isFeatured,
            viewCount: project.viewCount,
            slug,
            shareUrl,
            isPublic: true,
          },
        });
      console.log(`✅ Seeded project: ${project.title}`);
    }

    console.log("🎉 Projects seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding projects:", error);
    throw error;
  }
}
