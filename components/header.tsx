"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  PlayCircle,
  Menu,
  Home,
  HelpCircle,
  Shield,
  BookOpen,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/privacy", label: "Privasi", icon: Shield },
  { href: "/guide", label: "Panduan", icon: BookOpen },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-foreground/80"
        >
          <PlayCircle className="h-7 w-7 text-primary" />
          <span>
            Snap<span className="text-muted-foreground">-Tok</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                href="/"
                className="flex items-center gap-2 text-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                <PlayCircle className="h-7 w-7 text-primary" />
                <span>
                  Snap<span className="text-muted-foreground">-Tok</span>
                </span>
              </Link>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
