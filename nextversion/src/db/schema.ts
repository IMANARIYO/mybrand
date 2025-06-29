import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  pgEnum
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const users = pgTable("users", {
  id:  varchar("uuid", { length: 255 })
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
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
