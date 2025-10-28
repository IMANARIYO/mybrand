"use server";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";

import { ProjectFormData } from "../_types/project.types";
import { TechStack, FrontendTechnology, BackendTechnology, DatabaseTechnology, InfrastructureTechnology } from "@/db/types/projectTypes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateSlug, generateShareUrl } from "@/lib/slug-generator";

export async function updateProject(id: string, data: ProjectFormData & { isPublic?: boolean }) {
  try {
    const slug = generateSlug(data.title);
    const shareUrl = generateShareUrl(slug);
    
    // Transform form data to match database schema
    const dbData = {
      title: data.title,
      description: data.description,
      overview: data.overview,
      role: data.role,
      techStack: {
        frontend: data.techStack.frontend as FrontendTechnology[],
        backend: data.techStack.backend as BackendTechnology[],
        database: data.techStack.database as DatabaseTechnology[],
        infrastructure: data.techStack.infrastructure as InfrastructureTechnology[]
      } as TechStack,
      architecture: {
        layers: [
          {
            name: data.architecture,
            description: `${data.architecture} architecture pattern`
          }
        ],
        notes: `Project uses ${data.architecture} architecture`
      },
      frontendRendering: data.frontendRendering,
      mobileSupport: data.mobileSupport,
      features: data.features,
      challenges: data.challenges,
      results: data.results,
      images: {
        main: data.images[0] || '/placeholder-project.jpg',
        others: data.images.slice(1).map(url => ({ url, type: 'screenshot' as const }))
      },
      liveDemo: data.liveDemo,
      sourceCode: data.sourceCode,
      category: data.category,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      tags: data.tags,
      whyItMatters: data.whyItMatters,
      isFeatured: data.isFeatured,
      slug,
      isPublic: data.isPublic || false,
      shareUrl
    };

    await db
      .update(projectsTable)
      .set(dbData)
      .where(eq(projectsTable.id, id));

    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}
