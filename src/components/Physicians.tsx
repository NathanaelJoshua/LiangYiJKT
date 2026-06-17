import { useRef } from "react";
import { CaretLeft, CaretRight, Leaf } from "@phosphor-icons/react";
import { physicians, type Physician } from "@/lib/content";
import MaskReveal from "./ui/MaskReveal";

function PhysicianCard({ p }: { p: Physician }) {
  const shortName = p.name.replace(/^Physician\s+/, "");
  return (
    <article className="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-line sm:w-[320px]">
      <div className="relative aspect-[3/4]">
        <img
          src={p.image}
          alt={shortName}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        />
        {/* Single-tone duotone — every photo reads in the brand accent */}
        <div className="absolute inset-0 bg-accent mix-blend-multiply" />
        <div className="absolute inset-0 bg-accent/20" />
        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 text-bg">
        <p className="font-serif text-lg leading-snug">{p.focus}</p>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-bg/20 pt-3">
          <span className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-bg/80">
            <Leaf size={13} weight="fill" /> {p.branch}
          </span>
          <span className="text-right">
            <span className="block font-display text-base font-medium tracking-tight">
              {shortName}
            </span>
            <span className="block font-sans text-xs text-bg/70">
              {p.credentials}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Physicians() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: "smooth" });
  };

  return (
    <section
      id="physicians"
      className="border-y border-line bg-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-site px-6">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3.5 py-1.5">
              <Leaf size={14} weight="fill" className="text-accent-deep" />
              <span className="font-sans text-sm tracking-tight text-ink">
                Our physicians
              </span>
            </span>
            <MaskReveal
              as="h2"
              className="display mt-5 text-ink text-[clamp(2rem,5vw,3.8rem)]"
              lines={[
                "Meet our qualified",
                <span key="l2" className="italic">
                  TCM physicians
                </span>,
              ]}
            />
          </div>
          <div className="flex gap-3 md:col-span-5 md:justify-end md:pb-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-ink transition-colors hover:bg-ink hover:text-bg active:scale-[0.96]"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-ink transition-colors hover:bg-ink hover:text-bg active:scale-[0.96]"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Carousel — first card aligns with the title's left edge */}
        <div className="mt-12">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {physicians.map((p) => (
              <PhysicianCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
