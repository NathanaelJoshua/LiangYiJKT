import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCta from "@/components/BookCta";
import ServiceList from "@/components/ServiceList";
import MaskReveal from "@/components/ui/MaskReveal";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar overHero />
      <main className="relative isolate overflow-hidden bg-ink text-bg">
        {/* Teal glow over the dark hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[70vh] bg-gradient-to-b from-accent/25 via-accent/[0.06] to-transparent"
        />
        <section className="relative z-10 mx-auto max-w-site px-6 pt-32 md:pt-40">
          <div className="max-w-3xl">
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent">
              Our services
            </span>
            <MaskReveal
              as="h1"
              className="display mt-6 text-bg text-[clamp(2.6rem,7vw,5.5rem)]"
              lines={[
                "Result-oriented TCM",
                <span key="l2" className="italic">for your health needs</span>,
              ]}
            />
            <p className="mt-7 max-w-prose text-lg leading-relaxed text-bg/70">
              Personalised, evidence-informed Traditional Chinese Medicine — from first
              consultation to specialised therapy, under one registered roof.
            </p>
          </div>

          <div className="mt-16 pb-24 md:mt-20 md:pb-28">
            <ServiceList />
          </div>
        </section>
      </main>
      <BookCta />
      <Footer />
    </>
  );
}
