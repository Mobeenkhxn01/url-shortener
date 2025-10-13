import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const sessionId = (await cookies()).get("sessionId")?.value;
    if (!sessionId) return NextResponse.json([]);
    const urls = await prisma.url.findMany({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
      select: { original: true, short: true, visits: true },
    });

    const formattedUrls = urls.map((u) => ({
      originalUrl: u.original,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${u.short}`,
      views: u.visits,
    }));

    return NextResponse.json(formattedUrls);
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
