import { Link } from "react-router-dom";
import { articles } from "@/lib/content";
import RevealOnScroll from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const preview = articles.slice(0, 4);

  return (
    <section id="insights" className="mx-auto max-w-site px-6 py-24 md:py-32">
      <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Insights for a balanced life</span>
          <MaskReveal
            as="h2"
            className="display mt-5 text-ink text-[clamp(2rem,5vw,4rem)]"
            lines={[
              "Notes from",
              <span key="l2" className="italic">the clinic</span>,
            ]}
          />
        </div>
        <Link
          to="/insights"
          className="font-sans text-sm tracking-tight text-accent hover:text-ink"
        >
          View all articles →
        </Link>
      </div>

      <RevealOnScroll stagger className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((a) => (
          <ArticleCard key={a.slug} a={a} />
        ))}
      </RevealOnScroll>
    </section>
  );
}
