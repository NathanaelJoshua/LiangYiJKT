import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/lib/lang";
import { PublicCmsProvider } from "@/lib/cms-data";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Index from "@/pages/Index";
import Locations from "@/pages/Locations";
import Contact from "@/pages/Contact";
import Insights from "@/pages/Insights";
import ArticleDetail from "@/pages/ArticleDetail";
import Pricing from "@/pages/Pricing";
import AboutPage from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import AdminApp from "@/admin/AdminApp";

export default function App() {
  return (
    <LangProvider>
    <PublicCmsProvider>
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
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </SmoothScrollProvider>
    </PublicCmsProvider>
    </LangProvider>
  );
}
