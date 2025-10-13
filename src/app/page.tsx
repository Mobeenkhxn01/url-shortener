"use client";

import UrlShortenForm from "@/components/url-shorten-form";
import UrlList from "@/components/url-shorten-list";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState<string>(Date.now().toString());
  const handleUrlAdded = () => setRefreshKey(Date.now().toString());

  return (
    <main className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-white text-gray-800">
      
      <section className="w-full max-w-4xl text-center px-6 pt-20 pb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          Simple & Fast URL Shortener 
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your long and messy links into short, memorable URLs in seconds. No sign-up required. 100% free & secure.
        </p>
        <div className="max-w-2xl mx-auto space-y-4">
          <UrlShortenForm onUrlAdded={handleUrlAdded} />
          <UrlList refreshKey={refreshKey} />
        </div>
      </section>


      <section className="w-full max-w-5xl px-6 py-14 bg-white border-y">
        <h2 className="text-3xl font-bold text-center mb-8">✨ Features You’ll Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">🚀 Instant Shortening</h3>
            <p className="text-gray-600">Paste your URL and get a short link in less than 2 seconds.</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">📊 Click Tracking</h3>
            <p className="text-gray-600">Get real-time click analytics (coming soon).</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">🔐 Secure & Free</h3>
            <p className="text-gray-600">All links are secured with HTTPS. No account required.</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-8">🧑‍💻 How It Works</h2>
        <ol className="text-gray-700 space-y-4 text-lg">
          <li>Paste your long URL in the input box above.</li>
          <li>Click <span className="font-semibold">“Shorten URL”</span>.</li>
          <li>Copy & share the short link anywhere.</li>
          <li>Users click → redirected to your original URL.</li>
        </ol>
      </section>

      <section className="w-full max-w-4xl px-6 py-14 bg-gray-50 border-y">
        <h2 className="text-3xl font-bold text-center mb-6">📚 Why Short URLs Matter</h2>
        <article className="prose prose-lg max-w-none text-gray-700">
          <p>Short URLs look cleaner, are easier to share, and improve your brand image.</p>
          <p>Example: <code>https://shrt-rho.vercel.app/abc123</code> is way easier than a long messy link.</p>
          <p>Short URLs also let you track clicks and engagement, making them a powerful marketing tool.</p>
          <p>Start shortening today and improve your link-sharing game 🚀.</p>
        </article>
      </section>

      <footer className="w-full border-t py-8 text-center text-gray-500 text-sm">
        <div className="space-x-4 mb-2">
          <a href="/privacy" className="hover:text-indigo-600">Privacy</a>
          <a href="/terms" className="hover:text-indigo-600">Terms</a>
          <a href="/contact" className="hover:text-indigo-600">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Shortify — Made with ❤️ by 
          <a href="https://github.com/Mobeenkhxn01" className="text-indigo-600 hover:underline ml-1">Mobeen Khan</a>
        </p>
      </footer>
    </main>
  );
}
