import { aboutStats } from "@/lib/content";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

export default function About({ as = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section id="about" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-site px-6 py-24 md:py-32">
        {/* Centered trust statement */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">About us</span>
          <MaskReveal
            as={as}
            className="display mt-6 text-ink text-[clamp(1.9rem,4.4vw,3.4rem)]"
            lineClassName="text-center"
            lines={[
              <>Trusted expertise, tailored care,</>,
              <>
                and <span className="italic">lasting wellness.</span>
              </>,
            ]}
          />
          <RevealOnScroll className="mt-6">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
              Established in 2016, Liang Yi has blended a 2,000-year tradition with
              modern rigour to create a truly calming TCM experience.{" "}
              <span className="text-ink/55">
                Where heritage, evidence and care come together beautifully.
              </span>
            </p>
          </RevealOnScroll>
        </div>

        {/* Stat chips */}
        <RevealOnScroll
          stagger
          className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-4"
        >
          {aboutStats.map((s) => (
            <RevealItem
              key={s.label}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4"
            >
              <span className="font-display text-3xl font-medium tracking-tightest text-ink">
                {s.value}
              </span>
              <span className="max-w-[12ch] text-left text-sm leading-snug text-muted">
                {s.label}
              </span>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
