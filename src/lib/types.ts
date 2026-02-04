export type MediaType = "main" | "detail" | "tag" | "stitch" | "zipper" | "patch" | "label";

export type Item = {
  slug: string;
  title: string;
  brand: string;
  line?: string;
  season?: string;
  era?: "2010s" | "2020s" | "2030s";
  size?: string;
  price: number;
  conditionScore: number; // 1-10
  conditionNotes?: string;
  authLevel: "unchecked" | "verified" | "rejected";
  origin: string;
  originCard: {
    material?: string;
    tech?: string;
    story?: string;
    notes?: string;
    dyeFinish?: string;
  };
  status: "draft" | "live" | "sold";
  features: string[];
  media: { url: string; type: MediaType }[];
  techSpec: { key: string; value: string }[];
  styleNotes?: string;
};

export type Drop = {
  id: string;
  title: string;
  startsAt: string; // ISO
  endsAt?: string;
  status: "scheduled" | "live" | "ended";
  items: string[]; // item slugs
};

export type WtbRequest = {
  id: string;
  userHandle: string;
  brand?: string;
  query: string;
  size?: string;
  maxPrice?: number;
  status: "open" | "fulfilled" | "closed";
};
