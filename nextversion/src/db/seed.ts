import { db } from "../db";
import { projectsTable } from "./schema";

const projects = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with modern UI and secure payments",
    overview: "A comprehensive e-commerce platform built with Next.js and TypeScript, featuring user authentication, product management, shopping cart functionality, and integrated payment processing. The platform includes an admin dashboard for inventory management and order tracking.",
    role: "Full-Stack Developer - Designed and implemented the entire application architecture, from database design to frontend components. Integrated Stripe for payments and implemented real-time order tracking.",
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "React Hook Form"],
      backend: ["Node.js", "tRPC", "Prisma"],
      database: ["PostgreSQL"],
      infrastructure: ["Vercel", "Railway"]
    },
    architecture: {
      layers: [
        {
          name: "Frontend",
          description: "Next.js with TypeScript for type-safe development"
        },
        {
          name: "API Layer", 
          description: "tRPC for end-to-end type safety"
        },
        {
          name: "Database",
          description: "PostgreSQL with Prisma ORM"
        }
      ],
      notes: "Monolithic architecture with clear separation of concerns"
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
      "Responsive design for all devices"
    ],
    challenges: [
      "Implementing secure payment processing while maintaining good UX",
      "Optimizing database queries for large product catalogs",
      "Managing complex state across multiple cart and checkout steps",
      "Ensuring mobile responsiveness across different screen sizes"
    ],
    results: "Successfully launched platform handling 500+ daily transactions with 99.9% uptime. Reduced checkout abandonment by 35% through streamlined UX.",
    images: {
      main: "/projects/ecommerce-main.jpg",
      others: [
        { url: "/projects/ecommerce-dashboard.jpg", type: "screenshot" as const, caption: "Admin Dashboard" },
        { url: "/projects/ecommerce-mobile.jpg", type: "screenshot" as const, caption: "Mobile View" }
      ]
    },
    liveDemo: "https://ecommerce-demo.vercel.app",
    sourceCode: "https://github.com/username/ecommerce-platform",
    category: "fullstack" as const,
    status: "completed" as const,
    startDate: "2024-01-15",
    endDate: "2024-03-20",
    tags: ["E-commerce", "Payment Processing", "Admin Dashboard", "Mobile-First"],
    whyItMatters: "This project demonstrates my ability to build complex, real-world applications that handle sensitive data and financial transactions securely.",
    isFeatured: true,
    viewCount: 245
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team features",
    overview: "A modern task management application inspired by tools like Trello and Asana. Features include drag-and-drop kanban boards, real-time collaboration, team management, and detailed project analytics. Built with performance and user experience as top priorities.",
    role: "Lead Frontend Developer - Led the frontend development team, implemented the drag-and-drop interface, real-time features using WebSockets, and created a comprehensive component library.",
    techStack: {
      frontend: ["React", "TypeScript", "Zustand", "React DnD", "Socket.io"],
      backend: ["Express.js", "Socket.io", "JWT"],
      database: ["MongoDB", "Redis"],
      infrastructure: ["Docker", "AWS EC2", "CloudFront"]
    },
    architecture: {
      layers: [
        {
          name: "Client",
          description: "React SPA with real-time WebSocket connections"
        },
        {
          name: "API Server",
          description: "Express.js REST API with Socket.io for real-time features"
        },
        {
          name: "Database",
          description: "MongoDB for data persistence, Redis for caching and sessions"
        }
      ],
      notes: "Microservices architecture with separate services for authentication, notifications, and file uploads"
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
      "Dark/light theme support"
    ],
    challenges: [
      "Implementing smooth drag-and-drop across different board columns",
      "Managing real-time state synchronization across multiple users",
      "Optimizing performance with large datasets and many concurrent users",
      "Creating an intuitive UX for complex project management workflows"
    ],
    results: "Deployed to 50+ teams with average 40% increase in project completion rates. Achieved sub-100ms real-time update latency.",
    images: {
      main: "/projects/taskmanager-main.jpg",
      others: [
        { url: "/projects/taskmanager-kanban.jpg", type: "screenshot" as const, caption: "Kanban Board View" },
        { url: "/projects/taskmanager-analytics.jpg", type: "screenshot" as const, caption: "Analytics Dashboard" }
      ]
    },
    liveDemo: "https://taskmanager-demo.netlify.app",
    sourceCode: "https://github.com/username/task-management-app",
    category: "web" as const,
    status: "completed" as const,
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    tags: ["Real-time", "Collaboration", "Drag & Drop", "Team Management"],
    whyItMatters: "This project showcases my expertise in building complex interactive applications with real-time features and excellent user experience.",
    isFeatured: false,
    viewCount: 128
  },
  {
    id: "flutter-fitness-app",
    title: "Flutter Fitness Tracker",
    description: "Cross-platform mobile fitness app with workout tracking and social features",
    overview: "A comprehensive fitness tracking application built with Flutter, featuring workout planning, progress tracking, social challenges, and integration with wearable devices. Includes offline functionality and real-time synchronization.",
    role: "Mobile App Developer - Developed the entire Flutter application, implemented offline-first architecture, integrated with fitness APIs, and created custom animations for enhanced UX.",
    techStack: {
      frontend: ["Flutter", "Dart", "Provider", "Hive"],
      backend: ["Firebase", "Cloud Functions", "FCM"],
      database: ["Firestore", "SQLite"],
      infrastructure: ["Firebase Hosting", "Google Play", "App Store"]
    },
    architecture: {
      layers: [
        { name: "Presentation", description: "Flutter widgets with Provider state management" },
        { name: "Business Logic", description: "Service classes and data models" },
        { name: "Data", description: "Local SQLite and remote Firestore" }
      ],
      notes: "Clean architecture with offline-first approach"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: true,
    features: [
      "Workout planning and tracking",
      "Progress analytics and charts",
      "Social challenges and leaderboards",
      "Wearable device integration",
      "Offline workout recording",
      "Custom exercise library",
      "Push notifications for reminders"
    ],
    challenges: [
      "Implementing smooth offline-to-online data sync",
      "Optimizing battery usage during workout tracking",
      "Creating responsive UI across different screen sizes",
      "Handling real-time updates in social features"
    ],
    results: "Published on both app stores with 10K+ downloads and 4.5-star rating. Reduced workout planning time by 60%.",
    images: {
      main: "/projects/flutter-fitness-main.jpg",
      others: [
        { url: "/projects/flutter-fitness-workout.jpg", type: "screenshot" as const, caption: "Workout Tracking" },
        { url: "/projects/flutter-fitness-social.jpg", type: "screenshot" as const, caption: "Social Features" }
      ]
    },
    liveDemo: "https://play.google.com/store/apps/details?id=com.fitness.tracker",
    sourceCode: "https://github.com/username/flutter-fitness-app",
    category: "mobile" as const,
    status: "completed" as const,
    startDate: "2024-02-01",
    endDate: "2024-05-15",
    tags: ["Flutter", "Mobile", "Fitness", "Offline-First"],
    whyItMatters: "Demonstrates expertise in cross-platform mobile development and complex state management.",
    isFeatured: true,
    viewCount: 189
  },
  {
    id: "react-native-food-delivery",
    title: "React Native Food Delivery",
    description: "Food delivery app with real-time tracking and payment integration",
    overview: "A full-featured food delivery application built with React Native, featuring restaurant browsing, order management, real-time delivery tracking, and integrated payment processing. Includes separate apps for customers and delivery drivers.",
    role: "Lead Mobile Developer - Architected the React Native application, implemented real-time tracking with maps, integrated payment gateways, and optimized performance for smooth user experience.",
    techStack: {
      frontend: ["React Native", "TypeScript", "Redux Toolkit", "React Navigation"],
      backend: ["Node.js", "Express.js", "Socket.io", "Stripe API"],
      database: ["MongoDB", "Redis"],
      infrastructure: ["AWS EC2", "CloudFront", "Google Maps API"]
    },
    architecture: {
      layers: [
        { name: "Mobile Apps", description: "Customer and driver React Native apps" },
        { name: "API Gateway", description: "Express.js REST API with real-time WebSocket" },
        { name: "Database", description: "MongoDB for data, Redis for caching and sessions" }
      ],
      notes: "Microservices architecture with separate services for orders, payments, and tracking"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: true,
    features: [
      "Restaurant discovery and menu browsing",
      "Real-time order tracking with maps",
      "Multiple payment methods integration",
      "Push notifications for order updates",
      "Driver app with route optimization",
      "Rating and review system",
      "Order history and favorites"
    ],
    challenges: [
      "Implementing accurate real-time location tracking",
      "Optimizing map performance on lower-end devices",
      "Handling offline scenarios gracefully",
      "Managing complex order state across multiple actors"
    ],
    results: "Deployed to 3 cities with 500+ daily orders. Achieved 95% customer satisfaction and 4.7-star rating.",
    images: {
      main: "/projects/rn-food-main.jpg",
      others: [
        { url: "/projects/rn-food-tracking.jpg", type: "screenshot" as const, caption: "Real-time Tracking" },
        { url: "/projects/rn-food-driver.jpg", type: "screenshot" as const, caption: "Driver App" }
      ]
    },
    liveDemo: "https://fooddelivery-demo.com",
    sourceCode: "https://github.com/username/rn-food-delivery",
    category: "mobile" as const,
    status: "completed" as const,
    startDate: "2023-08-01",
    endDate: "2023-12-20",
    tags: ["React Native", "Real-time", "Maps", "Payment Integration"],
    whyItMatters: "Showcases ability to build complex mobile apps with real-time features and third-party integrations.",
    isFeatured: false,
    viewCount: 156
  },
  {
    id: "spring-boot-microservices",
    title: "Spring Boot Microservices Platform",
    description: "Enterprise microservices architecture with Spring Boot and Docker",
    overview: "A comprehensive microservices platform built with Spring Boot, featuring service discovery, API gateway, distributed tracing, and containerized deployment. Designed for high scalability and fault tolerance.",
    role: "Backend Architect - Designed the microservices architecture, implemented service communication patterns, set up CI/CD pipelines, and established monitoring and logging infrastructure.",
    techStack: {
      frontend: ["React", "TypeScript", "Material-UI"],
      backend: ["Spring Boot", "Spring Cloud", "Java 17", "Maven"],
      database: ["PostgreSQL", "MongoDB", "Redis"],
      infrastructure: ["Docker", "Kubernetes", "AWS EKS", "Prometheus"]
    },
    architecture: {
      layers: [
        { name: "API Gateway", description: "Spring Cloud Gateway for routing and load balancing" },
        { name: "Microservices", description: "Independent Spring Boot services" },
        { name: "Data Layer", description: "Polyglot persistence with multiple databases" },
        { name: "Infrastructure", description: "Containerized deployment on Kubernetes" }
      ],
      notes: "Event-driven architecture with CQRS pattern for complex business operations"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: false,
    features: [
      "Service discovery with Eureka",
      "Circuit breaker pattern implementation",
      "Distributed tracing with Zipkin",
      "Centralized configuration management",
      "Event-driven communication",
      "Automated testing and deployment",
      "Monitoring and alerting"
    ],
    challenges: [
      "Managing distributed transactions across services",
      "Implementing effective service-to-service communication",
      "Handling cascading failures gracefully",
      "Optimizing inter-service latency"
    ],
    results: "Reduced deployment time by 80% and improved system reliability to 99.9% uptime. Handles 10K+ concurrent users.",
    images: {
      main: "/projects/spring-microservices-main.jpg",
      others: [
        { url: "/projects/spring-microservices-architecture.jpg", type: "diagram" as const, caption: "Architecture Diagram" },
        { url: "/projects/spring-microservices-monitoring.jpg", type: "screenshot" as const, caption: "Monitoring Dashboard" }
      ]
    },
    sourceCode: "https://github.com/username/spring-microservices-platform",
    category: "api" as const,
    status: "completed" as const,
    startDate: "2023-06-01",
    endDate: "2024-01-30",
    tags: ["Spring Boot", "Microservices", "Docker", "Kubernetes"],
    whyItMatters: "Demonstrates enterprise-level backend architecture skills and DevOps expertise.",
    isFeatured: true,
    viewCount: 234
  },
  {
    id: "nextjs-blog-platform",
    title: "Next.js Blog Platform",
    description: "Modern blog platform with SSG, MDX support, and analytics",
    overview: "A high-performance blog platform built with Next.js 14, featuring static site generation, MDX content support, SEO optimization, and integrated analytics. Includes a headless CMS integration and comment system.",
    role: "Full-Stack Developer - Built the entire platform from design to deployment, implemented SSG optimization, integrated headless CMS, and created a custom analytics dashboard.",
    techStack: {
      frontend: ["Next.js 14", "TypeScript", "Tailwind CSS", "MDX"],
      backend: ["Next.js API Routes", "Prisma", "NextAuth.js"],
      database: ["PostgreSQL", "Vercel KV"],
      infrastructure: ["Vercel", "Cloudinary", "Algolia"]
    },
    architecture: {
      layers: [
        { name: "Frontend", description: "Next.js with SSG and ISR for optimal performance" },
        { name: "API Layer", description: "Next.js API routes for dynamic functionality" },
        { name: "Content", description: "MDX files with frontmatter for blog posts" },
        { name: "Database", description: "PostgreSQL for user data and comments" }
      ],
      notes: "Hybrid rendering strategy combining SSG for content and SSR for dynamic features"
    },
    frontendRendering: "SSG" as const,
    mobileSupport: true,
    features: [
      "Static site generation for blog posts",
      "MDX support with custom components",
      "SEO optimization and meta tags",
      "Full-text search with Algolia",
      "Comment system with moderation",
      "Analytics dashboard",
      "Dark/light theme support"
    ],
    challenges: [
      "Optimizing build times for large content volumes",
      "Implementing efficient search functionality",
      "Managing content updates with ISR",
      "Ensuring accessibility across all components"
    ],
    results: "Achieved 100/100 Lighthouse scores and 50% faster page loads. Supports 1000+ blog posts with sub-second search.",
    images: {
      main: "/projects/nextjs-blog-main.jpg",
      others: [
        { url: "/projects/nextjs-blog-editor.jpg", type: "screenshot" as const, caption: "MDX Editor" },
        { url: "/projects/nextjs-blog-analytics.jpg", type: "screenshot" as const, caption: "Analytics Dashboard" }
      ]
    },
    liveDemo: "https://nextjs-blog-platform.vercel.app",
    sourceCode: "https://github.com/username/nextjs-blog-platform",
    category: "web" as const,
    status: "completed" as const,
    startDate: "2024-03-01",
    endDate: "2024-04-15",
    tags: ["Next.js", "SSG", "MDX", "SEO"],
    whyItMatters: "Shows expertise in modern web development with performance optimization and content management.",
    isFeatured: false,
    viewCount: 167
  },
  {
    id: "react-dashboard-analytics",
    title: "React Analytics Dashboard",
    description: "Interactive data visualization dashboard with real-time updates",
    overview: "A comprehensive analytics dashboard built with React, featuring interactive charts, real-time data updates, customizable widgets, and advanced filtering capabilities. Designed for business intelligence and data-driven decision making.",
    role: "Frontend Developer - Developed the entire React application, implemented complex data visualizations, optimized performance for large datasets, and created a flexible widget system.",
    techStack: {
      frontend: ["React 18", "TypeScript", "D3.js", "Recharts", "Zustand"],
      backend: ["Node.js", "Express.js", "WebSocket"],
      database: ["InfluxDB", "Redis"],
      infrastructure: ["Netlify", "Railway"]
    },
    architecture: {
      layers: [
        { name: "Presentation", description: "React components with custom hooks" },
        { name: "State Management", description: "Zustand for global state and data caching" },
        { name: "Data Layer", description: "Real-time WebSocket connections and REST APIs" }
      ],
      notes: "Component-based architecture with reusable chart components and data adapters"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: true,
    features: [
      "Interactive charts and graphs",
      "Real-time data streaming",
      "Customizable dashboard layouts",
      "Advanced filtering and search",
      "Export functionality (PDF, CSV)",
      "Responsive design for mobile",
      "Dark/light theme toggle"
    ],
    challenges: [
      "Optimizing rendering performance with large datasets",
      "Implementing smooth real-time updates without flickering",
      "Creating flexible and reusable chart components",
      "Managing complex filter state across multiple widgets"
    ],
    results: "Improved data analysis efficiency by 70% and reduced report generation time from hours to minutes.",
    images: {
      main: "/projects/react-dashboard-main.jpg",
      others: [
        { url: "/projects/react-dashboard-charts.jpg", type: "screenshot" as const, caption: "Interactive Charts" },
        { url: "/projects/react-dashboard-mobile.jpg", type: "screenshot" as const, caption: "Mobile View" }
      ]
    },
    liveDemo: "https://react-analytics-dashboard.netlify.app",
    sourceCode: "https://github.com/username/react-analytics-dashboard",
    category: "web" as const,
    status: "completed" as const,
    startDate: "2023-10-01",
    endDate: "2024-01-15",
    tags: ["React", "Data Visualization", "Real-time", "TypeScript"],
    whyItMatters: "Demonstrates advanced React skills and expertise in data visualization and performance optimization.",
    isFeatured: false,
    viewCount: 143
  },
  {
    id: "nodejs-api-gateway",
    title: "Node.js API Gateway",
    description: "High-performance API gateway with rate limiting and authentication",
    overview: "A robust API gateway built with Node.js, providing centralized authentication, rate limiting, request routing, and monitoring for microservices. Features JWT authentication, Redis caching, and comprehensive logging.",
    role: "Backend Developer - Designed and implemented the API gateway architecture, integrated authentication systems, implemented caching strategies, and set up monitoring and alerting.",
    techStack: {
      frontend: [],
      backend: ["Node.js", "Express.js", "JWT", "Helmet", "Winston"],
      database: ["Redis", "MongoDB"],
      infrastructure: ["Docker", "AWS ECS", "CloudWatch"]
    },
    architecture: {
      layers: [
        { name: "Gateway Layer", description: "Express.js with middleware for routing and security" },
        { name: "Authentication", description: "JWT-based auth with refresh token rotation" },
        { name: "Caching", description: "Redis for response caching and rate limiting" },
        { name: "Monitoring", description: "Winston logging with CloudWatch integration" }
      ],
      notes: "Middleware-based architecture with plugin system for extensibility"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: false,
    features: [
      "Request routing and load balancing",
      "JWT authentication and authorization",
      "Rate limiting and throttling",
      "Response caching with Redis",
      "Request/response transformation",
      "Comprehensive logging and monitoring",
      "Health checks and circuit breakers"
    ],
    challenges: [
      "Implementing efficient rate limiting algorithms",
      "Handling high concurrent request volumes",
      "Managing JWT token lifecycle securely",
      "Optimizing response times with caching strategies"
    ],
    results: "Handles 50K+ requests per minute with 99.95% uptime. Reduced authentication overhead by 60%.",
    images: {
      main: "/projects/nodejs-gateway-main.jpg",
      others: [
        { url: "/projects/nodejs-gateway-monitoring.jpg", type: "screenshot" as const, caption: "Monitoring Dashboard" },
        { url: "/projects/nodejs-gateway-architecture.jpg", type: "diagram" as const, caption: "Architecture Diagram" }
      ]
    },
    sourceCode: "https://github.com/username/nodejs-api-gateway",
    category: "api" as const,
    status: "completed" as const,
    startDate: "2023-07-15",
    endDate: "2023-11-30",
    tags: ["Node.js", "API Gateway", "Authentication", "Performance"],
    whyItMatters: "Shows expertise in building scalable backend infrastructure and security-focused systems.",
    isFeatured: false,
    viewCount: 198
  },
  {
    id: "fullstack-social-media",
    title: "Full-Stack Social Media App",
    description: "Complete social media platform with real-time messaging and content sharing",
    overview: "A comprehensive social media application featuring user profiles, post sharing, real-time messaging, story features, and advanced content discovery. Built with modern full-stack technologies and optimized for scalability.",
    role: "Full-Stack Developer - Developed both frontend and backend, implemented real-time features, designed the database schema, and deployed the application with CI/CD pipelines.",
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Socket.io Client"],
      backend: ["Node.js", "Express.js", "Socket.io", "Prisma"],
      database: ["PostgreSQL", "Redis", "Cloudinary"],
      infrastructure: ["Vercel", "Railway", "AWS S3"]
    },
    architecture: {
      layers: [
        { name: "Frontend", description: "Next.js with SSR for SEO and performance" },
        { name: "API Layer", description: "RESTful APIs with real-time WebSocket connections" },
        { name: "Database", description: "PostgreSQL with optimized queries and indexing" },
        { name: "Media Storage", description: "Cloudinary for image/video processing and CDN" }
      ],
      notes: "Event-driven architecture with real-time notifications and content delivery"
    },
    frontendRendering: "SSR" as const,
    mobileSupport: true,
    features: [
      "User authentication and profiles",
      "Post creation with media upload",
      "Real-time messaging and notifications",
      "Story features with auto-expiry",
      "Content discovery and recommendations",
      "Follow/unfollow system",
      "Advanced search and hashtags"
    ],
    challenges: [
      "Implementing efficient real-time messaging at scale",
      "Optimizing image/video upload and processing",
      "Managing complex social graph relationships",
      "Ensuring data privacy and content moderation"
    ],
    results: "Supports 1000+ concurrent users with real-time messaging. Achieved 95% user engagement rate.",
    images: {
      main: "/projects/social-media-main.jpg",
      others: [
        { url: "/projects/social-media-messaging.jpg", type: "screenshot" as const, caption: "Real-time Messaging" },
        { url: "/projects/social-media-stories.jpg", type: "screenshot" as const, caption: "Stories Feature" }
      ]
    },
    liveDemo: "https://fullstack-social-media.vercel.app",
    sourceCode: "https://github.com/username/fullstack-social-media",
    category: "fullstack" as const,
    status: "in-progress" as const,
    startDate: "2024-01-01",
    tags: ["Full-Stack", "Real-time", "Social Media", "Next.js"],
    whyItMatters: "Demonstrates end-to-end development skills and ability to build complex social applications.",
    isFeatured: true,
    viewCount: 312
  },
  {
    id: "react-native-crypto-wallet",
    title: "React Native Crypto Wallet",
    description: "Secure cryptocurrency wallet with portfolio tracking and trading",
    overview: "A secure cryptocurrency wallet application built with React Native, featuring multi-currency support, portfolio tracking, price alerts, and integrated trading capabilities. Implements advanced security measures and biometric authentication.",
    role: "Mobile Security Developer - Developed the secure wallet infrastructure, implemented biometric authentication, integrated blockchain APIs, and ensured compliance with security standards.",
    techStack: {
      frontend: ["React Native", "TypeScript", "React Query", "Reanimated"],
      backend: ["Node.js", "Express.js", "Web3.js", "Ethers.js"],
      database: ["Encrypted SQLite", "Keychain Services"],
      infrastructure: ["AWS KMS", "Infura", "CoinGecko API"]
    },
    architecture: {
      layers: [
        { name: "Security Layer", description: "Biometric auth and encrypted key storage" },
        { name: "Wallet Core", description: "Multi-currency wallet with HD derivation" },
        { name: "Blockchain", description: "Web3 integration for multiple networks" },
        { name: "Market Data", description: "Real-time price feeds and portfolio tracking" }
      ],
      notes: "Security-first architecture with offline transaction signing and hardware wallet support"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: true,
    features: [
      "Multi-currency wallet support",
      "Biometric authentication",
      "Portfolio tracking and analytics",
      "Price alerts and notifications",
      "QR code scanning for transactions",
      "DeFi protocol integration",
      "Offline transaction signing"
    ],
    challenges: [
      "Implementing secure key management and storage",
      "Handling multiple blockchain networks efficiently",
      "Ensuring transaction security and validation",
      "Optimizing performance for real-time price updates"
    ],
    results: "Secured $100K+ in user assets with zero security incidents. Achieved 4.8-star rating on app stores.",
    images: {
      main: "/projects/crypto-wallet-main.jpg",
      others: [
        { url: "/projects/crypto-wallet-portfolio.jpg", type: "screenshot" as const, caption: "Portfolio View" },
        { url: "/projects/crypto-wallet-security.jpg", type: "screenshot" as const, caption: "Security Features" }
      ]
    },
    sourceCode: "https://github.com/username/rn-crypto-wallet",
    category: "mobile" as const,
    status: "completed" as const,
    startDate: "2023-11-01",
    endDate: "2024-03-15",
    tags: ["React Native", "Cryptocurrency", "Security", "Blockchain"],
    whyItMatters: "Showcases expertise in security-critical applications and blockchain technology integration.",
    isFeatured: false,
    viewCount: 276
  },
  {
    id: "spring-boot-elearning",
    title: "Spring Boot E-Learning Platform",
    description: "Comprehensive online learning platform with video streaming and assessments",
    overview: "A full-featured e-learning platform built with Spring Boot, featuring course management, video streaming, interactive assessments, progress tracking, and certification system. Designed for scalability and performance.",
    role: "Backend Lead - Architected the Spring Boot backend, implemented video streaming infrastructure, designed the assessment engine, and integrated payment processing for course purchases.",
    techStack: {
      frontend: ["React", "TypeScript", "Material-UI", "Video.js"],
      backend: ["Spring Boot", "Spring Security", "Spring Data JPA", "Maven"],
      database: ["PostgreSQL", "MongoDB", "Elasticsearch"],
      infrastructure: ["AWS EC2", "S3", "CloudFront", "Docker"]
    },
    architecture: {
      layers: [
        { name: "Web Layer", description: "Spring MVC with REST controllers" },
        { name: "Service Layer", description: "Business logic with transaction management" },
        { name: "Data Layer", description: "JPA repositories with custom queries" },
        { name: "Security", description: "JWT authentication with role-based access" }
      ],
      notes: "Layered architecture following Spring Boot best practices with comprehensive testing"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: true,
    features: [
      "Course creation and management",
      "Video streaming with adaptive quality",
      "Interactive quizzes and assessments",
      "Progress tracking and analytics",
      "Certificate generation",
      "Payment integration for courses",
      "Discussion forums and Q&A"
    ],
    challenges: [
      "Implementing efficient video streaming and encoding",
      "Managing large file uploads and storage",
      "Creating flexible assessment engine",
      "Optimizing database queries for course content"
    ],
    results: "Serves 5000+ students across 200+ courses with 99.8% uptime. Reduced course completion time by 40%.",
    images: {
      main: "/projects/spring-elearning-main.jpg",
      others: [
        { url: "/projects/spring-elearning-video.jpg", type: "screenshot" as const, caption: "Video Player" },
        { url: "/projects/spring-elearning-assessment.jpg", type: "screenshot" as const, caption: "Assessment System" }
      ]
    },
    liveDemo: "https://elearning-platform-demo.com",
    sourceCode: "https://github.com/username/spring-boot-elearning",
    category: "fullstack" as const,
    status: "completed" as const,
    startDate: "2023-04-01",
    endDate: "2023-10-30",
    tags: ["Spring Boot", "E-Learning", "Video Streaming", "Java"],
    whyItMatters: "Demonstrates enterprise Java development skills and complex system architecture design.",
    isFeatured: true,
    viewCount: 287
  },
  {
    id: "flutter-expense-tracker",
    title: "Flutter Expense Tracker",
    description: "Personal finance app with budget management and spending analytics",
    overview: "A comprehensive personal finance application built with Flutter, featuring expense tracking, budget management, financial goal setting, and detailed spending analytics. Includes bank account synchronization and bill reminders.",
    role: "Flutter Developer - Developed the complete mobile application, implemented local data encryption, integrated banking APIs, and created intuitive data visualization components.",
    techStack: {
      frontend: ["Flutter", "Dart", "Bloc", "FL Chart"],
      backend: ["Firebase", "Cloud Functions", "Plaid API"],
      database: ["Firestore", "Hive", "SQLCipher"],
      infrastructure: ["Firebase Hosting", "Google Play", "App Store"]
    },
    architecture: {
      layers: [
        { name: "UI Layer", description: "Flutter widgets with BLoC state management" },
        { name: "Business Logic", description: "BLoC pattern for state management" },
        { name: "Data Layer", description: "Repository pattern with local and remote data" },
        { name: "Security", description: "Encrypted local storage and secure API communication" }
      ],
      notes: "Clean architecture with offline-first approach and data synchronization"
    },
    frontendRendering: "CSR" as const,
    mobileSupport: true,
    features: [
      "Expense and income tracking",
      "Budget creation and monitoring",
      "Financial goal setting",
      "Spending analytics and reports",
      "Bank account synchronization",
      "Bill reminders and notifications",
      "Category-based expense organization"
    ],
    challenges: [
      "Implementing secure bank data synchronization",
      "Creating intuitive data visualization for mobile",
      "Managing offline data with sync capabilities",
      "Ensuring financial data privacy and security"
    ],
    results: "Helped users save 25% more on average and track 100% of their expenses. 4.6-star rating with 50K+ downloads.",
    images: {
      main: "/projects/flutter-expense-main.jpg",
      others: [
        { url: "/projects/flutter-expense-analytics.jpg", type: "screenshot" as const, caption: "Spending Analytics" },
        { url: "/projects/flutter-expense-budget.jpg", type: "screenshot" as const, caption: "Budget Management" }
      ]
    },
    liveDemo: "https://play.google.com/store/apps/details?id=com.expense.tracker",
    sourceCode: "https://github.com/username/flutter-expense-tracker",
    category: "mobile" as const,
    status: "completed" as const,
    startDate: "2024-04-01",
    endDate: "2024-07-15",
    tags: ["Flutter", "Finance", "Analytics", "Security"],
    whyItMatters: "Shows ability to build secure financial applications with complex data visualization and third-party integrations.",
    isFeatured: false,
    viewCount: 203
  }
];

export async function seedProjects() {
  try {
    console.log("🌱 Seeding projects...");
    
    for (const project of projects) {
      await db.insert(projectsTable).values(project)
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
            viewCount: project.viewCount
          }
        });
      console.log(`✅ Seeded/Updated project: ${project.title}`);
    }
    
    console.log("🎉 Projects seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding projects:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedProjects()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}