"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { id: "mengapa-kami", label: "Mengapa Kami" },
  { id: "fitur", label: "Fitur" },
  { id: "cara-kerja", label: "Cara Kerja" },
  { id: "download", label: "Download" },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 border-b border-border/40 backdrop-blur-md transition-colors",
        open ? "bg-background" : "bg-background/80"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src="/apps_logo.svg"
              alt="WarisTech Logo"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
            <p className="text-2xl font-bold tracking-tight text-[#215571] dark:text-[#28938E]">
              WarisTech
            </p>
          </Link>
          {/* Desktop nav — anchor links dengan scroll-spy */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  active === link.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              render={<Link href="/#download">Download App</Link>}
            />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  active === link.id ? "text-foreground bg-muted/60" : "text-muted-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                size="sm"
                render={<Link href="/#download">Download App</Link>}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
