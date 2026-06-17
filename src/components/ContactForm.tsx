import { useState, type FormEvent } from "react";
import { WhatsappLogo, CheckCircle, ArrowClockwise } from "@phosphor-icons/react";
import { BRAND, clinics, services, waLink } from "@/lib/content";
import { cn } from "@/lib/utils";

interface Fields {
  name: string;
  phone: string;
  email: string;
  clinic: string;
  service: string;
  message: string;
}

const empty: Fields = {
  name: "",
  phone: "",
  email: "",
  clinic: clinics[0].name,
  service: services[0].name,
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  if (!f.phone.trim()) e.phone = "A contact number lets us reach you.";
  else if (!/[0-9]{8}/.test(f.phone.replace(/\D/g, "")))
    e.phone = "Enter a valid phone number.";
  if (f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email))
    e.email = "That email doesn't look right.";
  return e;
}

function buildMessage(f: Fields): string {
  const lines = [
    "Hello Liang Yi TCM, I'd like to enquire about an appointment.",
    "",
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email ? `Email: ${f.email}` : "",
    `Preferred clinic: ${f.clinic}`,
    `Service: ${f.service}`,
    f.message ? `Message: ${f.message}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}

const fieldBase =
  "h-12 w-full rounded-md border bg-surface px-4 text-base text-ink placeholder:text-muted/55 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40";

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setStatus("submitting");
    const url = `${waLink(BRAND.whatsapp)}?text=${encodeURIComponent(buildMessage(fields))}`;
    // Open WhatsApp in a new tab/app, then surface confirmation.
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setStatus("sent"), 600);
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-5 rounded-lg border border-line bg-surface p-10">
        <CheckCircle size={40} weight="fill" className="text-accent-deep" />
        <div>
          <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
            Off to WhatsApp.
          </h3>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
            We've opened a pre-filled chat with our {fields.clinic} team. If nothing
            appeared, message us directly at{" "}
            <a href={waLink(BRAND.whatsapp)} className="text-accent-deep underline-offset-4 hover:underline">
              {BRAND.whatsapp}
            </a>
            .
          </p>
        </div>
        <button
          onClick={() => {
            setFields(empty);
            setStatus("idle");
          }}
          className="inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-sm tracking-tight text-ink transition-colors hover:border-accent hover:text-accent-deep"
        >
          <ArrowClockwise size={15} /> Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            value={fields.name}
            onChange={set("name")}
            placeholder="Tan Wei Ling"
            aria-invalid={!!errors.name}
            className={cn(fieldBase, errors.name ? "border-red-400" : "border-line")}
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={fields.phone}
            onChange={set("phone")}
            placeholder="+65 9123 4567"
            aria-invalid={!!errors.phone}
            className={cn(fieldBase, errors.phone ? "border-red-400" : "border-line")}
          />
        </Field>
      </div>

      <Field label="Email" hint="Optional" error={errors.email}>
        <input
          type="email"
          value={fields.email}
          onChange={set("email")}
          placeholder="you@email.com"
          aria-invalid={!!errors.email}
          className={cn(fieldBase, errors.email ? "border-red-400" : "border-line")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Preferred clinic">
          <select value={fields.clinic} onChange={set("clinic")} className={cn(fieldBase, "border-line")}>
            {clinics.map((c) => (
              <option key={`${c.name}-${c.unit}`} value={c.name}>
                {c.name} — {c.region}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Service of interest">
          <select value={fields.service} onChange={set("service")} className={cn(fieldBase, "border-line")}>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" hint="Optional">
        <textarea
          value={fields.message}
          onChange={set("message")}
          rows={4}
          placeholder="Tell us briefly what you'd like help with."
          className={cn(fieldBase, "h-auto resize-none py-3 border-line")}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm tracking-tight text-bg transition-all hover:bg-accent active:scale-[0.98] disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <ArrowClockwise size={16} className="animate-spin" /> Opening WhatsApp…
          </>
        ) : (
          <>
            <WhatsappLogo size={17} weight="fill" /> Send via WhatsApp
          </>
        )}
      </button>

      <p className="text-sm leading-relaxed text-muted">
        Submitting opens WhatsApp with your details pre-filled — no message is sent
        until you press send in the app.
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between">
        <span className="font-sans text-sm tracking-tight text-ink">{label}</span>
        {hint && <span className="font-sans text-xs text-muted/70">{hint}</span>}
      </span>
      {children}
      {error && <span className="font-sans text-xs text-red-500">{error}</span>}
    </label>
  );
}
