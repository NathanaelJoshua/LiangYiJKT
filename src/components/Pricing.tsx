import { Check, ArrowRight, ShieldCheck } from "@phosphor-icons/react";
import { pricing, plans, tr, type Plan, type Lang } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { cn } from "@/lib/utils";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

function PlanCard({ plan, lang }: { plan: Plan; lang: Lang }) {
  const featured = !!plan.featured;
  return (
    <RevealItem
      className={cn(
        "relative flex flex-col rounded-2xl border p-7 transition-transform duration-300 md:p-8",
        featured
          ? "border-ink bg-ink text-bg shadow-soft md:-translate-y-2"
          : "border-line bg-surface text-ink"
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-sans text-xs font-medium tracking-tight text-ink">
          Most popular
        </span>
      )}

      <h3 className="font-display text-xl font-medium tracking-tight">{tr(plan.name, lang)}</h3>

      <div className="mt-4 flex items-end gap-1.5">
        <span className="font-display text-5xl font-medium tracking-tightest">{plan.price}</span>
        <span className={cn("pb-1.5 font-sans text-sm", featured ? "text-bg/60" : "text-muted")}>
          / {tr(plan.cadence, lang)}
        </span>
      </div>

      <p className={cn("mt-3 text-sm leading-relaxed", featured ? "text-bg/75" : "text-muted")}>
        {tr(plan.blurb, lang)}
      </p>

      <div className={cn("my-6 h-px", featured ? "bg-bg/15" : "bg-line")} />

      <ul className="flex-1 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                featured ? "bg-accent/25 text-accent" : "bg-accent/15 text-accent-deep"
              )}
            >
              <Check size={11} weight="bold" />
            </span>
            <span className={featured ? "text-bg/90" : "text-ink/90"}>{tr(f, lang)}</span>
          </li>
        ))}
      </ul>

      <a
        href="/#contact"
        className={cn(
          "mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-tight transition-colors active:scale-[0.98]",
          featured ? "bg-bg text-ink hover:bg-accent hover:text-ink" : "bg-ink text-bg hover:bg-accent-deep"
        )}
      >
        Book this <ArrowRight size={14} />
      </a>
    </RevealItem>
  );
}

export default function Pricing() {
  const { lang } = useLang();
  return (
    <section id="pricing">
      <div className="mx-auto max-w-site px-6 pb-24 pt-32 md:pb-28 md:pt-40">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <MaskReveal
            as="h1"
            className="display mt-5 text-ink text-[clamp(2.4rem,6vw,4.6rem)]"
            lineClassName="text-center"
            lines={[
              <>
                Simple, <span className="italic">transparent</span> pricing
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-prose text-base leading-relaxed text-muted">
            Clear fees across every clinic — no hidden charges. Start with a package, or
            pay per visit from the full price list below.
          </p>
        </div>

        {/* Plans */}
        <RevealOnScroll stagger className="mx-auto mt-16 grid max-w-3xl items-stretch gap-6 sm:grid-cols-2">
          {plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} lang={lang} />
          ))}
        </RevealOnScroll>

        {/* Full price list */}
        <div className="mt-24 md:mt-28">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <span className="eyebrow">Pay per visit</span>
            <h2 className="display text-ink text-[clamp(1.8rem,4vw,3rem)]">The full price list</h2>
          </div>

          <RevealOnScroll stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pricing.map((group, gi) => (
              <RevealItem key={gi} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-sans text-sm uppercase tracking-[0.16em] text-accent-deep">
                  {tr(group.title, lang)}
                </h3>
                <ul className="mt-4 divide-y divide-line">
                  {group.items.map((item, ii) => (
                    <li key={ii} className="flex items-baseline justify-between gap-4 py-3.5">
                      <div className="min-w-0">
                        <p className="font-display text-base font-medium tracking-tight text-ink">
                          {tr(item.name, lang)}
                        </p>
                        {tr(item.note, lang) && (
                          <p className="mt-0.5 text-sm leading-snug text-muted">{tr(item.note, lang)}</p>
                        )}
                      </div>
                      <span className="shrink-0 font-display text-base font-medium tracking-tight text-ink tabular-nums">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealOnScroll>

          {/* Subsidies / note */}
          <RevealOnScroll className="mt-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink p-6 text-bg sm:flex-row sm:items-center md:p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <ShieldCheck size={22} />
              </span>
              <p className="text-sm leading-relaxed text-bg/85">
                <span className="font-medium text-bg">CHAS, Pioneer & Merdeka Generation</span> subsidies are
                accepted where applicable. Prices are indicative and may vary by clinic and physician; herbal
                medicine is charged separately based on your prescription.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
