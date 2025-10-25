import { users } from "@/db/schema"
import { db } from "@/db"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

export async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await db.query.users.findFirst({
      where: eq(users.email, "admin@example.com"),
    })

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10)
      
      const [adminUser] = await db.insert(users).values({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
        verified: true,
      }).returning()

      console.log("Admin user created successfully:", adminUser.email)
    }

    // Check if regular user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, "user@example.com"),
    })

    if (!existingUser) {
      // Create regular user
      const hashedUserPassword = await bcrypt.hash("user123", 10)
      
      await db.insert(users).values({
        name: "Regular User",
        email: "user@example.com",
        password: hashedUserPassword,
        role: "USER",
        verified: true,
      })

      console.log("Regular user created successfully: user@example.com")
    }

    return { success: true, message: "Test users created" }
  } catch (error) {
    console.error("Error creating users:", error)
    throw error
  }
}