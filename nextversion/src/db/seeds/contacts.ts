import { db } from "@/db";
import { contacts } from "../schema";

const contactsData = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    telephone: "+1-555-0123",
    subject: "Web Development Project",
    message:
      "Hi, I'm interested in developing a modern e-commerce website for my business. Could we schedule a call to discuss the requirements?",
    inquiryType: "project" as const,
    status: "new" as const,
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    telephone: "+1-555-0456",
    subject: "Mobile App Development",
    message:
      "We need a cross-platform mobile app for our startup. Looking for React Native expertise. What's your availability?",
    inquiryType: "project" as const,
    status: "read" as const,
  },
  {
    name: "Mike Chen",
    email: "mike.chen@startup.io",
    telephone: "+1-555-0789",
    subject: "Technical Consultation",
    message:
      "Need advice on scaling our backend infrastructure. Can you help with architecture review and recommendations?",
    inquiryType: "consultation" as const,
    status: "replied" as const,
  },
  {
    name: "Emily Davis",
    email: "emily.davis@company.com",
    telephone: "+1-555-0321",
    subject: "General Inquiry",
    message:
      "Hello! I came across your portfolio and I'm impressed with your work. Do you offer maintenance services for existing applications?",
    inquiryType: "general" as const,
    status: "new" as const,
  },
  {
    name: "Alex Rodriguez",
    email: "alex.r@enterprise.com",
    telephone: "+1-555-0654",
    subject: "Enterprise Solution",
    message:
      "We're looking for a senior developer to lead our digital transformation project. Are you available for long-term contracts?",
    inquiryType: "project" as const,
    status: "archived" as const,
  },
  {
    name: "Lisa Wang",
    email: "lisa.wang@agency.com",
    telephone: "+1-555-0987",
    subject: "Service Inquiry",
    message:
      "I'm interested in your web development services. Could you provide more details about your process and pricing?",
    inquiryType: "service" as const,
    status: "new" as const,
  },
  {
    name: "David Thompson",
    email: "david.t@freelancer.com",
    telephone: "+1-555-0147",
    subject: "Collaboration Opportunity",
    message:
      "Hi! I'm a designer looking for a developer to collaborate on client projects. Would you be interested in partnering?",
    inquiryType: "collaboration" as const,
    status: "read" as const,
  },
];

export async function seedContacts() {
  try {
    console.log("🌱 Seeding contacts...");

    await db.delete(contacts);
    console.log("🗑️  Cleared existing contacts");

    const insertedContacts = await db
      .insert(contacts)
      .values(contactsData)
      .returning();

    console.log(`✅ Successfully seeded ${insertedContacts.length} contacts`);
    console.log("🎉 Contacts seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding contacts:", error);
    throw error;
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedContacts().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
