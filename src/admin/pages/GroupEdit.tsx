import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Btn, Card, EditHeader, EditLangProvider, Field, Input, LangTabs, LocField, RepeatableTable, useEditLang } from "../ui";
import { loc, type PriceGroup, type PriceItem } from "@/lib/content";

const emptyGroup = (): PriceGroup => ({ title: loc(""), items: [] });

function ItemsEditor({ items, onChange }: { items: PriceItem[]; onChange: (items: PriceItem[]) => void }) {
  const { lang } = useEditLang();
  const tag = lang.toUpperCase();
  return (
    <RepeatableTable
      items={items}
      onChange={onChange}
      newItem={() => ({ name: loc(""), note: loc(""), price: "" })}
      addLabel="Add item"
      columns={[
        { header: `Name · ${tag}`, cell: (it, u) => <Input value={it.name[lang]} onChange={(e) => u({ name: { ...it.name, [lang]: e.target.value } })} /> },
        { header: `Note · ${tag}`, cell: (it, u) => <Input value={it.note[lang]} onChange={(e) => u({ note: { ...it.note, [lang]: e.target.value } })} /> },
        { header: "Price", className: "w-32", cell: (it, u) => <Input value={it.price} onChange={(e) => u({ price: e.target.value })} /> },
      ]}
    />
  );
}

export default function GroupEdit() {
  const { index } = useParams();
  const isNew = index === undefined;
  const i = Number(index);
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<PriceGroup | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (isNew) setDraft(emptyGroup());
    else setDraft(data.pricing.groups[i] ?? null);
  }, [data, i, isNew]);

  if (!data || !draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<PriceGroup>) => setDraft({ ...draft, ...p });

  const save = async () => {
    if (!draft.title.en) return alert("Category name (EN) is required.");
    const groups = [...data.pricing.groups];
    if (isNew) groups.push(draft);
    else groups[i] = draft;
    setBusy(true);
    try {
      await api.savePricing({ groups, plans: data.pricing.plans });
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
        title={isNew ? "Add category" : `Edit · ${draft.title.en}`}
        actions={<><LangTabs /><Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn></>}
      />
      <Card>
        <LocField label="Category name" value={draft.title} onChange={(title) => set({ title })} />
        <div className="mt-5">
          <Field label="Items"><ItemsEditor items={draft.items} onChange={(items) => set({ items })} /></Field>
        </div>
      </Card>
    </EditLangProvider>
  );
}
