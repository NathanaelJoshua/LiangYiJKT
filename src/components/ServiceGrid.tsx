import { ArrowRight } from "@phosphor-icons/react";
import { services, type Service } from "@/lib/content";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

function ServiceCard({ service }: { service: Service }) {
  return (
    <RevealItem className="group">
      <a
        href="/contact"
        className="flex h-full flex-col rounded-2xl border border-line bg-bg p-5 transition-colors hover:bg-surface"
      >
        <span className="font-sans text-xs uppercase tracking-[0.16em] text-accent">
          {service.scope}
        </span>
        <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tight text-ink">
          {service.name}
        </h3>
        <div className="relative mt-5 aspect-[16/11] overflow-hidden rounded-xl bg-line">
          <img
            src={service.image}
            alt={service.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">{service.description}</p>
      </a>
    </RevealItem>
  );
}

export default function ServiceGrid() {
  return (
    <section id="services" className="border-b border-line bg-surface">
      <div className="mx-auto max-w-site px-6 py-24 md:py-32">
        {/* Centered header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our services</span>
          <MaskReveal
            as="h2"
            className="display mt-5 text-ink text-[clamp(2rem,5vw,3.8rem)]"
            lineClassName="text-center"
            lines={[
              <>
                Complete care for <span className="italic">every need</span>
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-prose text-base leading-relaxed text-muted">
            Personalised, result-oriented Traditional Chinese Medicine to keep you
            healthy, balanced and well — at every stage of life.
          </p>
        </div>

        {/* Card grid */}
        <RevealOnScroll
          stagger
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </RevealOnScroll>

        <div className="mt-12 flex justify-center">
          <a
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm tracking-tight text-bg transition-colors hover:bg-accent active:scale-[0.98]"
          >
            Explore all services <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
