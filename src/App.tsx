import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Index from "@/pages/Index";

export default function App() {
  return (
    <SmoothScrollProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </SmoothScrollProvider>
  );
}
