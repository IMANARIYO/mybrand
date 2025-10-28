"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { serviceRequests, services } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

interface ServiceRequestData {
  clientName: string
  clientEmail: string
  clientPhone?: string
  description: string
}

export async function createServiceRequest(data: ServiceRequestData) {
  try {
    // Get first service as default
    const firstService = await db.select().from(services).limit(1)
    const serviceId = firstService[0]?.id || crypto.randomUUID()
    
    const [request] = await db.insert(serviceRequests).values({
      serviceId,
      name: data.clientName,
      email: data.clientEmail,
      phone: data.clientPhone || "",
      message: data.description,
      status: "pending"
    }).returning()
    
    revalidatePath("/dashboard/service-requests")
    return { success: true, request }
  } catch {
    return { success: false, message: "Failed to create service request" }
  }
}

export async function getServiceRequests() {
  return await db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt))
}

export async function updateServiceRequestStatus(id: string, status: "pending" | "in-progress" | "completed" | "cancelled") {
  try {
    await db.update(serviceRequests).set({ status, updatedAt: new Date() }).where(eq(serviceRequests.id, id))
    revalidatePath("/dashboard/service-requests")
    return { success: true }
  } catch {
    return { success: false, message: "Service request not found" }
  }
}

export async function deleteServiceRequest(id: string) {
  try {
    await db.delete(serviceRequests).where(eq(serviceRequests.id, id))
    revalidatePath("/dashboard/service-requests")
    return { success: true }
  } catch {
    return { success: false, message: "Service request not found" }
  }
}

export async function getServiceRequestStats() {
  const allRequests = await db.select().from(serviceRequests)
  
  return {
    total: allRequests.length,
    pending: allRequests.filter(r => r.status === "pending").length,
    approved: 0, // Not in current schema
    inProgress: allRequests.filter(r => r.status === "in-progress").length,
    completed: allRequests.filter(r => r.status === "completed").length,
  }
}