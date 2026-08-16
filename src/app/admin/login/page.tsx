import Link from "next/link";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 text-ink">
      <Link href="/" className="font-display text-2xl font-semibold">
        Galvão Tech
      </Link>
      <p className="mt-2 text-sm text-muted">Acesso ao painel de leads</p>
      <AdminLoginForm />
    </div>
  );
}
