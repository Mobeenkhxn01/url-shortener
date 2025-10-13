import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { cookies } from "next/headers"; // server-side cookie access
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const originalUrl = body.url;

    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Get or create a sessionId
    const cookieStore = cookies();
    let sessionId = (await cookieStore).get("sessionId")?.value;

    if (!sessionId) {
      sessionId = nanoid(); // generate new session ID
      (await cookieStore).set("sessionId", sessionId, { path: "/", maxAge: 60 * 60 * 24 * 30 }); // 30 days
    }

    const shortCode = nanoid(8);

    const shortenUrl = await prisma.url.create({
      data: {
        original: originalUrl,
        short: shortCode,
        sessionId,
      },
    });

    return NextResponse.json({ short: shortenUrl.short });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
