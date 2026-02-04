export function BrandMark() {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold tracking-tight uppercase">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
        L9
      </span>
      <span className="text-foreground">LENS9</span>
    </div>
  );
}

export function SectionTitle({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {kicker ? <span className="text-xs uppercase tracking-[0.24em] text-muted">{kicker}</span> : null}
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
    </div>
  );
}
