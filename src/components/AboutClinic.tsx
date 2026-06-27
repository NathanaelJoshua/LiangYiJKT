import { BRAND, loc, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { usePageField } from "@/lib/cms-data";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";

export default function AboutClinic() {
  const { lang } = useLang();
  const storyEyebrow = usePageField("About", "Story eyebrow", loc("Who we are"));
  const storyHeadline = usePageField("About", "Story headline", loc("True wellness begins from within."));
  const storyBody = usePageField("About", "Story body", loc(""));
  const approachEyebrow = usePageField("About", "Approach eyebrow", loc("Our approach"));
  const approachHeadline = usePageField("About", "Approach headline", loc("Three principles we live by."));
  const principles = [
    { title: usePageField("About", "Principle 1 title", loc("Invest in your health")), copy: usePageField("About", "Principle 1 copy", loc("")) },
    { title: usePageField("About", "Principle 2 title", loc("Progress at your own rhythm")), copy: usePageField("About", "Principle 2 copy", loc("")) },
    { title: usePageField("About", "Principle 3 title", loc("Understand your own body")), copy: usePageField("About", "Principle 3 copy", loc("")) },
  ];
  // Split the story body into paragraphs on blank lines.
  const storyParas = tr(storyBody, lang).split(/\n\n+/).filter(Boolean);
  return (
    <>
      {/* Philosophy */}
      <section className="border-b border-line bg-bg">
        <div className="mx-auto max-w-site px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="eyebrow">{tr(storyEyebrow, lang)}</span>
              <h2 className="display mt-5 text-ink text-[clamp(2rem,5vw,3.6rem)]">
                {tr(storyHeadline, lang)}
              </h2>
            </div>

            <RevealOnScroll className="lg:col-span-7">
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                {storyParas.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <blockquote className="mt-10 border-t border-line pt-8">
                <p className="font-serif text-2xl leading-snug text-ink">
                  「不为良相，便为良医」
                </p>
                <footer className="mt-3 text-sm leading-relaxed text-muted">
                  If not a great minister, then a great physician — {tr(BRAND.tagline, lang)}.
                </footer>
              </blockquote>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-site px-6 py-24 md:py-32">
          <div className="mb-14 max-w-2xl">
            <span className="eyebrow">{tr(approachEyebrow, lang)}</span>
            <h2 className="display mt-5 text-ink text-[clamp(2rem,5vw,3.6rem)]">
              {tr(approachHeadline, lang)}
            </h2>
          </div>

          <RevealOnScroll stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {principles.map((p, i) => (
              <RevealItem key={i} className="flex flex-col bg-bg p-8">
                <span className="font-display text-4xl font-medium tracking-tightest text-accent-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-ink">
                  {tr(p.title, lang)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{tr(p.copy, lang)}</p>
              </RevealItem>
            ))}
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
