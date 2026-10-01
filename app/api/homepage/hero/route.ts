import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// We guarantee that this table is a singleton and ONLY row id = 1 is accessed
const SINGLETON_ID = 1;

export interface HomepageHeroData {
  id: number;
  heroFirst: string;
  heroSecond: string;
  heroScript: string;
  heroDesc: string;
  bgImage: string | null;
  updatedAt?: string | Date;
}

const DEFAULT_HERO: HomepageHeroData = {
  id: SINGLETON_ID,
  heroFirst: "Discover the",
  heroSecond: "Real",
  heroScript: "Sri Lanka",
  heroDesc:
    "Unforgettable journeys, authentic experiences and memories that last a lifetime.",
  bgImage: "/images/hero-bg.jpg",
};

/**
 * GET /api/homepage/hero
 * Reads the single row (id = 1). If not found, initializes and returns it.
 */
export async function GET() {
  try {
    // 1. Try Prisma Model Delegate if available
    const prismaDelegate = (prisma as unknown as { homepageHero?: { findUnique: (args: unknown) => Promise<HomepageHeroData | null> } }).homepageHero;

    if (prismaDelegate) {
      let hero = await prismaDelegate.findUnique({
        where: { id: SINGLETON_ID },
      });

      if (!hero) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO homepage_hero (id, heroFirst, heroSecond, heroScript, heroDesc, bgImage, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, NOW(3))
           ON DUPLICATE KEY UPDATE updatedAt = NOW(3)`,
          DEFAULT_HERO.id,
          DEFAULT_HERO.heroFirst,
          DEFAULT_HERO.heroSecond,
          DEFAULT_HERO.heroScript,
          DEFAULT_HERO.heroDesc,
          DEFAULT_HERO.bgImage
        );

        hero = await prismaDelegate.findUnique({
          where: { id: SINGLETON_ID },
        });
      }

      return NextResponse.json({ success: true, data: hero ?? DEFAULT_HERO }, { status: 200 });
    }

    // 2. Direct Query Fallback (works even if Next.js cached an older Prisma instance)
    const rows = await prisma.$queryRawUnsafe<HomepageHeroData[]>(
      `SELECT id, heroFirst, heroSecond, heroScript, heroDesc, bgImage, updatedAt
       FROM homepage_hero
       WHERE id = ?
       LIMIT 1`,
      SINGLETON_ID
    );

    if (rows && rows.length > 0) {
      return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
    }

    // Insert default row if none exists
    await prisma.$executeRawUnsafe(
      `INSERT INTO homepage_hero (id, heroFirst, heroSecond, heroScript, heroDesc, bgImage, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW(3))
       ON DUPLICATE KEY UPDATE updatedAt = NOW(3)`,
      DEFAULT_HERO.id,
      DEFAULT_HERO.heroFirst,
      DEFAULT_HERO.heroSecond,
      DEFAULT_HERO.heroScript,
      DEFAULT_HERO.heroDesc,
      DEFAULT_HERO.bgImage
    );

    return NextResponse.json({ success: true, data: DEFAULT_HERO }, { status: 200 });
  } catch (error) {
    console.error("GET /api/homepage/hero error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch homepage hero configuration",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/homepage/hero
 * Updates the existing single row (id = 1).
 * Accepts partial or full updates: heroFirst, heroSecond, heroScript, heroDesc, bgImage.
 * Supports direct Base64 image data strings and standard URLs.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Fetch the current row first to merge any omitted fields
    const currentRows = await prisma.$queryRawUnsafe<HomepageHeroData[]>(
      `SELECT id, heroFirst, heroSecond, heroScript, heroDesc, bgImage
       FROM homepage_hero
       WHERE id = ?
       LIMIT 1`,
      SINGLETON_ID
    );

    const current: HomepageHeroData = currentRows?.[0] || DEFAULT_HERO;

    // Merge new values (only update fields that were provided)
    const heroFirst = typeof body.heroFirst === "string" ? body.heroFirst.trim() : current.heroFirst;
    const heroSecond = typeof body.heroSecond === "string" ? body.heroSecond.trim() : current.heroSecond;
    const heroScript = typeof body.heroScript === "string" ? body.heroScript.trim() : current.heroScript;
    const heroDesc = typeof body.heroDesc === "string" ? body.heroDesc.trim() : current.heroDesc;
    // Allow null or string (Base64 or URL) for bgImage
    const bgImage = body.bgImage !== undefined ? body.bgImage : current.bgImage;

    // ALWAYS target ONLY id = 1
    // 1. Try Prisma Client update first if model delegate is loaded
    const prismaDelegate = (prisma as unknown as {
      homepageHero?: {
        update: (args: {
          where: { id: number };
          data: {
            heroFirst?: string;
            heroSecond?: string;
            heroScript?: string;
            heroDesc?: string;
            bgImage?: string | null;
          };
        }) => Promise<HomepageHeroData>;
      };
    }).homepageHero;

    if (prismaDelegate) {
      try {
        const updatedHero = await prismaDelegate.update({
          where: { id: SINGLETON_ID },
          data: {
            heroFirst,
            heroSecond,
            heroScript,
            heroDesc,
            bgImage,
          },
        });

        return NextResponse.json(
          {
            success: true,
            message: "Homepage hero updated successfully (row id: 1)",
            data: updatedHero,
          },
          { status: 200 }
        );
      } catch (delegateError) {
        console.warn("Delegate update failed, using raw SQL UPDATE fallback:", delegateError);
      }
    }

    // 2. Direct SQL UPDATE fallback
    await prisma.$executeRawUnsafe(
      `UPDATE homepage_hero
       SET heroFirst = ?, heroSecond = ?, heroScript = ?, heroDesc = ?, bgImage = ?, updatedAt = NOW(3)
       WHERE id = ?`,
      heroFirst,
      heroSecond,
      heroScript,
      heroDesc,
      bgImage,
      SINGLETON_ID
    );

    // Fetch the newly updated record to return
    const updatedRows = await prisma.$queryRawUnsafe<HomepageHeroData[]>(
      `SELECT id, heroFirst, heroSecond, heroScript, heroDesc, bgImage, updatedAt
       FROM homepage_hero
       WHERE id = ?
       LIMIT 1`,
      SINGLETON_ID
    );

    return NextResponse.json(
      {
        success: true,
        message: "Homepage hero updated successfully (row id: 1)",
        data: updatedRows[0] || {
          id: SINGLETON_ID,
          heroFirst,
          heroSecond,
          heroScript,
          heroDesc,
          bgImage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/homepage/hero error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update homepage hero configuration",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/homepage/hero
 * Alias to PUT for convenience
 */
export async function POST(request: Request) {
  return PUT(request);
}
