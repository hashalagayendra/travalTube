import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface TourPackageData {
  id: number;
  name: string;
  days: string;
  locations: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  alt: string;
  featured: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const DEFAULT_TOUR_PACKAGES: TourPackageData[] = [
  {
    id: 14,
    name: "Classic Cultural Tour",
    days: "5 Days",
    locations: "Sigiriya / Kandy / Dambulla",
    description:
      "Explore ancient wonders, royal heritage and Sri Lanka’s rich cultural heart.",
    rating: 4.8,
    reviews: 120,
    image: "/images/sigiriya.jpg",
    alt: "Sigiriya rock fortress rising above lush green forest at sunset",
    featured: true,
  },
  {
    id: 16,
    name: "Culture & Heritage Tour",
    days: "7 Days",
    locations: "Kandy / Cultural Triangle / Sigiriya",
    description:
      "Discover sacred temples, royal palaces and UNESCO world heritage treasures.",
    rating: 4.9,
    reviews: 98,
    image: "/images/package-16.jpg",
    alt: "The illuminated Temple of the Tooth in Kandy",
    featured: true,
  },
  {
    id: 18,
    name: "Family Holidays Sri Lanka",
    days: "13 Days",
    locations: "Bentota / Yala / Ella / Kandy",
    description:
      "A joyful family journey combining wildlife safaris, scenic trains and sunny beaches.",
    rating: 4.9,
    reviews: 145,
    image: "/images/package-18.jpg",
    alt: "Buddhist statues and painted ceilings in a Sri Lankan cave temple",
    featured: true,
  },
  {
    id: 19,
    name: "Honeymoon in Paradise",
    days: "11 Days",
    locations: "Mirissa / Nuwara Eliya / Ella",
    description:
      "Romantic getaways with tea-plantation retreats, coastal sunsets and private dining.",
    rating: 5.0,
    reviews: 84,
    image: "/images/package-19.jpg",
    alt: "Ancient stone architecture and a Buddha statue in Polonnaruwa",
    featured: true,
  },
  {
    id: 20,
    name: "Beach Holiday Tour",
    days: "12 Days",
    locations: "Galle / Bentota / Mirissa",
    description:
      "Golden coastlines, turquoise waves, whale watching and tropical ocean breezes.",
    rating: 4.7,
    reviews: 110,
    image: "/images/package-20.jpg",
    alt: "Travelers relaxing under a blue umbrella on a Sri Lankan beach",
    featured: false,
  },
  {
    id: 3,
    name: "Yala Safari Adventure",
    days: "1 Day",
    locations: "Yala National Park / Tissamaharama",
    description:
      "Thrilling leopard tracking, wild elephants and vibrant birdlife on a guided safari.",
    rating: 4.8,
    reviews: 215,
    image: "/images/package-3.jpg",
    alt: "Elephants crossing a road beside a safari jeep",
    featured: false,
  },
  {
    id: 13,
    name: "Ella Scenic Highlands",
    days: "1 Day",
    locations: "Ella / Nine Arch Bridge / Little Adam’s Peak",
    description:
      "Iconic blue train journeys, mist-covered mountain peaks and roaring waterfalls.",
    rating: 4.9,
    reviews: 180,
    image: "/images/package-13.jpg",
    alt: "A blue train crossing the Nine Arch Bridge in Ella",
    featured: false,
  },
];

interface TourPackageDelegate {
  findMany: (args?: { orderBy?: { id?: "asc" | "desc" } }) => Promise<TourPackageData[]>;
  upsert: (args: {
    where: { id: number };
    update: Partial<TourPackageData>;
    create: TourPackageData;
  }) => Promise<TourPackageData>;
  create: (args: { data: Omit<TourPackageData, "id"> }) => Promise<TourPackageData>;
  delete: (args: { where: { id: number } }) => Promise<TourPackageData>;
}

/**
 * GET /api/packages
 * Returns all tour packages ordered by ID.
 * Auto-seeds default 7 packages if the table is empty.
 */
export async function GET() {
  try {
    const db = prisma as unknown as { tourPackage?: TourPackageDelegate };

    if (db.tourPackage?.findMany) {
      let packages = await db.tourPackage.findMany({
        orderBy: { id: "asc" },
      });

      if (!packages || packages.length === 0) {
        for (const item of DEFAULT_TOUR_PACKAGES) {
          await db.tourPackage.upsert({
            where: { id: item.id },
            update: item,
            create: item,
          });
        }
        packages = await db.tourPackage.findMany({ orderBy: { id: "asc" } });
      }

      return NextResponse.json({ success: true, data: packages }, { status: 200 });
    }

    // Direct SQL fallback
    const rows = await prisma.$queryRawUnsafe<TourPackageData[]>(
      `SELECT id, name, days, locations, description, rating, reviews, image, alt, featured, createdAt, updatedAt
       FROM tour_packages
       ORDER BY id ASC`
    );

    if (rows && rows.length > 0) {
      // Map MySQL tinyint(1) featured to boolean
      const normalized = rows.map((r) => ({
        ...r,
        featured: Boolean(r.featured),
        rating: Number(r.rating),
        reviews: Number(r.reviews),
      }));
      return NextResponse.json({ success: true, data: normalized }, { status: 200 });
    }

    // Seed defaults via SQL
    for (const item of DEFAULT_TOUR_PACKAGES) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO tour_packages (id, name, days, locations, description, rating, reviews, image, alt, featured, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           days = VALUES(days),
           locations = VALUES(locations),
           description = VALUES(description),
           rating = VALUES(rating),
           reviews = VALUES(reviews),
           image = VALUES(image),
           alt = VALUES(alt),
           featured = VALUES(featured),
           updatedAt = NOW(3)`,
        item.id,
        item.name,
        item.days,
        item.locations,
        item.description,
        item.rating,
        item.reviews,
        item.image,
        item.alt,
        item.featured ? 1 : 0
      );
    }

    return NextResponse.json({ success: true, data: DEFAULT_TOUR_PACKAGES }, { status: 200 });
  } catch (error) {
    console.error("GET /api/packages error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tour packages",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/packages
 * Creates a new tour package.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const days = typeof body.days === "string" ? body.days.trim() : "1 Day";
    const locations = typeof body.locations === "string" ? body.locations.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() : "/images/sigiriya.jpg";
    const alt = typeof body.alt === "string" ? body.alt.trim() : `${name} Sri Lanka Tour`;
    const rating = typeof body.rating === "number" ? body.rating : 4.9;
    const reviews = typeof body.reviews === "number" ? body.reviews : 100;
    const featured = Boolean(body.featured);

    if (!name || !locations || !description) {
      return NextResponse.json(
        { success: false, message: "Name, locations, and description are required." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { tourPackage?: TourPackageDelegate };

    if (db.tourPackage?.create) {
      const created = await db.tourPackage.create({
        data: {
          name,
          days,
          locations,
          description,
          rating,
          reviews,
          image,
          alt,
          featured,
        },
      });
      return NextResponse.json({ success: true, data: created }, { status: 201 });
    }

    await prisma.$executeRawUnsafe(
      `INSERT INTO tour_packages (name, days, locations, description, rating, reviews, image, alt, featured, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
      name,
      days,
      locations,
      description,
      rating,
      reviews,
      image,
      alt,
      featured ? 1 : 0
    );

    const rows = await prisma.$queryRawUnsafe<TourPackageData[]>(
      `SELECT id, name, days, locations, description, rating, reviews, image, alt, featured, createdAt, updatedAt
       FROM tour_packages
       ORDER BY id DESC
       LIMIT 1`
    );

    const created = {
      ...rows[0],
      featured: Boolean(rows[0]?.featured),
      rating: Number(rows[0]?.rating),
      reviews: Number(rows[0]?.reviews),
    };

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/packages error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create tour package", error: String(error) },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/packages
 * Updates tour package(s). Accepts single object or array of objects.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const items: TourPackageData[] = Array.isArray(body)
      ? body
      : Array.isArray(body.packages)
      ? body.packages
      : body && typeof body.id === "number"
      ? [body]
      : [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No package data provided." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { tourPackage?: TourPackageDelegate };
    const updatedResults: TourPackageData[] = [];

    for (const item of items) {
      const id = Number(item.id);
      if (!id || isNaN(id)) continue;

      const name = typeof item.name === "string" ? item.name.trim() : "";
      const days = typeof item.days === "string" ? item.days.trim() : "1 Day";
      const locations = typeof item.locations === "string" ? item.locations.trim() : "";
      const description = typeof item.description === "string" ? item.description.trim() : "";
      const image = typeof item.image === "string" ? item.image.trim() : "/images/sigiriya.jpg";
      const alt = typeof item.alt === "string" ? item.alt.trim() : "Tour package image";
      const rating = typeof item.rating === "number" ? item.rating : 4.9;
      const reviews = typeof item.reviews === "number" ? item.reviews : 100;
      const featured = Boolean(item.featured);

      if (db.tourPackage?.upsert) {
        const saved = await db.tourPackage.upsert({
          where: { id },
          update: {
            name,
            days,
            locations,
            description,
            rating,
            reviews,
            image,
            alt,
            featured,
          },
          create: {
            id,
            name,
            days,
            locations,
            description,
            rating,
            reviews,
            image,
            alt,
            featured,
          },
        });
        updatedResults.push(saved);
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO tour_packages (id, name, days, locations, description, rating, reviews, image, alt, featured, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             name = VALUES(name),
             days = VALUES(days),
             locations = VALUES(locations),
             description = VALUES(description),
             rating = VALUES(rating),
             reviews = VALUES(reviews),
             image = VALUES(image),
             alt = VALUES(alt),
             featured = VALUES(featured),
             updatedAt = NOW(3)`,
          id,
          name,
          days,
          locations,
          description,
          rating,
          reviews,
          image,
          alt,
          featured ? 1 : 0
        );
        updatedResults.push({ id, name, days, locations, description, rating, reviews, image, alt, featured });
      }
    }

    const rows = await prisma.$queryRawUnsafe<TourPackageData[]>(
      `SELECT id, name, days, locations, description, rating, reviews, image, alt, featured, createdAt, updatedAt
       FROM tour_packages
       ORDER BY id ASC`
    );

    const refreshed = rows.map((r) => ({
      ...r,
      featured: Boolean(r.featured),
      rating: Number(r.rating),
      reviews: Number(r.reviews),
    }));

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${updatedResults.length} tour packages`,
        data: refreshed.length > 0 ? refreshed : updatedResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/packages error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update tour package(s)",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/packages?id=123
 * Deletes a tour package by ID.
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Valid package ID required" },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { tourPackage?: TourPackageDelegate };

    if (db.tourPackage?.delete) {
      await db.tourPackage.delete({ where: { id } });
    } else {
      await prisma.$executeRawUnsafe(`DELETE FROM tour_packages WHERE id = ?`, id);
    }

    return NextResponse.json(
      { success: true, message: `Tour package #${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/packages error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete tour package", error: String(error) },
      { status: 500 }
    );
  }
}
