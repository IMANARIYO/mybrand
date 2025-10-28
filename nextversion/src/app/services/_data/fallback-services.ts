import { NewService } from "@/db/schema";

export const softwareEngineerServices: NewService[] = [
  {
    title: "Full-Stack Web Development",
    tagline: "Transform your vision into reality",
    description: "Custom web applications built with modern technologies. From concept to deployment, we create scalable, high-performance solutions tailored to your business needs.",
    imageUrl: "/images/services/web-development.jpg",
    icon: "Code2",
    category: "Development",
    pricing: "Starting at $5,000",
    duration: "4-8 weeks",
    featured: "true",
    status: "featured",
    slug: "full-stack-web-development",
    shareUrl: "/services/full-stack-web-development",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    benefits: [
      { title: "Responsive Design", description: "Mobile-first approach ensuring perfect display on all devices", icon: "Smartphone" },
      { title: "SEO Optimized", description: "Built-in SEO best practices for maximum search visibility", icon: "Search" },
      { title: "Fast Performance", description: "Optimized for speed with lazy loading and caching", icon: "Zap" },
      { title: "Secure & Scalable", description: "Enterprise-grade security with horizontal scaling capability", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Discovery Call", description: "Understanding your requirements and project goals", icon: "Phone" },
      { step: 2, title: "Design Mockups", description: "Creating wireframes and visual designs for approval", icon: "Palette" },
      { step: 3, title: "Development", description: "Building your application with modern technologies", icon: "Code" },
      { step: 4, title: "Testing & Launch", description: "Quality assurance testing and deployment to production", icon: "Rocket" }
    ],
    actions: [
      { label: "Get Started", actionType: "form", target: "contact-form" },
      { label: "View Portfolio", actionType: "link", target: "/portfolio" }
    ],
  },
  {
    title: "Mobile App Development",
    tagline: "Native & cross-platform excellence",
    description: "Build powerful mobile applications for iOS and Android. We specialize in React Native and Flutter for efficient cross-platform development.",
    imageUrl: "/images/services/mobile-development.jpg",
    icon: "Smartphone",
    category: "Development",
    pricing: "Starting at $8,000",
    duration: "6-12 weeks",
    featured: "true",
    status: "new",
    slug: "mobile-app-development",
    shareUrl: "/services/mobile-app-development",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    benefits: [
      { title: "Cross-Platform", description: "Single codebase for both iOS and Android platforms", icon: "Smartphone" },
      { title: "Native Performance", description: "Near-native performance with smooth animations", icon: "Zap" },
      { title: "App Store Optimization", description: "Optimized for app store approval and ranking", icon: "Star" },
      { title: "Push Notifications", description: "Real-time engagement with push notification system", icon: "Bell" }
    ],
    process: [
      { step: 1, title: "Planning", description: "Market research and feature planning", icon: "Target" },
      { step: 2, title: "Design", description: "UI/UX design following platform guidelines", icon: "Palette" },
      { step: 3, title: "Development", description: "Cross-platform development and testing", icon: "Code" },
      { step: 4, title: "Testing & Deployment", description: "Beta testing and app store submission", icon: "Upload" }
    ],
    actions: [
      { label: "Get Quote", actionType: "form", target: "quote-form" },
      { label: "View Apps", actionType: "link", target: "/mobile-portfolio" }
    ],
  },
  {
    title: "API Development & Integration",
    tagline: "Connect everything seamlessly",
    description: "Custom API development and third-party integrations. RESTful and GraphQL APIs with comprehensive documentation and testing.",
    imageUrl: "/images/services/api-development.jpg",
    icon: "Plug",
    category: "Development",
    pricing: "Starting at $3,500",
    duration: "3-6 weeks",
    featured: "false",
    status: "in-progress",
    slug: "api-development-integration",
    shareUrl: "/services/api-development-integration",
    skills: ["REST API", "GraphQL", "Node.js", "Express", "API Documentation"],
    benefits: [
      { title: "RESTful & GraphQL", description: "Modern API architectures for flexible data access", icon: "Database" },
      { title: "Comprehensive Documentation", description: "Interactive API docs with examples and testing", icon: "FileText" },
      { title: "Rate Limiting", description: "Built-in protection against API abuse", icon: "Shield" },
      { title: "Authentication", description: "Secure JWT and OAuth authentication systems", icon: "Lock" }
    ],
    process: [
      { step: 1, title: "Requirements", description: "API specification and endpoint planning", icon: "FileText" },
      { step: 2, title: "Design", description: "API architecture and data model design", icon: "Layout" },
      { step: 3, title: "Development", description: "API implementation with testing", icon: "Code" },
      { step: 4, title: "Documentation", description: "Interactive documentation and integration guides", icon: "Book" }
    ],
    actions: [
      { label: "Get Quote", actionType: "form", target: "api-quote" },
      { label: "View Docs", actionType: "link", target: "/api-examples" }
    ],
  },
  {
    title: "Project Management & Coordination",
    tagline: "Agile project delivery with clear communication",
    description: "Professional project management services using Agile methodologies. Ensure your software projects are delivered on time, within budget, and exceed expectations.",
    imageUrl: "/images/services/project-management.jpg",
    icon: "Calendar",
    category: "Management",
    pricing: "Starting at $2,000",
    duration: "Project-based",
    featured: "true",
    status: "featured",
    slug: "project-management-coordination",
    shareUrl: "/services/project-management-coordination",
    skills: ["Agile", "Scrum", "Jira", "Project Planning", "Risk Management"],
    benefits: [
      { title: "Sprint Planning", description: "Organized development cycles with clear deliverables", icon: "Calendar" },
      { title: "Daily Standups", description: "Regular communication and progress tracking", icon: "Users" },
      { title: "Risk Mitigation", description: "Proactive identification and resolution of project risks", icon: "AlertTriangle" },
      { title: "Stakeholder Communication", description: "Regular updates and transparent reporting", icon: "MessageSquare" }
    ],
    process: [
      { step: 1, title: "Project Kickoff", description: "Team alignment and project charter creation", icon: "Flag" },
      { step: 2, title: "Sprint Planning", description: "Backlog refinement and sprint goal setting", icon: "Target" },
      { step: 3, title: "Execution & Monitoring", description: "Daily standups and progress tracking", icon: "Activity" },
      { step: 4, title: "Delivery & Review", description: "Sprint reviews and retrospectives", icon: "CheckCircle" }
    ],
    actions: [
      { label: "Start Project", actionType: "form", target: "project-form" },
      { label: "Scrum Training", actionType: "link", target: "/scrum-training" }
    ],
  },
  {
    title: "Cybersecurity Consulting",
    tagline: "Protect what matters",
    description: "Comprehensive security audits, penetration testing, and security implementation. Keep your business safe from cyber threats.",
    imageUrl: "/images/services/security-audit.jpg",
    icon: "Shield",
    category: "Security",
    pricing: "Starting at $5,000",
    duration: "2-6 weeks",
    featured: "true",
    status: "featured",
    slug: "cybersecurity-consulting",
    shareUrl: "/services/cybersecurity-consulting",
    skills: ["Penetration Testing", "Security Auditing", "OWASP", "Compliance", "Risk Assessment"],
    benefits: [
      { title: "Security Audit", description: "Comprehensive assessment of your security posture", icon: "Search" },
      { title: "Penetration Testing", description: "Ethical hacking to identify vulnerabilities", icon: "Target" },
      { title: "Compliance", description: "GDPR, HIPAA, and industry compliance guidance", icon: "FileCheck" },
      { title: "Training", description: "Security awareness training for your team", icon: "GraduationCap" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Initial security posture evaluation", icon: "Search" },
      { step: 2, title: "Testing", description: "Penetration testing and vulnerability scanning", icon: "Bug" },
      { step: 3, title: "Report", description: "Detailed findings and recommendations", icon: "FileText" },
      { step: 4, title: "Implementation", description: "Security improvements and monitoring setup", icon: "Shield" }
    ],
    actions: [
      { label: "Get Audit", actionType: "form", target: "security-audit" },
      { label: "Learn More", actionType: "link", target: "/security-services" }
    ],
  }
];