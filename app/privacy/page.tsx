import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Cookie, Mail, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Snaptok",
  description: "Kebijakan privasi dan ketentuan penggunaan Snaptok",
};

const sections = [
  {
    icon: Eye,
    title: "Informasi yang Kami Kumpulkan",
    content: `Kami mengumpulkan informasi minimal yang diperlukan untuk menyediakan layanan kami:
    
• URL video TikTok yang Anda masukkan untuk diunduh
• Data analitik anonim seperti jumlah pengunjung dan halaman yang dikunjungi
• Informasi teknis seperti jenis browser dan sistem operasi

Kami TIDAK mengumpulkan:
• Informasi pribadi seperti nama, email, atau nomor telepon (kecuali Anda mendaftar akun)
• Data login TikTok Anda
• Riwayat browsing Anda di luar situs kami`,
  },
  {
    icon: Lock,
    title: "Keamanan Data",
    content: `Keamanan data Anda adalah prioritas kami:

• Semua koneksi ke website kami dienkripsi menggunakan SSL/TLS
• Kami tidak menyimpan video yang Anda unduh di server kami
• URL yang Anda masukkan hanya diproses sementara dan tidak disimpan secara permanen
• Kami menggunakan infrastruktur cloud yang aman dan terpercaya`,
  },
  {
    icon: Cookie,
    title: "Penggunaan Cookies",
    content: `Kami menggunakan cookies untuk:

• Meningkatkan pengalaman pengguna
• Mengingat preferensi Anda
• Analitik website untuk memahami bagaimana pengguna berinteraksi dengan layanan kami

Anda dapat mengelola preferensi cookies melalui pengaturan browser Anda. Menonaktifkan cookies mungkin mempengaruhi beberapa fitur website.`,
  },
  {
    icon: FileText,
    title: "Hak Cipta & Penggunaan",
    content: `Ketentuan penting mengenai hak cipta:

• Snaptok tidak memiliki video yang diunduh melalui layanan kami
• Pengguna bertanggung jawab penuh atas penggunaan konten yang diunduh
• Kami menyarankan untuk selalu menghormati hak cipta kreator konten
• Gunakan konten yang diunduh hanya untuk keperluan pribadi
• Jangan mendistribusikan ulang konten tanpa izin dari kreator asli`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-6">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Kebijakan Privasi
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Kami berkomitmen untuk melindungi privasi Anda. Halaman ini
              menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
              melindungi informasi Anda.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Terakhir diperbarui: Januari 2026
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <Card className="mt-8 border-border bg-muted/50">
            <CardContent className="p-8 text-center">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Hubungi Kami</h2>
              <p className="text-muted-foreground mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi kami,
                silakan hubungi kami di:
              </p>
              <a
                href="mailto:privacy@ssstiktok.soraa.my.id"
                className="text-primary font-medium hover:underline"
              >
                privacy@ssstiktok.soraa.my.id
              </a>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
            <h3 className="font-semibold mb-3">Perubahan Kebijakan</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan signifikan akan diumumkan melalui pemberitahuan di
              website kami. Dengan terus menggunakan layanan kami setelah
              perubahan tersebut, Anda menyetujui kebijakan privasi yang telah
              diperbarui.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
