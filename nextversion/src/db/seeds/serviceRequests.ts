import { db } from "@/db";
import { serviceRequests, services } from "../schema";

export async function seedServiceRequests() {
  try {
    console.log("🌱 Seeding service requests...");

    // Get existing services to create requests for them
    const existingServices = await db.select().from(services).limit(5);

    if (existingServices.length === 0) {
      console.log("⚠️  No services found. Skipping service requests seeding.");
      return;
    }

    await db.delete(serviceRequests);
    console.log("🗑️  Cleared existing service requests");

    const serviceRequestsData = [
      {
        serviceId: existingServices[0].id,
        name: "David Wilson",
        email: "david.wilson@business.com",
        phone: "+1-555-1111",
        message:
          "I need a complete e-commerce solution for my retail business. Looking for modern design and payment integration.",
        status: "pending" as const,
      },
      {
        serviceId: existingServices[1]
          ? existingServices[1].id
          : existingServices[0].id,
        name: "Lisa Thompson",
        email: "lisa.t@startup.com",
        phone: "+1-555-2222",
        message:
          "We want to develop a mobile app for our food delivery service. Need both iOS and Android versions.",
        status: "in-progress" as const,
      },
      {
        serviceId: existingServices[0].id,
        name: "Robert Brown",
        email: "robert.brown@company.org",
        phone: "+1-555-3333",
        message:
          "Looking for a custom web application to manage our inventory and customer relationships.",
        status: "completed" as const,
      },
      {
        serviceId: existingServices[1]
          ? existingServices[1].id
          : existingServices[0].id,
        name: "Jennifer Lee",
        email: "jennifer.lee@tech.io",
        phone: "+1-555-4444",
        message:
          "Need a React Native app with real-time features and push notifications for our social platform.",
        status: "pending" as const,
      },
      {
        serviceId: existingServices[0].id,
        name: "Mark Anderson",
        email: "mark.anderson@enterprise.net",
        phone: "+1-555-5555",
        message:
          "Enterprise web application with complex workflows and reporting capabilities required.",
        status: "cancelled" as const,
      },
    ];

    const insertedRequests = await db
      .insert(serviceRequests)
      .values(serviceRequestsData)
      .returning();

    console.log(
      `✅ Successfully seeded ${insertedRequests.length} service requests`
    );
    console.log("🎉 Service requests seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding service requests:", error);
    throw error;
  }
}
