import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Snaptok",
  description: "Pertanyaan yang sering diajukan tentang Snaptok - Download TikTok tanpa watermark",
};

const faqItems = [
  {
    question: "Apa itu Snaptok?",
    answer:
      "Snaptok adalah layanan online gratis yang memungkinkan Anda mengunduh video TikTok tanpa watermark. Kami menyediakan download video HD, audio MP3, dan gambar dari slideshow TikTok.",
  },
  {
    question: "Apakah layanan ini gratis?",
    answer:
      "Ya, Snaptok 100% gratis untuk digunakan. Tidak ada biaya tersembunyi atau langganan yang diperlukan. Anda dapat mengunduh video sebanyak yang Anda mau tanpa batasan.",
  },
  {
    question: "Bagaimana cara mengunduh video TikTok?",
    answer:
      "Caranya sangat mudah: 1) Buka aplikasi TikTok dan temukan video yang ingin diunduh, 2) Salin link video tersebut, 3) Tempelkan link di kolom yang tersedia di halaman utama, 4) Klik tombol 'Unduh Sekarang', 5) Pilih format yang diinginkan (Video HD, MP3, atau Gambar).",
  },
  {
    question: "Apakah aman menggunakan layanan ini?",
    answer:
      "Ya, layanan kami 100% aman. Kami tidak menyimpan data pribadi Anda, tidak memerlukan login atau registrasi untuk mengunduh, dan tidak menginstall software apapun di perangkat Anda. Website kami juga bebas dari virus dan malware.",
  },
  {
    question: "Format apa saja yang tersedia?",
    answer:
      "Kami menyediakan beberapa format download: Video HD tanpa watermark (.mp4), Audio/Musik (.mp3), dan Gambar dari slideshow (.jpg). Semua dalam kualitas terbaik yang tersedia.",
  },
  {
    question: "Apakah bisa download di HP?",
    answer:
      "Tentu saja! Snaptok dapat diakses dari berbagai perangkat termasuk smartphone Android, iPhone, tablet, laptop, dan komputer desktop. Cukup buka website kami melalui browser favorit Anda.",
  },
  {
    question: "Mengapa video tidak bisa diunduh?",
    answer:
      "Ada beberapa kemungkinan: 1) Video bersifat privat atau dihapus oleh pembuat, 2) Link yang dimasukkan tidak valid, 3) Terjadi gangguan server sementara. Pastikan Anda menggunakan link yang benar dan video masih tersedia di TikTok.",
  },
  {
    question: "Apakah kreator TikTok tahu jika videonya diunduh?",
    answer:
      "Tidak, kreator TikTok tidak akan menerima notifikasi jika Anda mengunduh video mereka melalui layanan kami. Namun, kami menyarankan untuk selalu menghormati hak cipta dan memberikan kredit kepada kreator asli.",
  },
  {
    question: "Berapa batas download per hari?",
    answer:
      "Tidak ada batasan! Anda dapat mengunduh video sebanyak yang Anda inginkan tanpa ada limit harian atau bulanan.",
  },
  {
    question: "Bagaimana cara menghubungi support?",
    answer:
      "Jika Anda memiliki pertanyaan atau mengalami masalah, Anda dapat menghubungi kami melalui halaman kontak atau media sosial kami. Tim support kami akan dengan senang hati membantu Anda.",
  },
];

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-6">
              <HelpCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-muted-foreground text-lg">
              Temukan jawaban untuk pertanyaan umum tentang layanan kami
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 data-[state=open]:bg-muted/50"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 bg-muted/50 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-2">
              Masih punya pertanyaan?
            </h2>
            <p className="text-muted-foreground mb-4">
              Jangan ragu untuk menghubungi tim support kami
            </p>
            <a
              href="mailto:defandryannn@gmail.com"
              className="text-primary font-medium hover:underline"
            >
              defandryannn@gmail.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
