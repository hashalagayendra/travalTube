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

  // 4. Initialize / Seed About Us Intro Section (Row id = 1)
  console.log(`🌿 Initializing About Us Welcome Section (about_section row id = 1)...`);
  const defaultAbout = {
    id: 1,
    eyebrow: "WELCOME TO",
    titleMain: "Travel Tube Lanka",
    titleAccent: "(Pvt) Ltd",
    paragraph1:
      "Welcome to TRAVEL TUBE LANKA (PVT) LTD, your trusted partner for all travel and tourism services. We are committed to making your travel experience smooth, comfortable, and memorable.",
    paragraph2:
      "Our company provides a wide range of travel solutions for both local and international travelers. With a professional and friendly team, we help our clients plan their journeys with confidence and convenience.",
    topImage: "/images/about-collage-leopard-hd.jpg",
    bottomLeftImage: "/images/about-collage-turtle-hd.jpg",
    bottomRightImage: "/images/about-collage-stupa-hd.jpg",
  };

  try {
    if (db.aboutSection) {
      await db.aboutSection.upsert({
        where: { id: 1 },
        update: defaultAbout,
        create: defaultAbout,
      });
    } else {
      await prisma.$executeRawUnsafe(
        `INSERT INTO about_section (id, eyebrow, titleMain, titleAccent, paragraph1, paragraph2, topImage, bottomLeftImage, bottomRightImage, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))
         ON DUPLICATE KEY UPDATE 
           eyebrow = VALUES(eyebrow),
           titleMain = VALUES(titleMain),
           titleAccent = VALUES(titleAccent),
           paragraph1 = VALUES(paragraph1),
           paragraph2 = VALUES(paragraph2),
           topImage = VALUES(topImage),
           bottomLeftImage = VALUES(bottomLeftImage),
           bottomRightImage = VALUES(bottomRightImage),
           updatedAt = NOW(3);`,
        defaultAbout.id,
        defaultAbout.eyebrow,
        defaultAbout.titleMain,
        defaultAbout.titleAccent,
        defaultAbout.paragraph1,
        defaultAbout.paragraph2,
        defaultAbout.topImage,
        defaultAbout.bottomLeftImage,
        defaultAbout.bottomRightImage
      );
    }
    console.log(`✅ Default About Us Welcome Section initialized successfully.`);
  } catch (err) {
    console.error(`⚠️ Could not seed about_section:`, err);
  }

  // 5. Initialize / Seed Why Choose Us Pillars (IDs 1, 2, 3, 4)
  console.log(`🛡️ Initializing Why Choose Us Highlights (why_choose_pillars)...`);
  const defaultPillars = [
    {
      id: 1,
      title: "Professional Service",
      description:
        "Professional and friendly service to ensure your comfort throughout the journey.",
    },
    {
      id: 2,
      title: "Competitive Packages",
      description:
        "Competitive travel packages tailored to your budget without compromising quality.",
    },
    {
      id: 3,
      title: "Personalized Planning",
      description:
        "Tailor-made itineraries designed to suit your personal schedule, budget, and travel style.",
    },
    {
      id: 4,
      title: "24/7 Dedicated Support",
      description:
        "Round-the-clock local support to give you complete peace of mind while exploring Sri Lanka.",
    },
  ];

  try {
    for (const pillar of defaultPillars) {
      if (db.whyChoosePillar) {
        await db.whyChoosePillar.upsert({
          where: { id: pillar.id },
          update: {
            title: pillar.title,
            description: pillar.description,
          },
          create: {
            id: pillar.id,
            title: pillar.title,
            description: pillar.description,
          },
        });
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO why_choose_pillars (id, title, description, createdAt, updatedAt)
           VALUES (?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             description = VALUES(description),
             updatedAt = NOW(3);`,
          pillar.id,
          pillar.title,
          pillar.description
        );
      }
      console.log(`   ✅ Pillar [ID ${pillar.id}] "${pillar.title}" seeded successfully.`);
    }
    console.log(`✅ All 4 Why Choose Us pillars initialized successfully.`);
  } catch (err) {
    console.error(`⚠️ Could not seed why_choose_pillars:`, err);
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
