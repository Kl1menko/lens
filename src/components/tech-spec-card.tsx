type Spec = { key: string; value: string };

export function TechSpecCard({ specs }: { specs: Spec[] }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Технічні дані</p>
      <ul className="space-y-2 text-sm text-foreground">
        {specs.map((s) => (
          <li key={s.key} className="flex items-start justify-between gap-4">
            <span className="text-muted-foreground">{s.key}</span>
            <span className="text-right font-medium">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
