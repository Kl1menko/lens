import { cn } from "@/lib/utils";

export function FeatureChips({ features }: { features: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {features.map((f) => (
        <span
          key={f}
          className={cn(
            "rounded-full border border-border px-3 py-1",
            "bg-white/5 text-foreground"
          )}
        >
          {f}
        </span>
      ))}
    </div>
  );
}
