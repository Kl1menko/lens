import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { items } from "@/content/items";
import { CatalogCard } from "@/components/catalog-card";
import { FeatureChips } from "@/components/feature-chips";

type Params = { handle: string };

export default function ProfilePage({ params }: { params: Params }) {
  const { handle } = params;
  // Mock profile
  const profile = {
    handle,
    displayName: handle === "alice" ? "Alice Demo" : "Guest",
    badges: ["перевірений продавець", "ранній користувач"],
    saved: items.slice(0, 2),
  };

  if (!profile) return notFound();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-10">
      <Section title={profile.displayName} kicker={`@${profile.handle}`}>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <FeatureChips features={profile.badges} />
          </div>
        </div>
      </Section>

      <Section title="Wardrobe" kicker="Збережені товари">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.saved.map((item) => (
            <CatalogCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>
    </main>
  );
}
