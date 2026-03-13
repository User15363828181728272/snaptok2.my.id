import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Download, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Super Cepat",
    description: "Proses download hanya dalam hitungan detik tanpa delay",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Tanpa virus, malware, atau software yang perlu diinstall",
  },
  {
    icon: Download,
    title: "Tanpa Watermark",
    description: "Video HD berkualitas tinggi tanpa logo TikTok",
  },
  {
    icon: Smartphone,
    title: "Multi Platform",
    description: "Dapat diakses dari HP, tablet, maupun komputer",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-balance">
          Mengapa Memilih Snaptok?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border bg-card transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
