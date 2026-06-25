import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Badge, ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { LocationItem } from "../cms";

export default function Locations() {
  const { data, refresh } = useCms();
  const locations = data?.locations ?? [];
  const [pending, setPending] = useState<LocationItem | null>(null);
  const [busy, setBusy] = useState(false);

  const doDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api.deleteLocation(pending.id);
      await refresh();
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Locations"
        desc="Clinic branches shown across the site."
        actions={<IconLink to="/admin/locations/new" tone="green" title="Add clinic"><Plus size={18} /></IconLink>}
      />
      <DataTable<LocationItem>
        rows={locations}
        rowKey={(l) => l.id}
        empty="No clinics yet."
        columns={[
          { header: "Clinic", cell: (l) => <span className="font-medium">{l.name}</span> },
          { header: "Region", cell: (l) => <Badge tone="green">{l.region}</Badge> },
          { header: "Address", cell: (l) => <span className="text-muted">{l.address}, {l.unit}</span> },
          { header: "Phone", cell: (l) => <span className="text-muted">{l.phone}</span> },
          {
            header: "Actions",
            className: "text-right",
            cell: (l) => (
              <div className="flex items-center justify-end gap-2">
                <IconLink to={`/admin/locations/${l.id}`} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
                <IconBtn tone="red" title="Delete" onClick={() => setPending(l)}><Trash size={16} /></IconBtn>
              </div>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={!!pending}
        busy={busy}
        title="Delete clinic"
        message={<>Delete <span className="font-medium text-ink">{pending?.name}</span>? This cannot be undone.</>}
        onConfirm={doDelete}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
