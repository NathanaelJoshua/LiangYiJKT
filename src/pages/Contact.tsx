import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PageGlow from "@/components/PageGlow";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative isolate pt-16 md:pt-20">
        <PageGlow />
        <ContactSection as="h1" />
      </main>
      <Footer />
    </>
  );
}
