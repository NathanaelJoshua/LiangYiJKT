import { ArrowUpRight } from "@phosphor-icons/react";
import { articles, type Article } from "@/lib/content";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

function ArticleCard({ a }: { a: Article }) {
  return (
    <RevealItem className="group">
      <a href="#" className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-line">
          <img
            src={a.image}
            alt={a.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">
          <span className="text-accent">{a.category}</span>
          <span>{a.readTime} · {a.date}</span>
        </div>
        <h3 className="mt-2 flex items-start justify-between gap-3 font-display text-xl font-bold uppercase leading-[0.98] tracking-tight text-ink">
          {a.title}
          <ArrowUpRight size={18} weight="bold" className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
        </h3>
      </a>
    </RevealItem>
  );
}

export default function Articles() {
  return (
    <section id="insights" className="mx-auto max-w-site px-6 py-24 md:py-32">
      <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">07 / Insights</span>
          <MaskReveal
            as="h2"
            className="display mt-4 text-ink text-[clamp(2.2rem,6vw,4.5rem)]"
            lines={["Notes from", "the clinic"]}
          />
        </div>
        <a
          href="#"
          className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent hover:text-ink"
        >
          View all articles →
        </a>
      </div>

      <RevealOnScroll stagger className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) => (
          <ArticleCard key={a.title} a={a} />
        ))}
      </RevealOnScroll>
    </section>
  );
}
