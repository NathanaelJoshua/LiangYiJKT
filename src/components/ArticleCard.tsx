import { Link } from "react-router-dom";
import { type Article } from "@/lib/content";
import { RevealItem } from "./ui/RevealOnScroll";

export default function ArticleCard({ a }: { a: Article }) {
  return (
    <RevealItem className="group">
      <Link to={`/insights/${a.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line">
          <img
            src={a.image}
            alt={a.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <p className="mt-5 font-sans text-xs uppercase tracking-[0.16em] text-muted">
          {a.date}
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
          {a.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted">
          {a.excerpt}
        </p>
      </Link>
    </RevealItem>
  );
}
