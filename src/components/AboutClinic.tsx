import { BRAND, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

const principles = [
  {
    title: "Invest in your health",
    copy: "In Chinese medicine, the smooth circulation of Qi and Blood is the foundation of a healthy body. Prevention is the best form of care — and health is your most valuable asset.",
  },
  {
    title: "Progress at your own rhythm",
    copy: "Healing is gradual. Through regular tuina, acupuncture, herbal care and guidance, we help your body recover at a pace that lasts.",
  },
  {
    title: "Understand your own body",
    copy: "We help you understand your TCM body constitution, so you can make informed, everyday choices that keep you well.",
  },
];

export default function AboutClinic() {
  const { lang } = useLang();
  return (
    <>
      {/* Philosophy */}
      <section className="border-b border-line bg-bg">
        <div className="mx-auto max-w-site px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="eyebrow">Who we are</span>
              <MaskReveal
                as="h2"
                className="display mt-5 text-ink text-[clamp(2rem,5vw,3.6rem)]"
                lines={[
                  "True wellness begins",
                  <span key="l2" className="italic">from within.</span>,
                ]}
              />
            </div>

            <RevealOnScroll className="lg:col-span-7">
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  Liang Yi is a registered TCM clinic with the TCM Practitioners Board,
                  established in 2016. Our care is grounded in exceptional,
                  result-oriented solutions — complemented by proprietary therapies and
                  techniques developed over many years.
                </p>
                <p>
                  We believe true wellness begins from within: when the body's internal
                  balance of <span className="text-ink">Qi, Blood, Yin and Yang</span> is
                  supported and maintained. Rather than chasing symptoms, we address the
                  underlying imbalance — using classical principles like Zang-Fu
                  diagnosis, meridian flow and body-constitution analysis.
                </p>
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
            <span className="eyebrow">Our approach</span>
            <MaskReveal
              as="h2"
              className="display mt-5 text-ink text-[clamp(2rem,5vw,3.6rem)]"
              lines={[
                "Three principles",
                <span key="l2" className="italic">we live by.</span>,
              ]}
            />
          </div>

          <RevealOnScroll stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {principles.map((p, i) => (
              <RevealItem key={p.title} className="flex flex-col bg-bg p-8">
                <span className="font-display text-4xl font-medium tracking-tightest text-accent-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{p.copy}</p>
              </RevealItem>
            ))}
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
