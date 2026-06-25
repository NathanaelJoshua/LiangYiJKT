import { useEffect, useState } from "react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Btn, EditLangProvider, Field, Input, LangTabs, LocField, PageHeader, Section } from "../ui";
import type { CompanyProfile } from "../cms";
import type { Localized } from "@/lib/content";

export default function Company() {
  const { data, refresh } = useCms();
  const [draft, setDraft] = useState<CompanyProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setDraft({
        ...data.company,
        socials: data.company.socials ?? { instagram: "", facebook: "", tiktok: "", youtube: "" },
      });
    }
  }, [data]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = <K extends keyof CompanyProfile>(k: K, v: CompanyProfile[K]) => {
    setDraft({ ...draft, [k]: v });
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.saveCompany(draft);
      await refresh();
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditLangProvider>
      <PageHeader
        title="Company profile"
        desc="Contact details and brand information used across the site."
        actions={
          <Btn onClick={save} disabled={saving}>
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
          </Btn>
        }
      />
      <div className="flex flex-col gap-5">
        <Section title="Details">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Clinic name"><Input value={draft.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label="Established"><Input value={draft.est} onChange={(e) => set("est", e.target.value)} /></Field>
            <Field label="Email"><Input value={draft.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label="Phone"><Input value={draft.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
            <Field label="WhatsApp"><Input value={draft.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></Field>
            <Field label="Hours"><Input value={draft.hours} onChange={(e) => set("hours", e.target.value)} /></Field>
            <div className="sm:col-span-2"><Field label="Address"><Input value={draft.address} onChange={(e) => set("address", e.target.value)} /></Field></div>
          </div>
        </Section>

        <Section title="Social media" desc="Profile links used in the navbar and footer.">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Instagram"><Input value={draft.socials.instagram} placeholder="https://instagram.com/…" onChange={(e) => set("socials", { ...draft.socials, instagram: e.target.value })} /></Field>
            <Field label="Facebook"><Input value={draft.socials.facebook} placeholder="https://facebook.com/…" onChange={(e) => set("socials", { ...draft.socials, facebook: e.target.value })} /></Field>
            <Field label="TikTok"><Input value={draft.socials.tiktok} placeholder="https://tiktok.com/@…" onChange={(e) => set("socials", { ...draft.socials, tiktok: e.target.value })} /></Field>
            <Field label="YouTube"><Input value={draft.socials.youtube} placeholder="https://youtube.com/@…" onChange={(e) => set("socials", { ...draft.socials, youtube: e.target.value })} /></Field>
          </div>
        </Section>

        <Section title="Brand messaging" desc="Shown across the site — bilingual.">
          <div className="mb-4"><LangTabs /></div>
          <div className="flex flex-col gap-5">
            <LocField label="Tagline" value={draft.tagline} onChange={(v: Localized) => set("tagline", v)} />
            <LocField label="Positioning" value={draft.positioning} onChange={(v: Localized) => set("positioning", v)} textarea rows={2} />
          </div>
        </Section>
      </div>
    </EditLangProvider>
  );
}
