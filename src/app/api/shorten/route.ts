import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const originalUrl = body.url;

    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const shortCode = nanoid(8);

    const shortenUrl = await prisma.url.create({
      data: {
        original: originalUrl,
        short: shortCode,
      },
    });

    return NextResponse.json({ short: shortenUrl.short });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
    