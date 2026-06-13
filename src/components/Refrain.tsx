import { BRAND } from "@/lib/content";

/** Rhythmic marquee refrain — the repeated tagline motif. */
export default function Refrain() {
  const items = Array.from({ length: 6 });
  return (
    <section aria-hidden className="border-y border-line bg-accent py-5 text-bg overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {Array.from({ length: 2 }).map((_, dup) => (
          <div key={dup} className="flex">
            {items.map((_, i) => (
              <span
                key={i}
                className="display flex items-center gap-6 px-6 text-[clamp(1.4rem,3vw,2.4rem)]"
              >
                {BRAND.tagline}
                <span className="font-serif text-bg/50 normal-case">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
