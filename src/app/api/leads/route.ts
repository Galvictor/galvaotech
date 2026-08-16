import { NextResponse } from "next/server";

import { notifyLeadEmail } from "@/lib/email";
import {
  getServiceSupabase,
  memoryAddLead,
  supabaseConfigStatus,
} from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

type Body = {
  name?: string;
  contact?: string;
  project_type?: string;
  material?: string | null;
  description?: string;
  deadline?: string | null;
  budget?: string | null;
  /** Honeypot — se preenchido, é bot */
  website?: string;
  turnstileToken?: string;
};

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`leads:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot: responde sucesso falso sem gravar / e-mail
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true, id: null, storage: "discarded" });
  }

  const captcha = await verifyTurnstile(body.turnstileToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ ok: false, error: captcha.error }, { status: 400 });
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

  if (name.length > 200 || contact.length > 200 || description.length > 5000) {
    return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
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

  const cfg = supabaseConfigStatus();
  const supabase = getServiceSupabase();
  const onVercel = Boolean(process.env.VERCEL);
  let leadId: string | null = null;
  let storage: "supabase" | "memory" = "memory";

  if (!supabase) {
    if (onVercel || process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Supabase não configurado no servidor. Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY (ou SUPABASE_SERVICE_ROLE_KEY) no Vercel e faça Redeploy.",
          config: cfg,
        },
        { status: 503 },
      );
    }
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
    storage = "memory";
  } else {
    const { data, error } = await supabase
      .from("leads")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("supabase leads insert", error);
      return NextResponse.json(
        {
          ok: false,
          error: `Falha ao salvar no Supabase: ${error.message}`,
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
        { status: 500 },
      );
    }
    leadId = data?.id ?? null;
    storage = "supabase";
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

  return NextResponse.json({
    ok: true,
    id: leadId,
    storage,
    email_sent: mail.sent,
  });
}
