import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCms } from "../AdminData";
import { api } from "../api";
import { uid, type AdminUser, type Role } from "../cms";
import { Btn, EditHeader, Field, Input, Section, Select } from "../ui";

type Draft = AdminUser & { password?: string };

const emptyDraft = (): Draft => ({
  id: uid("u"),
  name: "",
  email: "",
  role: "Editor",
  active: true,
  password: "",
});

export default function UserEdit() {
  const { id } = useParams();
  const isNew = !id;
  const { data, refresh } = useCms();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) {
      setDraft(emptyDraft());
    } else if (data) {
      const found = data.users.find((u) => u.id === id);
      setDraft(found ? { ...found, password: "" } : null);
    }
  }, [data, id, isNew]);

  if (!draft) return <p className="text-sm text-muted">Loading…</p>;

  const set = (p: Partial<Draft>) => setDraft({ ...draft, ...p });

  const save = async () => {
    if (!draft.name || !draft.email) {
      alert("Name and email are required.");
      return;
    }
    setBusy(true);
    try {
      if (isNew) await api.createUser(draft);
      else await api.updateUser(draft.id, draft);
      await refresh();
      navigate("/admin/users");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <EditHeader
        backTo="/admin/users"
        backLabel="Back to users"
        title={isNew ? "Add user" : "Edit user"}
        subtitle={isNew ? undefined : draft.email}
        actions={<Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn>}
      />

      <Section title="Account" desc="Sign-in details and permission level.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name"><Input value={draft.name} onChange={(e) => set({ name: e.target.value })} /></Field>
          <Field label="Email"><Input type="email" value={draft.email} onChange={(e) => set({ email: e.target.value })} /></Field>
          <Field label="Role">
            <Select value={draft.role} onChange={(e) => set({ role: e.target.value as Role })}>
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </Select>
          </Field>
          <Field label={isNew ? "Password" : "New password"} hint={isNew ? "default: liangyi" : "leave blank to keep current"}>
            <Input type="password" value={draft.password ?? ""} onChange={(e) => set({ password: e.target.value })} />
          </Field>
        </div>
      </Section>
    </div>
  );
}
