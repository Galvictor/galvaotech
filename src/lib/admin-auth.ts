import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "gt_admin";

function sign(value: string): string {
  const secret = process.env.ADMIN_PASSWORD || "dev-admin";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function adminToken(): string {
  return sign("galvao-tech-admin-ok");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  const expected = adminToken();
  try {
    const a = Buffer.from(raw);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "dev-admin";
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export { COOKIE as ADMIN_COOKIE };
