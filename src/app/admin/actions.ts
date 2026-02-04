"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sendDropAlert, sendItemLiveAlerts } from "@/lib/notify";
import { matchRequestsForItem } from "@/lib/matching";
import { wtbRequests } from "@/content/wtb";
import { Drop, Item } from "@/lib/types";

const ADMIN_COOKIE = "admin_id";

export async function setAdminSession(formData: FormData) {
  const adminId = formData.get("admin_id")?.toString().trim();
  if (!adminId) {
    return;
  }
  cookies().set(ADMIN_COOKIE, adminId, { httpOnly: false, maxAge: 60 * 60 * 24 * 7, path: "/" });
  redirect("/admin");
}

// Trigger Telegram alert when a drop is created/scheduled
export async function notifyScheduledDrop(drop: Drop) {
  if (drop.status !== "scheduled") return;
  await sendDropAlert(drop);
}

// Trigger matching + alerts when item becomes live
export async function notifyItemLive(item: Item) {
  if (item.status !== "live") return;
  const matches = matchRequestsForItem(item, wtbRequests);
  await sendItemLiveAlerts(item, matches);
  return { matches: matches.length };
}
