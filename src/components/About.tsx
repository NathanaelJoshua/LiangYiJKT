import { aboutStats } from "@/lib/content";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

export default function About({ as = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section id="about" className="border-b border-line">
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

        {/* Stat band */}
        <RevealOnScroll
          stagger
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-4 sm:divide-y-0"
        >
          {aboutStats.map((s) => (
            <RevealItem key={s.label} className="p-7 text-center">
              <p className="font-display text-4xl font-medium tracking-tightest text-ink md:text-5xl">
                {s.value}
              </p>
              <p className="mx-auto mt-2 max-w-[14ch] text-sm leading-snug text-muted">{s.label}</p>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
