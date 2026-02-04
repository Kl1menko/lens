import Link from "next/link";
import { Section } from "@/components/section";
import { drops } from "@/content/drops";
import { DropTimer } from "@/components/drop-timer";

export default function DropsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
      <Section title="Дропи" kicker="Календар">
        <div className="space-y-4">
          {drops.map((drop) => (
            <div
              key={drop.id}
              className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/60 p-4 md:flex-row md:items-center md:gap-6"
            >
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{drop.status}</p>
                <h3 className="text-xl font-semibold text-foreground">{drop.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Старт {new Date(drop.startsAt).toLocaleString("uk-UA")}
                  {drop.endsAt ? ` · Фініш ${new Date(drop.endsAt).toLocaleString("uk-UA")}` : ""}
                </p>
              </div>
              <DropTimer target={drop.startsAt} />
              <Link
                href={`/drop/${drop.id}`}
                className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-foreground"
              >
                Переглянути
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
