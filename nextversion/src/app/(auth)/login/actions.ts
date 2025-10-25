"use server";

import { users } from "@/db/schema";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  try {
    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    if (!user.password) {
      return {
        success: false,
        message: "Invalid account setup. Please contact support.",
      };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password" };
    }

    if (!user.verified) {
      return {
        success: false,
        message: "Please verify your email before logging in",
      };
    }

    // Set session cookie (simple implementation)
    const cookieStore = await cookies();
    cookieStore.set(
      "user-session",
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }
    );

    return { success: true, role: user.role };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }
}

export async function redirectAfterLogin(role: string) {
  if (role === "ADMIN") {
    redirect("/dashboard");
  } else {
    redirect("/");
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("user-session");

    if (!sessionCookie) {
      return null;
    }

    const session = JSON.parse(sessionCookie.value);
    return session;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("user-session");
  redirect("/login");
}
