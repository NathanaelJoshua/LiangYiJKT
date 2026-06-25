import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
import { Btn, Field, Input } from "../ui";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@liangyi.sg");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await login(email, password);
    setBusy(false);
    if (res.ok) navigate("/admin");
    else setError(res.error ?? "Login failed");
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-surface px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2">
          <img src="/logo.png" alt="Liang Yi" className="h-9 w-auto" />
          <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">CMS</span>
        </div>
        <h1 className="font-display text-3xl font-medium tracking-tight text-ink">Sign in</h1>
        <p className="mt-2 text-sm text-muted">Manage your site content and settings.</p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          </Field>
          <Field label="Password">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          </Field>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Btn type="submit" disabled={busy} className="mt-2 w-full">
            {busy ? "Signing in…" : "Sign in"}
          </Btn>
        </form>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Demo accounts: <span className="text-ink">admin@liangyi.sg</span> /{" "}
          <span className="text-ink">editor@liangyi.sg</span> — password{" "}
          <span className="font-mono text-ink">liangyi</span>.
        </p>
      </div>
    </div>
  );
}
