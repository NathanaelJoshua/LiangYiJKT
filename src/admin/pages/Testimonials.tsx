import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { TestimonialItem } from "../cms";

export default function Testimonials() {
  const { data, refresh } = useCms();
  const testimonials = data?.testimonials ?? [];
  const [pending, setPending] = useState<TestimonialItem | null>(null);
  const [busy, setBusy] = useState(false);

  const doDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api.deleteTestimonial(pending.id);
      await refresh();
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Testimonials"
        desc="Patient reviews shown on the site."
        actions={<IconLink to="/admin/testimonials/new" tone="green" title="Add testimonial"><Plus size={18} /></IconLink>}
      />
      <DataTable<TestimonialItem>
        rows={testimonials}
        rowKey={(t) => t.id}
        empty="No testimonials yet."
        columns={[
          {
            header: "Person",
            cell: (t) => (
              <div className="flex items-center gap-3">
                <img src={t.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                <span className="font-medium">{t.name}</span>
              </div>
            ),
          },
          { header: "Quote", cell: (t) => <span className="line-clamp-1 max-w-md text-muted">{t.quote.en}</span> },
          { header: "Meta", cell: (t) => <span className="text-muted">{t.meta.en}</span> },
          {
            header: "Actions",
            className: "text-right",
            cell: (t) => (
              <div className="flex items-center justify-end gap-2">
                <IconLink to={`/admin/testimonials/${t.id}`} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
                <IconBtn tone="red" title="Delete" onClick={() => setPending(t)}><Trash size={16} /></IconBtn>
              </div>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={!!pending}
        busy={busy}
        title="Delete testimonial"
        message={<>Delete the review from <span className="font-medium text-ink">{pending?.name}</span>? This cannot be undone.</>}
        onConfirm={doDelete}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
