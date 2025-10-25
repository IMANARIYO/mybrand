"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getUsers() {
  return await db.select().from(users).orderBy(desc(users.createdAt))
}

export async function updateUserRole(id: string, role: "USER" | "ADMIN") {
  try {
    await db.update(users).set({ role }).where(eq(users.id, id))
    revalidatePath("/dashboard/users")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Failed to update user role" }
  }
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id))
    revalidatePath("/dashboard/users")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Failed to delete user" }
  }
}

export async function getUserStats() {
  const allUsers = await db.select().from(users)
  
  return {
    total: allUsers.length,
    admins: allUsers.filter(u => u.role === "ADMIN").length,
    users: allUsers.filter(u => u.role === "USER").length,
    verified: allUsers.filter(u => u.verified).length,
  }
}