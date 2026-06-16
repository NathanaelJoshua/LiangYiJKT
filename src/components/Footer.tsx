import { useState, type FormEvent } from "react";
import { ArrowRight, InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react";
import { BRAND, navLinks } from "@/lib/content";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-site px-6 py-16 md:py-20">
        {/* Top: wordmark + newsletter */}
        <div className="grid grid-cols-1 gap-12 border-b border-line pb-14 md:grid-cols-2">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-medium tracking-tightest text-ink">
                Liang Yi
              </span>
              <span className="font-serif text-2xl text-accent">{BRAND.chinese}</span>
            </div>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
              {BRAND.positioning} {BRAND.est}.
            </p>
          </div>

          <div className="md:justify-self-end md:text-left">
            <label htmlFor="newsletter" className="eyebrow">
              The Liang Yi Letter — seasonal wellness notes
            </label>
            {sent ? (
              <p className="mt-4 font-display text-xl font-medium tracking-tight text-accent">
                Thank you — you're subscribed.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 flex max-w-md items-center border-b border-ink/30 focus-within:border-ink">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-12 w-full bg-transparent text-base text-ink placeholder:text-muted/60 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-ink transition-colors hover:text-accent"
                >
                  <ArrowRight size={18} weight="bold" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mid: nav mirror + contact */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div>
            <h4 className="eyebrow mb-4">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-ink">{BRAND.email}</a></li>
              <li>{BRAND.phone}</li>
              <li>12 clinics islandwide</li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-4">Follow</h4>
            <div className="flex gap-4 text-ink">
              <a href="#" aria-label="Instagram" className="text-ink/60 hover:text-ink"><InstagramLogo size={20} /></a>
              <a href="#" aria-label="Facebook" className="text-ink/60 hover:text-ink"><FacebookLogo size={20} /></a>
              <a href="#" aria-label="TikTok" className="text-ink/60 hover:text-ink"><TiktokLogo size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="eyebrow mb-4">Locale</h4>
            <select
              aria-label="Select locale"
              className="rounded-md border border-line bg-surface px-3 py-2 font-sans text-sm tracking-tight text-ink focus:outline-none focus:ring-2 focus:ring-accent/40"
              defaultValue="sg-en"
            >
              <option value="sg-en">Singapore · EN</option>
              <option value="sg-zh">新加坡 · 中文</option>
            </select>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-sm tracking-tight text-muted">
            © {2026} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-sans text-sm tracking-tight text-muted">
            {BRAND.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
