import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get sessionId from cookies
    const sessionId = (await cookies()).get("sessionId")?.value;
    if (!sessionId) return NextResponse.json([]);

    // Fetch only URLs created by this session
    const urls = await prisma.url.findMany({
      where: { sessionId },
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
