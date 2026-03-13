import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Copy,
  Link as LinkIcon,
  Download,
  CheckCircle,
  Smartphone,
  Monitor,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan - Snaptok",
  description: "Cara download video TikTok tanpa watermark dengan mudah",
};

const steps = [
  {
    number: 1,
    title: "Buka Aplikasi TikTok",
    description:
      "Buka aplikasi TikTok di HP Anda atau kunjungi website TikTok. Temukan video yang ingin Anda unduh.",
    icon: Smartphone,
  },
  {
    number: 2,
    title: "Salin Link Video",
    description:
      'Klik tombol "Share" atau "Bagikan" pada video, lalu pilih "Salin Link" atau "Copy Link".',
    icon: Copy,
  },
  {
    number: 3,
    title: "Tempelkan Link",
    description:
      "Kembali ke Snaptok, tempelkan link video ke dalam kolom yang tersedia di halaman utama.",
    icon: LinkIcon,
  },
  {
    number: 4,
    title: "Unduh Video",
    description:
      'Klik tombol "Unduh Sekarang" dan tunggu proses selesai. Pilih format yang diinginkan (Video HD, MP3, atau Gambar).',
    icon: Download,
  },
  {
    number: 5,
    title: "Selesai!",
    description:
      "Video tanpa watermark akan terunduh ke perangkat Anda. Simpan dan bagikan sesuai kebutuhan.",
    icon: CheckCircle,
  },
];

const tips = [
  {
    title: "Pastikan Link Valid",
    description:
      "Gunakan link langsung dari TikTok. Link yang di-copy dari platform lain mungkin tidak berfungsi.",
  },
  {
    title: "Koneksi Stabil",
    description:
      "Pastikan koneksi internet Anda stabil untuk proses download yang lancar.",
  },
  {
    title: "Video Publik",
    description:
      "Hanya video publik yang dapat diunduh. Video privat tidak dapat diakses.",
  },
  {
    title: "Hormati Hak Cipta",
    description:
      "Gunakan video yang diunduh untuk keperluan pribadi dan selalu berikan kredit kepada kreator.",
  },
];

export default function GuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-6">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Panduan Penggunaan
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ikuti langkah-langkah sederhana berikut untuk mengunduh video
              TikTok tanpa watermark
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={index}
                  className="border-border overflow-hidden transition-all hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Step Number */}
                      <div className="flex items-center justify-center bg-primary/5 p-6 md:p-8 md:w-32">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                          {step.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:flex items-center justify-center rounded-lg bg-muted p-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Device Support */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Dapat Diakses dari Berbagai Perangkat
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Smartphone & Tablet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Android, iPhone, iPad - semua browser didukung
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Monitor className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Desktop & Laptop
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Windows, Mac, Linux - Chrome, Firefox, Safari, Edge
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Tips untuk Hasil Terbaik
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2 text-foreground">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="border-border bg-primary text-primary-foreground">
            <CardContent className="text-center p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Siap Mencoba?
              </h2>
              <p className="mb-6 opacity-90 max-w-md mx-auto">
                Download video TikTok favorit Anda sekarang juga. Gratis, cepat,
                dan tanpa registrasi!
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                <Link href="/">
                  Mulai Download
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
