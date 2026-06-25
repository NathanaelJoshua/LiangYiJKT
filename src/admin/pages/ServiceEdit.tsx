import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Btn, Card, EditHeader, EditLangProvider, Field, LangTabs, LocField, MediaUpload, RepeatableLoc, RepeatableLocTable } from "../ui";
import { loc, type Service } from "@/lib/content";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const emptyService = (): Service => ({
  id: "",
  name: loc(""),
  scope: loc(""),
  description: loc(""),
  image: "https://picsum.photos/seed/new-service/1200/1500",
  hoverImage: "",
  whatIs: loc(""),
  conditions: [],
  benefits: [],
  faqs: [],
});

export default function ServiceEdit() {
  const { id } = useParams();
  const isNew = !id;
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) setDraft(emptyService());
    else if (data) setDraft(data.services.find((s) => s.id === id) ?? null);
  }, [data, id, isNew]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<Service>) => setDraft({ ...draft, ...p });

  const save = async () => {
    if (!draft.name.en) return alert("Name (EN) is required.");
    const finalId = isNew ? draft.id || slugify(draft.name.en) : draft.id;
    const payload: Service = { ...draft, id: finalId };
    setBusy(true);
    try {
      if (isNew) await api.createService(payload);
      else await api.updateService(finalId, payload);
      await refresh();
      navigate("/admin/services");
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditLangProvider>
      <EditHeader
        backTo="/admin/services"
        backLabel="Back to services"
        title={isNew ? "Add service" : `Edit · ${draft.name.en}`}
        actions={<><LangTabs /><Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn></>}
      />

      <div className="flex flex-col gap-5">
        <Card>
          <div className="flex flex-col gap-5">
            <LocField label="Name" value={draft.name} onChange={(name) => set({ name })} />
            <LocField label="Tagline / scope" value={draft.scope} onChange={(scope) => set({ scope })} />
            <Field label="Image / video"><MediaUpload value={draft.image} onChange={(image) => set({ image })} aspect="wide" /></Field>
            <LocField label="Short description" value={draft.description} onChange={(description) => set({ description })} textarea rows={2} />
            <LocField label="Overview (“What is…”)" value={draft.whatIs} onChange={(whatIs) => set({ whatIs })} textarea rows={3} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-lg font-medium text-ink">Conditions treated</h2>
          <RepeatableLoc items={draft.conditions} onChange={(conditions) => set({ conditions })} header="Condition" addLabel="Add condition" />
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-lg font-medium text-ink">Benefits</h2>
          <RepeatableLocTable
            items={draft.benefits}
            onChange={(benefits) => set({ benefits })}
            newItem={() => ({ title: loc(""), copy: loc("") })}
            addLabel="Add benefit"
            fields={[
              { header: "Title", get: (b) => b.title, set: (b, v) => ({ ...b, title: v }) },
              { header: "Description", get: (b) => b.copy, set: (b, v) => ({ ...b, copy: v }) },
            ]}
          />
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-lg font-medium text-ink">FAQs</h2>
          <RepeatableLocTable
            items={draft.faqs}
            onChange={(faqs) => set({ faqs })}
            newItem={() => ({ q: loc(""), a: loc("") })}
            addLabel="Add question"
            fields={[
              { header: "Question", get: (f) => f.q, set: (f, v) => ({ ...f, q: v }) },
              { header: "Answer", get: (f) => f.a, set: (f, v) => ({ ...f, a: v }) },
            ]}
          />
        </Card>
      </div>
    </EditLangProvider>
  );
}
