import { HandHeart, Stethoscope, ChalkboardTeacher } from "@phosphor-icons/react";
import { partners } from "@/lib/content";
import { LogoCloud } from "./ui/logo-cloud-3";
import RevealOnScroll, { RevealItem } from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

const offerings = [
  {
    icon: HandHeart,
    title: "Express Tuina Massage",
    copy: "A therapeutic massage designed to relieve tension, improve circulation and boost energy — ideal for wellness days and conferences.",
  },
  {
    icon: Stethoscope,
    title: "Express Physician Consultation",
    copy: "One-on-one sessions with our licensed TCM physicians, helping staff understand their body constitution and receive personalised guidance.",
  },
  {
    icon: ChalkboardTeacher,
    title: "Physician-led Health Talks",
    copy: "Bilingual physicians lead engaging talks — from stress management to immunity and digestive health — on the topics that matter to your team.",
  },
];

export default function CorporateWellness() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="mx-auto max-w-site px-6 py-24 md:py-32">
        <div className="mb-14 max-w-2xl">
          <span className="eyebrow">Corporate wellness</span>
          <MaskReveal
            as="h2"
            className="display mt-5 text-ink text-[clamp(2rem,5vw,3.6rem)]"
            lines={[
              "Holistic health,",
              <span key="l2" className="italic">brought to your workplace.</span>,
            ]}
          />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Looking to enhance employee well-being at your next corporate event or staff
            appreciation day? We bring holistic health experiences directly to your
            workplace — tailored for convenience, education and revitalisation.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offerings.map(({ icon: Icon, title, copy }) => (
            <RevealItem key={title} className="rounded-2xl border border-line bg-surface p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                <Icon size={22} weight="regular" />
              </span>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{copy}</p>
            </RevealItem>
          ))}
        </RevealOnScroll>

        {/* Clients */}
        <RevealOnScroll className="mt-16 md:mt-20">
          <p className="eyebrow text-center">Companies we've worked with</p>
          <div className="mt-8">
            <LogoCloud logos={partners} />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
