import { DouyinHeader } from "@/components/douyin-header";
import { DouyinFooter } from "@/components/douyin-footer";
import { DouyinForm } from "@/components/douyin-form";
import { DouyinFeatures } from "@/components/douyin-features";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnapYin - Download Douyin Tanpa Watermark Gratis",
  description:
    "Download video Douyin (抖音) tanpa watermark GRATIS. Unduh video HD dari Douyin - Cepat & Aman tanpa registrasi.",
  keywords: [
    "douyin downloader",
    "download douyin",
    "tanpa watermark",
    "video douyin",
    "抖音 download",
  ],
  openGraph: {
    title: "SnapYin - Download Douyin Tanpa Watermark",
    description: "Download Douyin tanpa watermark gratis",
    url: "https://snaptok.my.id/douyin",
    type: "website",
  },
};

const stats = [
  { value: "100%", label: "Gratis" },
  { value: "No", label: "Watermark" },
  { value: "HD", label: "Quality" },
  { value: "Fast", label: "Process" },
];

export default function DouyinPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DouyinHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-red-50/60 to-white">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600 mb-6">
              🎬 Douyin (抖音) Downloader
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
              Download Douyin Tanpa{" "}
              <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                Watermark
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
              <strong className="text-gray-800">SnapYin</strong> - Unduh video Douyin (抖音)
              tanpa logo watermark. Cepat, Aman, & Gratis tanpa registrasi.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-red-500">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Form Section */}
        <section className="pb-16 px-4">
          <div className="container mx-auto">
            <DouyinForm />
          </div>
        </section>

        {/* Features Section */}
        <DouyinFeatures />
      </main>

      <DouyinFooter />
    </div>
  );
}
