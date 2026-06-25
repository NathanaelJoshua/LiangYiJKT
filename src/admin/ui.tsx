import {
  createContext,
  useContext,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { Link } from "react-router-dom";
import { Plus, X, UploadSimple, ImageSquare, CaretUp, CaretDown, Trash, ArrowLeft } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { Localized, Lang } from "@/lib/content";
import { api } from "./api";

/* ---------- editor language (EN / ID tab) ---------- */

const EditLangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function EditLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return <EditLangContext.Provider value={{ lang, setLang }}>{children}</EditLangContext.Provider>;
}

export const useEditLang = () => useContext(EditLangContext);

export function LangTabs() {
  const { lang, setLang } = useEditLang();
  const options: { code: Lang; label: string }[] = [
    { code: "en", label: "English" },
    { code: "id", label: "Indonesia" },
  ];
  return (
    <div className="inline-flex shrink-0 rounded-lg border border-line bg-bg p-0.5">
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium tracking-tight transition-colors",
            lang === o.code ? "bg-ink text-bg" : "text-muted hover:text-ink"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const fieldBase =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, "h-10", props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldBase, "resize-y", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(fieldBase, "h-10", props.className)} />;
}

const isVideoUrl = (url: string) => /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || url.startsWith("data:video");

export function MediaUpload({
  value,
  onChange,
  accept = "image/*,video/*",
  aspect = "square",
  removeBg = false,
}: {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  aspect?: "square" | "wide";
  removeBg?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onPick = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      let payload: File | Blob = file;
      let filename = file.name;
      if (removeBg) {
        setStage("Removing background…");
        const { removeBackground } = await import("@imgly/background-removal");
        payload = await removeBackground(file);
        filename = `${file.name.replace(/\.[^.]+$/, "") || "logo"}.png`;
      }
      setStage("Uploading…");
      const { url } = await api.upload(payload, filename);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      setStage("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const box = aspect === "wide" ? "h-24 w-40" : "h-24 w-24";

  return (
    <div className="flex items-center gap-4">
      <div className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface", box)}>
        {value ? (
          isVideoUrl(value) ? (
            <video src={value} className="h-full w-full object-cover" muted playsInline />
          ) : (
            <img src={value} alt="" className="h-full w-full object-cover" />
          )
        ) : (
          <ImageSquare size={24} className="text-muted/50" />
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <input ref={inputRef} type="file" accept={accept} hidden onChange={onPick} />
        <Btn type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={busy}>
          <UploadSimple size={16} /> {busy ? stage || "Uploading…" : value ? "Replace" : "Upload"}
        </Btn>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-xs text-muted hover:text-red-600">
            Remove
          </button>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}

const langTag: Record<Lang, string> = { en: "EN", id: "ID" };

/** Bilingual field — shows the input for the currently selected editor language. */
export function LocField({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
}: {
  label: string;
  value: Localized;
  onChange: (v: Localized) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const { lang } = useEditLang();
  const otherEmpty = !value[lang === "en" ? "id" : "en"]?.trim();
  return (
    <Field label={label} hint={otherEmpty ? `${langTag[lang === "en" ? "id" : "en"]} still empty` : undefined}>
      {textarea ? (
        <Textarea rows={rows} value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} />
      ) : (
        <Input value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} />
      )}
    </Field>
  );
}

/** Table editor for a list of bilingual strings (EN + ID columns per row). */
export function RepeatableLoc({
  items,
  onChange,
  header = "Value",
  addLabel = "Add row",
  textarea,
  rows = 2,
}: {
  items: Localized[];
  onChange: (items: Localized[]) => void;
  header?: string;
  addLabel?: string;
  textarea?: boolean;
  rows?: number;
}) {
  const { lang } = useEditLang();
  const update = (i: number, v: Localized) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const rowBtn = "flex h-7 w-7 items-center justify-center rounded transition-colors disabled:cursor-not-allowed disabled:opacity-30";
  const cell = (val: string, onVal: (v: string) => void) =>
    textarea ? (
      <Textarea rows={rows} value={val} onChange={(e) => onVal(e.target.value)} />
    ) : (
      <Input value={val} onChange={(e) => onVal(e.target.value)} />
    );

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-surface">
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted">{header} · {langTag[lang]}</th>
            <th className="w-[120px] px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className="border-b border-line align-top last:border-0">
              <td className="px-3 py-2">{cell(it[lang], (v) => update(i, { ...it, [lang]: v }))}</td>
              <td className="px-3 py-2">
                <div className="flex items-center justify-end gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up" className={cn(rowBtn, "text-muted hover:bg-line")}><CaretUp size={15} /></button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} title="Move down" className={cn(rowBtn, "text-muted hover:bg-line")}><CaretDown size={15} /></button>
                  <button type="button" onClick={() => remove(i)} title="Delete" className={cn(rowBtn, "text-red-600 hover:bg-red-50")}><Trash size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={2} className="px-3 py-6 text-center text-sm text-muted">No items yet.</td></tr>
          )}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => onChange([...items, { en: "", id: "" }])}
        className="flex w-full items-center justify-center gap-2 border-t border-line py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between">
        <span className="font-sans text-sm font-medium text-ink">{label}</span>
        {hint && <span className="font-sans text-xs text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

type BtnVariant = "solid" | "outline" | "ghost" | "danger" | "dangerSolid";
const btnVariants: Record<BtnVariant, string> = {
  solid: "bg-ink text-bg hover:bg-accent-deep",
  outline: "border border-line text-ink hover:bg-surface",
  ghost: "text-muted hover:text-ink",
  danger: "border border-red-300 text-red-600 hover:bg-red-50",
  dangerSolid: "bg-red-600 text-white hover:bg-red-700",
};

const btnBase =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium tracking-tight transition-colors active:scale-[0.98] disabled:opacity-50";

export function Btn({
  variant = "solid",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return <button {...props} className={cn(btnBase, btnVariants[variant], className)} />;
}

export function BtnLink({
  to,
  variant = "solid",
  className,
  children,
}: {
  to: string;
  variant?: BtnVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={cn(btnBase, btnVariants[variant], className)}>
      {children}
    </Link>
  );
}

type IconTone = "amber" | "red" | "green" | "neutral";
const iconTones: Record<IconTone, string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100",
  red: "border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
  green: "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
  neutral: "border-line bg-surface text-ink hover:bg-line",
};
const iconBase =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export function IconBtn({
  tone = "neutral",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: IconTone }) {
  return <button {...props} className={cn(iconBase, iconTones[tone], className)} />;
}

export function IconLink({
  to,
  tone = "neutral",
  title,
  children,
}: {
  to: string;
  tone?: IconTone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} title={title} className={cn(iconBase, iconTones[tone])}>
      {children}
    </Link>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-line bg-bg p-5", className)}>{children}</div>;
}

/** A simple add/remove list editor — no JSON. */
export function Repeatable<T>({
  items,
  onChange,
  newItem,
  render,
  addLabel = "Add item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  render: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  addLabel?: string;
}) {
  const update = (i: number, patch: Partial<T>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => (
        <div key={i} className="relative rounded-lg border border-line bg-surface p-4 pr-10">
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <button type="button" onClick={() => move(i, -1)} className="px-1 text-xs text-muted hover:text-ink" title="Move up">↑</button>
            <button type="button" onClick={() => move(i, 1)} className="px-1 text-xs text-muted hover:text-ink" title="Move down">↓</button>
            <button type="button" onClick={() => remove(i)} className="text-muted hover:text-red-600" title="Remove">
              <X size={16} />
            </button>
          </div>
          {render(it, (p) => update(i, p), i)}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="flex h-10 items-center justify-center gap-2 rounded-lg border border-dashed border-line text-sm text-muted transition-colors hover:border-ink/40 hover:text-ink"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  empty = "Nothing here yet.",
}: {
  columns: { header: string; cell: (row: T) => ReactNode; className?: string }[];
  rows: T[];
  rowKey: (row: T) => string;
  empty?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-bg">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-surface">
            {columns.map((c) => (
              <th key={c.header} className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted", c.className)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="border-b border-line last:border-0 hover:bg-surface/60">
              {columns.map((c) => (
                <td key={c.header} className={cn("px-4 py-3 align-middle text-ink", c.className)}>
                  {c.cell(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="px-4 py-10 text-center text-sm text-muted">{empty}</p>}
    </div>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "green" | "muted" }) {
  const tones = {
    neutral: "bg-ink/5 text-ink",
    green: "bg-accent/20 text-accent-deep",
    muted: "bg-line text-muted",
  };
  return <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Delete",
  busy,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={busy ? undefined : onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-line bg-bg p-6 shadow-soft">
        <h3 className="font-display text-xl font-medium tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Btn variant="outline" onClick={onClose} disabled={busy}>Cancel</Btn>
          <Btn variant="dangerSolid" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting…" : confirmLabel}
          </Btn>
        </div>
      </div>
    </div>
  );
}

/** Table-style repeatable editor with per-row reorder + delete and an add row. */
export function RepeatableTable<T>({
  items,
  onChange,
  newItem,
  columns,
  addLabel = "Add item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  columns: { header: string; cell: (item: T, update: (patch: Partial<T>) => void) => ReactNode; className?: string }[];
  addLabel?: string;
}) {
  const update = (i: number, patch: Partial<T>) => onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const rowBtn = "flex h-7 w-7 items-center justify-center rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface">
              {columns.map((c) => (
                <th key={c.header} className={cn("px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted", c.className)}>
                  {c.header}
                </th>
              ))}
              <th className="w-[120px] px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-b border-line align-middle last:border-0">
                {columns.map((c) => (
                  <td key={c.header} className={cn("px-3 py-2", c.className)}>
                    {c.cell(it, (p) => update(i, p))}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <div className="flex items-center justify-end gap-1">
                    <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up" className={cn(rowBtn, "text-muted hover:bg-line")}>
                      <CaretUp size={15} />
                    </button>
                    <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} title="Move down" className={cn(rowBtn, "text-muted hover:bg-line")}>
                      <CaretDown size={15} />
                    </button>
                    <button type="button" onClick={() => remove(i)} title="Delete" className={cn(rowBtn, "text-red-600 hover:bg-red-50")}>
                      <Trash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-6 text-center text-sm text-muted">
                  No items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="flex w-full items-center justify-center gap-2 border-t border-line py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}

/** Table editor for a simple list of strings (one value per row). */
export function RepeatableStrings({
  items,
  onChange,
  header = "Value",
  placeholder,
  addLabel = "Add row",
}: {
  items: string[];
  onChange: (items: string[]) => void;
  header?: string;
  placeholder?: string;
  addLabel?: string;
}) {
  const update = (i: number, v: string) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const rowBtn = "flex h-7 w-7 items-center justify-center rounded transition-colors disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-surface">
            <th className="w-10 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted">#</th>
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted">{header}</th>
            <th className="w-[120px] px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className="border-b border-line align-middle last:border-0">
              <td className="px-3 py-2 text-muted">{i + 1}</td>
              <td className="px-3 py-2"><Input value={it} placeholder={placeholder} onChange={(e) => update(i, e.target.value)} /></td>
              <td className="px-3 py-2">
                <div className="flex items-center justify-end gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up" className={cn(rowBtn, "text-muted hover:bg-line")}><CaretUp size={15} /></button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} title="Move down" className={cn(rowBtn, "text-muted hover:bg-line")}><CaretDown size={15} /></button>
                  <button type="button" onClick={() => remove(i)} title="Delete" className={cn(rowBtn, "text-red-600 hover:bg-red-50")}><Trash size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={3} className="px-3 py-6 text-center text-sm text-muted">No items yet.</td></tr>
          )}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="flex w-full items-center justify-center gap-2 border-t border-line py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}

/** Table editor for rows with several bilingual fields (e.g. benefit title + copy). Shows the active language only. */
export function RepeatableLocTable<T>({
  items,
  onChange,
  newItem,
  fields,
  addLabel = "Add row",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  fields: { header: string; get: (it: T) => Localized; set: (it: T, v: Localized) => T }[];
  addLabel?: string;
}) {
  const { lang } = useEditLang();
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const setField = (i: number, f: (typeof fields)[number], v: string) =>
    onChange(items.map((it, idx) => (idx === i ? f.set(it, { ...f.get(it), [lang]: v }) : it)));
  const rowBtn = "flex h-7 w-7 items-center justify-center rounded transition-colors disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-surface">
            {fields.map((f) => (
              <th key={f.header} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                {f.header} · {langTag[lang]}
              </th>
            ))}
            <th className="w-[120px] px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className="border-b border-line align-top last:border-0">
              {fields.map((f) => (
                <td key={f.header} className="px-3 py-2">
                  <Input value={f.get(it)[lang]} onChange={(e) => setField(i, f, e.target.value)} />
                </td>
              ))}
              <td className="px-3 py-2">
                <div className="flex items-center justify-end gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up" className={cn(rowBtn, "text-muted hover:bg-line")}><CaretUp size={15} /></button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} title="Move down" className={cn(rowBtn, "text-muted hover:bg-line")}><CaretDown size={15} /></button>
                  <button type="button" onClick={() => remove(i)} title="Delete" className={cn(rowBtn, "text-red-600 hover:bg-red-50")}><Trash size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={fields.length + 1} className="px-3 py-6 text-center text-sm text-muted">No items yet.</td></tr>
          )}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="flex w-full items-center justify-center gap-2 border-t border-line py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}

export function PageHeader({ title, desc, actions }: { title: string; desc?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight text-ink">{title}</h1>
        {desc && <p className="mt-1.5 text-sm text-muted">{desc}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Sticky edit-page header: back link + title + always-visible actions. */
export function EditHeader({
  backTo,
  backLabel,
  title,
  subtitle,
  actions,
}: {
  backTo: string;
  backLabel: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="sticky top-16 z-10 -mx-6 mb-6 border-b border-line bg-surface/85 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
      <Link to={backTo} className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
        <ArrowLeft size={14} /> {backLabel}
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl font-medium tracking-tight text-ink">{title}</h1>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

/** Titled card section for grouping form fields. */
export function Section({ title, desc, children }: { title?: string; desc?: string; children: ReactNode }) {
  return (
    <Card>
      {(title || desc) && (
        <div className="mb-5">
          {title && <h2 className="font-display text-lg font-medium tracking-tight text-ink">{title}</h2>}
          {desc && <p className="mt-0.5 text-sm text-muted">{desc}</p>}
        </div>
      )}
      {children}
    </Card>
  );
}
