import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Badge, ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { Article } from "@/lib/content";

export default function Insights() {
  const { data, refresh } = useCms();
  const articles = data?.articles ?? [];
  const [pending, setPending] = useState<Article | null>(null);
  const [busy, setBusy] = useState(false);

  const doDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api.deleteArticle(pending.slug);
      await refresh();
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Insights"
        desc="Articles shown on the Insights pages."
        actions={<IconLink to="/admin/insights/new" tone="green" title="Add article"><Plus size={18} /></IconLink>}
      />
      <DataTable<Article>
        rows={articles}
        rowKey={(a) => a.slug}
        empty="No articles yet."
        columns={[
          {
            header: "Article",
            cell: (a) => (
              <div className="flex items-center gap-3">
                <img src={a.image} alt="" className="h-10 w-14 rounded-md object-cover" />
                <span className="font-medium">{a.title.en}</span>
              </div>
            ),
          },
          { header: "Category", cell: (a) => <Badge>{a.category.en}</Badge> },
          { header: "Date", cell: (a) => <span className="text-muted">{a.date}</span> },
          {
            header: "Actions",
            className: "text-right",
            cell: (a) => (
              <div className="flex items-center justify-end gap-2">
                <IconLink to={`/admin/insights/${a.slug}`} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
                <IconBtn tone="red" title="Delete" onClick={() => setPending(a)}><Trash size={16} /></IconBtn>
              </div>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={!!pending}
        busy={busy}
        title="Delete article"
        message={<>Delete <span className="font-medium text-ink">{pending?.title.en}</span>? This cannot be undone.</>}
        onConfirm={doDelete}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
