import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface ServiceCardData {
  id: number;
  title: string;
  description: string;
  icon: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const DEFAULT_SERVICES_DATA: ServiceCardData[] = [
  {
    id: 1,
    title: "AIR TICKETING",
    description: "Domestic and international flight reservations at competitive prices.",
    icon: "Plane",
  },
  {
    id: 2,
    title: "PLAN YOUR TRIP",
    description: "Personalized travel planning according to your budget and preferences.",
    icon: "Map",
  },
  {
    id: 3,
    title: "ONE DAY TOURS",
    description: "Carefully designed day trips to popular attractions across Sri Lanka.",
    icon: "Calendar",
  },
  {
    id: 4,
    title: "VISA ASSISTANCE",
    description: "Guidance and support for visa applications and documentation.",
    icon: "FileText",
  },
  {
    id: 5,
    title: "ROUND TOURS",
    description: "Complete tour packages for individuals, families, and groups.",
    icon: "Globe",
  },
  {
    id: 6,
    title: "ACTIVITIES & DESTINATIONS",
    description: "Exciting activities and carefully selected destinations for unforgettable experiences.",
    icon: "Mountain",
  },
  {
    id: 7,
    title: "INBOUND & OUTBOUND TOURS",
    description: "Travel services for visitors coming into the country and travelers going abroad.",
    icon: "ArrowLeftRight",
  },
  {
    id: 8,
    title: "TRAVELLER'S CHEQUES",
    description: "Safe and convenient travel money services for your security.",
    icon: "CreditCard",
  },
  {
    id: 9,
    title: "AIRPORT TRANSFERS",
    description: "Comfortable and reliable airport pick-up and drop-off services.",
    icon: "Car",
  },
];

interface ServiceCardDelegate {
  findMany: (args?: { orderBy?: { id?: "asc" | "desc" } }) => Promise<ServiceCardData[]>;
  upsert: (args: {
    where: { id: number };
    update: Partial<ServiceCardData>;
    create: ServiceCardData;
  }) => Promise<ServiceCardData>;
  create: (args: { data: Omit<ServiceCardData, "id"> }) => Promise<ServiceCardData>;
  delete: (args: { where: { id: number } }) => Promise<ServiceCardData>;
}

/**
 * GET /api/services
 * Returns all service cards from the database ordered by ID ascending.
 * Auto-seeds default 9 cards if the table is empty.
 */
export async function GET() {
  try {
    const db = prisma as unknown as { serviceCard?: ServiceCardDelegate };

    if (db.serviceCard?.findMany) {
      let cards = await db.serviceCard.findMany({
        orderBy: { id: "asc" },
      });

      if (!cards || cards.length === 0) {
        for (const item of DEFAULT_SERVICES_DATA) {
          await db.serviceCard.upsert({
            where: { id: item.id },
            update: {
              title: item.title,
              description: item.description,
              icon: item.icon,
            },
            create: {
              id: item.id,
              title: item.title,
              description: item.description,
              icon: item.icon,
            },
          });
        }
        cards = await db.serviceCard.findMany({ orderBy: { id: "asc" } });
      }

      return NextResponse.json({ success: true, data: cards }, { status: 200 });
    }

    // Direct SQL fallback
    const rows = await prisma.$queryRawUnsafe<ServiceCardData[]>(
      `SELECT id, title, description, icon, createdAt, updatedAt
       FROM service_cards
       ORDER BY id ASC`
    );

    if (rows && rows.length > 0) {
      return NextResponse.json({ success: true, data: rows }, { status: 200 });
    }

    // Seed defaults
    for (const item of DEFAULT_SERVICES_DATA) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO service_cards (id, title, description, icon, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, NOW(3), NOW(3))
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           description = VALUES(description),
           icon = VALUES(icon),
           updatedAt = NOW(3)`,
        item.id,
        item.title,
        item.description,
        item.icon
      );
    }

    return NextResponse.json({ success: true, data: DEFAULT_SERVICES_DATA }, { status: 200 });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/services
 * Updates service cards in the database.
 * Accepts: { services: ServiceCardData[] } or ServiceCardData[] or single ServiceCardData object.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const items: ServiceCardData[] = Array.isArray(body)
      ? body
      : Array.isArray(body.services)
      ? body.services
      : body && typeof body.id === "number"
      ? [body]
      : [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No service data provided.",
        },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { serviceCard?: ServiceCardDelegate };
    const updatedResults: ServiceCardData[] = [];

    for (const item of items) {
      const id = Number(item.id);
      if (!id || isNaN(id)) continue;

      const title = typeof item.title === "string" ? item.title.trim() : "";
      const description = typeof item.description === "string" ? item.description.trim() : "";
      const icon = typeof item.icon === "string" && item.icon.trim() ? item.icon.trim() : "Plane";

      if (db.serviceCard?.upsert) {
        const saved = await db.serviceCard.upsert({
          where: { id },
          update: {
            title,
            description,
            icon,
          },
          create: {
            id,
            title,
            description,
            icon,
          },
        });
        updatedResults.push(saved);
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO service_cards (id, title, description, icon, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             description = VALUES(description),
             icon = VALUES(icon),
             updatedAt = NOW(3)`,
          id,
          title,
          description,
          icon
        );
        updatedResults.push({ id, title, description, icon });
      }
    }

    const refreshed = await prisma.$queryRawUnsafe<ServiceCardData[]>(
      `SELECT id, title, description, icon, createdAt, updatedAt
       FROM service_cards
       ORDER BY id ASC`
    );

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${updatedResults.length} service cards`,
        data: refreshed.length > 0 ? refreshed : updatedResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/services error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update service cards",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/services
 * Adds a new service card.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const icon = typeof body.icon === "string" && body.icon.trim() ? body.icon.trim() : "Plane";

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { serviceCard?: ServiceCardDelegate };

    if (db.serviceCard?.create) {
      const created = await db.serviceCard.create({
        data: {
          title,
          description,
          icon,
        },
      });
      return NextResponse.json({ success: true, data: created }, { status: 201 });
    }

    await prisma.$executeRawUnsafe(
      `INSERT INTO service_cards (title, description, icon, createdAt, updatedAt)
       VALUES (?, ?, ?, NOW(3), NOW(3))`,
      title,
      description,
      icon
    );

    const rows = await prisma.$queryRawUnsafe<ServiceCardData[]>(
      `SELECT id, title, description, icon, createdAt, updatedAt
       FROM service_cards
       ORDER BY id DESC
       LIMIT 1`
    );

    return NextResponse.json({ success: true, data: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create service card" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/services?id=123
 * Deletes a service card by ID.
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Valid service ID required" },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { serviceCard?: ServiceCardDelegate };

    if (db.serviceCard?.delete) {
      await db.serviceCard.delete({ where: { id } });
    } else {
      await prisma.$executeRawUnsafe(`DELETE FROM service_cards WHERE id = ?`, id);
    }

    return NextResponse.json(
      { success: true, message: `Service #${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/services error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete service card" },
      { status: 500 }
    );
  }
}
