import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Btn, Card, EditHeader, EditLangProvider, Field, Input, LangTabs, LocField, RepeatableLoc } from "../ui";
import { loc, type Plan } from "@/lib/content";

const emptyPlan = (): Plan => ({ name: loc(""), price: "$0", cadence: loc("one-time"), blurb: loc(""), features: [], featured: false });

export default function PlanEdit() {
  const { index } = useParams();
  const isNew = index === undefined;
  const i = Number(index);
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Plan | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (isNew) setDraft(emptyPlan());
    else setDraft(data.pricing.plans[i] ?? null);
  }, [data, i, isNew]);

  if (!data || !draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<Plan>) => setDraft({ ...draft, ...p });

  const save = async () => {
    if (!draft.name.en) return alert("Name (EN) is required.");
    const plans = [...data.pricing.plans];
    if (isNew) plans.push(draft);
    else plans[i] = draft;
    setBusy(true);
    try {
      await api.savePricing({ groups: data.pricing.groups, plans });
      await refresh();
      navigate("/admin/pricing");
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditLangProvider>
      <EditHeader
        backTo="/admin/pricing"
        backLabel="Back to pricing"
        title={isNew ? "Add plan" : `Edit · ${draft.name.en}`}
        actions={<><LangTabs /><Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn></>}
      />
      <Card>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Price (not translated)"><Input value={draft.price} onChange={(e) => set({ price: e.target.value })} /></Field>
            <label className="flex items-end gap-2 pb-2 text-sm text-muted">
              <input type="checkbox" checked={!!draft.featured} onChange={(e) => set({ featured: e.target.checked })} />
              Highlight as “Most popular”
            </label>
          </div>
          <LocField label="Name" value={draft.name} onChange={(name) => set({ name })} />
          <LocField label="Cadence" value={draft.cadence} onChange={(cadence) => set({ cadence })} />
          <LocField label="Blurb" value={draft.blurb} onChange={(blurb) => set({ blurb })} textarea rows={2} />
          <Field label="Features">
            <RepeatableLoc items={draft.features} onChange={(features) => set({ features })} header="Feature" addLabel="Add feature" />
          </Field>
        </div>
      </Card>
    </EditLangProvider>
  );
}
