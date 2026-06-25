import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Btn, Card, EditHeader, EditLangProvider, Field, Input, LangTabs, LocField, MediaUpload, RepeatableLoc } from "../ui";
import { loc, readingTime, type Article } from "@/lib/content";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const formatDate = () => new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

const emptyArticle = (): Article => ({
  slug: "",
  title: loc(""),
  category: loc("Wellness"),
  tags: [],
  readTime: "1 min",
  date: formatDate(),
  author: "Liang Yi",
  authorImage: "https://i.pravatar.cc/200?img=15",
  excerpt: loc(""),
  image: "https://picsum.photos/seed/new-article/1600/1000",
  body: [],
});

export default function ArticleEdit() {
  const { slug } = useParams();
  const isNew = !slug;
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Article | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) setDraft(emptyArticle());
    else if (data) setDraft(data.articles.find((a) => a.slug === slug) ?? null);
  }, [data, slug, isNew]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<Article>) => setDraft({ ...draft, ...p });
  const estRead = readingTime(draft.body);

  const save = async () => {
    if (!draft.title.en) return alert("Title (EN) is required.");
    const finalSlug = isNew ? draft.slug || slugify(draft.title.en) : draft.slug;
    // Reading time + publish date are set automatically.
    const payload: Article = { ...draft, slug: finalSlug, readTime: estRead, date: formatDate() };
    setBusy(true);
    try {
      if (isNew) await api.createArticle(payload);
      else await api.updateArticle(finalSlug, payload);
      await refresh();
      navigate("/admin/insights");
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditLangProvider>
      <EditHeader
        backTo="/admin/insights"
        backLabel="Back to insights"
        title={isNew ? "Add article" : `Edit · ${draft.title.en || "article"}`}
        actions={<><LangTabs /><Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn></>}
      />

      <div className="flex flex-col gap-5">
        {/* Basics */}
        <Card>
          <h2 className="mb-4 font-display text-lg font-medium text-ink">Basics</h2>
          <div className="flex flex-col gap-5">
            <LocField label="Title" value={draft.title} onChange={(title) => set({ title })} />
            <LocField label="Category" value={draft.category} onChange={(category) => set({ category })} />
            <Field label="Tags"><RepeatableLoc items={draft.tags} onChange={(tags) => set({ tags })} header="Tag" addLabel="Add tag" /></Field>
          </div>
        </Card>

        {/* Media & author */}
        <Card>
          <h2 className="mb-4 font-display text-lg font-medium text-ink">Media & author</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2"><Field label="Cover image / video"><MediaUpload value={draft.image} onChange={(image) => set({ image })} aspect="wide" /></Field></div>
            <Field label="Author"><Input value={draft.author} onChange={(e) => set({ author: e.target.value })} /></Field>
            <Field label="Author photo"><MediaUpload value={draft.authorImage} onChange={(authorImage) => set({ authorImage })} accept="image/*" /></Field>
          </div>
        </Card>

        {/* Content */}
        <Card>
          <h2 className="mb-4 font-display text-lg font-medium text-ink">Content</h2>
          <div className="flex flex-col gap-5">
            <LocField label="Excerpt" value={draft.excerpt} onChange={(excerpt) => set({ excerpt })} textarea rows={2} />
            <Field label="Body" hint="each row is a paragraph">
              <RepeatableLoc items={draft.body} onChange={(body) => set({ body })} header="Paragraph" addLabel="Add paragraph" textarea rows={3} />
            </Field>
          </div>
        </Card>
      </div>
    </EditLangProvider>
  );
}
