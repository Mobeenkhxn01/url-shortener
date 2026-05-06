"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link2, Zap, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { shortenSchema } from "@/lib/validations";

interface ShortenResult {
  shortUrl: string;
  title?: string;
  expiresAt?: string;
}

export default function UrlShortenForm({ onUrlAdded }: { onUrlAdded: (result: ShortenResult) => void }) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [expiresIn, setExpiresIn] = useState<"never" | "1h" | "24h" | "7d" | "30d">("never");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const result = shortenSchema.safeParse({ url, customSlug, expiresIn });
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const e of result.error.issues) {
        errs[e.path[0] as string] = e.message;
      }
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customSlug: customSlug || undefined, expiresIn }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to shorten URL");
        return;
      }

      setUrl("");
      setCustomSlug("");
      setExpiresIn("never");
      setShowAdvanced(false);
      toast.success("Link created!");
      onUrlAdded(data);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Main URL input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-very-long-url.com/goes/here"
            className="w-full h-12 pl-10 pr-4 bg-[#1e1e2e] border border-[#27272a] rounded-xl text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition"
            required
          />
          {errors.url && <p className="text-xs text-red-400 mt-1 text-left">{errors.url}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-12 px-5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Zap className="h-4 w-4" />
          )}
          Shorten
        </button>
      </div>

      {/* Advanced toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced((v) => !v)}
        className="text-xs text-zinc-500 hover:text-violet-400 flex items-center gap-1 transition"
      >
        {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        Advanced options
      </button>

      {/* Advanced panel */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#111118] border border-[#27272a] rounded-xl fade-in">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Custom slug (optional)</label>
            <div className="flex items-center bg-[#1e1e2e] border border-[#27272a] rounded-lg overflow-hidden focus-within:border-violet-500 transition">
              <span className="text-xs text-zinc-600 pl-3 select-none whitespace-nowrap">snip.link/</span>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="my-link"
                className="flex-1 h-9 px-2 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
            {errors.customSlug && <p className="text-xs text-red-400 mt-1">{errors.customSlug}</p>}
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Link expiry</label>
            <select
              value={expiresIn}
              onChange={(e) => setExpiresIn(e.target.value as typeof expiresIn)}
              className="w-full h-9 px-3 bg-[#1e1e2e] border border-[#27272a] rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-violet-500 transition appearance-none cursor-pointer"
            >
              <option value="never">Never expires</option>
              <option value="1h">1 hour</option>
              <option value="24h">24 hours</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
}
