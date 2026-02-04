"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/section";
import { wtbRequests } from "@/content/wtb";
import { WtbRequest } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function WTBPage() {
  const [requests, setRequests] = useState<WtbRequest[]>(wtbRequests);
  const myHandle = "alice"; // мок користувач
  const myRequests = useMemo(() => requests.filter((r) => r.userHandle === myHandle), [requests, myHandle]);

  const submit = (form: FormData) => {
    const newReq: WtbRequest = {
      id: `wtb-${Date.now()}`,
      userHandle: myHandle,
      brand: form.get("brand")?.toString() || undefined,
      query: form.get("query")?.toString() || "",
      size: form.get("size")?.toString() || undefined,
      maxPrice: form.get("maxPrice") ? Number(form.get("maxPrice")) : undefined,
      status: "open",
    };
    setRequests([newReq, ...requests]);
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-10">
      <Section title="WTB / Запити" kicker="Матчинг">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <form
            className="space-y-3 rounded-2xl border border-border/60 bg-card/60 p-4"
            action={(formData) => submit(formData)}
          >
            <h3 className="text-lg font-semibold">Створити запит</h3>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Бренд</label>
              <input name="brand" className="w-full rounded-lg border border-border bg-background px-3 py-2" placeholder="Rolex / Celine" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Запит</label>
              <input name="query" required className="w-full rounded-lg border border-border bg-background px-3 py-2" placeholder="Daytona 116500LN, 2021+, full set" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Size</label>
                <input name="size" className="w-full rounded-lg border border-border bg-background px-3 py-2" placeholder="US 10 / 40mm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Макс. ціна</label>
                <input name="maxPrice" type="number" className="w-full rounded-lg border border-border bg-background px-3 py-2" placeholder="28000" />
              </div>
            </div>
            <button type="submit" className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-[1px]">
              Надіслати
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Мої запити</h3>
            {myRequests.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border/70 bg-card/60 p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Status: {r.status}</span>
                  {r.maxPrice ? <span>Budget {formatPrice(r.maxPrice)}</span> : null}
                </div>
                <h4 className="text-lg font-semibold text-foreground">{r.query}</h4>
                <p className="text-sm text-muted-foreground">
                  {r.brand ?? "Будь-який бренд"} {r.size ? ` · Size ${r.size}` : ""}
                </p>
              </div>
            ))}
            {!myRequests.length && (
              <div className="rounded-2xl border border-border/70 bg-card/60 p-4 text-sm text-muted-foreground">
                Немає запитів. Додайте перший.
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
