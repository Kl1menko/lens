import { notFound } from "next/navigation";
import { drops } from "@/content/drops";
import { items } from "@/content/items";
import { DropTimer } from "@/components/drop-timer";
import { CatalogCard } from "@/components/catalog-card";
import { Section } from "@/components/section";

type Params = { id: string };

export default function DropPage({ params }: { params: Params }) {
  const drop = drops.find((d) => d.id === params.id);
  if (!drop) return notFound();
  const dropItems = items.filter((i) => drop.items.includes(i.slug));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-10">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-semibold text-foreground">{drop.title}</h1>
        <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {drop.status}
        </span>
      </div>

      <DropTimer target={drop.startsAt} label={drop.status === "live" ? "Завершення" : "Старт"} />

      <Section title="Лоти дропу">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dropItems.map((item) => (
            <CatalogCard key={item.slug} item={item} badge="drop" />
          ))}
        </div>
      </Section>
    </main>
  );
}
