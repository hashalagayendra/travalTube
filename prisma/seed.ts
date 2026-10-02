import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const db = prisma as any;

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Initial Admin Account
  const username = process.env.ADMIN_USERNAME || "admin";
  const rawPassword = process.env.ADMIN_PASSWORD || "traveltube_admin_2026";
  const email = "admin@traveltube.com";
  const name = "System Administrator";

  const existingAdmin = await prisma.admin.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingAdmin) {
    console.log(`✅ Admin account already exists: ${existingAdmin.username}`);
  } else {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const admin = await prisma.admin.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(`🎉 Initial Admin successfully created!`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email:    ${admin.email}`);
    console.log(`   Password: (Configured in .env as ADMIN_PASSWORD)`);
  }

  // 2. Initialize / Seed Homepage Hero (Row id = 1)
  await db.homepageHero.upsert({
    where: { id: 1 },
    update: {
      heroFirst: "Discover the",
      heroSecond: "Real",
      heroScript: "Sri Lanka",
      heroDesc:
        "Unforgettable journeys, authentic experiences and memories that last a lifetime.",
      bgImage: "/images/hero-bg.jpg",
    },
    create: {
      id: 1,
      heroFirst: "Discover the",
      heroSecond: "Real",
      heroScript: "Sri Lanka",
      heroDesc:
        "Unforgettable journeys, authentic experiences and memories that last a lifetime.",
      bgImage: "/images/hero-bg.jpg",
    },
  });
  console.log(`✅ Default Homepage Hero initialized.`);

  // 3. Remove all data in TourCategory table and re-seed id 1, 2, 3 with existing categories
  console.log(`🧹 Removing all existing data from TourCategory (tour_categories)...`);
  await db.tourCategory.deleteMany();

  // Reset AUTO_INCREMENT in MySQL to ensure clean ID ordering
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE tour_categories AUTO_INCREMENT = 1;`);
  } catch (err) {
    console.log(`   ℹ️ Note: Auto-increment reset skipped or handled by database.`);
  }

  const defaultCategories = [
    {
      id: 1,
      title: "One Day Tours",
      badge: "Day Trips",
      description:
        "Feel with the nature in Sri Lanka. Can you arrange a trip on a day? We give you amazing and adventure feeling. Cover the most attractive areas within one day.",
      actionText: "Explore Tours",
      image: "/images/day-tours.jpg",
    },
    {
      id: 2,
      title: "Round Tours",
      badge: "Multi-Day",
      description:
        "In every country there are hidden places and stories. Explore ancient cultures, legends and history. Sri Lanka is the best destination to fulfill your travel diary.",
      actionText: "Explore Journeys",
      image: "/images/sigiriya.jpg",
    },
    {
      id: 3,
      title: "Plan your Trip",
      badge: "Tailor-Made",
      description:
        "Planning a trip is the hardest part of traveling. We will help you to arrange your trip, schedule your valuable time and choose the best routes with a cost-effective plan.",
      actionText: "Start Planning",
      image: "/images/package-13.jpg",
    },
  ];

  console.log(`📦 Seeding TourCategory table with IDs 1, 2, 3...`);
  for (const cat of defaultCategories) {
    const created = await db.tourCategory.create({
      data: {
        id: cat.id,
        title: cat.title,
        badge: cat.badge,
        description: cat.description,
        actionText: cat.actionText,
        image: cat.image,
      },
    });
    console.log(`   ✅ Category [ID ${created.id}] "${created.title}" seeded successfully.`);
  }

  console.log(`\n🎉 Database seeding finished successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
