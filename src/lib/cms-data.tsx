import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BRAND, type Localized } from "./content";

/**
 * Public CMS data layer.
 * Fetches /api/bootstrap once on mount and exposes it to the public site,
 * falling back to the static content.ts values until (or unless) it loads.
 * This is the bridge the rest of the pages will read from as they are
 * converted to be fully CMS-driven.
 */

export interface PublicCompany {
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
  socials: { instagram: string; facebook: string; tiktok: string; youtube: string };
}

const fallbackCompany: PublicCompany = {
  name: BRAND.name,
  est: BRAND.est,
  tagline: BRAND.tagline,
  positioning: BRAND.positioning,
  email: BRAND.email,
  phone: BRAND.phone,
  whatsapp: BRAND.whatsapp,
  address: "",
  hours: "",
  heroImage: "",
  socials: BRAND.socials,
};

export type PageContent = Record<string, Localized | string>;
export type PagesMap = Record<string, PageContent>;

interface CmsContextValue {
  company: PublicCompany;
  pages: PagesMap;
  loaded: boolean;
}

const CmsContext = createContext<CmsContextValue>({ company: fallbackCompany, pages: {}, loaded: false });

export function PublicCmsProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<PublicCompany>(fallbackCompany);
  const [pages, setPages] = useState<PagesMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/bootstrap")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`bootstrap ${r.status}`))))
      .then((data: { company?: Partial<PublicCompany>; pages?: PagesMap }) => {
        if (cancelled) return;
        if (data?.company) {
          // Merge over fallback so any missing field keeps a sensible default.
          setCompany({ ...fallbackCompany, ...data.company, socials: { ...fallbackCompany.socials, ...data.company.socials } });
        }
        if (data?.pages) setPages(data.pages);
      })
      .catch(() => {
        /* offline / no API — keep static fallback */
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <CmsContext.Provider value={{ company, pages, loaded }}>{children}</CmsContext.Provider>;
}

export const useCompany = () => useContext(CmsContext).company;
export const useCmsLoaded = () => useContext(CmsContext).loaded;
export const usePages = () => useContext(CmsContext).pages;

/**
 * Read a single localized field from a CMS page, case-insensitively, with a fallback.
 * e.g. usePageField("Home", "Hero headline", BRAND.tagline)
 */
function readPageValue(pages: PagesMap, page: string, key: string): Localized | string | undefined {
  const pageData =
    pages[page] ?? pages[Object.keys(pages).find((k) => k.toLowerCase() === page.toLowerCase()) ?? ""];
  if (!pageData) return undefined;
  return pageData[key] ?? pageData[Object.keys(pageData).find((k) => k.toLowerCase() === key.toLowerCase()) ?? ""];
}

export function usePageField(page: string, key: string, fallback: Localized): Localized {
  const match = readPageValue(usePages(), page, key);
  return match && typeof match === "object" ? match : fallback;
}

/** Read a plain-string page field (e.g. an image URL) with a fallback. */
export function usePageImage(page: string, key: string, fallback = ""): string {
  const match = readPageValue(usePages(), page, key);
  return typeof match === "string" && match ? match : fallback;
}
