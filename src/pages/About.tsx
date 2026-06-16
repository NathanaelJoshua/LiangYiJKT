import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Physicians from "@/components/Physicians";
import BookCta from "@/components/BookCta";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <About as="h1" />
        <Physicians />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
