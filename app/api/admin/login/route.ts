import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SESSION_SECRET =
  process.env.SESSION_SECRET || "traveltube_fallback_session_secret_2026_super_secure_key";
const SESSION_COOKIE_NAME = "traveltube_admin_session";

function createSessionToken(adminId: number, rememberMe: boolean = false): {
  token: string;
  maxAge: number;
} {
  // 30 days if rememberMe is true, else 24 hours
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  const expiresAt = Date.now() + maxAge * 1000;
  const payload = `${adminId}.${expiresAt}`;
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  const token = `${payload}.${signature}`;

  return { token, maxAge };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { usernameOrEmail, password, rememberMe } = body;

    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Username/Email and Password are required" },
        { status: 400 }
      );
    }

    const trimmedIdentifier = String(usernameOrEmail).trim();

    // Find admin by username or email
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: trimmedIdentifier },
          { email: trimmedIdentifier },
        ],
      },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password against stored bcrypt hash
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate secure HMAC session token
    const { token, maxAge } = createSessionToken(admin.id, Boolean(rememberMe));

    const response = NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        admin: {
          id: admin.id,
          name: admin.name,
          username: admin.username,
          email: admin.email,
        },
      },
      { status: 200 }
    );

    // Set HttpOnly session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
