"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
  services as servicesTable,
  serviceRequests as serviceRequestsTable,
} from "@/db/schema";
import { eq, and, or, like, desc, count } from "drizzle-orm";
import type {
  ServiceFormData,
  ServiceRequest,
  ServiceRequestFormData,
  ServiceRequestStats,
  ServiceFilters,
  ServiceRequestFilters,
  ServiceRequestWithService,
} from "../_types/services-types";

export async function getServices(
  page = 1,
  limit = 10,
  filters?: ServiceFilters
) {
  try {
    const conditions = [];

    if (filters?.search) {
      conditions.push(
        or(
          like(servicesTable.title, `%${filters.search}%`),
          like(servicesTable.description, `%${filters.search}%`),
          like(servicesTable.category, `%${filters.search}%`)
        )
      );
    }

    if (filters?.category) {
      conditions.push(eq(servicesTable.category, filters.category));
    }

    if (filters?.featured) {
      conditions.push(eq(servicesTable.featured, filters.featured));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db
        .select()
        .from(servicesTable)
        .where(whereClause)
        .orderBy(desc(servicesTable.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      db.select({ total: count() }).from(servicesTable).where(whereClause),
    ]);

    const services = data;

    return {
      success: true,
      data: services,
      meta: {
        currentPage: page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      success: false,
      error: { message: "Failed to fetch services" },
    };
  }
}

export async function getServiceById(id: string) {
  try {
    const [service] = await db
      .select()
      .from(servicesTable)
      .where(eq(servicesTable.id, id))
      .limit(1);

    if (!service) {
      return {
        success: false,
        error: { message: "Service not found" },
      };
    }

    return {
      success: true,
      data: service,
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return {
      success: false,
      error: { message: "Failed to fetch service" },
    };
  }
}

export async function createService(data: ServiceFormData) {
  try {
    const [newService] = await db
      .insert(servicesTable)
      .values({
        title: data.title,
        tagline: data.tagline,
        description: data.description,
        imageUrl: data.imageUrl || null,
        icon: data.icon,
        category: data.category,
        pricing: data.pricing,
        duration: data.duration,
        featured: data.featured,
        status:
          (data.status as
            | "featured"
            | "new"
            | "completed"
            | "in-progress"
            | "available") || "available",
        skills: data.skills,
        benefits: data.benefits,
        process: data.process,
        actions: data.actions,
      })
      .returning();

    revalidatePath("/services");

    return {
      status: "success",
      message: "Service created successfully",
      data: newService,
    };
  } catch (error) {
    console.error("Error creating service:", error);
    return {
      status: "error",
      message: "Failed to create service",
    };
  }
}

export async function updateService(id: string, data: ServiceFormData) {
  try {
    const [updatedService] = await db
      .update(servicesTable)
      .set({
        title: data.title,
        tagline: data.tagline,
        description: data.description,
        imageUrl: data.imageUrl || null,
        icon: data.icon,
        category: data.category,
        pricing: data.pricing,
        duration: data.duration,
        featured: data.featured,
        status:
          (data.status as
            | "featured"
            | "new"
            | "completed"
            | "in-progress"
            | "available") || "available",
        skills: data.skills,
        benefits: data.benefits,
        process: data.process,
        actions: data.actions,
        updatedAt: new Date(),
      })
      .where(eq(servicesTable.id, id))
      .returning();

    if (!updatedService) {
      return {
        status: "error",
        message: "Service not found",
      };
    }

    revalidatePath("/services");

    return {
      status: "success",
      message: "Service updated successfully",
      data: updatedService,
    };
  } catch (error) {
    console.error("Error updating service:", error);
    return {
      status: "error",
      message: "Failed to update service",
    };
  }
}

export async function deleteService(id: string) {
  try {
    await db.delete(servicesTable).where(eq(servicesTable.id, id));
    revalidatePath("/services");
    return {
      status: "success",
      message: "Service deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting service:", error);
    return {
      status: "error",
      message: "Failed to delete service",
    };
  }
}

export async function duplicateService(id: string) {
  try {
    const result = await getServiceById(id);
    if (!result.success || !result.data) {
      return {
        status: "error",
        message: "Service not found",
      };
    }

    const service = result.data;

    const [duplicated] = await db
      .insert(servicesTable)
      .values({
        title: `${service.title} (Copy)`,
        tagline: service.tagline,
        description: service.description,
        imageUrl: service.imageUrl,
        icon: service.icon,
        category: service.category,
        pricing: service.pricing,
        duration: service.duration,
        featured: "false",
        status: service.status || "available",
        skills: service.skills || [],
        benefits: service.benefits,
        process: service.process,
        actions: service.actions,
      })
      .returning();

    revalidatePath("/services");

    return {
      status: "success",
      message: "Service duplicated successfully",
      data: duplicated,
    };
  } catch (error) {
    console.error("Error duplicating service:", error);
    return {
      status: "error",
      message: "Failed to duplicate service",
    };
  }
}

export async function getServiceRequests(
  page = 1,
  limit = 10,
  filters?: ServiceRequestFilters
) {
  try {
    const conditions = [];

    if (filters?.search) {
      conditions.push(
        or(
          like(serviceRequestsTable.name, `%${filters.search}%`),
          like(serviceRequestsTable.email, `%${filters.search}%`),
          like(serviceRequestsTable.phone, `%${filters.search}%`)
        )
      );
    }

    if (filters?.status) {
      conditions.push(eq(serviceRequestsTable.status, filters.status));
    }

    if (filters?.serviceId) {
      conditions.push(eq(serviceRequestsTable.serviceId, filters.serviceId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db
        .select({
          id: serviceRequestsTable.id,
          serviceId: serviceRequestsTable.serviceId,
          name: serviceRequestsTable.name,
          email: serviceRequestsTable.email,
          phone: serviceRequestsTable.phone,
          message: serviceRequestsTable.message,
          status: serviceRequestsTable.status,
          createdAt: serviceRequestsTable.createdAt,
          updatedAt: serviceRequestsTable.updatedAt,
          serviceName: servicesTable.title,
        })
        .from(serviceRequestsTable)
        .leftJoin(
          servicesTable,
          eq(serviceRequestsTable.serviceId, servicesTable.id)
        )
        .where(whereClause)
        .orderBy(desc(serviceRequestsTable.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      db
        .select({ total: count() })
        .from(serviceRequestsTable)
        .where(whereClause),
    ]);

    return {
      success: true,
      data: data as ServiceRequestWithService[],
      meta: {
        currentPage: page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching service requests:", error);
    return {
      success: false,
      error: { message: "Failed to fetch service requests" },
    };
  }
}

export async function createServiceRequest(data: ServiceRequestFormData) {
  try {
    const [newRequest] = await db
      .insert(serviceRequestsTable)
      .values({
        serviceId: data.serviceId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || null,
        status: "pending",
      })
      .returning();

    revalidatePath("/services/dashboard");
    return {
      status: "success",
      message: "Service request created successfully",
      data: newRequest,
    };
  } catch (error) {
    console.error("Error creating service request:", error);
    return {
      status: "error",
      message: "Failed to create service request",
    };
  }
}

export async function updateServiceRequestStatus(
  id: string,
  status: ServiceRequest["status"]
) {
  try {
    const [updatedRequest] = await db
      .update(serviceRequestsTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(serviceRequestsTable.id, id))
      .returning();

    if (!updatedRequest) {
      return {
        success: false,
        error: { message: "Service request not found" },
      };
    }

    revalidatePath("/services/dashboard");
    return {
      success: true,
      data: updatedRequest,
    };
  } catch (error) {
    console.error("Error updating service request:", error);
    return {
      success: false,
      error: { message: "Failed to update service request" },
    };
  }
}

export async function deleteServiceRequest(id: string) {
  try {
    await db
      .delete(serviceRequestsTable)
      .where(eq(serviceRequestsTable.id, id));
    revalidatePath("/services/dashboard");
    return {
      success: true,
      message: "Service request deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting service request:", error);
    return {
      success: false,
      error: { message: "Failed to delete service request" },
    };
  }
}

export async function getServiceRequestStats() {
  try {
    const [allRequests, requestsByService] = await Promise.all([
      db.select().from(serviceRequestsTable),
      db
        .select({
          serviceId: serviceRequestsTable.serviceId,
          serviceName: servicesTable.title,
          count: count(),
        })
        .from(serviceRequestsTable)
        .leftJoin(
          servicesTable,
          eq(serviceRequestsTable.serviceId, servicesTable.id)
        )
        .groupBy(serviceRequestsTable.serviceId, servicesTable.title),
    ]);

    const stats: ServiceRequestStats = {
      totalRequests: allRequests.length,
      pendingRequests: allRequests.filter((r) => r.status === "pending").length,
      inProgressRequests: allRequests.filter((r) => r.status === "in-progress")
        .length,
      completedRequests: allRequests.filter((r) => r.status === "completed")
        .length,
      requestsByService: requestsByService.map((r) => ({
        serviceId: r.serviceId,
        serviceName: r.serviceName || "Unknown",
        count: Number(r.count),
      })),
    };

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      success: false,
      error: { message: "Failed to fetch stats" },
    };
  }
}

export async function getAllServices() {
  const response = await getServices(1, 100);

  return response.data;
}
