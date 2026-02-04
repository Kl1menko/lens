"use client";

import { useMemo, useState } from "react";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filters = {
  brand?: string;
  era?: string;
  size?: string;
  features: Set<string>;
  maxPrice?: number;
  dyeFinish?: string;
};

type Props = {
  items: Item[];
  onFilter: (filtered: Item[]) => void;
};

export function FilterSidebar({ items, onFilter }: Props) {
  const brands = useMemo(() => Array.from(new Set(items.map((i) => i.brand))), [items]);
  const eras = useMemo(() => Array.from(new Set(items.map((i) => i.era).filter(Boolean))) as string[], [items]);
  const sizes = useMemo(() => Array.from(new Set(items.map((i) => i.size).filter(Boolean))) as string[], [items]);
  const allFeatures = useMemo(() => Array.from(new Set(items.flatMap((i) => i.features))), [items]);
  const dyeFinishes = useMemo(
    () => Array.from(new Set(items.map((i) => i.originCard.dyeFinish).filter(Boolean))) as string[],
    [items]
  );

  const [filters, setFilters] = useState<Filters>({ features: new Set() });

  const apply = (next: Filters) => {
    setFilters(next);
    const filtered = items.filter((item) => {
      if (next.brand && item.brand !== next.brand) return false;
      if (next.era && item.era !== next.era) return false;
      if (next.size && item.size !== next.size) return false;
      if (next.dyeFinish && item.originCard.dyeFinish !== next.dyeFinish) return false;
      if (next.maxPrice && item.price > next.maxPrice) return false;
      if (next.features.size && !item.features.some((f) => next.features.has(f))) return false;
      return true;
    });
    onFilter(filtered);
  };

  return (
    <aside className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Фільтри</span>
        <button
          onClick={() => apply({ features: new Set() })}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Скинути
        </button>
      </div>

      <Select
        label="Бренд"
        value={filters.brand}
        onChange={(v) => apply({ ...filters, brand: v || undefined })}
        options={brands}
      />
      <Select
        label="Ера"
        value={filters.era}
        onChange={(v) => apply({ ...filters, era: v || undefined })}
        options={eras}
      />
      <Select
        label="Розмір"
        value={filters.size}
        onChange={(v) => apply({ ...filters, size: v || undefined })}
        options={sizes}
      />
      <Select
        label="Фарбування / Фініш"
        value={filters.dyeFinish}
        onChange={(v) => apply({ ...filters, dyeFinish: v || undefined })}
        options={dyeFinishes}
      />
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Макс. ціна</label>
        <input
          type="number"
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          placeholder="напр. 5000"
          value={filters.maxPrice ?? ""}
          onChange={(e) => apply({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Характеристики</label>
        <div className="flex flex-wrap gap-2">
          {allFeatures.map((f) => {
            const active = filters.features.has(f);
            return (
              <button
                key={f}
                onClick={() => {
                  const next = new Set(filters.features);
                  if (active) {
                    next.delete(f);
                  } else {
                    next.add(f);
                  }
                  apply({ ...filters, features: next });
                }}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-white/5 text-foreground"
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</label>
      <select
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Усі</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
