// Reusable JSON column types for database schema

// Tech Stack Enums
export const FRONTEND_TECHNOLOGIES = [
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Nuxt.js",
  "Svelte",
  "SvelteKit",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "Chakra UI",
  "Ant Design",
  "Styled Components",
  "SASS/SCSS",
  "jQuery",
  "Alpine.js",
  "Astro",
  "Gatsby",
  "Remix",
] as const;

export const BACKEND_TECHNOLOGIES = [
  "Node.js",
  "Express.js",
  "Nest.js",
  "Fastify",
  "Koa.js",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Tornado",
  "Java",
  "Spring Boot",
  "Spring Framework",
  "Quarkus",
  "C#",
  ".NET Core",
  ".NET Framework",
  "ASP.NET",
  "PHP",
  "Laravel",
  "Symfony",
  "CodeIgniter",
  "Ruby",
  "Ruby on Rails",
  "Sinatra",
  "Go",
  "Gin",
  "Echo",
  "Fiber",
  "Rust",
  "Actix",
  "Rocket",
  "Warp",
  "Kotlin",
  "Ktor",
  "Scala",
  "Play Framework",
  "Akka HTTP",
] as const;

export const DATABASE_TECHNOLOGIES = [
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "MariaDB",
  "Oracle",
  "MongoDB",
  "CouchDB",
  "Amazon DocumentDB",
  "Redis",
  "Memcached",
  "Amazon ElastiCache",
  "Cassandra",
  "DynamoDB",
  "ScyllaDB",
  "Neo4j",
  "ArangoDB",
  "Amazon Neptune",
  "InfluxDB",
  "TimescaleDB",
  "Prometheus",
  "Elasticsearch",
  "Apache Solr",
  "Amazon OpenSearch",
  "Firebase Firestore",
  "Supabase",
  "PlanetScale",
  "Prisma",
  "TypeORM",
  "Sequelize",
  "Mongoose",
  "Drizzle ORM",
] as const;

export const INFRASTRUCTURE_TECHNOLOGIES = [
  "AWS",
  "Google Cloud",
  "Microsoft Azure",
  "DigitalOcean",
  "Linode",
  "Docker",
  "Kubernetes",
  "Docker Compose",
  "Podman",
  "Terraform",
  "Ansible",
  "Puppet",
  "Chef",
  "Jenkins",
  "GitHub Actions",
  "GitLab CI",
  "CircleCI",
  "Travis CI",
  "Nginx",
  "Apache",
  "Caddy",
  "HAProxy",
  "CloudFlare",
  "Amazon CloudFront",
  "Fastly",
  "Vercel",
  "Netlify",
  "Railway",
  "Render",
  "Heroku",
  "Amazon EC2",
  "Amazon ECS",
  "Amazon EKS",
  "Amazon Lambda",
  "Google Compute Engine",
  "Google Cloud Run",
  "Google Cloud Functions",
  "Azure Virtual Machines",
  "Azure Container Instances",
  "Azure Functions",
  "Monitoring: DataDog",
  "New Relic",
  "Grafana",
  "Prometheus",
] as const;

export type FrontendTechnology = typeof FRONTEND_TECHNOLOGIES[number];
export type BackendTechnology = typeof BACKEND_TECHNOLOGIES[number];
export type DatabaseTechnology = typeof DATABASE_TECHNOLOGIES[number];
export type InfrastructureTechnology =
  typeof INFRASTRUCTURE_TECHNOLOGIES[number];

// Tech Stack Interface
export interface TechStack {
  frontend: FrontendTechnology[];
  backend: BackendTechnology[];
  database: DatabaseTechnology[];
  infrastructure: InfrastructureTechnology[];
}

// Architecture Interface
export interface Architecture {
  layers: {
    name: string; // e.g., "frontend", "backend", "database"
    description?: string;
    diagrams?: string[]; // optional multiple images/screenshots per layer
  }[];
  notes?: string; // overall architecture notes
}

// Images Interface
export interface Images {
  main: string; // main image
  others?: {
    url: string;
    type?: "screenshot" | "diagram" | "other";
    caption?: string;
  }[];
}

// Service Benefit Interface
export interface ServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

// Service Process Interface
export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

// Service Action Interface
export interface ServiceAction {
  label: string;
  actionType: "link" | "modal" | "scroll" | "form";
  target?: string;
}

// Generic string array type for features, challenges, tags, skills, etc.
export type StringArray = string[];
