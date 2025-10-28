import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  json,
  varchar,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import {
  TechStack,
  Architecture,
  Images,
  StringArray,
} from "./types/projectTypes";
import {
  ServiceBenefit,
  ServiceProcess,
  ServiceAction,
  SERVICE_STATUS_VALUES,
  SERVICE_REQUEST_STATUS_VALUES,
} from "./types/serviceTypes";

export const userRoleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const educationTypeEnum = pgEnum("education_type", [
  "BACHELOR",
  "MASTER",
  "DOCTORATE",
  "BOOTCAMP",
  "CERTIFICATE",
  "DIPLOMA",
  "COURSE",
]);
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

  techStack: json("tech_stack").$type<TechStack>().notNull(),
  architecture: json("architecture").$type<Architecture>().notNull(),

  frontendRendering: text("frontend_rendering", {
    enum: ["CSR", "SSR", "SSG", "ISR"],
  }).notNull(),

  mobileSupport: boolean("mobile_support").notNull().default(false),

  features: json("features").$type<StringArray>().notNull(),
  challenges: json("challenges").$type<StringArray>().notNull(),
  results: json("results").$type<StringArray>().notNull(),
  images: json("images").$type<Images>().notNull(),

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

  tags: json("tags").$type<StringArray>().notNull(),
  whyItMatters: text("why_it_matters"),

  isFeatured: boolean("is_featured").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),

  // Sharing fields
  slug: text("slug").notNull().unique(),
  isPublic: boolean("is_public").notNull().default(false),
  shareUrl: text("share_url").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Service Request Status Enum
export const serviceRequestStatusEnum = pgEnum(
  "service_request_status",
  SERVICE_REQUEST_STATUS_VALUES
);

// Service Status Enum
export const serviceStatusEnum = pgEnum(
  "service_status",
  SERVICE_STATUS_VALUES
);

// Services Table
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  pricing: text("pricing").notNull(),
  duration: text("duration").notNull(),
  featured: text("featured").notNull().default("false"),
  status: serviceStatusEnum("status").notNull().default("available"),
  skills: json("skills").$type<StringArray>().notNull(),
  benefits: json("benefits").$type<ServiceBenefit[]>().notNull(),
  process: json("process").$type<ServiceProcess[]>().notNull(),
  actions: json("actions").$type<ServiceAction[]>().notNull(),

  // Sharing fields
  slug: text("slug").notNull().unique(),
  isPublic: boolean("is_public").notNull().default(false),
  shareUrl: text("share_url").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Service Requests Table
export const serviceRequests = pgTable("service_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  status: serviceRequestStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contacts Table
export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  telephone: text("telephone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  inquiryType: text("inquiry_type", {
    enum: [
      "general",
      "project",
      "support",
      "consultation",
      "service",
      "collaboration",
    ],
  })
    .notNull()
    .default("general"),
  status: text("status", {
    enum: ["new", "read", "replied", "archived"],
  })
    .notNull()
    .default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Education Table
export const education = pgTable("education", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  institution: text("institution").notNull(),
  institutionImage: text("institution_image"),
  educationType: educationTypeEnum("education_type").notNull(),
  fieldOfStudy: text("field_of_study"),
  specialization: text("specialization"),
  location: text("location").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isOngoing: boolean("is_ongoing").notNull().default(false),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type NewServiceRequest = typeof serviceRequests.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;
export type User = typeof users.$inferSelect;
export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;


