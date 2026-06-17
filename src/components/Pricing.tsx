import { Check, ArrowRight } from "@phosphor-icons/react";
import { pricing, plans, type Plan } from "@/lib/content";
import { cn } from "@/lib/utils";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <RevealItem
      className={cn(
        "flex flex-col rounded-xl border p-7",
        plan.featured ? "border-ink/80 bg-ink text-bg" : "border-line bg-surface text-ink"
      )}
    >
      <div className="flex items-baseline justify-between">
        <h4 className="font-display text-xl font-medium tracking-tight">{plan.name}</h4>
        {plan.featured && (
          <span className="rounded-full bg-accent px-3 py-1 font-sans text-xs tracking-tight text-bg">
            Most popular
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-display text-4xl font-medium tracking-tightest">{plan.price}</span>
        <span className={cn("font-sans text-sm", plan.featured ? "text-bg/60" : "text-muted")}>
          / {plan.cadence}
        </span>
      </div>

      <p className={cn("mt-3 text-sm leading-relaxed", plan.featured ? "text-bg/75" : "text-muted")}>
        {plan.blurb}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <Check
              size={16}
              weight="bold"
              className={cn("mt-0.5 shrink-0", plan.featured ? "text-accent" : "text-accent-deep")}
            />
            <span className={plan.featured ? "text-bg/90" : "text-ink/90"}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="/contact"
        className={cn(
          "mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm tracking-tight transition-colors active:scale-[0.98]",
          plan.featured
            ? "bg-bg text-ink hover:bg-accent hover:text-bg"
            : "bg-ink text-bg hover:bg-accent"
        )}
      >
        Book this <ArrowRight size={14} />
      </a>
    </RevealItem>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-bg">
      <div className="mx-auto max-w-site px-6 pb-24 pt-32 md:pb-28 md:pt-40">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Pricing</span>
            <MaskReveal
              as="h1"
              className="display mt-5 text-ink text-[clamp(2.4rem,6vw,5rem)]"
              lines={["Transparent fees,", "no surprises"]}
            />
          </div>
          <p className="max-w-prose text-base leading-relaxed text-muted">
            Clear pricing across every clinic. CHAS, Pioneer and Merdeka Generation
            subsidies are accepted where applicable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Price list */}
          <div className="lg:col-span-7">
            <RevealOnScroll stagger className="space-y-12">
              {pricing.map((group) => (
                <RevealItem key={group.title}>
                  <h3 className="font-sans text-sm uppercase tracking-[0.18em] text-accent-deep">
                    {group.title}
                  </h3>
                  <ul className="mt-4 divide-y divide-line border-t border-line">
                    {group.items.map((item) => (
                      <li key={item.name} className="flex items-baseline justify-between gap-6 py-4">
                        <div>
                          <p className="font-display text-lg font-medium tracking-tight text-ink">
                            {item.name}
                          </p>
                          {item.note && (
                            <p className="mt-0.5 text-sm text-muted">{item.note}</p>
                          )}
                        </div>
                        <span className="shrink-0 font-display text-lg font-medium tracking-tight text-ink tabular-nums">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealOnScroll>
            <p className="mt-8 max-w-prose text-sm leading-relaxed text-muted">
              Prices are indicative and may vary by clinic and physician. Herbal
              medicine is charged separately based on your prescription.
            </p>
          </div>

          {/* Plans */}
          <div className="lg:col-span-5 lg:col-start-8">
            <RevealOnScroll stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
