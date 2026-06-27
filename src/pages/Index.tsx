import Navbar from "@/components/Navbar";
import HeroWithLoader from "@/components/HeroWithLoader";
import About from "@/components/About";
import Partners from "@/components/Partners";
import ServiceGrid from "@/components/ServiceGrid";
import Physicians from "@/components/Physicians";
import Articles from "@/components/Articles";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

export default function Index() {
  return (
    <>
      <ScrollProgress />
      <Navbar overHero />
      <main>
        <HeroWithLoader />
        <About />
        <Partners />
        <ServiceGrid />
        <Physicians />
        <Articles />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
