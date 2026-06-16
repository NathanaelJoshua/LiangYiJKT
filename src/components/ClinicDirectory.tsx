import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight, WhatsappLogo, Phone, MapPin, Clock } from "@phosphor-icons/react";
import {
  clinics,
  regions,
  clinicMaps,
  waLink,
  telLink,
  type Clinic,
  type Region,
} from "@/lib/content";
import { cn } from "@/lib/utils";

type Filter = "All" | Region;
const filters: Filter[] = ["All", ...regions];

const ease = [0.22, 1, 0.36, 1] as const;

function ClinicRow({ clinic }: { clinic: Clinic }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease }}
      className="group grid grid-cols-1 gap-6 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8"
    >
      {/* Name + region */}
      <div className="md:col-span-4">
        <span className="font-sans text-xs uppercase tracking-[0.18em] text-accent">
          {clinic.region}
        </span>
        <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink">
          {clinic.name}
        </h3>
      </div>

      {/* Address + hours */}
      <div className="space-y-2 text-sm leading-relaxed text-muted md:col-span-4">
        <p className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0 text-accent" weight="regular" />
          <span>
            {clinic.address}, {clinic.unit}
            <br />
            {clinic.postal}
          </span>
        </p>
        <p className="flex items-start gap-2">
          <Clock size={16} className="mt-0.5 shrink-0 text-accent" weight="regular" />
          <span>
            Open {clinic.hours}
            <br />
            <span className="text-muted/80">Consultations {clinic.consult}</span>
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:col-span-4 md:justify-end">
        <a
          href={telLink(clinic.phone)}
          className="inline-flex items-center gap-1.5 text-sm tracking-tight text-ink transition-colors hover:text-accent"
        >
          <Phone size={15} /> {clinic.phone}
        </a>
        <a
          href={waLink(clinic.whatsapp)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm tracking-tight text-ink transition-colors hover:text-accent"
        >
          <WhatsappLogo size={16} /> WhatsApp
        </a>
        <a
          href={clinicMaps(clinic)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 border-b border-ink/20 pb-0.5 text-sm tracking-tight text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Directions
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

export default function ClinicDirectory() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () => (active === "All" ? clinics : clinics.filter((c) => c.region === active)),
    [active]
  );

  const countFor = (f: Filter) =>
    f === "All" ? clinics.length : clinics.filter((c) => c.region === f).length;

  return (
    <section className="mx-auto max-w-site px-6 pb-28">
      {/* Filter tabs */}
      <LayoutGroup>
        <div className="sticky top-16 z-30 -mx-6 mb-4 bg-bg/85 px-6 py-4 backdrop-blur-md md:top-20">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm tracking-tight transition-colors",
                    isActive ? "text-bg" : "text-muted hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="region-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {f}
                    <span className={cn("ml-1.5 tabular-nums", isActive ? "text-bg/60" : "text-muted/60")}>
                      {countFor(f)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </LayoutGroup>

      {/* Directory */}
      <motion.div layout className="border-b border-line">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((c) => (
            <ClinicRow key={`${c.name}-${c.unit}`} clinic={c} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="border-t border-line py-20 text-center">
            <p className="font-display text-2xl text-ink">No clinics in this region yet.</p>
            <p className="mt-2 text-sm text-muted">More locations are opening across Singapore.</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
