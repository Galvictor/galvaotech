import { Resend } from "resend";

export async function notifyLeadEmail(lead: {
  name: string;
  contact: string;
  project_type: string;
  budget: string | null;
  description: string;
}): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    return { sent: false, error: "E-mail não configurado (RESEND / LEADS_NOTIFY_EMAIL)" };
  }

  const resend = new Resend(apiKey);
  const snippet =
    lead.description.length > 280
      ? `${lead.description.slice(0, 277)}…`
      : lead.description;

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "Galvão Tech <onboarding@resend.dev>",
      to: [to],
      subject: `[Lead] ${lead.project_type} — ${lead.name}`,
      text: [
        `Novo orçamento — Galvão Tech`,
        ``,
        `Nome: ${lead.name}`,
        `Contato: ${lead.contact}`,
        `Tipo: ${lead.project_type}`,
        `Faixa: ${lead.budget || "—"}`,
        ``,
        `Descrição:`,
        snippet,
      ].join("\n"),
    });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (e) {
    return {
      sent: false,
      error: e instanceof Error ? e.message : "Falha ao enviar e-mail",
    };
  }
}
