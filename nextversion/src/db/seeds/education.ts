import { db } from "@/db";
import { education } from "../schema";

const educationData = [
  {
    title: "Bachelor of Science in Computer and Software Engineering",
    institution: "University of Rwanda – College of Science and Technology",
    institutionImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    educationType: "BACHELOR" as const,
    fieldOfStudy: "Computer Engineering",
    specialization: "Software Engineering & Web Development",
    location: "Kigali, Rwanda",
    startDate: "2019-09",
    endDate: "2023-07",
    isOngoing: false,
    description:
      "Comprehensive 4-year program covering computer science fundamentals, software engineering principles, and practical application development. Specialized in full-stack web development with focus on modern frameworks and scalable architectures.",
    slug: "bachelor-computer-software-engineering-ur",
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    institution: "freeCodeCamp & The Odin Project",
    institutionImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    educationType: "BOOTCAMP" as const,
    fieldOfStudy: "Web Development",
    specialization: "MERN Stack & Modern JavaScript",
    location: "Online",
    startDate: "2022-01",
    endDate: "2022-12",
    isOngoing: false,
    description:
      "Intensive hands-on bootcamp focusing on modern web development technologies. Built 15+ projects using React, Node.js, Express, and MongoDB. Gained expertise in responsive design, API development, and deployment strategies.",
    slug: "fullstack-web-development-bootcamp",
  },
  {
    title: "AWS Cloud Practitioner Certification",
    institution: "Amazon Web Services",
    institutionImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    educationType: "CERTIFICATE" as const,
    fieldOfStudy: "Cloud Computing",
    specialization: "AWS Services & Architecture",
    location: "Online",
    startDate: "2023-08",
    endDate: "2023-10",
    isOngoing: false,
    description:
      "Comprehensive certification covering AWS core services, pricing models, security best practices, and cloud architecture principles. Hands-on experience with EC2, S3, RDS, Lambda, and deployment strategies.",
    slug: "aws-cloud-practitioner-certification",
  },
  {
    title: "Advanced React & Next.js Development",
    institution: "Vercel & React Training",
    institutionImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    educationType: "COURSE" as const,
    fieldOfStudy: "Frontend Development",
    specialization: "React Ecosystem & Performance",
    location: "Online",
    startDate: "2023-11",
    endDate: null,
    isOngoing: true,
    description:
      "Advanced course covering React 18 features, Next.js 14 app router, server components, and performance optimization. Focus on building production-ready applications with modern development practices.",
    slug: "advanced-react-nextjs-development",
  },
];

export async function seedEducation() {
  console.log("🎓 Seeding education data...");

  try {
    await db.delete(education);
    await db.insert(education).values(educationData);
    console.log(
      `✅ Successfully seeded ${educationData.length} education records`
    );
  } catch (error) {
    console.error("❌ Error seeding education:", error);
    throw error;
  }
}
