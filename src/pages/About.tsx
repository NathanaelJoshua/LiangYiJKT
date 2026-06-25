import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import AboutClinic from "@/components/AboutClinic";
import CorporateWellness from "@/components/CorporateWellness";
import Physicians from "@/components/Physicians";
import Testimonials from "@/components/Testimonials";
import BookCta from "@/components/BookCta";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PageGlow from "@/components/PageGlow";
import { img } from "@/lib/content";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative isolate pt-16 md:pt-20">
        <PageGlow />
        <About as="h1" />

        {/* Editorial image band */}
        <section className="border-b border-line bg-bg">
          <div className="mx-auto max-w-site px-6 py-16 md:py-20">
            <RevealOnScroll>
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-line bg-line shadow-soft">
                <img
                  src={img("liangyi-about-wide", 2000, 860)}
                  alt="Inside a Liang Yi TCM clinic"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                <p className="absolute bottom-6 left-6 max-w-sm font-serif text-xl italic leading-snug text-bg md:bottom-8 md:left-8 md:text-2xl">
                  “We restore the balance the body was built to keep.”
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <AboutClinic />
        <CorporateWellness />
        <Physicians />
        <Testimonials />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
