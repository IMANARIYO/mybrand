import { pgTable, text, boolean, integer, timestamp, json } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  overview: text('overview').notNull(),
  role: text('role').notNull(),
  techStack: json('tech_stack').$type<{
    frontend: string[]
    backend: string[]
    database: string[]
    infrastructure: string[]
  }>().notNull(),
  architecture: text('architecture', { enum: ['monolithic', 'microservices'] }).notNull(),
  frontendRendering: text('frontend_rendering', { enum: ['CSR', 'SSR', 'SSG', 'ISR'] }).notNull(),
  mobileSupport: boolean('mobile_support').notNull().default(false),
  features: json('features').$type<string[]>().notNull(),
  challenges: json('challenges').$type<string[]>().notNull(),
  results: text('results').notNull(),
  images: json('images').$type<string[]>().notNull(),
  liveDemo: text('live_demo'),
  sourceCode: text('source_code'),
  category: text('category', { enum: ['web', 'mobile', 'fullstack', 'api'] }).notNull(),
  status: text('status', { enum: ['completed', 'in-progress', 'planned'] }).notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  tags: json('tags').$type<string[]>().notNull(),
  whyItMatters: text('why_it_matters'),
  isFeatured: boolean('is_featured').notNull().default(false),
  viewCount: integer('view_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})