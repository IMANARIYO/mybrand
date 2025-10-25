"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { contacts } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  telephone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum(["general", "project", "support", "consultation"]),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data)
    
    await db.insert(contacts).values({
      ...validatedData,
      status: "new",
    })
    
    revalidatePath("/dashboard/contacts")
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}

export async function getContacts() {
  return await db.select().from(contacts).orderBy(desc(contacts.createdAt))
}

export async function updateContactStatus(id: string, status: "new" | "read" | "replied" | "archived") {
  try {
    await db.update(contacts).set({ status }).where(eq(contacts.id, id))
    revalidatePath("/dashboard/contacts")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Contact not found" }
  }
}

export async function deleteContact(id: string) {
  try {
    await db.delete(contacts).where(eq(contacts.id, id))
    revalidatePath("/dashboard/contacts")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Contact not found" }
  }
}

export async function getContactStats() {
  const allContacts = await db.select().from(contacts)
  
  return {
    total: allContacts.length,
    new: allContacts.filter(c => c.status === "new").length,
    read: allContacts.filter(c => c.status === "read").length,
    replied: allContacts.filter(c => c.status === "replied").length,
    archived: allContacts.filter(c => c.status === "archived").length,
  }
}