"use server";

import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getServiceBySlug(slug: string) {
  try {
    const service = await db
      .select()
      .from(services)
      .where(eq(services.slug, slug))
      .limit(1);

    const foundService = service[0];
    
    if (!foundService) {
      return null;
    }

    // Check if service is public
    if (!foundService.isPublic) {
      return { error: "This service is private" };
    }

    return foundService;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}