import { ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Item } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export type CatalogCardProps = {
  item: Item;
  badge?: "drop" | "verified" | "wtb";
};

const badgeCopy = {
  drop: { label: "Дроп", color: "bg-amber-400 text-black" },
  verified: { label: "Перевірено", color: "bg-emerald-500 text-black" },
  wtb: { label: "Запит", color: "bg-blue-500 text-white" },
};

export function CatalogCard({ item, badge }: CatalogCardProps) {
  const resolvedBadge =
    badge ??
    (item.authLevel === "verified" ? "verified" : item.status === "draft" ? undefined : undefined);

  return (
    <Link
      href={`/item/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={item.media[0]?.url ?? "/placeholder.png"}
          alt={`${item.brand} ${item.title}`}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2 text-xs">
          {resolvedBadge ? (
            <span className={`rounded-full px-3 py-1 font-semibold ${badgeCopy[resolvedBadge].color}`}>
              {badgeCopy[resolvedBadge].label}
            </span>
          ) : null}
          <span className="rounded-full bg-white/10 px-3 py-1 text-white/80 backdrop-blur">
            {item.origin}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted">{item.brand}</p>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-black">
            {formatPrice(item.price)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
            <ShieldCheck size={14} /> Стан {item.conditionScore}/10
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
            <Sparkles size={14} /> Очищено та QC
          </span>
          <ChevronRight className="ml-auto size-4 opacity-50 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
