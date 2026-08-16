import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getServiceSupabase,
  memoryGetLead,
  memoryUpdateStatus,
} from "@/lib/leads";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as { status?: string };
  const status = (body.status || "").trim();
  if (!status) {
    return NextResponse.json({ ok: false, error: "status obrigatório" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  } else {
    const row = memoryUpdateStatus(id, status);
    if (!row && !memoryGetLead(id)) {
      return NextResponse.json({ ok: false, error: "Lead não encontrado" }, { status: 404 });
    }
  }
  return NextResponse.json({ ok: true });
}
