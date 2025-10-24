import { 
  Atom, Triangle, FileCode2, Code2, Globe, Palette, Wind, Target,
  Circle, Rocket, Bird, Coffee, Leaf, Link, BarChart3, Building2,
  Database, Flame, Zap, Smartphone, Bot, Apple, Figma, Paintbrush2, Search, PenTool
} from "lucide-react"

export const skills = {
  frontend: [
    { name: "React", icon: Atom, proficiency: "Expert", years: "3+", projects: 15, description: "Advanced hooks, context, performance optimization" },
    { name: "Next.js", icon: Triangle, proficiency: "Advanced", years: "2+", projects: 12, description: "SSR, SSG, API routes, app router" },
    { name: "TypeScript", icon: FileCode2, proficiency: "Advanced", years: "2+", projects: 18, description: "Type safety, generics, advanced patterns" },
    { name: "JavaScript", icon: Code2, proficiency: "Expert", years: "4+", projects: 25, description: "ES6+, async/await, functional programming" },
    { name: "HTML5", icon: Globe, proficiency: "Expert", years: "5+", projects: 30, description: "Semantic markup, accessibility, SEO" },
    { name: "CSS3", icon: Palette, proficiency: "Expert", years: "4+", projects: 28, description: "Flexbox, Grid, animations, responsive design" },
    { name: "Tailwind CSS", icon: Wind, proficiency: "Advanced", years: "2+", projects: 15, description: "Utility-first, custom components, optimization" },
    { name: "Shadcn/UI", icon: Target, proficiency: "Intermediate", years: "1+", projects: 8, description: "Component library, theming, customization" }
  ],
  backend: [
    { name: "Node.js", icon: Circle, proficiency: "Advanced", years: "3+", projects: 20, description: "Express, middleware, performance tuning" },
    { name: "Express.js", icon: Rocket, proficiency: "Advanced", years: "3+", projects: 18, description: "RESTful APIs, middleware, authentication" },
    { name: "Nest.js", icon: Bird, proficiency: "Intermediate", years: "1+", projects: 5, description: "Decorators, dependency injection, modules" },
    { name: "Java", icon: Coffee, proficiency: "Advanced", years: "3+", projects: 12, description: "OOP, collections, multithreading" },
    { name: "Spring Boot", icon: Leaf, proficiency: "Intermediate", years: "2+", projects: 8, description: "REST APIs, JPA, security, microservices" },
    { name: "REST APIs", icon: Link, proficiency: "Expert", years: "4+", projects: 25, description: "Design patterns, documentation, versioning" },
    { name: "GraphQL", icon: BarChart3, proficiency: "Intermediate", years: "1+", projects: 6, description: "Schema design, resolvers, Apollo" },
    { name: "Microservices", icon: Building2, proficiency: "Intermediate", years: "2+", projects: 4, description: "Architecture, communication, deployment" }
  ],
  databases: [
    { name: "MongoDB", icon: Leaf, proficiency: "Advanced", years: "3+", projects: 15, description: "Aggregation, indexing, schema design" },
    { name: "PostgreSQL", icon: Database, proficiency: "Intermediate", years: "2+", projects: 10, description: "Complex queries, optimization, migrations" },
    { name: "MySQL", icon: Database, proficiency: "Intermediate", years: "2+", projects: 8, description: "Relational design, stored procedures" },
    { name: "Firebase", icon: Flame, proficiency: "Advanced", years: "2+", projects: 12, description: "Firestore, authentication, hosting" },
    { name: "Redis", icon: Zap, proficiency: "Beginner", years: "1+", projects: 3, description: "Caching, session storage, pub/sub" }
  ],
  mobile: [
    { name: "React Native", icon: Smartphone, proficiency: "Intermediate", years: "2+", projects: 6, description: "Cross-platform, native modules, performance" },
    { name: "Flutter", icon: Bird, proficiency: "Beginner", years: "1+", projects: 3, description: "Dart, widgets, state management" },
    { name: "Android", icon: Bot, proficiency: "Beginner", years: "1+", projects: 2, description: "Java/Kotlin, activities, fragments" },
    { name: "iOS", icon: Apple, proficiency: "Beginner", years: "1+", projects: 2, description: "Swift, UIKit, Xcode" }
  ],
  uiux: [
    { name: "Figma", icon: Figma, proficiency: "Advanced", years: "3+", projects: 20, description: "Prototyping, design systems, collaboration" },
    { name: "Adobe XD", icon: Paintbrush2, proficiency: "Intermediate", years: "2+", projects: 8, description: "Wireframing, prototyping, handoff" },
    { name: "User Research", icon: Search, proficiency: "Intermediate", years: "2+", projects: 10, description: "Interviews, surveys, usability testing" },
    { name: "Prototyping", icon: PenTool, proficiency: "Advanced", years: "3+", projects: 15, description: "Interactive prototypes, user flows" }
  ]
};

import { GraduationCap, Award, Briefcase, Lightbulb } from "lucide-react"

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Rwanda",
    duration: "2019 - 2023",
    icon: GraduationCap,
    description: "Comprehensive foundation in software engineering principles, algorithms, data structures, and system design. Specialized in full-stack development with emphasis on scalable architecture patterns, performance optimization, and modern development practices. Graduated with honors, demonstrating strong analytical and problem-solving capabilities."
  },
  {
    degree: "Advanced Web Development Certification",
    institution: "freeCodeCamp & Online Platforms",
    duration: "2022 - Present",
    icon: Award,
    description: "Continuous learning in cutting-edge technologies including React ecosystem, Node.js, microservices architecture, and cloud deployment. Completed multiple certifications in modern web development, mobile app development, and DevOps practices to stay current with industry standards."
  }
];

export const experience = [
  {
    position: "Senior Full Stack Developer",
    company: "Tech Solutions Ltd",
    duration: "2023 - Present",
    icon: Briefcase,
    description: "Lead development of scalable web applications serving 10,000+ users using React, Next.js, Node.js, and MongoDB. Architected microservices infrastructure that improved system performance by 40% and reduced deployment time by 60%. Mentor junior developers and drive adoption of modern development practices including TypeScript, automated testing, and CI/CD pipelines. Successfully delivered 15+ projects on time while maintaining 99.9% uptime and exceptional user experience."
  },
  {
    position: "Full Stack Developer",
    company: "Innovation Hub Rwanda",
    duration: "2022 - 2023",
    icon: Code2,
    description: "Developed and deployed 8+ responsive web applications using React, TypeScript, and Spring Boot. Collaborated with cross-functional teams of designers, product managers, and stakeholders to deliver user-centered solutions. Implemented RESTful APIs and optimized database queries, resulting in 50% faster load times. Led code reviews and established coding standards that improved team productivity and code quality."
  },
  {
    position: "Software Development Intern",
    company: "Digital Innovation Lab",
    duration: "2021 - 2022",
    icon: Lightbulb,
    description: "Built mobile applications using React Native and Flutter, gaining hands-on experience with cross-platform development. Contributed to open-source projects and participated in agile development processes. Developed strong problem-solving skills and learned to work effectively in collaborative team environments."
  }
];