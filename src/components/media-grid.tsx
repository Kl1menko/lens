import Image from "next/image";
import { MediaType } from "@/lib/types";

type MediaItem = { url: string; type: MediaType };

export function MediaGrid({ media }: { media: MediaItem[] }) {
  if (!media.length) return null;
  const main = media.find((m) => m.type === "main") ?? media[0];
  const rest = media.filter((m) => m !== main);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="relative h-80 overflow-hidden rounded-2xl border border-border/60 md:col-span-2">
        <Image
          src={main.url}
          alt="main"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
          placeholder="empty"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {main.type}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
        {rest.map((m) => (
          <div
            key={m.url}
            className="relative h-36 overflow-hidden rounded-2xl border border-border/60"
          >
            <Image
              src={m.url}
              alt={m.type}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover"
              placeholder="empty"
            />
            <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {m.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
