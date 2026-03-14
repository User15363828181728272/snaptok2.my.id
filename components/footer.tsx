import Link from "next/link";
import { PlayCircle } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Beranda" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/guide", label: "Panduan" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary-foreground"
          >
            <PlayCircle className="h-7 w-7" />
            <span>
              Snap<span className="opacity-70">Tok</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Disclaimer */}
          <div className="max-w-2xl text-center text-sm text-primary-foreground/60">
            <p className="mb-2">
              <strong className="text-primary-foreground">Disclaimer:</strong>{" "}
              Snaptok tidak berafiliasi dengan TikTok. Kami menyediakan
              layanan download video untuk penggunaan pribadi. Harap hormati hak
              cipta konten kreator.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Snaptok. Semua hak
              dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
