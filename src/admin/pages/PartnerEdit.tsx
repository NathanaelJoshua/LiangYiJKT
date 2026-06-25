import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { uid, type PartnerItem } from "../cms";
import { Btn, EditHeader, Field, Input, MediaUpload, Section } from "../ui";

const emptyPartner = (): PartnerItem => ({ id: uid("partner"), name: "", image: "" });

export default function PartnerEdit() {
  const { id } = useParams();
  const isNew = !id;
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<PartnerItem | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) setDraft(emptyPartner());
    else if (data) setDraft(data.partners.find((p) => p.id === id) ?? null);
  }, [data, id, isNew]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<PartnerItem>) => setDraft({ ...draft, ...p });

  const save = async () => {
    if (!draft.name) return alert("Company name is required.");
    setBusy(true);
    try {
      if (isNew) await api.createPartner(draft);
      else await api.updatePartner(draft.id, draft);
      await refresh();
      navigate("/admin/partners");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <EditHeader
        backTo="/admin/partners"
        backLabel="Back to partners"
        title={isNew ? "Add partner" : `Edit · ${draft.name}`}
        actions={<Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn>}
      />
      <Section title="Partner" desc="Company name and logo. The background is removed automatically on upload.">
        <div className="flex flex-col gap-5">
          <Field label="Company name"><Input value={draft.name} onChange={(e) => set({ name: e.target.value })} /></Field>
          <Field label="Logo">
            <MediaUpload value={draft.image} onChange={(image) => set({ image })} accept="image/*" aspect="wide" removeBg />
          </Field>
        </div>
      </Section>
    </div>
  );
}
