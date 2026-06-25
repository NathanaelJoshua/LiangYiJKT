import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { uid, type LocationItem } from "../cms";
import { Btn, EditHeader, Field, Input, Section, Select } from "../ui";
import { regions } from "@/lib/content";

const emptyLocation = (): LocationItem => ({
  id: uid("loc"),
  region: "Central",
  name: "",
  address: "",
  unit: "",
  postal: "",
  phone: "",
  whatsapp: "",
  hours: "10am – 10pm",
  consult: "11am – 8pm",
});

export default function LocationEdit() {
  const { id } = useParams();
  const isNew = !id;
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<LocationItem | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) setDraft(emptyLocation());
    else if (data) setDraft(data.locations.find((l) => l.id === id) ?? null);
  }, [data, id, isNew]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<LocationItem>) => setDraft({ ...draft, ...p });

  const save = async () => {
    if (!draft.name) return alert("Clinic name is required.");
    setBusy(true);
    try {
      if (isNew) await api.createLocation(draft);
      else await api.updateLocation(draft.id, draft);
      await refresh();
      navigate("/admin/locations");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <EditHeader
        backTo="/admin/locations"
        backLabel="Back to locations"
        title={isNew ? "Add clinic" : `Edit · ${draft.name}`}
        actions={<Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn>}
      />
      <div className="flex flex-col gap-5">
        <Section title="Clinic" desc="Name and where it sits on the island.">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Clinic name"><Input value={draft.name} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Region">
              <Select value={draft.region} onChange={(e) => set({ region: e.target.value as LocationItem["region"] })}>
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </Select>
            </Field>
          </div>
        </Section>

        <Section title="Address">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="md:col-span-2"><Field label="Street address"><Input value={draft.address} onChange={(e) => set({ address: e.target.value })} /></Field></div>
            <Field label="Unit"><Input value={draft.unit} onChange={(e) => set({ unit: e.target.value })} /></Field>
            <Field label="Postal code"><Input value={draft.postal} onChange={(e) => set({ postal: e.target.value })} /></Field>
          </div>
        </Section>

        <Section title="Contact & hours">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Phone"><Input value={draft.phone} onChange={(e) => set({ phone: e.target.value })} /></Field>
            <Field label="WhatsApp"><Input value={draft.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} /></Field>
            <Field label="Opening hours"><Input value={draft.hours} onChange={(e) => set({ hours: e.target.value })} /></Field>
            <Field label="Consultation hours"><Input value={draft.consult} onChange={(e) => set({ consult: e.target.value })} /></Field>
          </div>
        </Section>
      </div>
    </div>
  );
}
