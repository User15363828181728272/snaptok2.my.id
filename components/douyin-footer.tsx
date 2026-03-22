import Link from "next/link";
import { Clapperboard } from "lucide-react";

const footerLinks = [
  { href: "/douyin", label: "Beranda" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/guide", label: "Panduan" },
  { href: "/docs", label: "Docs API" },
];

export function DouyinFooter() {
  return (
    <footer className="border-t border-red-200 bg-red-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link
            href="/douyin"
            className="flex items-center gap-2 text-xl font-bold text-white"
          >
            <Clapperboard className="h-7 w-7" />
            <span>
              Snap<span className="opacity-70">Yin</span>
            </span>
          </Link>

          {/* Platform switch link */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white/60">Platform lain:</span>
            <Link
              href="/"
              className="rounded-full border border-white/30 px-4 py-1.5 text-white/80 transition-colors hover:border-white hover:text-white"
            >
              🎵 TikTok Downloader
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Disclaimer */}
          <div className="max-w-2xl text-center text-sm text-white/60">
            <p className="mb-2">
              <strong className="text-white">Disclaimer:</strong>{" "}
              SnapYin tidak berafiliasi dengan Douyin (抖音) atau ByteDance. Kami menyediakan
              layanan download video untuk penggunaan pribadi. Harap hormati hak
              cipta konten kreator.
            </p>
            <p>
              &copy; {new Date().getFullYear()} SnapYin by Snaptok. Semua hak
              dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
