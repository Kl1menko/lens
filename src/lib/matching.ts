import { Item, WtbRequest } from "@/lib/types";

export function matchRequestsForItem(
  item: Item,
  requests: WtbRequest[]
): { userHandle: string; chatId?: string }[] {
  return requests.filter((req) => {
    if (req.status !== "open") return false;
    if (req.brand && req.brand !== item.brand) return false;
    if (req.size && item.size && req.size !== item.size) return false;
    const q = req.query.toLowerCase();
    const title = `${item.brand} ${item.title}`.toLowerCase();
    return title.includes(q) || item.features.some((f) => q.includes(f.toLowerCase()));
  });
}
