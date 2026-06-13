import { ArrowUpRight } from "@phosphor-icons/react";
import { locations } from "@/lib/content";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

export default function Locations() {
  return (
    <section id="locations" className="mx-auto max-w-site px-6 py-24 md:py-32">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">05 / Find Us</span>
          <MaskReveal
            as="h2"
            className="display mt-4 text-ink text-[clamp(2.2rem,6vw,4.5rem)]"
            lines={["Twelve clinics", "across the island"]}
          />
        </div>
        <p className="max-w-prose text-base leading-relaxed text-muted">
          Conveniently located inside Singapore's neighbourhood malls — walk in or
          book ahead, wherever you are.
        </p>
      </div>

      <RevealOnScroll stagger className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <RevealItem key={loc.name}>
            <a
              href={loc.maps}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between gap-6 border-b border-line p-6 transition-colors hover:bg-surface sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(3n+2)]:border-x"
            >
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                  {loc.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{loc.mall}</p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted">
                  {loc.hours}
                </p>
              </div>
              <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
                Get directions
                <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </RevealItem>
        ))}
      </RevealOnScroll>
    </section>
  );
}
