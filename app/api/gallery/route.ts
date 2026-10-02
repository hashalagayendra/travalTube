import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface GalleryItemData {
  id: number;
  title: string;
  location: string;
  category: "nature" | "wildlife" | "culture" | "beaches" | "adventure" | string;
  categoryLabel: string;
  image: string;
  description: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const DEFAULT_GALLERY_ITEMS: Omit<GalleryItemData, "id">[] = [
  {
    title: "Golden Hour Coastal Sunset",
    location: "Mirissa, Southern Province",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/dest-mirissa.jpg",
    description: "Leaning coconut palms over golden sands as tropical ocean waves break against the sunset shore.",
  },
  {
    title: "Cultural Triangle Expeditions",
    location: "Habarana & Sigiriya",
    category: "adventure",
    categoryLabel: "Adventure",
    image: "/images/plan-trip.jpg",
    description: "Cheerful group of travelers enjoying a genuine Sri Lankan cultural village experience under traditional thatch.",
  },
  {
    title: "Sigiriya Ancient Citadel",
    location: "Sigiriya, Matale District",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/sigiriya.jpg",
    description: "The magnificent 5th-century royal rock fortress rising above serene water lily ponds and manicured royal gardens.",
  },
  {
    title: "4x4 Wildlife Safari Adventure",
    location: "Yala National Park",
    category: "wildlife",
    categoryLabel: "Wildlife",
    image: "/images/package-3.jpg",
    description: "Travelers in an open-air safari jeep tracking wild leopards, herds of Asian elephants, and exotic tropical birds.",
  },
  {
    title: "Madu River Wetland Boat Safari",
    location: "Balapitiya, Southern Province",
    category: "nature",
    categoryLabel: "Nature",
    image: "/images/we-3.jpg",
    description: "Gliding through peaceful mangrove tunnels and tranquil water lily lagoons on an authentic wooden boat ride.",
  },
  {
    title: "Wild Sea Turtle Encounter",
    location: "Hikkaduwa Beach",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/about-collage-turtle-hd.jpg",
    description: "Hand-feeding giant wild sea turtles in the shallow, crystal-clear turquoise surf along Hikkaduwa's coral reef.",
  },
  {
    title: "Rock Fortress Expedition Group",
    location: "Sigiriya Rock Base",
    category: "adventure",
    categoryLabel: "Adventure",
    image: "/images/package-18.jpg",
    description: "Friends celebrating an unforgettable climb to King Kashyapa's 5th-century palace above the clouds.",
  },
  {
    title: "Ruwanwelisaya Sacred Stupa",
    location: "Anuradhapura Ancient Capital",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/about-collage-stupa-hd.jpg",
    description: "The colossal ancient white stupa surrounded by stone elephant walls and sacred Bodhi trees in evening sunlight.",
  },
  {
    title: "Nine Arch Bridge Blue Train",
    location: "Ella, Central Highlands",
    category: "adventure",
    categoryLabel: "Adventure",
    image: "/images/dest-ella.jpg",
    description: "The legendary blue passenger train crossing over the colonial stone viaduct framed by emerald tea estates.",
  },
  {
    title: "Temple of the Tooth Relic at Dusk",
    location: "Kandy Lakefront",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/dest-kandy.jpg",
    description: "The illuminated palace and golden roof of Sri Dalada Maligawa reflecting serenely across Kandy lake.",
  },
  {
    title: "Leopard in the Wild",
    location: "Yala National Park",
    category: "wildlife",
    categoryLabel: "Wildlife",
    image: "/images/about-collage-leopard-hd.jpg",
    description: "Sri Lanka's apex predator resting gracefully on a high branch in the dense scrub jungle canopy.",
  },
  {
    title: "Secret Jungle Beach Cove",
    location: "Unawatuna, Galle",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/dest-jungle-beach.jpg",
    description: "A secluded emerald bay surrounded by lush coastal rainforest with peaceful swimming waters.",
  },
  {
    title: "Historic Galle Fort Lighthouse",
    location: "Galle Fort Ramparts",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/dest-galle-fort.jpg",
    description: "The iconic 1939 white lighthouse standing sentinel over 17th-century Dutch ramparts and the Indian Ocean.",
  },
  {
    title: "Wild Elephant Gathering",
    location: "Minneriya National Park",
    category: "wildlife",
    categoryLabel: "Wildlife",
    image: "/images/welcome-wildlife.jpg",
    description: "Majestic Asian elephants gathering in large matriarchal herds around ancient reservoir grass plains.",
  },
  {
    title: "Virgin Rainforest Canopy",
    location: "Sinharaja Biosphere Reserve",
    category: "nature",
    categoryLabel: "Nature",
    image: "/images/we-1.jpg",
    description: "Exploring ancient Gondwanaland primary rainforest trails rich in endemic flora, birds, and cascading streams.",
  },
  {
    title: "Traditional Outrigger Canoes",
    location: "Bentota & Negombo Coast",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/welcome-coast.jpg",
    description: "Traditional wooden Oruwa fishing catamarans resting on the golden shoreline beneath swaying palm fronds.",
  },
];

interface GalleryDelegate {
  findMany: (args?: {
    where?: { category?: string };
    orderBy?: { id?: "asc" | "desc" }[];
  }) => Promise<GalleryItemData[]>;
  create: (args: { data: Partial<GalleryItemData> }) => Promise<GalleryItemData>;
  update: (args: { where: { id: number }; data: Partial<GalleryItemData> }) => Promise<GalleryItemData>;
  delete: (args: { where: { id: number } }) => Promise<GalleryItemData>;
  count: () => Promise<number>;
}

/**
 * Helper to get Category Label from category slug
 */
function getCategoryLabel(cat: string): string {
  const map: Record<string, string> = {
    nature: "Nature",
    wildlife: "Wildlife",
    culture: "Culture",
    beaches: "Beaches",
    adventure: "Adventure",
  };
  return map[cat.toLowerCase()] || cat.charAt(0).toUpperCase() + cat.slice(1);
}

/**
 * Auto seed gallery items if empty
 */
async function ensureSeedData(db: { galleryItem?: GalleryDelegate }) {
  try {
    let count = 0;
    if (db.galleryItem?.count) {
      count = await db.galleryItem.count();
    } else {
      const rows = await prisma.$queryRawUnsafe<any[]>(
        "SELECT COUNT(*) as cnt FROM gallery_items"
      );
      count = Number(rows?.[0]?.cnt || 0);
    }

    if (count === 0) {
      for (const item of DEFAULT_GALLERY_ITEMS) {
        if (db.galleryItem?.create) {
          await db.galleryItem.create({ data: item });
        } else {
          await prisma.$executeRawUnsafe(
            `INSERT INTO gallery_items (title, location, category, categoryLabel, image, description, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
            item.title,
            item.location,
            item.category,
            item.categoryLabel,
            item.image,
            item.description
          );
        }
      }
    }
  } catch (err) {
    console.error("Error ensuring seed data for gallery_items:", err);
  }
}

/**
 * GET /api/gallery
 * Returns all gallery items, supports ?category=... filter
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const db = prisma as unknown as { galleryItem?: GalleryDelegate };
    await ensureSeedData(db);

    if (db.galleryItem?.findMany) {
      const whereClause: { category?: string } = {};
      if (category && category !== "all") {
        whereClause.category = category.toLowerCase();
      }

      const items = await db.galleryItem.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        orderBy: [{ id: "asc" }],
      });

      return NextResponse.json({ success: true, data: items }, { status: 200 });
    }

    // Raw SQL Fallback
    let query = `SELECT id, title, location, category, categoryLabel, image, description, createdAt, updatedAt FROM gallery_items`;
    if (category && category !== "all") {
      query += ` WHERE category = ${JSON.stringify(category.toLowerCase())}`;
    }
    query += ` ORDER BY id ASC`;

    const rows = await prisma.$queryRawUnsafe<GalleryItemData[]>(query);
    return NextResponse.json({ success: true, data: rows || [] }, { status: 200 });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery items",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gallery
 * Creates a new gallery item
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim().toLowerCase() : "culture";
    const categoryLabel =
      typeof body.categoryLabel === "string" && body.categoryLabel.trim()
        ? body.categoryLabel.trim()
        : getCategoryLabel(category);
    const image = typeof body.image === "string" ? body.image.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";

    if (!title || !image) {
      return NextResponse.json(
        { success: false, message: "Title and Image are required." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { galleryItem?: GalleryDelegate };

    if (db.galleryItem?.create) {
      const created = await db.galleryItem.create({
        data: {
          title,
          location,
          category,
          categoryLabel,
          image,
          description,
        },
      });
      return NextResponse.json({ success: true, data: created }, { status: 201 });
    }

    // Raw SQL Fallback
    await prisma.$executeRawUnsafe(
      `INSERT INTO gallery_items (title, location, category, categoryLabel, image, description, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
      title,
      location,
      category,
      categoryLabel,
      image,
      description
    );

    const rows = await prisma.$queryRawUnsafe<GalleryItemData[]>(
      `SELECT id, title, location, category, categoryLabel, image, description, createdAt, updatedAt
       FROM gallery_items
       ORDER BY id DESC
       LIMIT 1`
    );

    return NextResponse.json({ success: true, data: rows?.[0] }, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create gallery item",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gallery
 * Updates an existing gallery item (or batch reset/update)
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Check if body is a single item or array of items
    const items: Partial<GalleryItemData>[] = Array.isArray(body)
      ? body
      : Array.isArray(body.items)
      ? body.items
      : body && (typeof body.id === "number" || typeof body.title === "string")
      ? [body]
      : [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No gallery data provided." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { galleryItem?: GalleryDelegate };
    const updatedResults: GalleryItemData[] = [];

    for (const item of items) {
      const id = Number(item.id);
      if (!id || isNaN(id)) continue;

      const title = typeof item.title === "string" ? item.title.trim() : "";
      const location = typeof item.location === "string" ? item.location.trim() : "";
      const category = typeof item.category === "string" ? item.category.trim().toLowerCase() : "culture";
      const categoryLabel =
        typeof item.categoryLabel === "string" && item.categoryLabel.trim()
          ? item.categoryLabel.trim()
          : getCategoryLabel(category);
      const image = typeof item.image === "string" ? item.image.trim() : undefined;
      const description = typeof item.description === "string" ? item.description.trim() : "";

      if (db.galleryItem?.update) {
        const updateData: Partial<GalleryItemData> = {
          title,
          location,
          category,
          categoryLabel,
          description,
        };
        if (image) updateData.image = image;

        const updated = await db.galleryItem.update({
          where: { id },
          data: updateData,
        });
        updatedResults.push(updated);
      } else {
        if (image) {
          await prisma.$executeRawUnsafe(
            `UPDATE gallery_items
             SET title = ?, location = ?, category = ?, categoryLabel = ?, image = ?, description = ?, updatedAt = NOW(3)
             WHERE id = ?`,
            title,
            location,
            category,
            categoryLabel,
            image,
            description,
            id
          );
        } else {
          await prisma.$executeRawUnsafe(
            `UPDATE gallery_items
             SET title = ?, location = ?, category = ?, categoryLabel = ?, description = ?, updatedAt = NOW(3)
             WHERE id = ?`,
            title,
            location,
            category,
            categoryLabel,
            description,
            id
          );
        }
        updatedResults.push({
          id,
          title,
          location,
          category,
          categoryLabel,
          image: image || "",
          description,
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${updatedResults.length} gallery items`,
        data: updatedResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/gallery error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update gallery items",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gallery?id=...
 * Deletes a gallery item
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Valid item ID required" },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { galleryItem?: GalleryDelegate };

    if (db.galleryItem?.delete) {
      await db.galleryItem.delete({ where: { id } });
    } else {
      await prisma.$executeRawUnsafe(`DELETE FROM gallery_items WHERE id = ?`, id);
    }

    return NextResponse.json(
      { success: true, message: `Gallery item #${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/gallery error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete gallery item",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
