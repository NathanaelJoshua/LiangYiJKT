import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { PhysicianItem } from "../cms";

export default function Physicians() {
  const { data, refresh } = useCms();
  const physicians = data?.physicians ?? [];
  const [pending, setPending] = useState<PhysicianItem | null>(null);
  const [busy, setBusy] = useState(false);

  const doDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api.deletePhysician(pending.id);
      await refresh();
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Physicians"
        desc="The TCM physician team shown across the site."
        actions={<IconLink to="/admin/physicians/new" tone="green" title="Add physician"><Plus size={18} /></IconLink>}
      />
      <DataTable<PhysicianItem>
        rows={physicians}
        rowKey={(p) => p.id}
        empty="No physicians yet."
        columns={[
          {
            header: "Physician",
            cell: (p) => (
              <div className="flex items-center gap-3">
                <img src={p.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                <span className="font-medium">{p.name}</span>
              </div>
            ),
          },
          { header: "Credentials", cell: (p) => <span className="text-muted">{p.credentials}</span> },
          { header: "Branch", cell: (p) => <span className="text-muted">{p.branch}</span> },
          { header: "Focus", cell: (p) => <span className="text-muted">{p.focus}</span> },
          {
            header: "Actions",
            className: "text-right",
            cell: (p) => (
              <div className="flex items-center justify-end gap-2">
                <IconLink to={`/admin/physicians/${p.id}`} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
                <IconBtn tone="red" title="Delete" onClick={() => setPending(p)}><Trash size={16} /></IconBtn>
              </div>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={!!pending}
        busy={busy}
        title="Delete physician"
        message={<>Delete <span className="font-medium text-ink">{pending?.name}</span>? This cannot be undone.</>}
        onConfirm={doDelete}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
