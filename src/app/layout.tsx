import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snip — Modern URL Shortener",
  description:
    "Snip turns long URLs into short, trackable links. Analytics, custom slugs, expiry, and more.",
  keywords: ["url shortener", "link shortener", "short url", "analytics"],
  openGraph: {
    title: "Snip — Modern URL Shortener",
    description: "Transform long URLs into sharp, trackable links.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111118",
              color: "#f4f4f5",
              border: "1px solid #27272a",
              borderRadius: "0.75rem",
              fontSize: "0.875rem",
            },
            success: { iconTheme: { primary: "#7c3aed", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
