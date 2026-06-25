import { useState } from "react";
import { Plus, PencilSimple, Trash, Lock, LockOpen } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { api } from "../api";
import { Badge, ConfirmModal, DataTable, IconBtn, IconLink, PageHeader } from "../ui";
import type { AdminUser } from "../cms";

export default function Users() {
  const { data, refresh } = useCms();
  const users = data?.users ?? [];
  const [pending, setPending] = useState<AdminUser | null>(null);
  const [busy, setBusy] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  const toggleActive = async (u: AdminUser) => {
    setToggling(u.id);
    try {
      await api.updateUser(u.id, { ...u, active: !u.active });
      await refresh();
    } finally {
      setToggling(null);
    }
  };

  const doDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api.deleteUser(pending.id);
      await refresh();
      setPending(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="User management"
        desc="Accounts that can sign in to the CMS."
        actions={<IconLink to="/admin/users/new" tone="green" title="Add user"><Plus size={18} /></IconLink>}
      />
      <DataTable<AdminUser>
        rows={users}
        rowKey={(u) => u.id}
        empty="No users yet."
        columns={[
          { header: "Name", cell: (u) => <span className="font-medium">{u.name}</span> },
          { header: "Email", cell: (u) => <span className="text-muted">{u.email}</span> },
          { header: "Role", cell: (u) => <Badge tone={u.role === "Admin" ? "green" : "neutral"}>{u.role}</Badge> },
          { header: "Status", cell: (u) => <Badge tone={u.active ? "green" : "muted"}>{u.active ? "Active" : "Locked"}</Badge> },
          {
            header: "Actions",
            className: "text-right",
            cell: (u) => (
              <div className="flex items-center justify-end gap-2">
                <IconLink to={`/admin/users/${u.id}`} tone="amber" title="Edit"><PencilSimple size={16} /></IconLink>
                <IconBtn
                  tone="neutral"
                  onClick={() => toggleActive(u)}
                  disabled={toggling === u.id}
                  title={u.active ? "Lock (disable sign-in)" : "Unlock (enable sign-in)"}
                >
                  {u.active ? <Lock size={16} /> : <LockOpen size={16} />}
                </IconBtn>
                <IconBtn
                  tone="red"
                  onClick={() => setPending(u)}
                  disabled={u.role === "Admin"}
                  title={u.role === "Admin" ? "Admin accounts can't be deleted" : "Delete"}
                >
                  <Trash size={16} />
                </IconBtn>
              </div>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={!!pending}
        busy={busy}
        title="Delete user"
        message={<>Are you sure you want to delete <span className="font-medium text-ink">{pending?.email}</span>? This cannot be undone.</>}
        onConfirm={doDelete}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
