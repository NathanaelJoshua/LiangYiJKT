import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCta from "@/components/BookCta";
import ArticleCard from "@/components/ArticleCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { articles, getArticle, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";

export default function ArticleDetail() {
  const { slug } = useParams();
  const { lang } = useLang();
  const article = slug ? getArticle(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="mx-auto flex min-h-[70dvh] max-w-site flex-col items-start justify-center px-6 pt-32">
          <span className="eyebrow">404</span>
          <h1 className="display mt-5 text-ink text-[clamp(2.2rem,6vw,4rem)]">
            Article not found
          </h1>
          <p className="mt-5 max-w-prose text-lg text-muted">
            This piece may have moved. Browse the full collection instead.
          </p>
          <Link
            to="/insights"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-base tracking-tight text-ink transition-colors hover:border-accent hover:text-accent-deep"
          >
            <ArrowLeft size={16} /> All insights
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const [lead, ...rest] = article.body;
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <article className="mx-auto max-w-site px-6 pt-32 md:pt-40">
          {/* Back */}
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-tight text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} /> Insights
          </Link>

          {/* Centered title + tag pills */}
          <header className="mx-auto mt-8 max-w-3xl text-center">
            <h1 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-tightest text-ink">
              {tr(article.title, lang)}
            </h1>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-sans text-xs tracking-tight text-muted"
                >
                  {tr(tag, lang)}
                </span>
              ))}
            </div>
          </header>

          {/* Full-width hero */}
          <RevealOnScroll className="mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-line">
              <img
                src={article.image}
                alt={tr(article.title, lang)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </RevealOnScroll>

          {/* Two-column: meta sidebar + body */}
          <div className="mt-12 grid grid-cols-1 gap-10 pb-8 md:grid-cols-12 md:gap-12">
            {/* Meta rail */}
            <aside className="md:col-span-3">
              <div className="space-y-8 md:sticky md:top-28">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.16em] text-muted">
                    Contributor
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={article.authorImage}
                      alt={article.author}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-sans text-sm font-medium tracking-tight text-ink">
                        {article.author}
                      </p>
                      <p className="font-sans text-xs text-muted">{article.date}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.16em] text-muted">
                    Reading time
                  </p>
                  <p className="mt-3 flex items-center gap-2 font-sans text-sm tracking-tight text-ink">
                    <Clock size={16} className="text-accent-deep" /> {article.readTime}
                  </p>
                </div>
              </div>
            </aside>

            {/* Body */}
            <div className="md:col-span-8 md:col-start-5">
              <p className="text-lg leading-relaxed text-muted">{tr(article.excerpt, lang)}</p>

              <hr className="my-8 border-line" />

              <p className="font-sans text-lg font-medium leading-relaxed text-accent-deep">
                {tr(lead, lang)}
              </p>

              {rest.map((para, i) => (
                <p key={i} className="mt-6 text-lg leading-relaxed text-ink/90">
                  {tr(para, lang)}
                </p>
              ))}

              <p className="mt-10 border-t border-line pt-6 font-sans text-sm leading-relaxed text-muted">
                This article is general guidance, not a substitute for a consultation.
                Speak with a registered physician for advice tailored to you.
              </p>
            </div>
          </div>
        </article>

        {/* Related */}
        <section className="mx-auto max-w-site px-6 pb-28">
          <div className="mb-10 flex items-end justify-between border-t border-line pt-12">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
              Keep reading
            </h2>
            <Link to="/insights" className="font-sans text-sm tracking-tight text-accent-deep hover:text-ink">
              All insights →
            </Link>
          </div>
          <RevealOnScroll stagger className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
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
