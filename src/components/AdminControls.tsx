"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = ["novo", "em_contato", "orcado", "fechado", "descartado"];

export function LeadStatusSelect({
  id,
  initial,
}: {
  id: string;
  initial: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initial);
  const [saving, setSaving] = useState(false);

  async function onChange(next: string) {
    setStatus(next);
    setSaving(true);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <label className="block text-sm text-muted">
      Status {saving ? "(salvando…)" : ""}
      <select
        value={status}
        onChange={(e) => void onChange(e.target.value)}
        className="mt-1.5 w-full max-w-xs rounded-xl border border-line bg-elevated px-3 py-2 text-ink"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AdminLogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm text-muted underline-offset-2 hover:text-ink hover:underline"
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Sair
    </button>
  );
}
