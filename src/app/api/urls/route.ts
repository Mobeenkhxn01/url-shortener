import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await prisma.url.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { original: true, short: true, visits: true },
    });

    // Map fields for frontend and create full short URL
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
