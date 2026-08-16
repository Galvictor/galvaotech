import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { LeadStatusSelect } from "@/components/AdminControls";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getServiceSupabase,
  LeadRow,
  memoryGetLead,
} from "@/lib/leads";

async function loadLead(id: string): Promise<LeadRow | null> {
  const supabase = getServiceSupabase();
  if (!supabase) return memoryGetLead(id) || null;
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) return null;
  return data as LeadRow | null;
}

function contactHref(contact: string) {
  const digits = contact.replace(/\D/g, "");
  if (digits.length >= 10 && !contact.includes("@")) {
    const wa = digits.startsWith("55") ? digits : `55${digits}`;
    return `https://wa.me/${wa}`;
  }
  if (contact.includes("@")) return `mailto:${contact}`;
  return `mailto:${contact}`;
}

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  const { id } = await params;
  const lead = await loadLead(id);
  if (!lead) notFound();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="mx-auto max-w-2xl px-5 py-8">
        <Link
          href="/admin"
          className="text-sm text-muted underline-offset-2 hover:text-ink hover:underline"
        >
          ← Leads
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold">{lead.name}</h1>
        <p className="mt-1 text-muted">
          {new Date(lead.created_at).toLocaleString("pt-BR")}
        </p>

        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-muted">Contato</dt>
            <dd className="mt-1">
              <a
                href={contactHref(lead.contact)}
                className="font-medium text-teal hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {lead.contact}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Tipo</dt>
            <dd className="mt-1">{lead.project_type}</dd>
          </div>
          <div>
            <dt className="text-muted">Material</dt>
            <dd className="mt-1">{lead.material || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Prazo</dt>
            <dd className="mt-1">{lead.deadline || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Faixa</dt>
            <dd className="mt-1">{lead.budget || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Descrição</dt>
            <dd className="mt-1 whitespace-pre-wrap leading-relaxed text-ink/90">
              {lead.description}
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <LeadStatusSelect id={lead.id} initial={lead.status} />
        </div>
      </div>
    </div>
  );
}
