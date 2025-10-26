"use server";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";

import { ProjectFormData } from "../_types/project.types";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { generateSlug, generateShareUrl } from "@/lib/slug-generator";

export async function createProject(data: ProjectFormData & { isPublic?: boolean }) {
  try {
    const projectId = nanoid();
    const slug = generateSlug(data.title);
    const shareUrl = generateShareUrl(slug);

    // Transform form data to match database schema
    const dbData = {
      id: projectId,
      title: data.title,
      description: data.description,
      overview: data.overview,
      role: data.role,
      techStack: data.techStack,
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
      viewCount: 0,
      slug,
      isPublic: data.isPublic || false,
      shareUrl
    };

    await db.insert(projectsTable).values(dbData);

    revalidatePath("/projects");
    return { success: true, id: projectId };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}
