import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Plus, Minus, CaretLeft, CaretRight } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import MaskReveal from "@/components/ui/MaskReveal";
import RevealOnScroll, { RevealItem } from "@/components/ui/RevealOnScroll";
import PageGlow from "@/components/PageGlow";
import { services, getService, tr, BRAND, type ServiceFAQ, type Lang } from "@/lib/content";
import { useLang } from "@/lib/lang";

function Faq({ item, lang }: { item: ServiceFAQ; lang: Lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-accent-deep">
          {tr(item.q, lang)}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-accent-deep transition-colors group-hover:border-accent">
          {open ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-prose pb-6 text-base leading-relaxed text-muted">{tr(item.a, lang)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { lang } = useLang();
  const service = slug ? getService(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="mx-auto flex min-h-[70dvh] max-w-site flex-col items-start justify-center px-6 pt-32">
          <span className="eyebrow">404</span>
          <h1 className="display mt-5 text-ink text-[clamp(2.2rem,6vw,4rem)]">Service not found</h1>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-base tracking-tight text-ink transition-colors hover:border-accent hover:text-accent-deep"
          >
            <ArrowLeft size={16} /> All services
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const idx = services.findIndex((s) => s.id === service.id);
  const prev = services[(idx - 1 + services.length) % services.length];
  const next = services[(idx + 1) % services.length];
  const others = services.filter((s) => s.id !== service.id).slice(0, 3);
  const heroTags = service.conditions.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="relative isolate">
        <PageGlow />
        {/* Hero */}
        <section className="mx-auto max-w-site px-6 pt-32 md:pt-40">
          <div className="flex items-center justify-between">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-tight text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} /> All services
            </Link>
            <div className="flex items-center gap-1.5">
              <Link to={`/services/${prev.id}`} aria-label="Previous service" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface">
                <CaretLeft size={15} />
              </Link>
              <Link to={`/services/${next.id}`} aria-label="Next service" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface">
                <CaretRight size={15} />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3">
                <span className="font-sans text-sm uppercase tracking-[0.18em] text-accent-deep">
                  {tr(service.scope, lang)}
                </span>
                <span className="font-mono text-xs text-muted">
                  {String(idx + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </div>
              <MaskReveal
                as="h1"
                className="display mt-4 text-ink text-[clamp(2.4rem,6vw,4.6rem)]"
                lines={[tr(service.name, lang)]}
              />
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
                {tr(service.description, lang)}
              </p>

              {heroTags.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {heroTags.map((c, i) => (
                    <span key={i} className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-sans text-sm tracking-tight text-ink">
                      {tr(c, lang)}
                    </span>
                  ))}
                </div>
              )}

              <a
                href="#contact"
                className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-medium tracking-tight text-bg transition-colors hover:bg-accent-deep active:scale-[0.98]"
              >
                Book this service <ArrowRight size={15} />
              </a>
            </div>

            <RevealOnScroll className="md:col-span-6">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md md:ml-auto">
                <div className="absolute -bottom-5 -right-5 h-full w-full rounded-2xl bg-accent/15" />
                <span className="pointer-events-none absolute -left-7 top-6 z-20 font-serif text-6xl leading-none text-accent/30 [writing-mode:vertical-rl]">
                  {BRAND.chinese}
                </span>
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-line shadow-soft">
                  <img src={service.image} alt={tr(service.name, lang)} className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* What is */}
        <section className="mt-24 border-y border-line bg-surface md:mt-32">
          <div className="mx-auto max-w-site px-6 py-20 md:py-24">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <span className="eyebrow">Overview</span>
                <h2 className="display mt-4 text-ink text-[clamp(1.8rem,4vw,3rem)]">
                  What is <span className="italic">{tr(service.name, lang)}?</span>
                </h2>
              </div>
              <RevealOnScroll className="md:col-span-7">
                <p className="border-l-2 border-accent pl-6 text-xl font-light leading-relaxed text-ink/85">
                  {tr(service.whatIs, lang)}
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Conditions */}
        <section className="mx-auto max-w-site px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">What it helps</span>
            <h2 className="display mt-4 text-ink text-[clamp(1.8rem,4vw,3rem)]">
              Conditions we <span className="italic">commonly treat</span>
            </h2>
          </div>
          <RevealOnScroll stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.conditions.map((c, i) => (
              <RevealItem
                key={i}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4 text-base text-ink transition-colors hover:border-ink/20 hover:bg-bg"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                  <Check size={15} weight="bold" />
                </span>
                {tr(c, lang)}
              </RevealItem>
            ))}
          </RevealOnScroll>
        </section>

        {/* Benefits */}
        <section className="border-y border-line bg-ink text-bg">
          <div className="mx-auto max-w-site px-6 py-20 md:py-24">
            <div className="max-w-2xl">
              <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Why it works</span>
              <h2 className="display mt-4 text-bg text-[clamp(1.8rem,4vw,3rem)]">
                Key <span className="italic">benefits</span>
              </h2>
            </div>
            <RevealOnScroll stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-bg/10 bg-bg/10 md:grid-cols-3">
              {service.benefits.map((b, i) => (
                <RevealItem key={i} className="bg-ink p-7 md:p-8">
                  <span className="font-display text-4xl font-medium tracking-tightest text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-bg">
                    {tr(b.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bg/70">{tr(b.copy, lang)}</p>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-site px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <span className="eyebrow">Questions</span>
              <h2 className="display mt-4 text-ink text-[clamp(1.8rem,4vw,3rem)]">
                Frequently <span className="italic">asked</span>
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                Still unsure? Our physicians are happy to talk it through before you book.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="rounded-2xl border border-line bg-surface px-6 md:px-8">
                {service.faqs.map((f, i) => (
                  <Faq key={i} item={f} lang={lang} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-site px-6 py-20 md:py-24">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Explore more services</h2>
              <Link to="/services" className="font-sans text-sm tracking-tight text-accent-deep hover:text-ink">All services →</Link>
            </div>
            <RevealOnScroll stagger className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {others.map((s) => (
                <RevealItem key={s.id} className="group">
                  <Link to={`/services/${s.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line">
                      <img src={s.image} alt={tr(s.name, lang)} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <h3 className="mt-4 flex items-start justify-between gap-3 font-display text-xl font-medium tracking-tight text-ink">
                      {tr(s.name, lang)}
                      <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-deep" />
                    </h3>
                    <p className="mt-1 text-sm text-muted">{tr(s.scope, lang)}</p>
                  </Link>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
