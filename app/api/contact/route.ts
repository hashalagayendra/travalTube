import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface ContactInfoData {
  id?: number;
  eyebrow: string;
  headingWord: string;
  headingAccent: string;
  subheading: string;
  officeTitle: string;
  companyName: string;
  addressLine1: string;
  addressCity: string;
  phoneTitle: string;
  phone1: string;
  phone2: string;
  emailTitle: string;
  primaryEmail: string;
  secondaryEmail: string;
  updatedAt?: string | Date;
}

export const DEFAULT_CONTACT_INFO: ContactInfoData = {
  id: 1,
  eyebrow: "WE ARE HERE FOR YOU",
  headingWord: "Get In",
  headingAccent: "Touch",
  subheading:
    "We'd love to hear from you! Whether you have a question, need a custom travel plan, or simply want to learn more about our services, our team is always ready to assist you.",
  officeTitle: "Our Office Location",
  companyName: "Travel Tube Lanka(Pvt) Ltd",
  addressLine1: "452/01/A/01, Kandy Road",
  addressCity: "Kadawatha, Sri Lanka",
  phoneTitle: "Contact Number",
  phone1: "+94 76 2399399",
  phone2: "+94 11 4399699",
  emailTitle: "Email Address",
  primaryEmail: "info@traveltube.lk",
  secondaryEmail: "support@traveltube.lk",
};

interface ContactInfoDelegate {
  findUnique: (args: { where: { id: number } }) => Promise<ContactInfoData | null>;
  upsert: (args: {
    where: { id: number };
    update: Partial<ContactInfoData>;
    create: ContactInfoData;
  }) => Promise<ContactInfoData>;
}

/**
 * Ensures default row (id = 1) exists in the database
 */
async function ensureSeedContact(db: { contactInfo?: ContactInfoDelegate }): Promise<ContactInfoData> {
  if (db.contactInfo?.upsert) {
    return await db.contactInfo.upsert({
      where: { id: 1 },
      update: {},
      create: DEFAULT_CONTACT_INFO,
    });
  }

  // Raw SQL Fallback
  const existing = await prisma.$queryRawUnsafe<ContactInfoData[]>(
    "SELECT * FROM contact_info WHERE id = 1 LIMIT 1"
  );
  if (existing && existing.length > 0) {
    return existing[0];
  }

  await prisma.$executeRawUnsafe(
    `INSERT INTO contact_info (
       id, eyebrow, headingWord, headingAccent, subheading,
       officeTitle, companyName, addressLine1, addressCity,
       phoneTitle, phone1, phone2, emailTitle, primaryEmail, secondaryEmail, updatedAt
     ) VALUES (
       1, ?, ?, ?, ?,
       ?, ?, ?, ?,
       ?, ?, ?, ?, ?, ?, NOW(3)
     )`,
    DEFAULT_CONTACT_INFO.eyebrow,
    DEFAULT_CONTACT_INFO.headingWord,
    DEFAULT_CONTACT_INFO.headingAccent,
    DEFAULT_CONTACT_INFO.subheading,
    DEFAULT_CONTACT_INFO.officeTitle,
    DEFAULT_CONTACT_INFO.companyName,
    DEFAULT_CONTACT_INFO.addressLine1,
    DEFAULT_CONTACT_INFO.addressCity,
    DEFAULT_CONTACT_INFO.phoneTitle,
    DEFAULT_CONTACT_INFO.phone1,
    DEFAULT_CONTACT_INFO.phone2,
    DEFAULT_CONTACT_INFO.emailTitle,
    DEFAULT_CONTACT_INFO.primaryEmail,
    DEFAULT_CONTACT_INFO.secondaryEmail
  );

  return DEFAULT_CONTACT_INFO;
}

/**
 * GET /api/contact
 * Returns the contact page header & core contact card details
 */
export async function GET() {
  try {
    const db = prisma as unknown as { contactInfo?: ContactInfoDelegate };

    if (db.contactInfo?.findUnique) {
      const data = await db.contactInfo.findUnique({ where: { id: 1 } });
      if (data) {
        return NextResponse.json({ success: true, data }, { status: 200 });
      }
    }

    const row = await ensureSeedContact(db);
    return NextResponse.json({ success: true, data: row }, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact info",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/contact
 * Updates the contact page header and core contact details
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const eyebrow = typeof body.eyebrow === "string" ? body.eyebrow.trim() : DEFAULT_CONTACT_INFO.eyebrow;
    const headingWord = typeof body.headingWord === "string" ? body.headingWord.trim() : DEFAULT_CONTACT_INFO.headingWord;
    const headingAccent = typeof body.headingAccent === "string" ? body.headingAccent.trim() : DEFAULT_CONTACT_INFO.headingAccent;
    const subheading = typeof body.subheading === "string" ? body.subheading.trim() : DEFAULT_CONTACT_INFO.subheading;

    const officeTitle = typeof body.officeTitle === "string" ? body.officeTitle.trim() : DEFAULT_CONTACT_INFO.officeTitle;
    const companyName = typeof body.companyName === "string" ? body.companyName.trim() : DEFAULT_CONTACT_INFO.companyName;
    const addressLine1 = typeof body.addressLine1 === "string" ? body.addressLine1.trim() : DEFAULT_CONTACT_INFO.addressLine1;
    const addressCity = typeof body.addressCity === "string" ? body.addressCity.trim() : DEFAULT_CONTACT_INFO.addressCity;

    const phoneTitle = typeof body.phoneTitle === "string" ? body.phoneTitle.trim() : DEFAULT_CONTACT_INFO.phoneTitle;
    const phone1 = typeof body.phone1 === "string" ? body.phone1.trim() : DEFAULT_CONTACT_INFO.phone1;
    const phone2 = typeof body.phone2 === "string" ? body.phone2.trim() : DEFAULT_CONTACT_INFO.phone2;

    const emailTitle = typeof body.emailTitle === "string" ? body.emailTitle.trim() : DEFAULT_CONTACT_INFO.emailTitle;
    const primaryEmail = typeof body.primaryEmail === "string" ? body.primaryEmail.trim() : DEFAULT_CONTACT_INFO.primaryEmail;
    const secondaryEmail = typeof body.secondaryEmail === "string" ? body.secondaryEmail.trim() : DEFAULT_CONTACT_INFO.secondaryEmail;

    const updatePayload: ContactInfoData = {
      id: 1,
      eyebrow,
      headingWord,
      headingAccent,
      subheading,
      officeTitle,
      companyName,
      addressLine1,
      addressCity,
      phoneTitle,
      phone1,
      phone2,
      emailTitle,
      primaryEmail,
      secondaryEmail,
    };

    const db = prisma as unknown as { contactInfo?: ContactInfoDelegate };

    if (db.contactInfo?.upsert) {
      const saved = await db.contactInfo.upsert({
        where: { id: 1 },
        update: updatePayload,
        create: updatePayload,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Contact information saved successfully",
          data: saved,
        },
        { status: 200 }
      );
    }

    // Raw SQL Fallback
    await prisma.$executeRawUnsafe(
      `INSERT INTO contact_info (
         id, eyebrow, headingWord, headingAccent, subheading,
         officeTitle, companyName, addressLine1, addressCity,
         phoneTitle, phone1, phone2, emailTitle, primaryEmail, secondaryEmail, updatedAt
       ) VALUES (
         1, ?, ?, ?, ?,
         ?, ?, ?, ?,
         ?, ?, ?, ?, ?, ?, NOW(3)
       ) ON DUPLICATE KEY UPDATE
         eyebrow = VALUES(eyebrow),
         headingWord = VALUES(headingWord),
         headingAccent = VALUES(headingAccent),
         subheading = VALUES(subheading),
         officeTitle = VALUES(officeTitle),
         companyName = VALUES(companyName),
         addressLine1 = VALUES(addressLine1),
         addressCity = VALUES(addressCity),
         phoneTitle = VALUES(phoneTitle),
         phone1 = VALUES(phone1),
         phone2 = VALUES(phone2),
         emailTitle = VALUES(emailTitle),
         primaryEmail = VALUES(primaryEmail),
         secondaryEmail = VALUES(secondaryEmail),
         updatedAt = NOW(3)`,
      eyebrow,
      headingWord,
      headingAccent,
      subheading,
      officeTitle,
      companyName,
      addressLine1,
      addressCity,
      phoneTitle,
      phone1,
      phone2,
      emailTitle,
      primaryEmail,
      secondaryEmail
    );

    return NextResponse.json(
      {
        success: true,
        message: "Contact information saved successfully",
        data: updatePayload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact info",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
