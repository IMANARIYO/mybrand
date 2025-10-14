import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  json,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const users = pgTable("users", {
  id: varchar("uuid", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  googleId: varchar("google_id", { length: 100 }).unique(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: text("password"),
  image: text("profile_image").default("/default.png"),
  phone: varchar("phone", { length: 20 }),
  bio: text("bio"),
  gender: varchar("gender", { length: 10 }),
  otp: varchar("otp", { length: 10 }),
  otpExpiresAt: timestamp("otp_expires_at", { withTimezone: true }),
  token: text("token"),
  verified: boolean("verified").default(false),
  role: userRoleEnum("role").notNull().default("USER"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const projectsTable = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  overview: text("overview").notNull(),
  role: text("role").notNull(),
  techStack: json("tech_stack")
    .$type<{
      frontend: string[];
      backend: string[];
      database: string[];
      infrastructure: string[];
    }>()
    .notNull(),
  architecture: text("architecture", {
    enum: ["monolithic", "microservices"],
  }).notNull(),
  frontendRendering: text("frontend_rendering", {
    enum: ["CSR", "SSR", "SSG", "ISR"],
  }).notNull(),
  mobileSupport: boolean("mobile_support").notNull().default(false),
  features: json("features").$type<string[]>().notNull(),
  challenges: json("challenges").$type<string[]>().notNull(),
  results: text("results").notNull(),
  images: json("images").$type<string[]>().notNull(),
  liveDemo: text("live_demo"),
  sourceCode: text("source_code"),
  category: text("category", {
    enum: ["web", "mobile", "fullstack", "api"],
  }).notNull(),
  status: text("status", {
    enum: ["completed", "in-progress", "planned"],
  }).notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  tags: json("tags").$type<string[]>().notNull(),
  whyItMatters: text("why_it_matters"),
  isFeatured: boolean("is_featured").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
