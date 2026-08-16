import { NextResponse } from "next/server";

import { notifyLeadEmail } from "@/lib/email";
import {
  getServiceSupabase,
  memoryAddLead,
} from "@/lib/leads";

type Body = {
  name?: string;
  contact?: string;
  project_type?: string;
  material?: string | null;
  description?: string;
  deadline?: string | null;
  budget?: string | null;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const contact = (body.contact || "").trim();
  const project_type = (body.project_type || "").trim();
  const description = (body.description || "").trim();
  const material = body.material?.trim() || null;
  const deadline = body.deadline?.trim() || null;
  const budget = body.budget?.trim() || null;

  if (!name || !contact || !project_type || !description) {
    return NextResponse.json(
      { ok: false, error: "Campos obrigatórios ausentes" },
      { status: 400 },
    );
  }

  const payload = {
    name,
    contact,
    project_type,
    material,
    description,
    deadline,
    budget,
    status: "novo",
  };

  const supabase = getServiceSupabase();
  let leadId: string | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert(payload)
      .select("id")
      .single();
    if (error) {
      console.error("supabase leads insert", error);
      return NextResponse.json(
        { ok: false, error: "Falha ao salvar lead" },
        { status: 500 },
      );
    }
    leadId = data?.id ?? null;
  } else {
    const row = memoryAddLead({
      name,
      contact,
      project_type,
      material,
      description,
      deadline,
      budget,
    });
    leadId = row.id;
    console.warn(
      "[leads] Supabase não configurado — lead em memória (dev):",
      leadId,
    );
  }

  const mail = await notifyLeadEmail({
    name,
    contact,
    project_type,
    budget,
    description,
  });
  if (!mail.sent) {
    console.warn("[leads] e-mail não enviado:", mail.error);
  }

  return NextResponse.json({ ok: true, id: leadId, email_sent: mail.sent });
}
