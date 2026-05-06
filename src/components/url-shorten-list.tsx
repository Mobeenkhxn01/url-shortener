"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Copy, Check, Eye, Trash2, ExternalLink, Clock, AlertCircle } from "lucide-react";

type UrlItem = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  visits: number;
  title: string | null;
  createdAt: string;
  expiresAt: string | null;
  isExpired: boolean;
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function expiryLabel(dateStr: string | null) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 1) return "< 1h left";
  if (hrs < 24) return `${hrs}h left`;
  return `${Math.floor(hrs / 24)}d left`;
}

export default function UrlList({ refreshKey }: { refreshKey: number }) {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchUrls = async () => {
    try {
      const res = await fetch("/api/urls");
      if (!res.ok) throw new Error();
      const data: UrlItem[] = await res.json();
      setUrls(data);
    } catch {
      toast.error("Error loading your links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [refreshKey]);

  const handleCopy = (url: UrlItem) => {
    navigator.clipboard.writeText(url.shortUrl);
    setCopiedId(url.id);
    toast.success("Copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (url: UrlItem) => {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await fetch(`/api/urls?short=${url.shortCode}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setUrls((prev) => prev.filter((u) => u.id !== url.id));
      toast.success("Link deleted", { id: toastId });
    } catch {
      toast.error("Failed to delete", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="space-y-3 mt-6">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 bg-[#111118] border border-[#27272a] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!urls.length) return null;

  return (
    <div className="mt-6 space-y-3">
      <p className="text-xs text-zinc-500 text-left font-medium uppercase tracking-wider">
        Your links ({urls.length})
      </p>
      {urls.map((u) => (
        <div
          key={u.id}
          className={`group relative p-4 rounded-xl border transition fade-in ${
            u.isExpired
              ? "bg-[#111118] border-[#27272a] opacity-60"
              : "bg-[#111118] border-[#27272a] hover:border-violet-500/40"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <a
                  href={u.isExpired ? undefined : u.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 font-mono text-sm hover:text-violet-300 transition font-medium truncate"
                >
                  {u.shortUrl.replace(/^https?:\/\//, "")}
                </a>
                {u.isExpired && (
                  <span className="flex items-center gap-1 text-[10px] text-red-400 border border-red-400/30 px-1.5 py-0.5 rounded-full">
                    <AlertCircle className="h-2.5 w-2.5" /> Expired
                  </span>
                )}
              </div>

              {u.title && (
                <p className="text-xs text-zinc-400 truncate mb-1">{u.title}</p>
              )}

              <div className="flex items-center gap-2 text-[11px] text-zinc-600 flex-wrap">
                <span className="truncate max-w-[200px]" title={u.originalUrl}>
                  {u.originalUrl}
                </span>
                <span>·</span>
                <span className="shrink-0 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {timeAgo(u.createdAt)}
                </span>
                {u.expiresAt && !u.isExpired && (
                  <>
                    <span>·</span>
                    <span className="text-amber-500">{expiryLabel(u.expiresAt)}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="flex items-center gap-1 text-xs text-zinc-500 mr-2">
                <Eye className="h-3 w-3" /> {u.visits}
              </span>

              <button
                onClick={() => handleCopy(u)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-violet-500/20 text-zinc-500 hover:text-violet-400 transition"
                title="Copy"
              >
                {copiedId === u.id ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>

              <a
                href={u.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition"
                title="Visit original"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={() => handleDelete(u)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-500/20 text-zinc-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
