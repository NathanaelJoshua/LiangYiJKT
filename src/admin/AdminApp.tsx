import { Routes, Route } from "react-router-dom";
import { AdminDataProvider } from "./AdminData";
import { AuthProvider } from "./Auth";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pages from "./pages/Pages";
import PageEdit from "./pages/PageEdit";
import Services from "./pages/Services";
import ServiceEdit from "./pages/ServiceEdit";
import Pricing from "./pages/Pricing";
import PlanEdit from "./pages/PlanEdit";
import GroupEdit from "./pages/GroupEdit";
import Insights from "./pages/Insights";
import ArticleEdit from "./pages/ArticleEdit";
import Locations from "./pages/Locations";
import LocationEdit from "./pages/LocationEdit";
import Physicians from "./pages/Physicians";
import PhysicianEdit from "./pages/PhysicianEdit";
import Partners from "./pages/Partners";
import PartnerEdit from "./pages/PartnerEdit";
import Testimonials from "./pages/Testimonials";
import TestimonialEdit from "./pages/TestimonialEdit";
import Company from "./pages/Company";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminDataProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="pages" element={<Pages />} />
              <Route path="pages/:page" element={<PageEdit />} />
              <Route path="services" element={<Services />} />
              <Route path="services/new" element={<ServiceEdit />} />
              <Route path="services/:id" element={<ServiceEdit />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="pricing/plans/new" element={<PlanEdit />} />
              <Route path="pricing/plans/:index" element={<PlanEdit />} />
              <Route path="pricing/groups/new" element={<GroupEdit />} />
              <Route path="pricing/groups/:index" element={<GroupEdit />} />
              <Route path="locations" element={<Locations />} />
              <Route path="locations/new" element={<LocationEdit />} />
              <Route path="locations/:id" element={<LocationEdit />} />
              <Route path="physicians" element={<Physicians />} />
              <Route path="physicians/new" element={<PhysicianEdit />} />
              <Route path="physicians/:id" element={<PhysicianEdit />} />
              <Route path="partners" element={<Partners />} />
              <Route path="partners/new" element={<PartnerEdit />} />
              <Route path="partners/:id" element={<PartnerEdit />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="testimonials/new" element={<TestimonialEdit />} />
              <Route path="testimonials/:id" element={<TestimonialEdit />} />
              <Route path="insights" element={<Insights />} />
              <Route path="insights/new" element={<ArticleEdit />} />
              <Route path="insights/:slug" element={<ArticleEdit />} />
              <Route path="company" element={<Company />} />
              <Route path="users" element={<Users />} />
              <Route path="users/new" element={<UserEdit />} />
              <Route path="users/:id" element={<UserEdit />} />
            </Route>
          </Route>
        </Routes>
      </AdminDataProvider>
    </AuthProvider>
  );
}
