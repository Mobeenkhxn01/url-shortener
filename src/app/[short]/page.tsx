import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: Promise<{ short: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { short } = await params;

  const url = await prisma.url.findUnique({
    where: { short },
  });

  if (!url) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">URL not found</h1>
        <p>The short URL you tried does not exist.</p>
      </div>
    );
  }

  await prisma.url.update({
    where: { short },
    data: { visits: { increment: 1 } },
  });

  redirect(url.original);
}
