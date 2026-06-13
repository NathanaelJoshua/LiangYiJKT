import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Refrain from "@/components/Refrain";
import ServiceGrid from "@/components/ServiceGrid";
import Philosophy from "@/components/Philosophy";
import CareJourney from "@/components/CareJourney";
import Physicians from "@/components/Physicians";
import Locations from "@/components/Locations";
import Testimonials from "@/components/Testimonials";
import Articles from "@/components/Articles";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Refrain />
        <ServiceGrid />
        <Philosophy />
        <CareJourney />
        <Physicians />
        <Locations />
        <Testimonials />
        <Articles />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
