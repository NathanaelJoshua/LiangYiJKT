import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  SquaresFour,
  Users,
  FileText,
  Stack,
  Tag,
  Article,
  Buildings,
  MapPin,
  Stethoscope,
  Handshake,
  ChatCircleText,
  SignOut,
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  CaretDown,
  List,
  X,
} from "@phosphor-icons/react";
import { useAuth } from "./Auth";
import { useCms } from "./AdminData";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/admin", label: "Dashboard", icon: SquaresFour, end: true },
  { to: "/admin/pages", label: "Page content", icon: FileText },
  { to: "/admin/services", label: "Services", icon: Stack },
  { to: "/admin/pricing", label: "Pricing", icon: Tag },
  { to: "/admin/insights", label: "Insights", icon: Article },
  { to: "/admin/physicians", label: "Physicians", icon: Stethoscope },
  { to: "/admin/locations", label: "Locations", icon: MapPin },
  { to: "/admin/partners", label: "Partners", icon: Handshake },
  { to: "/admin/testimonials", label: "Testimonials", icon: ChatCircleText },
  { to: "/admin/company", label: "Company profile", icon: Buildings },
  { to: "/admin/users", label: "User management", icon: Users },
];

const COLLAPSE_KEY = "liangyi-cms-collapsed";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { error } = useCms();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "1");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  const onLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-[100dvh] bg-surface text-ink">
      <div className="flex w-full">
        {/* Sidebar */}
        <aside
          className={cn(
            "sticky top-0 hidden h-[100dvh] shrink-0 flex-col border-r border-line bg-bg p-4 transition-[width] duration-300 md:flex",
            collapsed ? "w-20" : "w-64"
          )}
        >
          {/* Logo (stays visible when collapsed) */}
          <div className={cn("flex items-center px-1", collapsed ? "justify-center" : "gap-2")}>
            <img src="/logo.png" alt="Liang Yi" className="h-8 w-auto" />
            {!collapsed && <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">CMS</span>}
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm tracking-tight transition-colors",
                    collapsed && "justify-center px-0",
                    isActive ? "bg-ink text-bg" : "text-muted hover:bg-surface hover:text-ink"
                  )
                }
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && label}
              </NavLink>
            ))}
          </nav>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            title={collapsed ? "View live site" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:text-ink",
              collapsed && "justify-center px-0"
            )}
          >
            <ArrowSquareOut size={16} className="shrink-0" />
            {!collapsed && "View live site"}
          </a>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Top navbar */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-bg/90 px-6 backdrop-blur md:px-10">
            <div className="flex items-center gap-3">
              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(true)}
                title="Menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-surface md:hidden"
              >
                <List size={18} />
              </button>
              <div className="flex items-center gap-2 md:hidden">
                <img src="/logo.png" alt="Liang Yi" className="h-7 w-auto" />
                <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">CMS</span>
              </div>
              {/* Sidebar collapse toggle (desktop) */}
              <button
                onClick={() => setCollapsed((c) => !c)}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:bg-surface hover:text-ink md:flex"
              >
                {collapsed ? <CaretRight size={16} /> : <CaretLeft size={16} />}
              </button>
            </div>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-3 rounded-full border border-line py-1.5 pl-1.5 pr-3 transition-colors hover:bg-surface"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-medium text-bg">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-medium leading-tight text-ink">{user?.name}</span>
                  <span className="block text-xs leading-tight text-muted">{user?.role}</span>
                </span>
                <CaretDown size={14} className={cn("text-muted transition-transform", menuOpen && "rotate-180")} />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-bg shadow-soft">
                    <div className="border-b border-line px-4 py-3">
                      <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
                      <p className="truncate text-xs text-muted">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => { setMenuOpen(false); onLogout(); }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      <SignOut size={16} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>

          <div className="px-6 py-8 md:px-10 md:py-10">
            {error && (
              <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {error} — is the API running? Start it with <code className="font-mono">npm run server</code>.
              </div>
            )}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-line bg-bg p-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Liang Yi" className="h-8 w-auto" />
                <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">CMS</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="mt-8 flex flex-1 flex-col gap-1">
              {nav.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm tracking-tight transition-colors",
                      isActive ? "bg-ink text-bg" : "text-muted hover:bg-surface hover:text-ink"
                    )
                  }
                >
                  <Icon size={18} className="shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:text-ink"
            >
              <ArrowSquareOut size={16} /> View live site
            </a>
          </aside>
        </div>
      )}
    </div>
  );
}
