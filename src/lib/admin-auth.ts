import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_id";

export function getAdminIdsFromEnv() {
  const raw = process.env.ADMIN_USER_IDS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getCurrentAdminId() {
  return cookies().get(ADMIN_COOKIE)?.value;
}

export function isAdmin() {
  const allowed = getAdminIdsFromEnv();
  if (!allowed.length) return false;
  const current = getCurrentAdminId();
  return !!current && allowed.includes(current);
}
