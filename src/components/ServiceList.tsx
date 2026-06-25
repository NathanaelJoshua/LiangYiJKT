import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";
import { services, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";

/** Dark editorial service grid: label over a hairline, image with +, bold lead-in. */
export default function ServiceList({ limit }: { limit?: number }) {
  const { lang } = useLang();
  const items = limit ? services.slice(0, limit) : services;
  return (
    <RevealOnScroll
      stagger
      className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((s) => (
        <RevealItem key={s.id} className="group">
          <div className="border-t border-bg/15 pt-4">
            <span className="font-sans text-sm tracking-tight text-bg/70">{tr(s.name, lang)}</span>
          </div>

          <Link
            to={`/services/${s.id}`}
            className="relative mt-4 block aspect-[3/4] overflow-hidden rounded-xl bg-bg/10"
          >
            <img
              src={s.image}
              alt={tr(s.name, lang)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-bg/40 bg-ink/30 text-bg backdrop-blur transition-colors duration-300 group-hover:bg-bg group-hover:text-ink">
              <Plus size={16} weight="bold" />
            </span>
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-bg/60">
            <span className="font-medium text-bg">{tr(s.scope, lang)}.</span> {tr(s.description, lang)}
          </p>
        </RevealItem>
      ))}
    </RevealOnScroll>
  );
}
