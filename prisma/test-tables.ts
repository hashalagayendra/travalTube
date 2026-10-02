import prisma from "../lib/prisma";

async function main() {
  const tables = await prisma.$queryRawUnsafe("SHOW TABLES;");
  console.log("CURRENT_TABLES:", JSON.stringify(tables, null, 2));
}

main().finally(() => prisma.$disconnect());
