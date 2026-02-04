import Link from "next/link";
import { CatalogCard } from "@/components/catalog-card";
import { Section } from "@/components/section";
import { items } from "@/content/items";
import { drops } from "@/content/drops";
import { wtbRequests } from "@/content/wtb";
import { ArrowUpRight, Sparkles, Clock3, ChevronRight } from "lucide-react";

const featured = items.slice(0, 3);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-grid text-foreground">
      <main
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-20 pt-8 sm:px-6"
        style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
      >
        <Hero />

        <Section
          title="Дропи"
          kicker="Найближчі"
          actions={
            <Link className="inline-flex items-center gap-1" href="/drops">
              Усі дропи <ArrowUpRight size={14} />
            </Link>
          }
        >
          <div className="space-y-3">
            {drops.map((drop) => (
              <DropRow key={drop.id} drop={drop} />
            ))}
          </div>
        </Section>

        <Section
          title="Каталог"
          kicker="Рекомендовані"
          actions={
            <Link className="inline-flex items-center gap-1" href="/catalog">
              Всі товари <ArrowUpRight size={14} />
            </Link>
          }
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <CatalogCard key={item.slug} item={item} badge={item.authLevel === "verified" ? "verified" : undefined} />
            ))}
          </div>
        </Section>

        <Section
          title="Запити WTB"
          kicker="Матчинг"
          actions={
            <Link className="inline-flex items-center gap-1" href="/wtb">
              Усі запити <ArrowUpRight size={14} />
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {wtbRequests.map((w) => (
              <WTBCard key={w.id} title={w.query} budget={w.maxPrice ? `$${w.maxPrice}` : "—"} details={w.brand ?? "Будь-який бренд"} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-0 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-50" />
      <div className="relative grid gap-6 p-4 sm:grid-cols-[1.6fr_1fr] sm:p-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white">
            <span className="rounded-full bg-emerald-400 px-3 py-1 font-semibold text-black shadow-md">Verified</span>
            <span className="rounded-full border border-white/40 px-3 py-1 text-white/80">Issued</span>
            <span className="rounded-full border border-white/40 px-3 py-1 text-white/80">Matchday / Travel</span>
          </div>
          <h1 className="text-2xl font-semibold leading-tight text-white sm:text-4xl">
            Away-days archive for terrace gear.
          </h1>
          <p className="max-w-2xl text-base text-white/80">
            Дропи щоп’ятниці. Перевірка. Деталі. Ніяких “майже як нове”.
          </p>

          <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm sm:grid-cols-2">
            <div className="space-y-1 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Напрямок</p>
              <p className="text-lg font-semibold">Kyiv → Berlin</p>
              <p className="text-white/70">Terrace kit · сертифікати · фото QC</p>
            </div>
            <div className="space-y-1 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Рейс</p>
              <p className="text-lg font-semibold">L9 / 0515 · Пʼятниця</p>
              <p className="text-white/70">Boarding 20:00 · Verified crew</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <Badge>Довіра: автентифікація + протокол стану</Badge>
            <Badge>Дропи з таймером</Badge>
            <Badge>WTB-заявки</Badge>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:flex-row">
            <Link href="/drops" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-black transition hover:-translate-y-[1px] sm:w-auto">
              <Sparkles size={16} /> До наступного дропу
            </Link>
            <Link href="/wtb" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-4 py-2 text-white transition hover:border-white sm:w-auto">
              Залишити запит
            </Link>
          </div>
        </div>

        <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-black/60 p-5">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Boarding pass</span>
            <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-white">LENS9</span>
          </div>

          <div className="relative h-32 overflow-hidden rounded-xl border border-white/15">
            <picture>
              <source
                srcSet="https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?auto=format&fit=crop&w=1400&q=80"
                media="(min-width: 768px)"
              />
              <img
                src="https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?auto=format&fit=crop&w=900&q=80"
                alt="Matchday crowd"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Live drop</p>
                <p className="text-lg font-semibold text-white">Paris Archive Bags</p>
              </div>
              <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-black shadow-md">03:12</span>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">
              Фото-докази, серійні номери, tag/zip/patch макро. Статус: перевірено.
            </div>
          </div>

          <div className="absolute -left-10 top-6 flex h-14 w-14 rotate-12 items-center justify-center rounded-full border border-emerald-400 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300/80 backdrop-blur">
            Verified
          </div>
          <div className="absolute -right-8 bottom-6 flex h-14 w-14 -rotate-6 items-center justify-center rounded-full border border-white/50 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur">
            Issued
          </div>
        </div>
      </div>
    </div>
  );
}

function DropRow({ drop }: { drop: (typeof drops)[number] }) {
  const isLive = drop.status === "live";
  const pill = isLive ? "bg-emerald-500/90 text-black" : "bg-white/5 text-foreground";
  const label = isLive ? "Лайв" : "Заплановано";
  return (
    <Link
      href={`/drop/${drop.id}`}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:border-white/25 sm:flex-row sm:items-center"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
        <span className={`rounded-full px-3 py-1 font-semibold ${pill}`}>{label}</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-foreground">
          <Clock3 size={14} />
          {isLive ? "Триває" : "Старт " + new Date(drop.startsAt).toLocaleString("uk-UA")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="text-lg font-semibold text-foreground">{drop.title}</div>
        <div className="text-sm text-muted">
          Starts {new Date(drop.startsAt).toLocaleString("uk-UA")}
          {drop.endsAt ? ` · Ends ${new Date(drop.endsAt).toLocaleString("uk-UA")}` : ""}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="rounded-full border border-white/15 px-3 py-1 text-sm text-foreground">Next drop</span>
        <ChevronRight className="opacity-60" />
      </div>
    </Link>
  );
}

function WTBCard({ title, budget, details }: { title: string; budget: string; details: string }) {
  return (
    <div className="glass flex flex-col gap-2 rounded-2xl p-4">
      <div className="text-sm uppercase tracking-[0.2em] text-muted">Запит</div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-sm text-muted">Бюджет: {budget}</div>
      <div className="text-sm text-muted">{details}</div>
      <button className="mt-3 inline-flex items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-black transition hover:-translate-y-[1px]">
        Запропонувати
      </button>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
      {children}
    </span>
  );
}
