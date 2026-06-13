import { Quotes, Star } from "@phosphor-icons/react";
import { testimonials, type Testimonial } from "@/lib/content";
import MaskReveal from "./ui/MaskReveal";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[88vw] shrink-0 flex-col justify-between gap-6 border border-line bg-bg p-7 sm:w-[24rem]">
      <div>
        <Quotes size={28} weight="fill" className="text-accent/40" />
        <blockquote className="mt-4 font-serif text-lg leading-snug text-ink">
          {t.quote}
        </blockquote>
      </div>
      <figcaption>
        <div className="mb-2 flex gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} weight="fill" />
          ))}
        </div>
        <p className="font-display text-sm font-bold uppercase tracking-tight text-ink">{t.name}</p>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">{t.meta}</p>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="border-y border-line bg-accent py-24 md:py-28 overflow-hidden">
      <div className="mx-auto mb-12 max-w-site px-6">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-bg/70">
          06 / In Their Words
        </span>
        <MaskReveal
          as="h2"
          className="display mt-4 text-bg text-[clamp(2.2rem,6vw,4.5rem)]"
          lines={["Trusted by", "thousands"]}
        />
      </div>

      <div className="group flex w-max gap-6 pl-6 animate-marquee will-change-transform [animation-duration:55s] hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </section>
  );
}
