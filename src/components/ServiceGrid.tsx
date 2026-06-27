import { ArrowRight } from "@phosphor-icons/react";
import { loc, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { usePageField } from "@/lib/cms-data";
import ServiceList from "./ServiceList";

export default function ServiceGrid() {
  const { lang } = useLang();
  const heading = usePageField("Home", "Services heading", loc("Result-oriented TCM for your health needs"));
  return (
    <section id="services" className="bg-ink py-24 text-bg md:py-32">
      <div className="mx-auto max-w-site px-6">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent">
              Our services
            </span>
            <h2 className="display mt-5 text-bg text-[clamp(2rem,5vw,3.8rem)]">{tr(heading, lang)}</h2>
          </div>
          <a
            href="/services"
            className="inline-flex items-center gap-2 border-b border-bg/30 pb-1 text-sm tracking-tight text-bg transition-colors hover:border-accent hover:text-accent"
          >
            View all services <ArrowRight size={15} />
          </a>
        </div>

        <ServiceList limit={4} />
      </div>
    </section>
  );
}
