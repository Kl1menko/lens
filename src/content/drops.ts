import { Drop } from "@/lib/types";

export const drops: Drop[] = [
  {
    id: "paris-archive-bags",
    title: "Paris Archive Bags",
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    status: "live",
    items: ["goyard-st-louis-pm-grey"],
  },
  {
    id: "tokyo-vault-watches",
    title: "Tokyo Vault Watches",
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    status: "scheduled",
    items: ["rolex-gmt-rootbeer-2021"],
  },
];
