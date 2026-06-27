import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Btn, Card, EditHeader, EditLangProvider, Field, LangTabs, LocField, MediaUpload, Section } from "../ui";
import type { Localized } from "@/lib/content";
import type { PageContent } from "../cms";

const isLoc = (v: Localized | string): v is Localized => typeof v === "object" && v !== null && "en" in v;

export default function PageEdit() {
  const { page } = useParams();
  const name = page ? decodeURIComponent(page) : "";
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [fields, setFields] = useState<PageContent | null>(null);
  const [heroImage, setHeroImage] = useState("");
  const [busy, setBusy] = useState(false);

  // The Home page also owns the hero background image (stored on the company profile).
  const isHome = name.toLowerCase() === "home";

  useEffect(() => {
    if (data) {
      setFields(data.pages[name] ?? null);
      setHeroImage(data.company.heroImage ?? "");
    }
  }, [data, name]);

  if (!data) return <p className="text-sm text-muted">Loading…</p>;
  if (!fields) {
    return (
      <div>
        <Link to="/admin/pages" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={15} /> Back to pages
        </Link>
        <p className="text-sm text-muted">Page “{name}” not found.</p>
      </div>
    );
  }

  const set = (key: string, value: Localized | string) => setFields({ ...fields, [key]: value });

  const save = async () => {
    setBusy(true);
    try {
      await api.savePages({ ...data.pages, [name]: fields });
      if (isHome && heroImage !== (data.company.heroImage ?? "")) {
        await api.saveCompany({ ...data.company, heroImage });
      }
      await refresh();
      navigate("/admin/pages");
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditLangProvider>
      <EditHeader
        backTo="/admin/pages"
        backLabel="Back to pages"
        title={`${name} page`}
        subtitle="Headings and copy shown on this page"
        actions={<><LangTabs /><Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn></>}
      />
      {isHome && (
        <div className="mb-5">
          <Section title="Hero image" desc="Background image behind the homepage hero. Use a wide, high-resolution photo.">
            <Field label="Hero image">
              <MediaUpload value={heroImage} onChange={setHeroImage} accept="image/*" aspect="wide" />
            </Field>
          </Section>
        </div>
      )}
      <Card>
        <div className="flex flex-col gap-6">
          {Object.entries(fields).map(([key, value]) =>
            isLoc(value) ? (
              <LocField
                key={key}
                label={key}
                value={value}
                onChange={(v) => set(key, v)}
                textarea={value.en.length > 60}
                rows={3}
              />
            ) : (
              <Field key={key} label={key}>
                <MediaUpload value={value} onChange={(url) => set(key, url)} accept="image/*" aspect="wide" />
              </Field>
            )
          )}
        </div>
      </Card>
    </EditLangProvider>
  );
}
