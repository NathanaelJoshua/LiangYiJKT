import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Badge, ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { Plan, PriceGroup } from "@/lib/content";

type PlanRow = Plan & { _i: number };
type GroupRow = PriceGroup & { _i: number };

export default function Pricing() {
  const { data, refresh } = useCms();
  const groups = data?.pricing.groups ?? [];
  const plans = data?.pricing.plans ?? [];

  const [pendingPlan, setPendingPlan] = useState<number | null>(null);
  const [pendingGroup, setPendingGroup] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const planRows: PlanRow[] = plans.map((p, i) => ({ ...p, _i: i }));
  const groupRows: GroupRow[] = groups.map((g, i) => ({ ...g, _i: i }));

  const deletePlan = async () => {
    if (pendingPlan === null) return;
    setBusy(true);
    try {
      await api.savePricing({ groups, plans: plans.filter((_, i) => i !== pendingPlan) });
      await refresh();
      setPendingPlan(null);
    } finally {
      setBusy(false);
    }
  };

  const deleteGroup = async () => {
    if (pendingGroup === null) return;
    setBusy(true);
    try {
      await api.savePricing({ groups: groups.filter((_, i) => i !== pendingGroup), plans });
      await refresh();
      setPendingGroup(null);
    } finally {
      setBusy(false);
    }
  };

  const actions = (editTo: string, onDelete: () => void) => (
    <div className="flex items-center justify-end gap-2">
      <IconLink to={editTo} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
      <IconBtn tone="red" title="Delete" onClick={onDelete}><Trash size={16} /></IconBtn>
    </div>
  );

  return (
    <div className="flex flex-col gap-12">
      <PageHeader title="Pricing" desc="Featured plans and the price list categories." />

      {/* Plans */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-medium tracking-tight text-ink">Plans</h2>
          <IconLink to="/admin/pricing/plans/new" tone="green" title="Add plan"><Plus size={18} /></IconLink>
        </div>
        <DataTable<PlanRow>
          rows={planRows}
          rowKey={(p) => String(p._i)}
          empty="No plans yet."
          columns={[
            { header: "Name", cell: (p) => <span className="font-medium">{p.name.en}</span> },
            { header: "Price", cell: (p) => <span>{p.price}</span> },
            { header: "Cadence", cell: (p) => <span className="text-muted">{p.cadence.en}</span> },
            { header: "Featured", cell: (p) => (p.featured ? <Badge tone="green">Most popular</Badge> : <span className="text-muted">—</span>) },
            { header: "Actions", className: "text-right", cell: (p) => actions(`/admin/pricing/plans/${p._i}`, () => setPendingPlan(p._i)) },
          ]}
        />
      </section>

      {/* Price categories */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-medium tracking-tight text-ink">Price list</h2>
          <IconLink to="/admin/pricing/groups/new" tone="green" title="Add category"><Plus size={18} /></IconLink>
        </div>
        <DataTable<GroupRow>
          rows={groupRows}
          rowKey={(g) => String(g._i)}
          empty="No categories yet."
          columns={[
            { header: "Category", cell: (g) => <span className="font-medium">{g.title.en}</span> },
            { header: "Items", cell: (g) => <Badge tone="muted">{g.items.length}</Badge> },
            { header: "Actions", className: "text-right", cell: (g) => actions(`/admin/pricing/groups/${g._i}`, () => setPendingGroup(g._i)) },
          ]}
        />
      </section>

      <ConfirmModal
        open={pendingPlan !== null}
        busy={busy}
        title="Delete plan"
        message={<>Delete <span className="font-medium text-ink">{pendingPlan !== null ? plans[pendingPlan]?.name.en : ""}</span>? This cannot be undone.</>}
        onConfirm={deletePlan}
        onClose={() => setPendingPlan(null)}
      />
      <ConfirmModal
        open={pendingGroup !== null}
        busy={busy}
        title="Delete category"
        message={<>Delete <span className="font-medium text-ink">{pendingGroup !== null ? groups[pendingGroup]?.title.en : ""}</span> and its items? This cannot be undone.</>}
        onConfirm={deleteGroup}
        onClose={() => setPendingGroup(null)}
      />
    </div>
  );
}
