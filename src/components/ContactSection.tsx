import { WhatsappLogo, Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react";
import ContactForm from "./ContactForm";
import MaskReveal from "./ui/MaskReveal";
import RevealOnScroll from "./ui/RevealOnScroll";
import { BRAND, clinics, telLink, waLink } from "@/lib/content";

export default function ContactSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section id="contact" className="mx-auto max-w-site px-6 py-24 md:py-32">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="eyebrow">Contact us</span>
        <MaskReveal
          as={as}
          className="display mt-6 text-ink text-[clamp(2.4rem,6vw,5rem)]"
          lines={[
            "Let's talk about",
            <span key="l2" className="italic">your health</span>,
          ]}
        />
        <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
          Tell us a little about what you need and we'll continue the conversation on
          WhatsApp — the fastest way to reach our physicians.
        </p>
      </div>

      {/* Asymmetric: info rail (5) + form (7) */}
      <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
        <RevealOnScroll className="md:col-span-5">
          <div className="divide-y divide-line border-y border-line">
            <InfoRow icon={<WhatsappLogo size={20} className="text-accent" />} label="WhatsApp">
              <a href={waLink(BRAND.whatsapp)} target="_blank" rel="noreferrer" className="hover:text-accent">
                {BRAND.whatsapp}
              </a>
            </InfoRow>
            <InfoRow icon={<Phone size={20} className="text-accent" />} label="Call">
              <a href={telLink(BRAND.phone)} className="hover:text-accent">{BRAND.phone}</a>
            </InfoRow>
            <InfoRow icon={<EnvelopeSimple size={20} className="text-accent" />} label="Email">
              <a href={`mailto:${BRAND.email}`} className="hover:text-accent">{BRAND.email}</a>
            </InfoRow>
            <InfoRow icon={<MapPin size={20} className="text-accent" />} label="Clinics">
              <a href="/clinic-locations" className="hover:text-accent">
                {clinics.length} locations across Singapore
              </a>
            </InfoRow>
          </div>
          <p className="mt-8 max-w-prose text-base leading-relaxed text-muted">
            Operating hours are <span className="text-ink">10am – 10pm</span> daily;
            consultations from <span className="text-ink">11am – 8pm</span>.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="md:col-span-7">
          <ContactForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 py-5">
      <span className="shrink-0">{icon}</span>
      <div className="flex flex-1 items-baseline justify-between gap-4">
        <span className="font-sans text-sm uppercase tracking-[0.16em] text-muted">{label}</span>
        <span className="text-right font-display text-lg font-medium tracking-tight text-ink">
          {children}
        </span>
      </div>
    </div>
  );
}
