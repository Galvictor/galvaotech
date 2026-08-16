import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  project_type: string;
  material: string | null;
  description: string;
  deadline: string | null;
  budget: string | null;
  status: string;
};

/**
 * Client server-only com service_role (bypassa RLS).
 * Não usar anon key aqui — com RLS ativo o insert “some” ou falha.
 */
export function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function supabaseConfigStatus(): {
  hasUrl: boolean;
  hasServiceRole: boolean;
} {
  return {
    hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
  };
}

/** Armazenamento em memória quando Supabase não está configurado (dev local). */
const memoryLeads: LeadRow[] = [];

export function memoryListLeads(): LeadRow[] {
  return [...memoryLeads].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export function memoryAddLead(
  input: Omit<LeadRow, "id" | "created_at" | "status">,
): LeadRow {
  const row: LeadRow = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: "novo",
    ...input,
  };
  memoryLeads.unshift(row);
  return row;
}

export function memoryGetLead(id: string): LeadRow | undefined {
  return memoryLeads.find((l) => l.id === id);
}

export function memoryUpdateStatus(
  id: string,
  status: string,
): LeadRow | undefined {
  const lead = memoryLeads.find((l) => l.id === id);
  if (lead) lead.status = status;
  return lead;
}
