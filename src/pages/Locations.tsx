import { useEffect } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCta from "@/components/BookCta";
import ClinicDirectory from "@/components/ClinicDirectory";
import MaskReveal from "@/components/ui/MaskReveal";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { clinics, regions } from "@/lib/content";

export default function Locations() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative isolate">
        {/* Aesthetic backdrop: green→white wash + faint map dot-grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[110vh] bg-gradient-to-b from-accent/35 via-accent/10 to-transparent"
        />

        {/* Asymmetric editorial header */}
        <header className="mx-auto max-w-site px-6 pb-12 pt-32 md:pt-40">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="eyebrow">Clinic Locations</span>
              <MaskReveal
                as="h1"
                className="display mt-6 text-ink text-[clamp(2.6rem,7vw,5.5rem)]"
                lines={["Find us, wherever", "you are in Singapore"]}
              />
              <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
                Our clinics are spread across the island — in the malls you already
                pass through — so quality TCM care is never a detour.
              </p>
            </div>

            {/* Stat rail */}
            <RevealOnScroll className="md:col-span-4 md:justify-self-end">
              <dl className="flex gap-10 md:flex-col md:gap-6 md:text-right">
                <div>
                  <dt className="font-sans text-sm tracking-tight text-muted">Clinics</dt>
                  <dd className="font-display text-5xl font-medium tracking-tightest text-ink">
                    {clinics.length}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-sm tracking-tight text-muted">Regions</dt>
                  <dd className="font-display text-5xl font-medium tracking-tightest text-ink">
                    {regions.length}
                  </dd>
                </div>
              </dl>
            </RevealOnScroll>
          </div>

          <div className="mt-14 flex items-center gap-3 text-muted">
            <ArrowDown size={16} />
            <span className="eyebrow">Filter by region below</span>
          </div>
        </header>

        <ClinicDirectory />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
