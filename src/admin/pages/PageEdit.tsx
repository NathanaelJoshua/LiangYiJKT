import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Btn, Card, EditHeader, EditLangProvider, LangTabs, LocField } from "../ui";
import type { Localized } from "@/lib/content";

export default function PageEdit() {
  const { page } = useParams();
  const name = page ? decodeURIComponent(page) : "";
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [fields, setFields] = useState<Record<string, Localized> | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data) setFields(data.pages[name] ?? null);
  }, [data, name]);

  if (!data) return <p className="text-sm text-muted">Loading…</p>;
  if (!fields) {
    return (
      <div>
        <Link to="/admin/pages" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={15} /> Back to pages
        </Link>
        <p className="text-sm text-muted">Page “{name}” not found.</p>
      </div>
    );
  }

  const set = (key: string, value: Localized) => setFields({ ...fields, [key]: value });

  const save = async () => {
    setBusy(true);
    try {
      await api.savePages({ ...data.pages, [name]: fields });
      await refresh();
      navigate("/admin/pages");
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditLangProvider>
      <EditHeader
        backTo="/admin/pages"
        backLabel="Back to pages"
        title={`${name} page`}
        subtitle="Headings and copy shown on this page"
        actions={<><LangTabs /><Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn></>}
      />
      <Card>
        <div className="flex flex-col gap-6">
          {Object.entries(fields).map(([key, value]) => (
            <LocField
              key={key}
              label={key}
              value={value}
              onChange={(v) => set(key, v)}
              textarea={value.en.length > 60}
              rows={3}
            />
          ))}
        </div>
      </Card>
    </EditLangProvider>
  );
}
