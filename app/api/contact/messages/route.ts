import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface ContactMessageData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string | null;
  status: "New Lead" | "In Review" | "Quote Sent" | "Confirmed" | "Archived" | string;
  notes?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

const SAMPLE_MESSAGES: Omit<ContactMessageData, "id">[] = [
  {
    name: "Arthur & Charlotte Pendelton",
    email: "arthur.pendelton@gmail.com",
    phone: "+44 7911 123456",
    subject: "10th Anniversary Holiday to Sri Lanka",
    message:
      "Hello TravelTube! We are visiting Sri Lanka for our 10th anniversary. We'd love a dedicated chauffeur with an air-conditioned car, climbing Sigiriya Rock at sunrise, and experiencing a scenic tea factory in Kandy.",
    status: "New Lead",
    notes: "High priority lead. Client requested English-speaking licensed chauffeur guide.",
  },
  {
    name: "Claire & Julien Moreau",
    email: "c.moreau@orange.fr",
    phone: "+33 6 45 89 12 34",
    subject: "Ceylon Tea Country & Wildlife Safari (9 Days)",
    message:
      "We want a private 4x4 safari in Yala National Park for 2 full days, plus the Kandy to Ella train tickets in first class reserved seats. Please send quote with all park entry permits included.",
    status: "Quote Sent",
    notes: "Official itinerary quote v1 sent. Waiting for client confirmation on train ticket seats.",
  },
  {
    name: "Liam & Grace O'Connor",
    email: "liam.oconnor@ausnet.com.au",
    phone: "+61 412 345 678",
    subject: "Southern Beaches & Coastal Bliss (6 Days)",
    message:
      "Looking forward to surfing in Weligama and seeing the stilt fishermen in Koggala. 30% advance deposit paid via bank transfer.",
    status: "Confirmed",
    notes: "Advance deposit received. Chauffeur Kamal confirmed for airport pickup at CMB Colombo.",
  },
];

interface ContactMessageDelegate {
  findMany: (args?: {
    where?: { status?: string };
    orderBy?: { id?: "asc" | "desc"; createdAt?: "asc" | "desc" }[];
  }) => Promise<ContactMessageData[]>;
  create: (args: { data: Partial<ContactMessageData> }) => Promise<ContactMessageData>;
  update: (args: { where: { id: number }; data: Partial<ContactMessageData> }) => Promise<ContactMessageData>;
  delete: (args: { where: { id: number } }) => Promise<ContactMessageData>;
  count: () => Promise<number>;
}

/**
 * Seed initial sample messages if empty
 */
async function ensureSeedMessages(db: { contactMessage?: ContactMessageDelegate }) {
  try {
    let count = 0;
    if (db.contactMessage?.count) {
      count = await db.contactMessage.count();
    } else {
      const rows = await prisma.$queryRawUnsafe<any[]>(
        "SELECT COUNT(*) as cnt FROM contact_messages"
      );
      count = Number(rows?.[0]?.cnt || 0);
    }

    if (count === 0) {
      for (const msg of SAMPLE_MESSAGES) {
        if (db.contactMessage?.create) {
          await db.contactMessage.create({ data: msg });
        } else {
          await prisma.$executeRawUnsafe(
            `INSERT INTO contact_messages (name, email, phone, message, subject, status, notes, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
            msg.name,
            msg.email,
            msg.phone,
            msg.message,
            msg.subject || "General Contact Message",
            msg.status,
            msg.notes || null
          );
        }
      }
    }
  } catch (err) {
    console.error("Error ensuring seed data for contact_messages:", err);
  }
}

/**
 * GET /api/contact/messages
 * Retrieves contact form messages, ordered by newest first.
 * Supports ?status=... query filter.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const db = prisma as unknown as { contactMessage?: ContactMessageDelegate };
    await ensureSeedMessages(db);

    if (db.contactMessage?.findMany) {
      const whereClause: { status?: string } = {};
      if (status && status !== "All" && status !== "all") {
        whereClause.status = status;
      }

      const messages = await db.contactMessage.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        orderBy: [{ id: "desc" }],
      });

      return NextResponse.json({ success: true, data: messages }, { status: 200 });
    }

    // Raw SQL Fallback
    let query = `SELECT id, name, email, phone, message, subject, status, notes, createdAt, updatedAt FROM contact_messages`;
    if (status && status !== "All" && status !== "all") {
      query += ` WHERE status = ${JSON.stringify(status)}`;
    }
    query += ` ORDER BY id DESC`;

    const rows = await prisma.$queryRawUnsafe<ContactMessageData[]>(query);
    return NextResponse.json({ success: true, data: rows || [] }, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact/messages error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact messages",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/contact/messages
 * Saves a new message submitted by a visitor on /contact
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const subject =
      typeof body.subject === "string" && body.subject.trim()
        ? body.subject.trim()
        : "General Contact Message";

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Please enter your email." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Please enter your contact number." },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { contactMessage?: ContactMessageDelegate };

    if (db.contactMessage?.create) {
      const created = await db.contactMessage.create({
        data: {
          name,
          email,
          phone,
          message,
          subject,
          status: "New Lead",
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for contacting Travel Tube Lanka! Your message has been received.",
          data: created,
        },
        { status: 201 }
      );
    }

    // Raw SQL Fallback
    await prisma.$executeRawUnsafe(
      `INSERT INTO contact_messages (name, email, phone, message, subject, status, notes, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, 'New Lead', NULL, NOW(3), NOW(3))`,
      name,
      email,
      phone,
      message,
      subject
    );

    const rows = await prisma.$queryRawUnsafe<ContactMessageData[]>(
      `SELECT id, name, email, phone, message, subject, status, notes, createdAt, updatedAt
       FROM contact_messages
       ORDER BY id DESC
       LIMIT 1`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting Travel Tube Lanka! Your message has been received.",
        data: rows?.[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact/messages error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit contact message",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/contact/messages
 * Updates status and/or admin notes for a message
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Valid message ID is required" },
        { status: 400 }
      );
    }

    const status = typeof body.status === "string" ? body.status.trim() : undefined;
    const notes = typeof body.notes === "string" ? body.notes.trim() : undefined;

    const db = prisma as unknown as { contactMessage?: ContactMessageDelegate };

    if (db.contactMessage?.update) {
      const updateData: Partial<ContactMessageData> = {};
      if (status !== undefined) updateData.status = status;
      if (notes !== undefined) updateData.notes = notes;

      const updated = await db.contactMessage.update({
        where: { id },
        data: updateData,
      });

      return NextResponse.json(
        { success: true, message: "Message status updated successfully", data: updated },
        { status: 200 }
      );
    }

    // Raw SQL Fallback
    if (status !== undefined && notes !== undefined) {
      await prisma.$executeRawUnsafe(
        `UPDATE contact_messages SET status = ?, notes = ?, updatedAt = NOW(3) WHERE id = ?`,
        status,
        notes,
        id
      );
    } else if (status !== undefined) {
      await prisma.$executeRawUnsafe(
        `UPDATE contact_messages SET status = ?, updatedAt = NOW(3) WHERE id = ?`,
        status,
        id
      );
    } else if (notes !== undefined) {
      await prisma.$executeRawUnsafe(
        `UPDATE contact_messages SET notes = ?, updatedAt = NOW(3) WHERE id = ?`,
        notes,
        id
      );
    }

    const rows = await prisma.$queryRawUnsafe<ContactMessageData[]>(
      `SELECT id, name, email, phone, message, subject, status, notes, createdAt, updatedAt
       FROM contact_messages
       WHERE id = ?
       LIMIT 1`,
      id
    );

    return NextResponse.json(
      { success: true, message: "Message status updated successfully", data: rows?.[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/contact/messages error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact message",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contact/messages?id=...
 * Deletes a contact message
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Valid message ID is required" },
        { status: 400 }
      );
    }

    const db = prisma as unknown as { contactMessage?: ContactMessageDelegate };

    if (db.contactMessage?.delete) {
      await db.contactMessage.delete({ where: { id } });
    } else {
      await prisma.$executeRawUnsafe(`DELETE FROM contact_messages WHERE id = ?`, id);
    }

    return NextResponse.json(
      { success: true, message: `Message #${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/contact/messages error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete contact message",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
