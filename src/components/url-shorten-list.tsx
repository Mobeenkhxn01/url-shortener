"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CopyIcon, Check, EyeIcon } from "lucide-react";
import { toast } from "react-hot-toast";

type Url = {
  originalUrl: string;
  shortUrl: string;
  views: number;
};

export default function UrlList({ refreshKey }: { refreshKey: string }) {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string>("");

  const fetchUrls = async () => {
    try {
      const res = await fetch("/api/urls"); // filtered per session
      if (!res.ok) throw new Error("Failed to fetch URLs");
      const data: Url[] = await res.json();
      setUrls(data);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching URLs");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [refreshKey]);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedUrl(link);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedUrl(""), 2000);
  };

  if (!urls.length)
    return <p className="text-gray-500 mt-4">You have not shortened any URLs yet.</p>;

  return (
    <ul className="space-y-3 mt-4">
      {urls.map((u) => (
        <li key={u.shortUrl} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <a href={u.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 break-all max-w-[70%]">
            {u.shortUrl}
          </a>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => handleCopy(u.shortUrl)}>
              {copiedUrl === u.shortUrl ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            </Button>
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <EyeIcon className="h-4 w-4" /> {u.views}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
