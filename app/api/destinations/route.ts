import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface DestinationData {
  id?: number;
  slug: string;
  title: string;
  badge: string;
  location: string;
  description: string;
  image: string;
  isHomepage?: boolean;
  isPinned?: boolean;
  category?: string;
  highlights?: string | null;
  duration?: string;
  bestSeason?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface DestinationDelegate {
  findMany: (args?: {
    where?: { isHomepage?: boolean; isPinned?: boolean; category?: string };
    orderBy?: { isPinned?: "desc" | "asc"; isHomepage?: "desc" | "asc"; id?: "asc" | "desc" }[];
  }) => Promise<DestinationData[]>;
  upsert: (args: {
    where: { slug: string };
    update: Partial<DestinationData>;
    create: DestinationData;
  }) => Promise<DestinationData>;
  create: (args: { data: DestinationData }) => Promise<DestinationData>;
  delete: (args: { where: { slug?: string; id?: number } }) => Promise<DestinationData>;
}

/**
 * GET /api/destinations
 * Returns destinations.
 * Supports ?homepage=true, ?pinned=true, and ?category=... filters.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const homepageOnly = searchParams.get("homepage") === "true";
    const pinnedOnly = searchParams.get("pinned") === "true";
    const category = searchParams.get("category");

    const db = prisma as unknown as { destination?: DestinationDelegate };

    if (db.destination?.findMany) {
      const whereClause: { isHomepage?: boolean; isPinned?: boolean; category?: string } = {};
      if (homepageOnly) whereClause.isHomepage = true;
      if (pinnedOnly) whereClause.isPinned = true;
      if (category && category !== "all") whereClause.category = category;

      const items = await db.destination.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        orderBy: [{ isPinned: "desc" }, { isHomepage: "desc" }, { id: "asc" }],
      });

      return NextResponse.json({ success: true, data: items }, { status: 200 });
    }

    // Direct SQL fallback
    let query = `SELECT id, slug, title, badge, location, description, image, isHomepage, isPinned, category, highlights, duration, bestSeason, createdAt, updatedAt FROM destinations`;
    const conditions: string[] = [];

    if (homepageOnly) {
      conditions.push(`isHomepage = 1`);
    }
    if (pinnedOnly) {
      conditions.push(`isPinned = 1`);
    }
    if (category && category !== "all") {
      conditions.push(`category = ${JSON.stringify(category)}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY isPinned DESC, isHomepage DESC, id ASC`;

    const rows = await prisma.$queryRawUnsafe<DestinationData[]>(query);

    const normalized = (rows || []).map((r) => ({
      ...r,
      isHomepage: Boolean(r.isHomepage),
      isPinned: Boolean(r.isPinned),
    }));

    return NextResponse.json({ success: true, data: normalized }, { status: 200 });
  } catch (error) {
    console.error("GET /api/destinations error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch destinations",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/destinations
 * Adds a new destination.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const slug =
      typeof body.slug === "string" && body.slug.trim()
        ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const badge = typeof body.badge === "string" ? body.badge.trim() : "Heritage";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() : "/images/dest-galle-fort.jpg";
    const isHomepage = Boolean(body.isHomepage);
    const isPinned = Boolean(body.isPinned);
    const category = typeof body.category === "string" ? body.category.trim().toLowerCase() : "heritage";
    const highlights = typeof body.highlights === "string" ? body.highlights : null;
    const duration = typeof body.duration === "string" ? body.duration.trim() : "Full Day";
    const bestSeason = typeof body.bestSeason === "string" ? body.bestSeason.trim() : "Year Round";

    if (!title || !location || !description) {
      return NextResponse.json(
        { success: false, message: "Title, location, and description are required." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { destination?: DestinationDelegate };

    if (db.destination?.create) {
      const created = await db.destination.create({
        data: {
          slug,
          title,
          badge,
          location,
          description,
          image,
          isHomepage,
          isPinned,
          category,
          highlights: highlights || undefined,
          duration,
          bestSeason,
        },
      });
      return NextResponse.json({ success: true, data: created }, { status: 201 });
    }

    await prisma.$executeRawUnsafe(
      `INSERT INTO destinations (slug, title, badge, location, description, image, isHomepage, isPinned, category, highlights, duration, bestSeason, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
      slug,
      title,
      badge,
      location,
      description,
      image,
      isHomepage ? 1 : 0,
      isPinned ? 1 : 0,
      category,
      highlights,
      duration,
      bestSeason
    );

    const rows = await prisma.$queryRawUnsafe<DestinationData[]>(
      `SELECT id, slug, title, badge, location, description, image, isHomepage, isPinned, category, highlights, duration, bestSeason, createdAt, updatedAt
       FROM destinations
       WHERE slug = ?
       LIMIT 1`,
      slug
    );

    const created = {
      ...rows[0],
      isHomepage: Boolean(rows[0]?.isHomepage),
      isPinned: Boolean(rows[0]?.isPinned),
    };

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/destinations error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create destination", error: String(error) },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/destinations
 * Updates destination card(s).
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const items: DestinationData[] = Array.isArray(body)
      ? body
      : Array.isArray(body.destinations)
      ? body.destinations
      : body && (typeof body.id === "number" || typeof body.slug === "string")
      ? [body]
      : [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No destination data provided." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { destination?: DestinationDelegate };
    const updatedResults: DestinationData[] = [];

    for (const item of items) {
      const slug =
        typeof item.slug === "string" && item.slug.trim()
          ? item.slug.trim()
          : typeof item.title === "string"
          ? item.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
          : "";

      if (!slug) continue;

      const title = typeof item.title === "string" ? item.title.trim() : "";
      const badge = typeof item.badge === "string" ? item.badge.trim() : "Heritage";
      const location = typeof item.location === "string" ? item.location.trim() : "";
      const description = typeof item.description === "string" ? item.description.trim() : "";
      const image = typeof item.image === "string" ? item.image.trim() : "/images/dest-galle-fort.jpg";
      const isHomepage = Boolean(item.isHomepage);
      const isPinned = Boolean(item.isPinned);
      const category = typeof item.category === "string" ? item.category.trim().toLowerCase() : "heritage";
      const highlights = typeof item.highlights === "string" ? item.highlights : null;
      const duration = typeof item.duration === "string" ? item.duration.trim() : "Full Day";
      const bestSeason = typeof item.bestSeason === "string" ? item.bestSeason.trim() : "Year Round";

      if (db.destination?.upsert) {
        const saved = await db.destination.upsert({
          where: { slug },
          update: {
            title,
            badge,
            location,
            description,
            image,
            isHomepage,
            isPinned,
            category,
            highlights: highlights || undefined,
            duration,
            bestSeason,
          },
          create: {
            slug,
            title,
            badge,
            location,
            description,
            image,
            isHomepage,
            isPinned,
            category,
            highlights: highlights || undefined,
            duration,
            bestSeason,
          },
        });
        updatedResults.push(saved);
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO destinations (slug, title, badge, location, description, image, isHomepage, isPinned, category, highlights, duration, bestSeason, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             badge = VALUES(badge),
             location = VALUES(location),
             description = VALUES(description),
             image = VALUES(image),
             isHomepage = VALUES(isHomepage),
             isPinned = VALUES(isPinned),
             category = VALUES(category),
             highlights = VALUES(highlights),
             duration = VALUES(duration),
             bestSeason = VALUES(bestSeason),
             updatedAt = NOW(3)`,
          slug,
          title,
          badge,
          location,
          description,
          image,
          isHomepage ? 1 : 0,
          isPinned ? 1 : 0,
          category,
          highlights,
          duration,
          bestSeason
        );
        updatedResults.push({ slug, title, badge, location, description, image, isHomepage, isPinned, category });
      }
    }

    const rows = await prisma.$queryRawUnsafe<DestinationData[]>(
      `SELECT id, slug, title, badge, location, description, image, isHomepage, isPinned, category, highlights, duration, bestSeason, createdAt, updatedAt
       FROM destinations
       ORDER BY isPinned DESC, isHomepage DESC, id ASC`
    );

    const refreshed = rows.map((r) => ({
      ...r,
      isHomepage: Boolean(r.isHomepage),
      isPinned: Boolean(r.isPinned),
    }));

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${updatedResults.length} destinations`,
        data: refreshed.length > 0 ? refreshed : updatedResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/destinations error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update destinations",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/destinations?slug=... or ?id=...
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const id = Number(searchParams.get("id"));

    if (!slug && (!id || isNaN(id))) {
      return NextResponse.json(
        { success: false, message: "Valid slug or ID required" },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { destination?: DestinationDelegate };

    if (slug) {
      if (db.destination?.delete) {
        await db.destination.delete({ where: { slug } });
      } else {
        await prisma.$executeRawUnsafe(`DELETE FROM destinations WHERE slug = ?`, slug);
      }
      return NextResponse.json(
        { success: true, message: `Destination "${slug}" deleted successfully` },
        { status: 200 }
      );
    } else {
      if (db.destination?.delete) {
        await db.destination.delete({ where: { id } });
      } else {
        await prisma.$executeRawUnsafe(`DELETE FROM destinations WHERE id = ?`, id);
      }
      return NextResponse.json(
        { success: true, message: `Destination #${id} deleted successfully` },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("DELETE /api/destinations error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete destination", error: String(error) },
      { status: 500 }
    );
  }
}
