import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight } from "@phosphor-icons/react";
import { BRAND, img } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";
import MaskReveal from "./ui/MaskReveal";
import Button from "./ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

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
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden bg-ink">
      {/* Full-bleed media */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={img("liangyi-hero-care", 2000, 1500)}
          alt="A Liang Yi physician providing gentle, attentive TCM care"
          className="h-[112%] w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-site flex-col justify-between px-6 pb-14 pt-28 md:pt-32">
        {/* Top-right supporting copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="ml-auto flex max-w-sm flex-col items-start gap-4 text-bg/85 md:items-end md:text-right"
        >
          <p className="text-sm leading-relaxed">
            We go beyond standard care to deliver a calmer, result-oriented experience —
            prioritising your comfort, confidence and lasting wellbeing.
          </p>
          <Button as="a" href="/#contact" variant="solid" className="bg-bg text-ink hover:bg-accent hover:text-bg">
            {BRAND.cta} <ArrowRight size={14} />
          </Button>
        </motion.div>

        {/* Bottom-left headline */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-sans text-sm uppercase tracking-[0.2em] text-bg/70"
          >
            {BRAND.est} · {BRAND.tagline}
          </motion.span>
          <MaskReveal
            as="h1"
            className="display mt-5 text-bg text-[clamp(2.8rem,8vw,6.5rem)]"
            lines={[
              "Gentle hands,",
              "genuine care,",
              <span key="l3" className="italic">lasting health.</span>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}
