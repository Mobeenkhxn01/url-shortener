import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sessionId = (await cookies()).get("sessionId")?.value;
    if (!sessionId) return NextResponse.json([]);

    const urls = await prisma.url.findMany({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        original: true,
        short: true,
        visits: true,
        title: true,
        createdAt: true,
        expiresAt: true,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    const formatted = urls.map((u) => ({
      id: u.id,
      originalUrl: u.original,
      shortUrl: `${baseUrl}/${u.short}`,
      shortCode: u.short,
      visits: u.visits,
      title: u.title,
      createdAt: u.createdAt,
      expiresAt: u.expiresAt,
      isExpired: u.expiresAt ? new Date() > u.expiresAt : false,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const sessionId = (await cookies()).get("sessionId")?.value;
    if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const short = searchParams.get("short");
    if (!short) return NextResponse.json({ error: "Missing short code" }, { status: 400 });

    await prisma.url.deleteMany({ where: { short, sessionId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting URL:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
