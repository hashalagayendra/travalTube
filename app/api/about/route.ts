import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SINGLETON_ID = 1;

export interface AboutSectionData {
  id: number;
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  paragraph1: string;
  paragraph2: string;
  topImage: string;
  bottomLeftImage: string;
  bottomRightImage: string;
  updatedAt?: string | Date;
}

const DEFAULT_ABOUT: AboutSectionData = {
  id: SINGLETON_ID,
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

/**
 * GET /api/about
 * Returns the About Us / Welcome section content (row id = 1).
 */
export async function GET() {
  try {
    const prismaDelegate = (prisma as unknown as {
      aboutSection?: { findUnique: (args: unknown) => Promise<AboutSectionData | null> };
    }).aboutSection;

    if (prismaDelegate) {
      let data = await prismaDelegate.findUnique({
        where: { id: SINGLETON_ID },
      });

      if (!data) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO about_section (id, eyebrow, titleMain, titleAccent, paragraph1, paragraph2, topImage, bottomLeftImage, bottomRightImage, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))
           ON DUPLICATE KEY UPDATE updatedAt = NOW(3)`,
          DEFAULT_ABOUT.id,
          DEFAULT_ABOUT.eyebrow,
          DEFAULT_ABOUT.titleMain,
          DEFAULT_ABOUT.titleAccent,
          DEFAULT_ABOUT.paragraph1,
          DEFAULT_ABOUT.paragraph2,
          DEFAULT_ABOUT.topImage,
          DEFAULT_ABOUT.bottomLeftImage,
          DEFAULT_ABOUT.bottomRightImage
        );

        data = await prismaDelegate.findUnique({
          where: { id: SINGLETON_ID },
        });
      }

      return NextResponse.json({ success: true, data: data ?? DEFAULT_ABOUT }, { status: 200 });
    }

    // Direct SQL fallback
    const rows = await prisma.$queryRawUnsafe<AboutSectionData[]>(
      `SELECT id, eyebrow, titleMain, titleAccent, paragraph1, paragraph2, topImage, bottomLeftImage, bottomRightImage, updatedAt
       FROM about_section
       WHERE id = ?
       LIMIT 1`,
      SINGLETON_ID
    );

    if (rows && rows.length > 0) {
      return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
    }

    // If table was empty, insert default
    await prisma.$executeRawUnsafe(
      `INSERT INTO about_section (id, eyebrow, titleMain, titleAccent, paragraph1, paragraph2, topImage, bottomLeftImage, bottomRightImage, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))
       ON DUPLICATE KEY UPDATE updatedAt = NOW(3)`,
      DEFAULT_ABOUT.id,
      DEFAULT_ABOUT.eyebrow,
      DEFAULT_ABOUT.titleMain,
      DEFAULT_ABOUT.titleAccent,
      DEFAULT_ABOUT.paragraph1,
      DEFAULT_ABOUT.paragraph2,
      DEFAULT_ABOUT.topImage,
      DEFAULT_ABOUT.bottomLeftImage,
      DEFAULT_ABOUT.bottomRightImage
    );

    return NextResponse.json({ success: true, data: DEFAULT_ABOUT }, { status: 200 });
  } catch (error) {
    console.error("GET /api/about error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch about section data",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/about
 * Updates the About Us / Welcome section content (row id = 1).
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Fetch current row to merge partial updates
    const currentRows = await prisma.$queryRawUnsafe<AboutSectionData[]>(
      `SELECT id, eyebrow, titleMain, titleAccent, paragraph1, paragraph2, topImage, bottomLeftImage, bottomRightImage
       FROM about_section
       WHERE id = ?
       LIMIT 1`,
      SINGLETON_ID
    );

    const current: AboutSectionData = currentRows?.[0] || DEFAULT_ABOUT;

    const eyebrow = typeof body.eyebrow === "string" ? body.eyebrow.trim() : current.eyebrow;
    const titleMain = typeof body.titleMain === "string" ? body.titleMain.trim() : current.titleMain;
    const titleAccent = typeof body.titleAccent === "string" ? body.titleAccent.trim() : current.titleAccent;
    const paragraph1 = typeof body.paragraph1 === "string" ? body.paragraph1.trim() : current.paragraph1;
    const paragraph2 = typeof body.paragraph2 === "string" ? body.paragraph2.trim() : current.paragraph2;
    const topImage = typeof body.topImage === "string" ? body.topImage : current.topImage;
    const bottomLeftImage = typeof body.bottomLeftImage === "string" ? body.bottomLeftImage : current.bottomLeftImage;
    const bottomRightImage = typeof body.bottomRightImage === "string" ? body.bottomRightImage : current.bottomRightImage;

    // 1. Try Prisma Client delegate
    const prismaDelegate = (prisma as unknown as {
      aboutSection?: {
        update: (args: {
          where: { id: number };
          data: Partial<AboutSectionData>;
        }) => Promise<AboutSectionData>;
      };
    }).aboutSection;

    if (prismaDelegate) {
      try {
        const updated = await prismaDelegate.update({
          where: { id: SINGLETON_ID },
          data: {
            eyebrow,
            titleMain,
            titleAccent,
            paragraph1,
            paragraph2,
            topImage,
            bottomLeftImage,
            bottomRightImage,
          },
        });

        return NextResponse.json(
          {
            success: true,
            message: "About section updated successfully",
            data: updated,
          },
          { status: 200 }
        );
      } catch (delegateErr) {
        console.warn("Prisma delegate update failed, using raw SQL UPDATE fallback:", delegateErr);
      }
    }

    // 2. Direct SQL UPDATE fallback
    await prisma.$executeRawUnsafe(
      `UPDATE about_section
       SET eyebrow = ?, titleMain = ?, titleAccent = ?, paragraph1 = ?, paragraph2 = ?, 
           topImage = ?, bottomLeftImage = ?, bottomRightImage = ?, updatedAt = NOW(3)
       WHERE id = ?`,
      eyebrow,
      titleMain,
      titleAccent,
      paragraph1,
      paragraph2,
      topImage,
      bottomLeftImage,
      bottomRightImage,
      SINGLETON_ID
    );

    const updatedRows = await prisma.$queryRawUnsafe<AboutSectionData[]>(
      `SELECT id, eyebrow, titleMain, titleAccent, paragraph1, paragraph2, topImage, bottomLeftImage, bottomRightImage, updatedAt
       FROM about_section
       WHERE id = ?
       LIMIT 1`,
      SINGLETON_ID
    );

    return NextResponse.json(
      {
        success: true,
        message: "About section updated successfully",
        data: updatedRows[0] || {
          id: SINGLETON_ID,
          eyebrow,
          titleMain,
          titleAccent,
          paragraph1,
          paragraph2,
          topImage,
          bottomLeftImage,
          bottomRightImage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/about error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update about section",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
