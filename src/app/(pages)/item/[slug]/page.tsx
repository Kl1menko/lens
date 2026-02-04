import { notFound } from "next/navigation";
import { items } from "@/content/items";
import { MediaGrid } from "@/components/media-grid";
import { OriginCard } from "@/components/origin-card";
import { ConditionScale } from "@/components/condition-scale";
import { TechSpecCard } from "@/components/tech-spec-card";
import { FeatureChips } from "@/components/feature-chips";
import { formatPrice } from "@/lib/utils";
import { Section } from "@/components/section";
import Link from "next/link";
import { ShieldCheck, Share2, ShoppingBag } from "lucide-react";

type Params = { slug: string };

export default function ItemPage({ params }: { params: Params }) {
  const item = items.find((i) => i.slug === params.slug);
  if (!item) return notFound();

  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1400px" }}
    >
      <nav className="text-xs text-muted-foreground">
        <Link href="/catalog" className="hover:text-foreground">
          Каталог
        </Link>{" "}
        / <span className="text-foreground">{item.title}</span>
      </nav>

      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.brand}</p>
          <h1 className="text-3xl font-semibold text-foreground">{item.title}</h1>
          <p className="text-sm text-muted-foreground">
            {item.line ?? "—"} · {item.season ?? "—"} · {item.era ?? "—"} · Розмір {item.size ?? "—"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white px-4 py-2 text-lg font-semibold text-black">
            {formatPrice(item.price)}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {item.authLevel}
          </span>
          <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-[1px]">
            <ShoppingBag size={16} /> Запропонувати / Купити
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm text-foreground hover:border-white/40">
            <Share2 size={16} /> Поділитись
          </button>
        </div>
      </div>

      <MediaGrid media={item.media} />

      <div className="grid gap-4 lg:grid-cols-3">
        <ConditionScale score={item.conditionScore} notes={item.conditionNotes} />
        <OriginCard item={item} />
        <TechSpecCard specs={item.techSpec} />
      </div>

      {item.features.length ? (
        <Section title="Характеристики" kicker="Теги">
          <FeatureChips features={item.features} />
        </Section>
      ) : null}

      {item.styleNotes ? (
        <Section title="Стильні нотатки">
          <p className="rounded-2xl border border-border/70 bg-card/60 p-4 text-sm text-muted-foreground">
            {item.styleNotes}
          </p>
        </Section>
      ) : null}

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-muted-foreground flex items-center gap-3">
        <ShieldCheck className="text-emerald-400" size={18} />
        Перевірка стану: фото-докази, чек-лист QC та походження зберігаються в Origin Card. Для лайв-лотів потрібен підтверджений продавець.
      </div>
    </main>
  );
}
