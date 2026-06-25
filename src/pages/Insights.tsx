import { useEffect } from "react";
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

  return (
    <>
      <Navbar />
      <main className="relative isolate">
        {/* Soft teal gradient wash behind the header */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh] bg-gradient-to-b from-accent/35 via-accent/10 to-transparent"
        />
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

          {/* Article grid */}
          <RevealOnScroll stagger className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
            {articles.map((a) => (
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
