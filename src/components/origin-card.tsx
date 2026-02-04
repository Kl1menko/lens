import { Item } from "@/lib/types";

export function OriginCard({ item }: { item: Item }) {
  const { originCard } = item;
  return (
    <div className="space-y-3 rounded-2xl border border-border/70 bg-card/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Походження</p>
          <h3 className="text-lg font-semibold text-foreground">{item.brand} · {item.line ?? "—"}</h3>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          {item.season ?? "—"} · {item.era ?? "—"}
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
        <div>
          <dt className="text-xs uppercase tracking-[0.15em]">Матеріал / Тех</dt>
          <dd className="text-foreground">{originCard.material ?? "—"}</dd>
          <dd>{originCard.tech ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em]">Фарбування / Фініш</dt>
          <dd className="text-foreground">{originCard.dyeFinish ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em]">Історія</dt>
          <dd className="text-foreground">{originCard.story ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em]">Нотатки</dt>
          <dd className="text-foreground">{originCard.notes ?? "—"}</dd>
        </div>
      </dl>
    </div>
  );
}
