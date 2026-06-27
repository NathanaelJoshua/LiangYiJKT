import { loc, testimonials, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { usePageField } from "@/lib/cms-data";
import { ScrollReelTestimonials } from "./ui/scroll-reel-testimonials";

export default function Testimonials() {
  const { lang } = useLang();
  const heading = usePageField("Home", "Testimonials heading", loc("Words of praise from our patients."));
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
        <h2 className="display mt-6 text-ink text-[clamp(2rem,5vw,3.8rem)]">{tr(heading, lang)}</h2>
      </div>

      <div className="mx-auto flex max-w-site justify-center px-6">
        <ScrollReelTestimonials testimonials={items} />
      </div>
    </section>
  );
}
