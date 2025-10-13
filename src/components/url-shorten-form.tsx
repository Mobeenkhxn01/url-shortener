"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

export default function UrlShortenForm({ onUrlAdded }: { onUrlAdded: () => void }) {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to shorten URL");
      await res.json();
      setUrl("");
      toast.success("URL shortened successfully!");
      onUrlAdded(); // refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Error shortening URL");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          value={url}
          type="url"
          placeholder="Enter URL to shorten"
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 h-12"
        />
        <Button type="submit" className="h-12 px-6">
          Shorten URL
        </Button>
      </div>
    </form>
  );
}
