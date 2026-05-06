"use client";

import { useState } from "react";
import UrlShortenForm from "@/components/url-shorten-form";
import UrlList from "@/components/url-shorten-list";
import { Github, Link2, Zap, BarChart2, ShieldCheck, Clock } from "lucide-react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100 relative overflow-x-hidden">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-700/8 blur-[100px]" />
        <div className="grid-dots absolute inset-0 opacity-20" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <Link2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight">Snip</span>
        </div>
        <a
          href="https://github.com/Mobeenkhxn01/url-shortener"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition px-3 py-1.5 border border-[#27272a] rounded-lg hover:border-zinc-600"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-violet-400 border border-violet-500/30 bg-violet-500/10 rounded-full px-3 py-1 mb-6">
          <Zap className="h-3 w-3" /> Free & open source
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
          Short links.{" "}
          <span className="shimmer">Sharp results.</span>
        </h1>

        <p className="text-zinc-400 text-base mb-10 max-w-md mx-auto leading-relaxed">
          Snip turns messy URLs into clean, trackable links — with custom slugs, expiry, and click analytics.
        </p>

        {/* Card */}
        <div className="bg-[#111118] border border-[#27272a] rounded-2xl p-6 text-left shadow-xl shadow-black/40">
          <UrlShortenForm onUrlAdded={() => setRefreshKey((k) => k + 1)} />
          <UrlList refreshKey={refreshKey} />
        </div>

        {/* Stats bar */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-zinc-600">
          <span>No sign-up required</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Session-based history</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>HTTPS only</span>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <Zap className="h-4 w-4" />,
              title: "Instant",
              desc: "Links created in milliseconds. No friction.",
            },
            {
              icon: <BarChart2 className="h-4 w-4" />,
              title: "Click Tracking",
              desc: "Track visits per link with device data.",
            },
            {
              icon: <Clock className="h-4 w-4" />,
              title: "Expiry Control",
              desc: "Set links to expire in 1h, 24h, 7d, or 30d.",
            },
            {
              icon: <ShieldCheck className="h-4 w-4" />,
              title: "Custom Slugs",
              desc: "Choose your own memorable short code.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-5 bg-[#111118] border border-[#27272a] rounded-xl hover:border-violet-500/30 transition"
            >
              <div className="h-8 w-8 bg-violet-500/15 text-violet-400 rounded-lg flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#27272a] py-6 text-center text-xs text-zinc-600">
        <p>
          Built by{" "}
          <a
            href="https://github.com/Mobeenkhxn01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline"
          >
            Mobeen Khan
          </a>{" "}
          · Snip © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
