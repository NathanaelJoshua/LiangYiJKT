import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Partners from "@/components/Partners";
import ServiceGrid from "@/components/ServiceGrid";
import Physicians from "@/components/Physicians";
import Articles from "@/components/Articles";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <>
      <Navbar overHero />
      <main>
        <Hero />
        <About />
        <Partners />
        <ServiceGrid />
        <Physicians />
        <Articles />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
