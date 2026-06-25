import { Link } from "react-router-dom";
import {
  Stack,
  Article,
  Tag,
  MapPin,
  Stethoscope,
  Handshake,
  ChatCircleText,
  Users,
  FileText,
  Buildings,
  Plus,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { useAuth } from "../Auth";
import { Card } from "../ui";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { data, loading } = useCms();
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  const modules = [
    { label: "Page content", to: "/admin/pages", icon: FileText, count: data ? Object.keys(data.pages).length : 0, desc: "Headings & copy" },
    { label: "Services", to: "/admin/services", icon: Stack, count: data?.services.length ?? 0, desc: "Treatment catalogue" },
    { label: "Pricing", to: "/admin/pricing", icon: Tag, count: data?.pricing.plans.length ?? 0, desc: "Plans & price list" },
    { label: "Insights", to: "/admin/insights", icon: Article, count: data?.articles.length ?? 0, desc: "Articles & news" },
    { label: "Physicians", to: "/admin/physicians", icon: Stethoscope, count: data?.physicians.length ?? 0, desc: "Clinical team" },
    { label: "Locations", to: "/admin/locations", icon: MapPin, count: data?.locations.length ?? 0, desc: "Clinic branches" },
    { label: "Partners", to: "/admin/partners", icon: Handshake, count: data?.partners.length ?? 0, desc: "Corporate logos" },
    { label: "Testimonials", to: "/admin/testimonials", icon: ChatCircleText, count: data?.testimonials.length ?? 0, desc: "Patient reviews" },
    { label: "Company", to: "/admin/company", icon: Buildings, count: 1, desc: "Contact & brand" },
    { label: "Users", to: "/admin/users", icon: Users, count: data?.users.length ?? 0, desc: "CMS accounts" },
  ];

  const stats = [
    { label: "Services", value: data?.services.length ?? 0, icon: Stack, to: "/admin/services" },
    { label: "Articles", value: data?.articles.length ?? 0, icon: Article, to: "/admin/insights" },
    { label: "Physicians", value: data?.physicians.length ?? 0, icon: Stethoscope, to: "/admin/physicians" },
    { label: "Testimonials", value: data?.testimonials.length ?? 0, icon: ChatCircleText, to: "/admin/testimonials" },
  ];

  const quickActions = [
    { label: "New article", to: "/admin/insights/new", icon: Article },
    { label: "New service", to: "/admin/services/new", icon: Stack },
    { label: "New testimonial", to: "/admin/testimonials/new", icon: ChatCircleText },
    { label: "New physician", to: "/admin/physicians/new", icon: Stethoscope },
  ];

  const recent = data?.articles.slice(0, 4) ?? [];

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div className="rounded-2xl border border-line bg-gradient-to-br from-accent/15 via-bg to-bg p-7 md:p-9">
        <p className="font-sans text-sm tracking-tight text-accent-deep">{greeting()}</p>
        <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
          {firstName}, welcome back.
        </h1>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
          Manage everything that appears on your website from here — content, services, team, and more.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium tracking-tight text-ink transition-colors hover:border-ink/30 hover:bg-surface"
            >
              <Plus size={15} className="text-accent-deep" /> {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Highlight stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to}>
            <Card className="group h-full transition-colors hover:border-ink/30">
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-deep">
                  <s.icon size={20} />
                </span>
                <ArrowUpRight size={16} className="text-muted/50 transition-colors group-hover:text-ink" />
              </div>
              <p className="mt-5 font-display text-4xl font-medium tracking-tightest text-ink">
                {loading && !data ? "—" : s.value}
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Manage + recent */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Manage content */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-medium tracking-tight text-ink">Manage content</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {modules.map((m) => (
              <Link key={m.to} to={m.to}>
                <div className="group flex items-center gap-4 rounded-xl border border-line bg-bg p-4 transition-colors hover:border-ink/30 hover:bg-surface">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-ink transition-colors group-hover:bg-accent/15 group-hover:text-accent-deep">
                    <m.icon size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium tracking-tight text-ink">{m.label}</p>
                    <p className="truncate text-xs text-muted">{m.desc}</p>
                  </div>
                  <span className="font-display text-lg font-medium tabular-nums text-muted">{m.count}</span>
                  <ArrowRight size={16} className="text-muted/40 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent articles */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-medium tracking-tight text-ink">Recent articles</h2>
            <Link to="/admin/insights" className="text-sm font-medium text-accent-deep hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-bg">
            {recent.length === 0 && <p className="p-5 text-sm text-muted">No articles yet.</p>}
            {recent.map((a) => (
              <Link key={a.slug} to={`/admin/insights/${a.slug}`} className="flex items-center gap-3 p-4 transition-colors hover:bg-surface">
                <img src={a.image} alt="" className="h-11 w-14 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{a.title.en}</p>
                  <p className="text-xs text-muted">{a.category.en} · {a.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
