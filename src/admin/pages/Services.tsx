import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Badge, ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { Service } from "@/lib/content";

export default function Services() {
  const { data, refresh } = useCms();
  const services = data?.services ?? [];
  const [pending, setPending] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);

  const doDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api.deleteService(pending.id);
      await refresh();
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Services"
        desc="The service catalogue and detail pages."
        actions={<IconLink to="/admin/services/new" tone="green" title="Add service"><Plus size={18} /></IconLink>}
      />
      <DataTable<Service>
        rows={services}
        rowKey={(s) => s.id}
        empty="No services yet."
        columns={[
          {
            header: "Service",
            cell: (s) => (
              <div className="flex items-center gap-3">
                <img src={s.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                <span className="font-medium">{s.name.en}</span>
              </div>
            ),
          },
          { header: "Scope", cell: (s) => <span className="text-muted">{s.scope.en}</span> },
          { header: "Conditions", cell: (s) => <Badge tone="muted">{s.conditions.length}</Badge> },
          {
            header: "Actions",
            className: "text-right",
            cell: (s) => (
              <div className="flex items-center justify-end gap-2">
                <IconLink to={`/admin/services/${s.id}`} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
                <IconBtn tone="red" title="Delete" onClick={() => setPending(s)}><Trash size={16} /></IconBtn>
              </div>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={!!pending}
        busy={busy}
        title="Delete service"
        message={<>Delete <span className="font-medium text-ink">{pending?.name.en}</span> and its detail page? This cannot be undone.</>}
        onConfirm={doDelete}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
