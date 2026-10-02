import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface WhyChoosePillarData {
  id: number;
  title: string;
  description: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const DEFAULT_PILLARS: WhyChoosePillarData[] = [
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

interface WhyChooseDelegate {
  findMany: (args?: { orderBy?: { id?: "asc" | "desc" } }) => Promise<WhyChoosePillarData[]>;
  upsert: (args: {
    where: { id: number };
    update: Partial<WhyChoosePillarData>;
    create: WhyChoosePillarData;
  }) => Promise<WhyChoosePillarData>;
}

/**
 * GET /api/about/why-choose
 * Returns all Why Choose Us pillars ordered by ID ascending.
 * Auto-seeds the default 4 pillars if the table is empty.
 */
export async function GET() {
  try {
    const db = prisma as unknown as { whyChoosePillar?: WhyChooseDelegate };

    // 1. Try Prisma Client delegate
    if (db.whyChoosePillar?.findMany) {
      let pillars = await db.whyChoosePillar.findMany({
        orderBy: { id: "asc" },
      });

      if (!pillars || pillars.length === 0) {
        for (const item of DEFAULT_PILLARS) {
          await db.whyChoosePillar.upsert({
            where: { id: item.id },
            update: {
              title: item.title,
              description: item.description,
            },
            create: {
              id: item.id,
              title: item.title,
              description: item.description,
            },
          });
        }

        pillars = await db.whyChoosePillar.findMany({
          orderBy: { id: "asc" },
        });
      }

      return NextResponse.json({ success: true, data: pillars }, { status: 200 });
    }

    // 2. Raw SQL fallback
    const rows = await prisma.$queryRawUnsafe<WhyChoosePillarData[]>(
      `SELECT id, title, description, createdAt, updatedAt
       FROM why_choose_pillars
       ORDER BY id ASC`
    );

    if (rows && rows.length > 0) {
      return NextResponse.json({ success: true, data: rows }, { status: 200 });
    }

    // If empty, insert default 4 pillars
    for (const item of DEFAULT_PILLARS) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO why_choose_pillars (id, title, description, createdAt, updatedAt)
         VALUES (?, ?, ?, NOW(3), NOW(3))
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           description = VALUES(description),
           updatedAt = NOW(3)`,
        item.id,
        item.title,
        item.description
      );
    }

    return NextResponse.json({ success: true, data: DEFAULT_PILLARS }, { status: 200 });
  } catch (error) {
    console.error("GET /api/about/why-choose error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Why Choose Us highlights",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/about/why-choose
 * Updates pillars in the database.
 * Accepts: { pillars: WhyChoosePillarData[] } or WhyChoosePillarData[] or a single WhyChoosePillarData object.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const items: WhyChoosePillarData[] = Array.isArray(body)
      ? body
      : Array.isArray(body.pillars)
      ? body.pillars
      : body && typeof body.id === "number"
      ? [body]
      : [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No pillar data provided. Expected an array of pillars or { pillars: [...] }.",
        },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { whyChoosePillar?: WhyChooseDelegate };
    const updatedResults: WhyChoosePillarData[] = [];

    for (const item of items) {
      const id = Number(item.id);
      if (!id || isNaN(id)) continue;

      const title = typeof item.title === "string" ? item.title.trim() : "";
      const description = typeof item.description === "string" ? item.description.trim() : "";

      if (db.whyChoosePillar?.upsert) {
        const saved = await db.whyChoosePillar.upsert({
          where: { id },
          update: {
            title,
            description,
          },
          create: {
            id,
            title,
            description,
          },
        });
        updatedResults.push(saved);
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO why_choose_pillars (id, title, description, createdAt, updatedAt)
           VALUES (?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             description = VALUES(description),
             updatedAt = NOW(3)`,
          id,
          title,
          description
        );
        updatedResults.push({ id, title, description });
      }
    }

    // Return the fresh ordered list from database
    const refreshed = await prisma.$queryRawUnsafe<WhyChoosePillarData[]>(
      `SELECT id, title, description, createdAt, updatedAt
       FROM why_choose_pillars
       ORDER BY id ASC`
    );

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${updatedResults.length} Why Choose Us pillars`,
        data: refreshed.length > 0 ? refreshed : updatedResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/about/why-choose error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update Why Choose Us highlights",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
