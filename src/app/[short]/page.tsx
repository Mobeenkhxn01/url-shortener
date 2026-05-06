import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: Promise<{ short: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { short } = await params;

  const url = await prisma.url.findUnique({ where: { short } });

  if (!url) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white gap-4">
        <div className="text-6xl">🔗</div>
        <h1 className="text-3xl font-bold">Link not found</h1>
        <p className="text-zinc-400">This short URL does not exist or has been deleted.</p>
        <a href="/" className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition">
          Create your own →
        </a>
      </div>
    );
  }

  // Expired check
  if (url.expiresAt && new Date() > url.expiresAt) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white gap-4">
        <div className="text-6xl">⏰</div>
        <h1 className="text-3xl font-bold">Link expired</h1>
        <p className="text-zinc-400">This link has expired and is no longer available.</p>
        <a href="/" className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition">
          Create a new link →
        </a>
      </div>
    );
  }

  // Parse device & referrer
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const referrer = headersList.get("referer") || null;

  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
  const device = isMobile ? "mobile" : "desktop";

  // Fire analytics + increment — non-blocking
  prisma.url
    .update({
      where: { short },
      data: {
        visits: { increment: 1 },
        clicks: {
          create: {
            device,
            referrer,
          },
        },
      },
    })
    .catch(console.error);

  redirect(url.original);
}
