import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const rawPassword = process.env.ADMIN_PASSWORD || "traveltube_admin_2026";
  const email = "admin@traveltube.com";
  const name = "System Administrator";

  const existing = await prisma.admin.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existing) {
    console.log(`✅ Admin account already exists: ${existing.username}`);
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

  // Initialize Homepage Hero default record
  await prisma.$executeRawUnsafe(`
    INSERT INTO homepage_hero (id, heroFirst, heroSecond, heroScript, heroDesc, bgImage, updatedAt)
    VALUES (
      1,
      'Discover the',
      'Real',
      'Sri Lanka',
      'Unforgettable journeys, authentic experiences and memories that last a lifetime.',
      '/images/hero-bg.jpg',
      NOW(3)
    )
    ON DUPLICATE KEY UPDATE updatedAt = NOW(3);
  `);
  console.log(`✅ Default Homepage Hero initialized.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
