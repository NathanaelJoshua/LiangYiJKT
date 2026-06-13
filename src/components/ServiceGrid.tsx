import { ArrowUpRight } from "@phosphor-icons/react";
import { services, type Service } from "@/lib/content";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

function ServiceCard({ service }: { service: Service }) {
  return (
    <RevealItem className="group">
      <a href="#book" className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-line">
          <img
            src={service.image}
            alt={`${service.name} at Liang Yi TCM`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={service.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-bg/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
              {service.name}
            </h3>
            <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              {service.scope}
            </p>
          </div>
          <span className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
            Explore
          </span>
        </div>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </a>
    </RevealItem>
  );
}

export default function ServiceGrid() {
  return (
    <section id="services" className="mx-auto max-w-site px-6 py-24 md:py-32">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">01 / Our Practice</span>
          <MaskReveal
            as="h2"
            className="display mt-4 text-ink text-[clamp(2.2rem,6vw,4.5rem)]"
            lines={["The Service", "Collection"]}
          />
        </div>
        <p className="max-w-prose text-base leading-relaxed text-muted">
          A complete catalogue of result-oriented care — from first consultation to
          specialised therapy — under one registered roof.
        </p>
      </div>

      <RevealOnScroll
        stagger
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </RevealOnScroll>
    </section>
  );
}
