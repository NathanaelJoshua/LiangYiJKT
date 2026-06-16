import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Index from "@/pages/Index";
import Locations from "@/pages/Locations";
import Contact from "@/pages/Contact";
import Insights from "@/pages/Insights";
import ArticleDetail from "@/pages/ArticleDetail";
import Pricing from "@/pages/Pricing";
import AboutPage from "@/pages/About";

export default function App() {
  return (
    <SmoothScrollProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clinic-locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<ArticleDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </SmoothScrollProvider>
  );
}
