"use server";

import { users } from "@/db/schema";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required" };
  }

  try {
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { success: false, message: "User already exists with this email" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "USER",
      verified: true, // Auto-verify for demo purposes
    });

    // Return success and let client handle redirect
    return { success: true, message: "Account created successfully!" };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "An error occurred during signup" };
  }
}
