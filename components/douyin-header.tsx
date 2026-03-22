"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Clapperboard, Menu, Home, HelpCircle, Shield, BookOpen, FileText } from "lucide-react";

const navLinks = [
  { href: "/douyin", label: "Beranda", icon: Home },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/privacy", label: "Privasi", icon: Shield },
  { href: "/guide", label: "Panduan", icon: BookOpen },
  { href: "/docs", label: "Docs API", icon: FileText },
];

export function DouyinHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-200/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/douyin"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-colors hover:text-gray-700"
        >
          <Clapperboard className="h-7 w-7 text-red-500" />
          <span>
            Snap<span className="text-red-500">Yin</span>
          </span>
        </Link>

        {/* Platform switcher pill */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 text-sm">
          <Link
            href="/"
            className="rounded-full px-4 py-1.5 font-medium text-gray-500 transition-colors hover:bg-white hover:text-gray-900"
          >
            🎵 TikTok
          </Link>
          <span className="rounded-full px-4 py-1.5 font-medium bg-red-500 text-white">
            🎬 Douyin
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <div className="flex flex-col gap-6 pt-6">
              <Link
                href="/douyin"
                className="flex items-center gap-2 text-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                <Clapperboard className="h-7 w-7 text-red-500" />
                <span>Snap<span className="text-red-500">Yin</span></span>
              </Link>

              {/* Platform switcher mobile */}
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 text-sm w-fit">
                <Link
                  href="/"
                  className="rounded-full px-4 py-1.5 font-medium text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  🎵 TikTok
                </Link>
                <span className="rounded-full px-4 py-1.5 font-medium bg-red-500 text-white">
                  🎬 Douyin
                </span>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
