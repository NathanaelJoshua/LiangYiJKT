import { partners } from "@/lib/content";
import { LogoCloud } from "./ui/logo-cloud-3";
import RevealOnScroll from "./ui/RevealOnScroll";
import MaskReveal from "./ui/MaskReveal";

export default function Partners() {
  return (
    <section id="partners" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-site px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our corporate partners</span>
          <MaskReveal
            as="h2"
            className="display mt-5 text-ink text-[clamp(1.7rem,4vw,3rem)]"
            lineClassName="text-center"
            lines={[
              <>
                Trusted by teams <span className="italic">across Singapore</span>
              </>,
            ]}
          />
        </div>

        <div className="mx-auto my-9 h-px max-w-sm bg-line [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        <RevealOnScroll>
          <LogoCloud logos={partners} />
        </RevealOnScroll>

        <div className="mx-auto mt-9 h-px max-w-sm bg-line [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>
    </section>
  );
}
