import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLogoutButton } from "@/components/AdminControls";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getServiceSupabase,
  LeadRow,
  memoryListLeads,
} from "@/lib/leads";

async function loadLeads(): Promise<LeadRow[]> {
  const supabase = getServiceSupabase();
  if (!supabase) return memoryListLeads();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data || []) as LeadRow[];
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  const leads = await loadLeads();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <div>
          <p className="font-display text-2xl font-semibold">Leads</p>
          <p className="text-sm text-muted">Galvão Tech · painel</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted hover:text-ink">
            Site
          </Link>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-3 px-5 pb-16">
        {leads.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-muted">
            Nenhum lead ainda. O formulário da home grava aqui.
          </p>
        ) : (
          leads.map((l) => (
            <Link
              key={l.id}
              href={`/admin/leads/${l.id}`}
              className="block rounded-xl border border-line bg-elevated/60 px-4 py-4 transition hover:border-teal/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-ink">{l.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {l.project_type}
                    {l.budget ? ` · ${l.budget}` : ""}
                  </p>
                </div>
                <div className="text-right text-caption text-sm text-muted">
                  <p className="rounded-md bg-teal/15 px-2 py-0.5 text-teal">
                    {l.status}
                  </p>
                  <p className="mt-1">
                    {new Date(l.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
