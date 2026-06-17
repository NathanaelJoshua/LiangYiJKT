import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCta from "@/components/BookCta";
import ArticleCard from "@/components/ArticleCard";
import MaskReveal from "@/components/ui/MaskReveal";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { articles } from "@/lib/content";

export default function Insights() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [lead, ...rest] = articles;

  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto max-w-site px-6 pb-20 pt-32 md:pt-40">
          <div className="max-w-3xl">
            <span className="eyebrow">Insights</span>
            <MaskReveal
              as="h1"
              className="display mt-6 text-ink text-[clamp(2.6rem,7vw,5.5rem)]"
              lines={["Notes from", "the clinic"]}
            />
            <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
              Practical, grounded writing on Traditional Chinese Medicine — from our
              physicians, for everyday life in Singapore.
            </p>
          </div>

          {/* Featured lead */}
          <RevealOnScroll className="mt-16 md:mt-20">
            <Link
              to={`/insights/${lead.slug}`}
              className="group grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-2 md:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-line">
                <img
                  src={lead.image}
                  alt={lead.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 font-sans text-sm tracking-tight text-muted">
                  <span className="text-accent-deep">{lead.category}</span>
                  <span>·</span>
                  <span>{lead.readTime} · {lead.date}</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
                  {lead.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-sm tracking-tight text-ink transition-colors group-hover:border-accent group-hover:text-accent-deep">
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        </section>

        {/* The rest */}
        <section className="mx-auto max-w-site px-6 pb-28">
          <RevealOnScroll stagger className="grid grid-cols-1 gap-x-6 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </RevealOnScroll>
        </section>

        <BookCta />
      </main>
      <Footer />
    </>
  );
}
