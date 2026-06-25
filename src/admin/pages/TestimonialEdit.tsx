import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { uid, type TestimonialItem } from "../cms";
import { Btn, EditHeader, EditLangProvider, Field, Input, LangTabs, LocField, MediaUpload, Section } from "../ui";
import { loc } from "@/lib/content";

const emptyTestimonial = (): TestimonialItem => ({
  id: uid("tess"),
  name: "",
  quote: loc(""),
  meta: loc(""),
  image: "https://i.pravatar.cc/300?img=32",
});

export default function TestimonialEdit() {
  const { id } = useParams();
  const isNew = !id;
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<TestimonialItem | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) setDraft(emptyTestimonial());
    else if (data) setDraft(data.testimonials.find((t) => t.id === id) ?? null);
  }, [data, id, isNew]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<TestimonialItem>) => setDraft({ ...draft, ...p });

  const save = async () => {
    if (!draft.name) return alert("Name is required.");
    setBusy(true);
    try {
      if (isNew) await api.createTestimonial(draft);
      else await api.updateTestimonial(draft.id, draft);
      await refresh();
      navigate("/admin/testimonials");
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditLangProvider>
      <EditHeader
        backTo="/admin/testimonials"
        backLabel="Back to testimonials"
        title={isNew ? "Add testimonial" : `Edit · ${draft.name}`}
        actions={<><LangTabs /><Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn></>}
      />
      <div className="flex flex-col gap-5">
        <Section title="Person">
          <div className="flex flex-col gap-5">
            <Field label="Photo"><MediaUpload value={draft.image} onChange={(image) => set({ image })} accept="image/*" /></Field>
            <Field label="Name (not translated)"><Input value={draft.name} onChange={(e) => set({ name: e.target.value })} /></Field>
            <LocField label="Meta" value={draft.meta} onChange={(meta) => set({ meta })} />
          </div>
        </Section>
        <Section title="Review" desc="The testimonial paragraph shown in the carousel.">
          <LocField label="Paragraph" value={draft.quote} onChange={(quote) => set({ quote })} textarea rows={5} />
        </Section>
      </div>
    </EditLangProvider>
  );
}
