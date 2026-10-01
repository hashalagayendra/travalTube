import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const SESSION_SECRET =
  process.env.SESSION_SECRET || "traveltube_fallback_session_secret_2026_super_secure_key";
const SESSION_COOKIE_NAME = "traveltube_admin_session";

function verifySessionToken(token: string): { adminId: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [adminIdStr, expiresAtStr, signature] = parts;
    const payload = `${adminIdStr}.${expiresAtStr}`;
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payload)
      .digest("hex");

    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return null;
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return null;
    }

    const adminId = parseInt(adminIdStr, 10);
    if (isNaN(adminId)) return null;

    return { adminId };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { authenticated: false, message: "No active session found" },
        { status: 401 }
      );
    }

    const session = verifySessionToken(sessionCookie.value);

    if (!session) {
      return NextResponse.json(
        { authenticated: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // Retrieve admin details from database (omitting password)
    const admin = await prisma.admin.findUnique({
      where: { id: session.adminId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { authenticated: false, message: "Admin record no longer exists" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        admin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin /me route error:", error);
    return NextResponse.json(
      { authenticated: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional logout handler to clear the session cookie
export async function DELETE() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
