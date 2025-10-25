import { seedProjects } from "../src/db/seed";

async function main() {
  try {
    await seedProjects();
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

main();