import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface SiteSettingsData {
  id?: number;
  companyBrand: string;
  sltdaReg: string;
  hotline: string;
  whatsapp: string;
  email: string;
  officeHours: string;
  address: string;
  currency: string;
  depositPercent: number;
  cancellationPolicy: string;
  tripAdvisorUrl: string;
  googleReviewsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl?: string | null;
  tiktokUrl?: string | null;
  announcementEnabled: boolean;
  announcementText: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt?: string | Date;
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  id: 1,
  companyBrand: "TravelTube Lanka",
  sltdaReg: "SLTDA/SQA/TA/2026/0491",
  hotline: "+94 77 123 4567",
  whatsapp: "+94 77 987 6543",
  email: "info@traveltubelanka.com",
  officeHours: "Mon – Sat: 8:00 AM – 7:00 PM (Sri Lanka Time GMT+5:30)",
  address: "No. 45, Lighthouse Street, Historic Dutch Fort, Galle 80000, Southern Province, Sri Lanka",
  currency: "USD",
  depositPercent: 20,
  cancellationPolicy:
    "Free cancellation up to 30 days prior to arrival with full refund. 50% refund between 29 to 14 days. Non-refundable under 14 days due to advance hotel and train bookings.",
  tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-TravelTube_Lanka",
  googleReviewsUrl: "https://g.page/r/traveltube-lanka-reviews",
  instagramUrl: "https://instagram.com/traveltubelanka",
  facebookUrl: "https://facebook.com/traveltubelankatours",
  youtubeUrl: "https://youtube.com/@traveltubelanka",
  tiktokUrl: "https://tiktok.com/@traveltubelanka",
  announcementEnabled: true,
  announcementText: "🔥 Early Bird Offer: Save 10% on Private Chauffeur Winter 2026/27 Tours. Enquire Today!",
  metaTitle: "TravelTube Lanka | Discover the Real Sri Lanka - Tailor Made Tours & Safaris",
  metaDescription:
    "Authentic experiences, private chauffeur tours, cultural heritage citadels, and personalized journeys through the beautiful tropical island of Sri Lanka.",
};

interface SiteSettingsDelegate {
  findUnique: (args: { where: { id: number } }) => Promise<SiteSettingsData | null>;
  upsert: (args: {
    where: { id: number };
    update: Partial<SiteSettingsData>;
    create: SiteSettingsData;
  }) => Promise<SiteSettingsData>;
}

/**
 * Ensures default settings row (id = 1) exists in the database
 */
async function ensureSeedSettings(db: { siteSettings?: SiteSettingsDelegate }): Promise<SiteSettingsData> {
  if (db.siteSettings?.upsert) {
    return await db.siteSettings.upsert({
      where: { id: 1 },
      update: {},
      create: DEFAULT_SITE_SETTINGS,
    });
  }

  // Raw SQL Fallback
  const existing = await prisma.$queryRawUnsafe<SiteSettingsData[]>(
    "SELECT * FROM site_settings WHERE id = 1 LIMIT 1"
  );
  if (existing && existing.length > 0) {
    return existing[0];
  }

  await prisma.$executeRawUnsafe(
    `INSERT INTO site_settings (
       id, companyBrand, sltdaReg, hotline, whatsapp, email, officeHours, address,
       currency, depositPercent, cancellationPolicy,
       tripAdvisorUrl, googleReviewsUrl, instagramUrl, facebookUrl, youtubeUrl, tiktokUrl,
       announcementEnabled, announcementText, metaTitle, metaDescription, updatedAt
     ) VALUES (
       1, ?, ?, ?, ?, ?, ?, ?,
       ?, ?, ?,
       ?, ?, ?, ?, ?, ?,
       ?, ?, ?, ?, NOW(3)
     )`,
    DEFAULT_SITE_SETTINGS.companyBrand,
    DEFAULT_SITE_SETTINGS.sltdaReg,
    DEFAULT_SITE_SETTINGS.hotline,
    DEFAULT_SITE_SETTINGS.whatsapp,
    DEFAULT_SITE_SETTINGS.email,
    DEFAULT_SITE_SETTINGS.officeHours,
    DEFAULT_SITE_SETTINGS.address,
    DEFAULT_SITE_SETTINGS.currency,
    DEFAULT_SITE_SETTINGS.depositPercent,
    DEFAULT_SITE_SETTINGS.cancellationPolicy,
    DEFAULT_SITE_SETTINGS.tripAdvisorUrl,
    DEFAULT_SITE_SETTINGS.googleReviewsUrl,
    DEFAULT_SITE_SETTINGS.instagramUrl,
    DEFAULT_SITE_SETTINGS.facebookUrl,
    DEFAULT_SITE_SETTINGS.youtubeUrl,
    DEFAULT_SITE_SETTINGS.tiktokUrl,
    DEFAULT_SITE_SETTINGS.announcementEnabled ? 1 : 0,
    DEFAULT_SITE_SETTINGS.announcementText,
    DEFAULT_SITE_SETTINGS.metaTitle,
    DEFAULT_SITE_SETTINGS.metaDescription
  );

  return DEFAULT_SITE_SETTINGS;
}

/**
 * GET /api/settings
 * Returns global site & agency settings
 */
export async function GET() {
  try {
    const db = prisma as unknown as { siteSettings?: SiteSettingsDelegate };

    if (db.siteSettings?.findUnique) {
      const data = await db.siteSettings.findUnique({ where: { id: 1 } });
      if (data) {
        return NextResponse.json({ success: true, data }, { status: 200 });
      }
    }

    const row = await ensureSeedSettings(db);
    return NextResponse.json({ success: true, data: row }, { status: 200 });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Updates global site & agency settings
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const companyBrand = typeof body.companyBrand === "string" ? body.companyBrand.trim() : DEFAULT_SITE_SETTINGS.companyBrand;
    const sltdaReg = typeof body.sltdaReg === "string" ? body.sltdaReg.trim() : DEFAULT_SITE_SETTINGS.sltdaReg;
    const hotline = typeof body.hotline === "string" ? body.hotline.trim() : DEFAULT_SITE_SETTINGS.hotline;
    const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : DEFAULT_SITE_SETTINGS.whatsapp;
    const email = typeof body.email === "string" ? body.email.trim() : DEFAULT_SITE_SETTINGS.email;
    const officeHours = typeof body.officeHours === "string" ? body.officeHours.trim() : DEFAULT_SITE_SETTINGS.officeHours;
    const address = typeof body.address === "string" ? body.address.trim() : DEFAULT_SITE_SETTINGS.address;

    const currency = typeof body.currency === "string" ? body.currency.trim() : DEFAULT_SITE_SETTINGS.currency;
    const depositPercent = typeof body.depositPercent === "number" ? body.depositPercent : parseInt(body.depositPercent) || DEFAULT_SITE_SETTINGS.depositPercent;
    const cancellationPolicy = typeof body.cancellationPolicy === "string" ? body.cancellationPolicy.trim() : DEFAULT_SITE_SETTINGS.cancellationPolicy;

    const tripAdvisorUrl = typeof body.tripAdvisorUrl === "string" ? body.tripAdvisorUrl.trim() : DEFAULT_SITE_SETTINGS.tripAdvisorUrl;
    const googleReviewsUrl = typeof body.googleReviewsUrl === "string" ? body.googleReviewsUrl.trim() : DEFAULT_SITE_SETTINGS.googleReviewsUrl;
    const instagramUrl = typeof body.instagramUrl === "string" ? body.instagramUrl.trim() : DEFAULT_SITE_SETTINGS.instagramUrl;
    const facebookUrl = typeof body.facebookUrl === "string" ? body.facebookUrl.trim() : DEFAULT_SITE_SETTINGS.facebookUrl;
    const youtubeUrl = typeof body.youtubeUrl === "string" ? body.youtubeUrl.trim() : DEFAULT_SITE_SETTINGS.youtubeUrl;
    const tiktokUrl = typeof body.tiktokUrl === "string" ? body.tiktokUrl.trim() : DEFAULT_SITE_SETTINGS.tiktokUrl;

    const announcementEnabled = typeof body.announcementEnabled === "boolean" ? body.announcementEnabled : DEFAULT_SITE_SETTINGS.announcementEnabled;
    const announcementText = typeof body.announcementText === "string" ? body.announcementText.trim() : DEFAULT_SITE_SETTINGS.announcementText;
    const metaTitle = typeof body.metaTitle === "string" ? body.metaTitle.trim() : DEFAULT_SITE_SETTINGS.metaTitle;
    const metaDescription = typeof body.metaDescription === "string" ? body.metaDescription.trim() : DEFAULT_SITE_SETTINGS.metaDescription;

    const updatePayload: SiteSettingsData = {
      id: 1,
      companyBrand,
      sltdaReg,
      hotline,
      whatsapp,
      email,
      officeHours,
      address,
      currency,
      depositPercent,
      cancellationPolicy,
      tripAdvisorUrl,
      googleReviewsUrl,
      instagramUrl,
      facebookUrl,
      youtubeUrl,
      tiktokUrl,
      announcementEnabled,
      announcementText,
      metaTitle,
      metaDescription,
    };

    const db = prisma as unknown as { siteSettings?: SiteSettingsDelegate };

    if (db.siteSettings?.upsert) {
      const saved = await db.siteSettings.upsert({
        where: { id: 1 },
        update: updatePayload,
        create: updatePayload,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Settings saved successfully",
          data: saved,
        },
        { status: 200 }
      );
    }

    // Raw SQL Fallback
    await prisma.$executeRawUnsafe(
      `INSERT INTO site_settings (
         id, companyBrand, sltdaReg, hotline, whatsapp, email, officeHours, address,
         currency, depositPercent, cancellationPolicy,
         tripAdvisorUrl, googleReviewsUrl, instagramUrl, facebookUrl, youtubeUrl, tiktokUrl,
         announcementEnabled, announcementText, metaTitle, metaDescription, updatedAt
       ) VALUES (
         1, ?, ?, ?, ?, ?, ?, ?,
         ?, ?, ?,
         ?, ?, ?, ?, ?, ?,
         ?, ?, ?, ?, NOW(3)
       ) ON DUPLICATE KEY UPDATE
         companyBrand = VALUES(companyBrand),
         sltdaReg = VALUES(sltdaReg),
         hotline = VALUES(hotline),
         whatsapp = VALUES(whatsapp),
         email = VALUES(email),
         officeHours = VALUES(officeHours),
         address = VALUES(address),
         currency = VALUES(currency),
         depositPercent = VALUES(depositPercent),
         cancellationPolicy = VALUES(cancellationPolicy),
         tripAdvisorUrl = VALUES(tripAdvisorUrl),
         googleReviewsUrl = VALUES(googleReviewsUrl),
         instagramUrl = VALUES(instagramUrl),
         facebookUrl = VALUES(facebookUrl),
         youtubeUrl = VALUES(youtubeUrl),
         tiktokUrl = VALUES(tiktokUrl),
         announcementEnabled = VALUES(announcementEnabled),
         announcementText = VALUES(announcementText),
         metaTitle = VALUES(metaTitle),
         metaDescription = VALUES(metaDescription),
         updatedAt = NOW(3)`,
      companyBrand,
      sltdaReg,
      hotline,
      whatsapp,
      email,
      officeHours,
      address,
      currency,
      depositPercent,
      cancellationPolicy,
      tripAdvisorUrl,
      googleReviewsUrl,
      instagramUrl,
      facebookUrl,
      youtubeUrl,
      tiktokUrl,
      announcementEnabled ? 1 : 0,
      announcementText,
      metaTitle,
      metaDescription
    );

    return NextResponse.json(
      {
        success: true,
        message: "Settings saved successfully",
        data: updatePayload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update settings",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
