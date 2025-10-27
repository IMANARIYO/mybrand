CREATE TYPE "public"."service_request_status" AS ENUM('pending', 'in-progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."service_status" AS ENUM('featured', 'new', 'completed', 'in-progress', 'available');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"telephone" text,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"inquiry_type" text DEFAULT 'general' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"overview" text NOT NULL,
	"role" text NOT NULL,
	"tech_stack" json NOT NULL,
	"architecture" json NOT NULL,
	"frontend_rendering" text NOT NULL,
	"mobile_support" boolean DEFAULT false NOT NULL,
	"features" json NOT NULL,
	"challenges" json NOT NULL,
	"results" json NOT NULL,
	"images" json NOT NULL,
	"live_demo" text,
	"source_code" text,
	"category" text NOT NULL,
	"status" text NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text,
	"tags" json NOT NULL,
	"why_it_matters" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"slug" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"share_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "service_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"message" text,
	"status" "service_request_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"icon" text NOT NULL,
	"category" text NOT NULL,
	"pricing" text NOT NULL,
	"duration" text NOT NULL,
	"featured" text DEFAULT 'false' NOT NULL,
	"status" "service_status" DEFAULT 'available' NOT NULL,
	"skills" json NOT NULL,
	"benefits" json NOT NULL,
	"process" json NOT NULL,
	"actions" json NOT NULL,
	"slug" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"share_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"uuid" varchar(255) PRIMARY KEY NOT NULL,
	"google_id" varchar(100),
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" text,
	"profile_image" text DEFAULT '/default.png',
	"phone" varchar(20),
	"bio" text,
	"gender" varchar(10),
	"otp" varchar(10),
	"otp_expires_at" timestamp with time zone,
	"token" text,
	"verified" boolean DEFAULT false,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;