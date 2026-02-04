"use client";

import { useEffect, useState } from "react";

type Props = { target: string; label?: string };

function formatDelta(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function DropTimer({ target, label = "Наступний дроп" }: Props) {
  const [remaining, setRemaining] = useState<string>(() => formatDelta(Date.parse(target) - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(formatDelta(Date.parse(target) - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm">
      <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-black">
        Старт через
      </span>
      <span className="text-lg font-semibold tabular-nums">{remaining}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
