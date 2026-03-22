import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Download, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Super Cepat",
    description: "Proses download video Douyin hanya dalam hitungan detik",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Tanpa virus, malware, atau software yang perlu diinstall",
  },
  {
    icon: Download,
    title: "Tanpa Watermark",
    description: "Video berkualitas tinggi tanpa logo Douyin",
  },
  {
    icon: Globe,
    title: "Konten China",
    description: "Akses dan download konten eksklusif dari platform Douyin",
  },
];

export function DouyinFeatures() {
  return (
    <section className="py-16 bg-red-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-balance">
          Mengapa Memilih SnapYin?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-red-100 bg-white transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 rounded-full bg-red-100 p-4">
                    <Icon className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
