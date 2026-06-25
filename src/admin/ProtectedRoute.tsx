import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth";

export default function ProtectedRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
