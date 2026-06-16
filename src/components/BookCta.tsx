import { ArrowRight } from "@phosphor-icons/react";
import { BRAND } from "@/lib/content";
import MaskReveal from "./ui/MaskReveal";
import RevealOnScroll from "./ui/RevealOnScroll";
import Button from "./ui/Button";

export default function BookCta() {
  return (
    <section id="book" className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-site px-6 text-center">
        <span className="eyebrow text-bg/60">Begin your care</span>
        <MaskReveal
          as="h2"
          className="display mx-auto mt-6 max-w-[18ch] text-bg text-[clamp(2.6rem,8vw,6.5rem)]"
          lines={["Our greatest", "wealth is health."]}
        />
        <RevealOnScroll className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as="a" href="#" variant="solid" className="bg-bg text-ink hover:bg-accent hover:text-bg">
            {BRAND.cta} <ArrowRight size={14} weight="bold" />
          </Button>
          <Button as="a" href={`mailto:${BRAND.email}`} variant="outline" className="border-bg/40 text-bg hover:bg-bg hover:text-ink">
            {BRAND.email}
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
