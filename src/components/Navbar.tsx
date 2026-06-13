import { useEffect, useState } from "react";
import { List, X, InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import { BRAND, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:h-20">
        {/* Wordmark */}
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold uppercase tracking-tightest text-ink">
            Liang Yi
          </span>
          <span className="font-serif text-base text-accent">{BRAND.chinese}</span>
        </a>

        {/* Center links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-4 md:flex">
          <a href="#" aria-label="Instagram" className="text-ink/60 transition-colors hover:text-ink">
            <InstagramLogo size={18} weight="regular" />
          </a>
          <a href="#" aria-label="Facebook" className="text-ink/60 transition-colors hover:text-ink">
            <FacebookLogo size={18} weight="regular" />
          </a>
          <Button as="a" href="#book" size="sm" variant="solid">
            {BRAND.cta}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-line bg-bg/95 backdrop-blur-md">
          <nav className="mx-auto flex max-w-site flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-2xl uppercase tracking-tightest text-ink"
              >
                {link.label}
              </a>
            ))}
            <Button as="a" href="#book" className="mt-4 w-full">
              {BRAND.cta}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
