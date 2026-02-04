import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-grid px-6 text-center text-foreground">
      <div className="space-y-4 rounded-2xl border border-white/10 bg-black/60 px-6 py-8 shadow-2xl sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">404</p>
        <h1 className="text-3xl font-semibold">Сторінку не знайдено</h1>
        <p className="text-sm text-muted-foreground">
          Можливо, лот або дроп уже неактивні. Поверніться до каталогу чи дропів.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link href="/" className="rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:-translate-y-[1px]">
            На головну
          </Link>
          <Link href="/catalog" className="rounded-full border border-white/20 px-4 py-2 text-foreground transition hover:border-white/40">
            Каталог
          </Link>
          <Link href="/drops" className="rounded-full border border-white/20 px-4 py-2 text-foreground transition hover:border-white/40">
            Дропи
          </Link>
        </div>
      </div>
    </div>
  );
}
