"use client";

import { useState } from "react";
import { CatalogCard } from "@/components/catalog-card";
import { Section } from "@/components/section";
import { FilterSidebar } from "@/components/filter-sidebar";
import { items as allItems } from "@/content/items";
import { Item } from "@/lib/types";

export default function CatalogPage() {
  const [items, setItems] = useState<Item[]>(allItems);

  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 sm:pt-10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
    >
      <Section title="Каталог" kicker="Усі лоти">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <FilterSidebar items={allItems} onFilter={setItems} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <CatalogCard key={item.slug} item={item} badge={item.authLevel === "verified" ? "verified" : undefined} />
            ))}
            {!items.length && (
              <div className="col-span-full rounded-2xl border border-border/70 bg-card/60 p-6 text-sm text-muted-foreground">
                Немає лотів за вибраними фільтрами.
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
