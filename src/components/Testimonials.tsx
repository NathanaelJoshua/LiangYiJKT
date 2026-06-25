import { testimonials, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { ScrollReelTestimonials } from "./ui/scroll-reel-testimonials";
import MaskReveal from "./ui/MaskReveal";

export default function Testimonials() {
  const { lang } = useLang();
  const items = testimonials.map((t) => ({
    quote: tr(t.quote, lang),
    author: `${t.name} · ${tr(t.meta, lang)}`,
    image: t.image,
    alt: t.name,
  }));
  return (
    <section className="border-y border-line bg-bg py-24 md:py-28">
      <div className="mx-auto mb-14 max-w-2xl px-6 text-center">
        <span className="eyebrow">Testimonials</span>
        <MaskReveal
          as="h2"
          className="display mt-6 text-ink text-[clamp(2rem,5vw,3.8rem)]"
          lineClassName="text-center"
          lines={[
            "Words of praise from",
            <span key="l2" className="italic">our patients.</span>,
          ]}
        />
      </div>

      <div className="mx-auto flex max-w-site justify-center px-6">
        <ScrollReelTestimonials testimonials={items} />
      </div>
    </section>
  );
}
