import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface FooterSettingsData {
  id?: number;
  brandDescription: string;
  address: string;
  phones: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  websiteLabel: string;
  websiteUrl: string;
  want1Title: string;
  want1Url: string;
  want2Title: string;
  want2Url: string;
  want3Title: string;
  want3Url: string;
  copyrightText: string;
  photoCreditText: string;
  photoCreditUrl: string;
  updatedAt?: string | Date;
}

export const DEFAULT_FOOTER_SETTINGS: FooterSettingsData = {
  id: 1,
  brandDescription:
    "Your trusted travel partner for authentic journeys, round tours, and personalized experiences across Sri Lanka.",
  address: "Travel Tube Lanka (Pvt) Ltd,\n452/01/A/01, Kandy Road, Kadawatha, Sri Lanka",
  phones: "+94 76 2399399 / +94 11 4399699",
  phonePrimary: "+94762399399",
  phoneSecondary: "+94114399699",
  email: "info@traveltube.lk",
  websiteLabel: "www.traveltube.lk",
  websiteUrl: "https://traveltube.lk/about-us.php#",
  want1Title: "One day tour",
  want1Url: "https://traveltube.lk/tour-packages.php?id=1",
  want2Title: "Round Tour",
  want2Url: "https://traveltube.lk/tour-packages.php?id=2",
  want3Title: "Plan your Tour",
  want3Url: "https://traveltube.lk/plan-tour.php",
  copyrightText: "Travel Tube Lanka (Pvt) Ltd. All Rights Reserved.",
  photoCreditText: "Photo: dronepicr · CC BY 2.0 · cropped for display",
  photoCreditUrl: "https://commons.wikimedia.org/wiki/File:Sigiriya_lion_rock_Luftbild_(29781058870).jpg",
};

interface FooterSettingsDelegate {
  findUnique: (args: { where: { id: number } }) => Promise<FooterSettingsData | null>;
  upsert: (args: {
    where: { id: number };
    update: Partial<FooterSettingsData>;
    create: FooterSettingsData;
  }) => Promise<FooterSettingsData>;
}

/**
 * Ensures default footer settings row (id = 1) exists in the database
 */
async function ensureSeedFooter(db: { footerSettings?: FooterSettingsDelegate }): Promise<FooterSettingsData> {
  if (db.footerSettings?.upsert) {
    return await db.footerSettings.upsert({
      where: { id: 1 },
      update: {},
      create: DEFAULT_FOOTER_SETTINGS,
    });
  }

  // Raw SQL Fallback
  const existing = await prisma.$queryRawUnsafe<FooterSettingsData[]>(
    "SELECT * FROM footer_settings WHERE id = 1 LIMIT 1"
  );
  if (existing && existing.length > 0) {
    return existing[0];
  }

  await prisma.$executeRawUnsafe(
    `INSERT INTO footer_settings (
       id, brandDescription, address, phones, phonePrimary, phoneSecondary,
       email, websiteLabel, websiteUrl,
       want1Title, want1Url, want2Title, want2Url, want3Title, want3Url,
       copyrightText, photoCreditText, photoCreditUrl, updatedAt
     ) VALUES (
       1, ?, ?, ?, ?, ?,
       ?, ?, ?,
       ?, ?, ?, ?, ?, ?,
       ?, ?, ?, NOW(3)
     )`,
    DEFAULT_FOOTER_SETTINGS.brandDescription,
    DEFAULT_FOOTER_SETTINGS.address,
    DEFAULT_FOOTER_SETTINGS.phones,
    DEFAULT_FOOTER_SETTINGS.phonePrimary,
    DEFAULT_FOOTER_SETTINGS.phoneSecondary,
    DEFAULT_FOOTER_SETTINGS.email,
    DEFAULT_FOOTER_SETTINGS.websiteLabel,
    DEFAULT_FOOTER_SETTINGS.websiteUrl,
    DEFAULT_FOOTER_SETTINGS.want1Title,
    DEFAULT_FOOTER_SETTINGS.want1Url,
    DEFAULT_FOOTER_SETTINGS.want2Title,
    DEFAULT_FOOTER_SETTINGS.want2Url,
    DEFAULT_FOOTER_SETTINGS.want3Title,
    DEFAULT_FOOTER_SETTINGS.want3Url,
    DEFAULT_FOOTER_SETTINGS.copyrightText,
    DEFAULT_FOOTER_SETTINGS.photoCreditText,
    DEFAULT_FOOTER_SETTINGS.photoCreditUrl
  );

  return DEFAULT_FOOTER_SETTINGS;
}

/**
 * GET /api/footer
 * Returns footer settings & configuration
 */
export async function GET() {
  try {
    const db = prisma as unknown as { footerSettings?: FooterSettingsDelegate };

    if (db.footerSettings?.findUnique) {
      const data = await db.footerSettings.findUnique({ where: { id: 1 } });
      if (data) {
        return NextResponse.json({ success: true, data }, { status: 200 });
      }
    }

    const row = await ensureSeedFooter(db);
    return NextResponse.json({ success: true, data: row }, { status: 200 });
  } catch (error) {
    console.error("GET /api/footer error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch footer settings",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/footer
 * Updates footer configuration & links
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const brandDescription =
      typeof body.brandDescription === "string" ? body.brandDescription.trim() : DEFAULT_FOOTER_SETTINGS.brandDescription;
    const address = typeof body.address === "string" ? body.address.trim() : DEFAULT_FOOTER_SETTINGS.address;
    const phones = typeof body.phones === "string" ? body.phones.trim() : DEFAULT_FOOTER_SETTINGS.phones;
    const phonePrimary =
      typeof body.phonePrimary === "string" ? body.phonePrimary.trim() : DEFAULT_FOOTER_SETTINGS.phonePrimary;
    const phoneSecondary =
      typeof body.phoneSecondary === "string" ? body.phoneSecondary.trim() : DEFAULT_FOOTER_SETTINGS.phoneSecondary;
    const email = typeof body.email === "string" ? body.email.trim() : DEFAULT_FOOTER_SETTINGS.email;
    const websiteLabel =
      typeof body.websiteLabel === "string" ? body.websiteLabel.trim() : DEFAULT_FOOTER_SETTINGS.websiteLabel;
    const websiteUrl =
      typeof body.websiteUrl === "string" ? body.websiteUrl.trim() : DEFAULT_FOOTER_SETTINGS.websiteUrl;

    const want1Title =
      typeof body.want1Title === "string" ? body.want1Title.trim() : DEFAULT_FOOTER_SETTINGS.want1Title;
    const want1Url = typeof body.want1Url === "string" ? body.want1Url.trim() : DEFAULT_FOOTER_SETTINGS.want1Url;
    const want2Title =
      typeof body.want2Title === "string" ? body.want2Title.trim() : DEFAULT_FOOTER_SETTINGS.want2Title;
    const want2Url = typeof body.want2Url === "string" ? body.want2Url.trim() : DEFAULT_FOOTER_SETTINGS.want2Url;
    const want3Title =
      typeof body.want3Title === "string" ? body.want3Title.trim() : DEFAULT_FOOTER_SETTINGS.want3Title;
    const want3Url = typeof body.want3Url === "string" ? body.want3Url.trim() : DEFAULT_FOOTER_SETTINGS.want3Url;

    const copyrightText =
      typeof body.copyrightText === "string" ? body.copyrightText.trim() : DEFAULT_FOOTER_SETTINGS.copyrightText;
    const photoCreditText =
      typeof body.photoCreditText === "string" ? body.photoCreditText.trim() : DEFAULT_FOOTER_SETTINGS.photoCreditText;
    const photoCreditUrl =
      typeof body.photoCreditUrl === "string" ? body.photoCreditUrl.trim() : DEFAULT_FOOTER_SETTINGS.photoCreditUrl;

    const updatePayload: FooterSettingsData = {
      id: 1,
      brandDescription,
      address,
      phones,
      phonePrimary,
      phoneSecondary,
      email,
      websiteLabel,
      websiteUrl,
      want1Title,
      want1Url,
      want2Title,
      want2Url,
      want3Title,
      want3Url,
      copyrightText,
      photoCreditText,
      photoCreditUrl,
    };

    const db = prisma as unknown as { footerSettings?: FooterSettingsDelegate };

    if (db.footerSettings?.upsert) {
      const saved = await db.footerSettings.upsert({
        where: { id: 1 },
        update: updatePayload,
        create: updatePayload,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Footer settings saved successfully",
          data: saved,
        },
        { status: 200 }
      );
    }

    // Raw SQL Fallback
    await prisma.$executeRawUnsafe(
      `INSERT INTO footer_settings (
         id, brandDescription, address, phones, phonePrimary, phoneSecondary,
         email, websiteLabel, websiteUrl,
         want1Title, want1Url, want2Title, want2Url, want3Title, want3Url,
         copyrightText, photoCreditText, photoCreditUrl, updatedAt
       ) VALUES (
         1, ?, ?, ?, ?, ?,
         ?, ?, ?,
         ?, ?, ?, ?, ?, ?,
         ?, ?, ?, NOW(3)
       ) ON DUPLICATE KEY UPDATE
         brandDescription = VALUES(brandDescription),
         address = VALUES(address),
         phones = VALUES(phones),
         phonePrimary = VALUES(phonePrimary),
         phoneSecondary = VALUES(phoneSecondary),
         email = VALUES(email),
         websiteLabel = VALUES(websiteLabel),
         websiteUrl = VALUES(websiteUrl),
         want1Title = VALUES(want1Title),
         want1Url = VALUES(want1Url),
         want2Title = VALUES(want2Title),
         want2Url = VALUES(want2Url),
         want3Title = VALUES(want3Title),
         want3Url = VALUES(want3Url),
         copyrightText = VALUES(copyrightText),
         photoCreditText = VALUES(photoCreditText),
         photoCreditUrl = VALUES(photoCreditUrl),
         updatedAt = NOW(3)`,
      brandDescription,
      address,
      phones,
      phonePrimary,
      phoneSecondary,
      email,
      websiteLabel,
      websiteUrl,
      want1Title,
      want1Url,
      want2Title,
      want2Url,
      want3Title,
      want3Url,
      copyrightText,
      photoCreditText,
      photoCreditUrl
    );

    return NextResponse.json(
      {
        success: true,
        message: "Footer settings saved successfully",
        data: updatePayload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/footer error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update footer settings",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
