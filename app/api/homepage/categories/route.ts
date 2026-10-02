import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface TourCategoryData {
  id: number;
  title: string;
  badge: string;
  description: string;
  actionText: string;
  image: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const DEFAULT_CATEGORIES: TourCategoryData[] = [
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

interface TourCategoryDelegate {
  findMany: (args?: { orderBy?: { id?: "asc" | "desc" } }) => Promise<TourCategoryData[]>;
  upsert: (args: {
    where: { id: number };
    update: Partial<TourCategoryData>;
    create: TourCategoryData;
  }) => Promise<TourCategoryData>;
}

/**
 * GET /api/homepage/categories
 * Returns all active tour categories ordered by ID ascending.
 * Auto-seeds default 3 categories if table is empty.
 */
export async function GET() {
  try {
    const db = prisma as unknown as { tourCategory?: TourCategoryDelegate };

    // 1. Try Prisma Client model delegate
    if (db.tourCategory?.findMany) {
      let categories = await db.tourCategory.findMany({
        orderBy: { id: "asc" },
      });

      // If empty, initialize default 3 categories
      if (!categories || categories.length === 0) {
        for (const cat of DEFAULT_CATEGORIES) {
          await db.tourCategory.upsert({
            where: { id: cat.id },
            update: {
              title: cat.title,
              badge: cat.badge,
              description: cat.description,
              actionText: cat.actionText,
              image: cat.image,
            },
            create: {
              id: cat.id,
              title: cat.title,
              badge: cat.badge,
              description: cat.description,
              actionText: cat.actionText,
              image: cat.image,
            },
          });
        }

        categories = await db.tourCategory.findMany({
          orderBy: { id: "asc" },
        });
      }

      return NextResponse.json({ success: true, data: categories }, { status: 200 });
    }

    // 2. Direct Raw SQL Fallback
    const rows = await prisma.$queryRawUnsafe<TourCategoryData[]>(
      `SELECT id, title, badge, description, actionText, image, createdAt, updatedAt
       FROM tour_categories
       ORDER BY id ASC`
    );

    if (rows && rows.length > 0) {
      return NextResponse.json({ success: true, data: rows }, { status: 200 });
    }

    // If no rows, insert defaults via raw query
    for (const cat of DEFAULT_CATEGORIES) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO tour_categories (id, title, badge, description, actionText, image, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           badge = VALUES(badge),
           description = VALUES(description),
           actionText = VALUES(actionText),
           image = VALUES(image),
           updatedAt = NOW(3)`,
        cat.id,
        cat.title,
        cat.badge,
        cat.description,
        cat.actionText,
        cat.image
      );
    }

    return NextResponse.json({ success: true, data: DEFAULT_CATEGORIES }, { status: 200 });
  } catch (error) {
    console.error("GET /api/homepage/categories error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch homepage tour categories",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/homepage/categories
 * Updates all category records in the database.
 * Accepts: { categories: TourCategoryData[] } or TourCategoryData[]
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const items: TourCategoryData[] = Array.isArray(body)
      ? body
      : Array.isArray(body.categories)
      ? body.categories
      : [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No category data provided. Expected an array of categories.",
        },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { tourCategory?: TourCategoryDelegate };
    const updatedResults: TourCategoryData[] = [];

    for (const item of items) {
      const id = Number(item.id);
      if (!id || isNaN(id)) continue;

      const title = typeof item.title === "string" ? item.title.trim() : "";
      const badge = typeof item.badge === "string" ? item.badge.trim() : "Tour Option";
      const description = typeof item.description === "string" ? item.description.trim() : "";
      const actionText = typeof item.actionText === "string" ? item.actionText.trim() : "Explore Tours";
      const image = typeof item.image === "string" ? item.image : "";

      if (db.tourCategory?.upsert) {
        const saved = await db.tourCategory.upsert({
          where: { id },
          update: {
            title,
            badge,
            description,
            actionText,
            image,
          },
          create: {
            id,
            title,
            badge,
            description,
            actionText,
            image,
          },
        });
        updatedResults.push(saved);
      } else {
        // Raw SQL fallback
        await prisma.$executeRawUnsafe(
          `INSERT INTO tour_categories (id, title, badge, description, actionText, image, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             badge = VALUES(badge),
             description = VALUES(description),
             actionText = VALUES(actionText),
             image = VALUES(image),
             updatedAt = NOW(3)`,
          id,
          title,
          badge,
          description,
          actionText,
          image
        );
        updatedResults.push({ id, title, badge, description, actionText, image });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${updatedResults.length} tour categories in database`,
        data: updatedResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/homepage/categories error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update tour categories",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
