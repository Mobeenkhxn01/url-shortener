import { prisma } from "@/lib/prisma";
import { shortenSchema } from "@/lib/validations";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const EXPIRY_MAP: Record<string, number | null> = {
  never: null,
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = shortenSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { url: originalUrl, customSlug, expiresIn } = parsed.data;

    const cookieStore = await cookies();
    let sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      sessionId = nanoid();
      cookieStore.set("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "lax",
      });
    }

    // Custom slug collision check
    if (customSlug) {
      const existing = await prisma.url.findUnique({ where: { short: customSlug } });
      if (existing) {
        return NextResponse.json(
          { error: "Custom slug already taken. Try another." },
          { status: 409 }
        );
      }
    }

    const shortCode = customSlug || nanoid(6);

    const expiryMs = EXPIRY_MAP[expiresIn];
    const expiresAt = expiryMs ? new Date(Date.now() + expiryMs) : null;

    // Fetch page title in background
    let title: string | null = null;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(originalUrl, { signal: controller.signal });
      clearTimeout(timeout);
      const html = await res.text();
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (match) title = match[1].trim().slice(0, 100);
    } catch {
      // silently skip if fetch fails
    }

    const shortened = await prisma.url.create({
      data: {
        original: originalUrl,
        short: shortCode,
        sessionId,
        expiresAt,
        title,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;

    return NextResponse.json({
      short: shortened.short,
      shortUrl: `${baseUrl}/${shortened.short}`,
      title: shortened.title,
      expiresAt: shortened.expiresAt,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
