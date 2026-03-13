import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snaptok - Download TikTok Tanpa Watermark Gratis",
  description:
    "Download video TikTok tanpa watermark GRATIS. Unduh TikTok HD, MP3, gambar - Cepat & Aman tanpa registrasi.",
  keywords: [
    "tiktok downloader",
    "download tiktok",
    "tanpa watermark",
    "video tiktok",
    "mp3 tiktok",
  ],
  openGraph: {
    title: "Snaptok - Download TikTok Tanpa Watermark",
    description: "Download TikTok tanpa watermark gratis",
    url: "https://snaptok.my.id",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snaptok - Download TikTok",
    description: "Unduh video TikTok tanpa watermark gratis",
  },
    generator: 'snaptok.my.id'
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
