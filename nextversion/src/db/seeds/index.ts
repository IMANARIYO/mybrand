import { seedProjects } from "./projects";
import { seedServices } from "./services";
import { seedContacts } from "./contacts";
import { seedServiceRequests } from "./serviceRequests";

export async function seedAll() {
  try {
    console.log("🚀 Starting complete database seeding...");
    console.log("=" .repeat(50));
    
    // Seed in order (services first, then service requests that depend on services)
    await seedServices();
    console.log("");
    
    await seedProjects();
    console.log("");
    
    await seedContacts();
    console.log("");
    
    await seedServiceRequests();
    console.log("");
    
    console.log("=" .repeat(50));
    console.log("🎉 All seeding completed successfully!");
    
  } catch (error) {
    console.error("💥 Seeding failed:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedAll()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}