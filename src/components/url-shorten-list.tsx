"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Url = {
  originalUrl: string;
  shortUrl: string;
  views: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [copy, setCopy] = useState<string>("");

  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      if (!response.ok) {
        console.error("Server returned error:", response.status);
        return;
      }
      const data: Url[] = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(true);
      setCopy(url);
      setTimeout(() => {
        setCopiedUrl(false);
        setCopy("");
      }, 2000);
    });
    console.log("Copied to clipboard:", url);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent URLs</h2>

      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <ul className="space-y-2">
          {urls.map((url) => (
            <li
              key={url.shortUrl}
              className="flex items-center gap-2 justify-between p-4 border rounded"
            >
              <Link
                href={url.shortUrl}
                target="_blank"
                className="text-blue-500 break-all"
              >
                {url.shortUrl}
              </Link>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted"
                  onClick={() => handleCopy(url.shortUrl)}
                >
                  {copiedUrl && copy==url.shortUrl ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy</span>
                </Button>

                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <EyeIcon className="h-4 w-4" />
                  {url.views} views
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
