import { img } from "@/lib/content";
import RevealOnScroll from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

const pillars = [
  { k: "Registered physicians", v: "Every practitioner is TCM Board–registered and clinically trained." },
  { k: "Root-cause method", v: "We treat the underlying pattern, not just the presenting symptom." },
  { k: "Measured outcomes", v: "Progress is tracked session to session, so results are accountable." },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-site grid-cols-1 lg:grid-cols-2">
        {/* Text */}
        <div className="flex flex-col justify-center px-6 py-20 md:py-28">
          <span className="eyebrow">02 / Philosophy</span>
          <MaskReveal
            as="h2"
            className="display mt-5 text-ink text-[clamp(2rem,5vw,3.8rem)]"
            lines={["Ancient wisdom,", "modern rigour."]}
          />
          <RevealOnScroll className="mt-6 max-w-prose space-y-5 text-base leading-relaxed text-muted">
            <p>
              Liang Yi was founded in 2016 on a simple conviction: Traditional Chinese
              Medicine deserves the same clarity, hygiene and evidence we expect from
              any modern clinic — without losing the depth of a 2,000-year tradition.
            </p>
            <p className="font-serif text-xl italic leading-snug text-ink">
              “We don't chase symptoms. We restore the balance the body was built to keep.”
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger className="mt-10 divide-y divide-line border-t border-line">
            {pillars.map((p) => (
              <div key={p.k} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
                <h3 className="w-48 shrink-0 font-display text-sm font-bold uppercase tracking-tight text-ink">
                  {p.k}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{p.v}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>

        {/* Image */}
        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-full">
          <img
            src={img("liangyi-philosophy", 1200, 1600)}
            alt="A Liang Yi physician preparing a herbal prescription"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
