import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight } from "@phosphor-icons/react";
import { BRAND, img } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";
import MaskReveal from "./ui/MaskReveal";

const ease = [0.22, 1, 0.36, 1] as const;

/** Pill CTA with a diagonally sliding arrow (adapted from aero-hero-3). */
function ArrowPill({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group mx-auto flex w-fit items-center gap-1">
      <span className="rounded-full bg-accent px-6 py-3.5 text-sm tracking-tight text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-accent">
        {label}
      </span>
      <span className="relative flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-accent text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-accent">
        <ArrowUpRight
          size={20}
          weight="bold"
          className="absolute transition-transform duration-500 ease-in-out group-hover:translate-x-12 group-hover:-translate-y-12"
        />
        <ArrowUpRight
          size={20}
          weight="bold"
          className="absolute -translate-x-12 translate-y-12 transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </a>
  );
}

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-ink">
      {/* Full-bleed media */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={img("liangyi-hero-care", 2000, 1500)}
          alt="Calm, attentive Traditional Chinese Medicine care at Liang Yi"
          className="h-[112%] w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
      </div>

      {/* Vertical grid lines */}
      <div className="absolute inset-0 z-10 mx-auto max-w-site">
        <div className="grid h-full w-full grid-cols-12">
          <div className="col-span-1 border-r border-bg/10" />
          <div className="col-span-3 border-r border-bg/10" />
          <div className="col-span-4 border-r border-bg/10" />
          <div className="col-span-3 border-r border-bg/10" />
          <div className="col-span-1" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-3xl px-6 text-center text-bg">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center rounded-full border border-bg/20 bg-bg/10 px-4 py-1.5 font-sans text-sm tracking-tight text-bg/85 backdrop-blur-sm"
        >
          Awarded TCM centre · {BRAND.est}
        </motion.span>

        <MaskReveal
          as="h1"
          className="display mt-7 text-bg text-[clamp(2.8rem,7vw,6rem)]"
          lineClassName="text-center"
          lines={[
            "Our greatest wealth",
            <span key="l2" className="italic">is health.</span>,
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-bg/85"
        >
          {BRAND.positioning} Modern Traditional Chinese Medicine, delivered by
          registered physicians across Singapore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease }}
          className="mt-10"
        >
          <ArrowPill href="/#contact" label={BRAND.cta} />
        </motion.div>
      </div>
    </section>
  );
}
