"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

interface ServiceData {
  name: string
  description: string
  category: string
  price: number
  duration: string
  isActive: boolean
  features?: string[]
}

interface UpdateServiceData {
  name: string
  description: string
  price?: number
  duration: string
  isActive: boolean
}

export async function createService(data: ServiceData) {
  try {
    const [service] = await db
      .insert(services)
      .values({
        title: data.name,
        tagline: data.name,
        description: data.description,
        category: data.category,
        pricing: data.price.toString(),
        duration: data.duration,
        icon: "service",
        status: data.isActive ? "available" : "completed",
        skills: data.features || [],
        benefits: [],
        process: [],
        actions: [],
        slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        shareUrl: `/services/${data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`,
      })
      .returning();

    revalidatePath("/dashboard/services");
    return { success: true, service };
  } catch {
    return { success: false, message: "Failed to create service" };
  }
}

export async function getServices() {
  return await db.select().from(services).orderBy(desc(services.updatedAt));
}

export async function updateService(id: string, data: UpdateServiceData) {
  try {
    await db
      .update(services)
      .set({
        title: data.name,
        description: data.description,
        pricing: data.price?.toString(),
        duration: data.duration,
        status: data.isActive ? "available" : "completed",
        updatedAt: new Date(),
      })
      .where(eq(services.id, id));
    revalidatePath("/dashboard/services");
    return { success: true };
  } catch {
    return { success: false, message: "Service not found" };
  }
}

export async function deleteService(id: string) {
  try {
    await db.delete(services).where(eq(services.id, id));
    revalidatePath("/dashboard/services");
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, message: "Service not found" };
  }
}

export async function getServiceStats() {
  const allServices = await db.select().from(services);

  return {
    total: allServices.length,
    active: allServices.filter((s) => s.status === "available").length,
    inactive: allServices.filter((s) => s.status !== "available").length,
  };
}
