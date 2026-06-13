import { physicians, type Physician } from "@/lib/content";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

function PhysicianCard({ physician }: { physician: Physician }) {
  return (
    <RevealItem className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-line grayscale transition-all duration-700 group-hover:grayscale-0">
        <img
          src={physician.image}
          alt={physician.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-ink">
        {physician.name}
      </h3>
      <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">
        {physician.credentials}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{physician.focus}</p>
    </RevealItem>
  );
}

export default function Physicians() {
  return (
    <section id="physicians" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-6 py-24 md:py-32">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">04 / Our Physicians</span>
            <MaskReveal
              as="h2"
              className="display mt-4 text-ink text-[clamp(2.2rem,6vw,4.5rem)]"
              lines={["The people", "behind the pulse"]}
            />
          </div>
          <p className="max-w-prose text-base leading-relaxed text-muted">
            A team of TCM Board–registered physicians, each with a clinical focus and
            years of hands-on practice.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {physicians.map((p) => (
            <PhysicianCard key={p.name} physician={p} />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
