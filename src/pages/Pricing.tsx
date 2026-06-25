import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCta from "@/components/BookCta";
import PricingSection from "@/components/Pricing";
import PageGlow from "@/components/PageGlow";

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative isolate">
        <PageGlow />
        <PricingSection />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
