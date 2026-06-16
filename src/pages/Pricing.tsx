import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCta from "@/components/BookCta";
import PricingSection from "@/components/Pricing";

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PricingSection />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
