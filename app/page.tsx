import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DownloadForm } from "@/components/download-form";
import { Features } from "@/components/features";
import { Stats } from "@/components/stats";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
              Download TikTok Tanpa{" "}
              <span className="bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
                Watermark
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
              <strong className="text-foreground">Snaptok</strong> - Unduh video TikTok HD,
              MP3 audio, dan gambar tanpa logo. Cepat, Aman, & Gratis tanpa
              registrasi.
            </p>

            <Stats />
          </div>
        </section>

        {/* Download Form Section */}
        <section className="pb-16 px-4">
          <div className="container mx-auto">
            <DownloadForm />
          </div>
        </section>

        {/* Features Section */}
        <Features />
      </main>

      <Footer />
    </div>
  );
}
