import { journey, type Step } from "@/lib/content";
import RevealOnScroll from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";
import { cn } from "@/lib/utils";

function JourneyRow({ step, index }: { step: Step; index: number }) {
  const flip = index % 2 === 1;
  return (
    <RevealOnScroll>
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-8 border-t border-line py-12 md:grid-cols-2 md:gap-16 md:py-16",
          flip && "md:[&>*:first-child]:order-2"
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-line">
          <img
            src={step.image}
            alt={`${step.title} — Liang Yi care journey`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className={cn(flip && "md:text-right")}>
          <span className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-none text-accent/25">
            {step.no}/
          </span>
          <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl">
            {step.title}
          </h3>
          <p className={cn("mt-4 max-w-prose text-base leading-relaxed text-muted", flip && "md:ml-auto")}>
            {step.copy}
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );
}

export default function CareJourney() {
  return (
    <section id="journey" className="mx-auto max-w-site px-6 py-24 md:py-32">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">03 / The Care Journey</span>
          <MaskReveal
            as="h2"
            className="display mt-4 text-ink text-[clamp(2.2rem,6vw,4.5rem)]"
            lines={["Four steps to", "lasting balance"]}
          />
        </div>
        <p className="max-w-prose text-base leading-relaxed text-muted">
          A structured path from first visit to long-term wellbeing — methodical,
          transparent and measured at every stage.
        </p>
      </div>

      <div>
        {journey.map((step, i) => (
          <JourneyRow key={step.no} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
