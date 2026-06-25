import { TOKEN_KEY } from "./cms";
import type { AdminUser, CompanyProfile, CmsData, LocationItem, PhysicianItem, PartnerItem, TestimonialItem } from "./cms";
import type { Localized } from "@/lib/content";
import type { Service, Article, PriceGroup, Plan } from "@/lib/content";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function req<T = unknown>(method: string, path: string, body?: unknown): Promise<T> {
  const token = getToken();
  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return res.status === 204 ? (null as T) : ((await res.json()) as T);
}

async function uploadFile(file: File | Blob, filename = "upload"): Promise<{ url: string; type: string }> {
  const token = getToken();
  const fd = new FormData();
  fd.append("file", file, file instanceof File ? file.name : filename);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: fd,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || `Upload failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  bootstrap: () => req<CmsData>("GET", "/bootstrap"),
  upload: uploadFile,
  login: (email: string, password: string) =>
    req<{ token: string; user: { name: string; email: string; role: string } }>("POST", "/auth/login", {
      email,
      password,
    }),

  saveCompany: (v: CompanyProfile) => req("PUT", "/company", v),
  savePages: (v: Record<string, Record<string, Localized>>) => req("PUT", "/pages", v),
  savePricing: (v: { groups: PriceGroup[]; plans: Plan[] }) => req("PUT", "/pricing", v),

  createUser: (u: AdminUser & { password?: string }) => req("POST", "/users", u),
  updateUser: (id: string, u: Partial<AdminUser> & { password?: string }) => req("PUT", `/users/${id}`, u),
  deleteUser: (id: string) => req("DELETE", `/users/${id}`),

  createService: (s: Service) => req("POST", "/services", s),
  updateService: (id: string, s: Service) => req("PUT", `/services/${id}`, s),
  deleteService: (id: string) => req("DELETE", `/services/${id}`),

  createArticle: (a: Article) => req("POST", "/articles", a),
  updateArticle: (slug: string, a: Article) => req("PUT", `/articles/${slug}`, a),
  deleteArticle: (slug: string) => req("DELETE", `/articles/${slug}`),

  createLocation: (l: LocationItem) => req("POST", "/locations", l),
  updateLocation: (id: string, l: LocationItem) => req("PUT", `/locations/${id}`, l),
  deleteLocation: (id: string) => req("DELETE", `/locations/${id}`),

  createPhysician: (p: PhysicianItem) => req("POST", "/physicians", p),
  updatePhysician: (id: string, p: PhysicianItem) => req("PUT", `/physicians/${id}`, p),
  deletePhysician: (id: string) => req("DELETE", `/physicians/${id}`),

  createPartner: (p: PartnerItem) => req("POST", "/partners", p),
  updatePartner: (id: string, p: PartnerItem) => req("PUT", `/partners/${id}`, p),
  deletePartner: (id: string) => req("DELETE", `/partners/${id}`),

  createTestimonial: (t: TestimonialItem) => req("POST", "/testimonials", t),
  updateTestimonial: (id: string, t: TestimonialItem) => req("PUT", `/testimonials/${id}`, t),
  deleteTestimonial: (id: string) => req("DELETE", `/testimonials/${id}`),
};
