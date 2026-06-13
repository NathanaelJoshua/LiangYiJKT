import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { BRAND, img } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";
import MaskReveal from "./ui/MaskReveal";
import Button from "./ui/Button";

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
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
          src={img("liangyi-hero", 2000, 1400)}
          alt="Herbal apothecary drawers and dried botanicals at a Liang Yi TCM clinic"
          className="h-[114%] w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-site flex-col justify-between px-6 pb-12 pt-28 md:pt-32">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-bg/70">{BRAND.est}</span>
          <span className="eyebrow hidden text-bg/70 sm:block">Singapore</span>
        </div>

        <div className="max-w-[16ch]">
          <MaskReveal
            as="h1"
            className="display text-bg text-[clamp(3rem,11vw,9rem)]"
            lines={["Our Greatest", "Wealth is", "Health"]}
          />
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-prose font-sans text-base leading-relaxed text-bg/80">
            {BRAND.positioning} Modern Traditional Chinese Medicine, delivered by
            registered physicians across Singapore.
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <Button as="a" href="#book" variant="solid" className="bg-bg text-ink hover:bg-accent hover:text-bg">
              {BRAND.cta} <ArrowRight size={14} weight="bold" />
            </Button>
            <Button as="a" href="#services" variant="outline" className="border-bg/40 text-bg hover:bg-bg hover:text-ink">
              Our Services
            </Button>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 text-bg/60">
          <ArrowDown size={16} className="animate-bounce" />
          <span className="eyebrow text-bg/60">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
