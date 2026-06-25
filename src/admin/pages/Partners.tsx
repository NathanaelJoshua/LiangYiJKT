import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { PartnerItem } from "../cms";

export default function Partners() {
  const { data, refresh } = useCms();
  const partners = data?.partners ?? [];
  const [pending, setPending] = useState<PartnerItem | null>(null);
  const [busy, setBusy] = useState(false);

  const doDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api.deletePartner(pending.id);
      await refresh();
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Partners"
        desc="Corporate partner and client logos."
        actions={<IconLink to="/admin/partners/new" tone="green" title="Add partner"><Plus size={18} /></IconLink>}
      />
      <DataTable<PartnerItem>
        rows={partners}
        rowKey={(p) => p.id}
        empty="No partners yet."
        columns={[
          {
            header: "Logo",
            className: "w-40",
            cell: (p) => (
              <div className="flex h-10 w-28 items-center justify-start">
                {p.image ? <img src={p.image} alt={p.name} className="max-h-9 max-w-full object-contain" /> : <span className="text-muted">—</span>}
              </div>
            ),
          },
          { header: "Company", cell: (p) => <span className="font-medium">{p.name}</span> },
          {
            header: "Actions",
            className: "text-right",
            cell: (p) => (
              <div className="flex items-center justify-end gap-2">
                <IconLink to={`/admin/partners/${p.id}`} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
                <IconBtn tone="red" title="Delete" onClick={() => setPending(p)}><Trash size={16} /></IconBtn>
              </div>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={!!pending}
        busy={busy}
        title="Delete partner"
        message={<>Delete <span className="font-medium text-ink">{pending?.name}</span>? This cannot be undone.</>}
        onConfirm={doDelete}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
