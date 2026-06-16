import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { List, X, InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import { BRAND, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";

const NAV_OFFSET = 72;

function scrollToEl(el: HTMLElement) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

/** Scroll to a section, retrying until it mounts (handles post-navigation timing). */
function scrollToHash(hash: string, attempts = 20) {
  if (!hash) {
    window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0 });
    return;
  }
  const el = document.getElementById(hash);
  if (el) {
    scrollToEl(el);
  } else if (attempts > 0) {
    requestAnimationFrame(() => scrollToHash(hash, attempts - 1));
  }
}

export default function Navbar({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Light treatment when sitting over the dark hero and not yet scrolled.
  const light = overHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** SPA-aware navigation. Handles route links, home-hash links, and the wordmark. */
  const handleNav = useCallback(
    (e: MouseEvent, href: string) => {
      // Allow modified clicks (new tab, etc.) to behave natively.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      setOpen(false);

      const hashIndex = href.indexOf("#");
      const isHomeHash = href.startsWith("/#") || href === "/";
      const targetPath = hashIndex >= 0 ? href.slice(0, hashIndex) || "/" : href;
      const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";

      if (isHomeHash) {
        if (location.pathname !== "/") {
          navigate("/");
          // scrollToHash retries via rAF until the section has mounted.
          requestAnimationFrame(() => scrollToHash(hash));
        } else {
          scrollToHash(hash);
        }
      } else {
        navigate(targetPath);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:h-20">
        {/* Wordmark */}
        <a href="/" onClick={(e) => handleNav(e, "/")} className="flex items-baseline gap-2">
          <span className={cn("font-display text-xl font-medium tracking-tightest transition-colors", light ? "text-bg" : "text-ink")}>
            Liang Yi
          </span>
          <span className="font-serif text-base text-accent">{BRAND.chinese}</span>
        </a>

        {/* Center links */}
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={cn(
                "relative font-sans text-sm tracking-tight transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 hover:after:w-full",
                light
                  ? "text-bg/80 hover:text-bg after:bg-bg"
                  : "text-muted hover:text-ink after:bg-ink"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-4 md:flex">
          <a href="#" aria-label="Instagram" className={cn("transition-colors", light ? "text-bg/70 hover:text-bg" : "text-ink/60 hover:text-ink")}>
            <InstagramLogo size={18} weight="regular" />
          </a>
          <a href="#" aria-label="Facebook" className={cn("transition-colors", light ? "text-bg/70 hover:text-bg" : "text-ink/60 hover:text-ink")}>
            <FacebookLogo size={18} weight="regular" />
          </a>
          <Button
            as="a"
            href="/#book"
            size="sm"
            variant={light ? "outline" : "solid"}
            className={light ? "border-bg/40 text-bg hover:bg-bg hover:text-ink" : undefined}
            onClick={(e) => handleNav(e, "/#book")}
          >
            {BRAND.cta}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={cn("md:hidden transition-colors", light ? "text-bg" : "text-ink")}
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
                onClick={(e) => handleNav(e, link.href)}
                className="border-b border-line py-3 font-display text-2xl tracking-tightest text-ink"
              >
                {link.label}
              </a>
            ))}
            <Button as="a" href="/#book" className="mt-4 w-full" onClick={(e) => handleNav(e, "/#book")}>
              {BRAND.cta}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
