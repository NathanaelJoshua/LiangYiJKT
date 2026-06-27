import type { Service, Article, PriceGroup, Plan, Clinic, Physician, Testimonial, Localized } from "@/lib/content";

export type LocationItem = Clinic & { id: string };
export type PhysicianItem = Physician & { id: string };
export type TestimonialItem = Testimonial & { id: string };

export interface PartnerItem {
  id: string;
  name: string;
  image: string;
}

export type Role = "Admin" | "Editor" | "Viewer";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}

export interface CompanyProfile {
  name: string;
  est: string;
  tagline: Localized;
  positioning: Localized;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  hours: string;
  heroImage: string;
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
  };
}

/** Page fields are bilingual text (Localized) or a plain string (e.g. an image URL). */
export type PageContent = Record<string, Localized | string>;

export interface CmsData {
  users: AdminUser[];
  company: CompanyProfile;
  pages: Record<string, PageContent>;
  services: Service[];
  pricing: { groups: PriceGroup[]; plans: Plan[] };
  articles: Article[];
  locations: LocationItem[];
  physicians: PhysicianItem[];
  partners: PartnerItem[];
  testimonials: TestimonialItem[];
}

export interface Session {
  name: string;
  email: string;
  role: string;
}

export const TOKEN_KEY = "liangyi-cms-token";
export const SESSION_KEY = "liangyi-cms-session";

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.floor(performance.now() * 1000).toString(36)}`;
}
