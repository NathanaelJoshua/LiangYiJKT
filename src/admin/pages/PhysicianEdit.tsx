import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { uid, type PhysicianItem } from "../cms";
import { Btn, EditHeader, Field, Input, MediaUpload, Section, Select } from "../ui";

const emptyPhysician = (): PhysicianItem => ({
  id: uid("phys"),
  name: "",
  credentials: "",
  branch: "",
  focus: "",
  image: "https://i.pravatar.cc/600?img=15",
});

export default function PhysicianEdit() {
  const { id } = useParams();
  const isNew = !id;
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<PhysicianItem | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) setDraft(emptyPhysician());
    else if (data) setDraft(data.physicians.find((p) => p.id === id) ?? null);
  }, [data, id, isNew]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<PhysicianItem>) => setDraft({ ...draft, ...p });

  const locationNames = (data?.locations ?? []).map((l) => l.name);
  const branchOptions =
    draft.branch && !locationNames.includes(draft.branch) ? [draft.branch, ...locationNames] : locationNames;

  const save = async () => {
    if (!draft.name) return alert("Name is required.");
    setBusy(true);
    try {
      if (isNew) await api.createPhysician(draft);
      else await api.updatePhysician(draft.id, draft);
      await refresh();
      navigate("/admin/physicians");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <EditHeader
        backTo="/admin/physicians"
        backLabel="Back to physicians"
        title={isNew ? "Add physician" : `Edit · ${draft.name}`}
        actions={<Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn>}
      />
      <Section title="Profile" desc="Photo and details shown on the team section.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2"><Field label="Photo"><MediaUpload value={draft.image} onChange={(image) => set({ image })} accept="image/*" /></Field></div>
          <Field label="Name"><Input value={draft.name} onChange={(e) => set({ name: e.target.value })} /></Field>
          <Field label="Credentials" hint="e.g. MMed (TCM)"><Input value={draft.credentials} onChange={(e) => set({ credentials: e.target.value })} /></Field>
          <Field label="Branch" hint="from your locations">
            <Select value={draft.branch} onChange={(e) => set({ branch: e.target.value })}>
              <option value="">Select a clinic…</option>
              {branchOptions.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Focus" hint="clinical specialty"><Input value={draft.focus} onChange={(e) => set({ focus: e.target.value })} /></Field>
        </div>
      </Section>
    </div>
  );
}
