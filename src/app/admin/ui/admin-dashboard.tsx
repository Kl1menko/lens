"use client";

import { useMemo, useState } from "react";
import { items as seedItems } from "@/content/items";
import { drops as seedDrops } from "@/content/drops";
import { Item, Drop, MediaType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { MediaGrid } from "@/components/media-grid";
import { ConditionScale } from "@/components/condition-scale";
import { FeatureChips } from "@/components/feature-chips";

type FormState = Item;

const emptyItem: Item = {
  slug: "",
  title: "",
  brand: "",
  price: 0,
  conditionScore: 7,
  authLevel: "unchecked",
  origin: "",
  originCard: {},
  status: "draft",
  features: [],
  media: [],
  techSpec: [],
};

export default function AdminDashboard() {
  const [items, setItems] = useState<Item[]>(() => seedItems);
  const [drops, setDrops] = useState<Drop[]>(() => seedDrops);
  const [form, setForm] = useState<FormState>(emptyItem);
  const [assignDrop, setAssignDrop] = useState<string>("");

  const editing = useMemo(() => items.find((i) => i.slug === form.slug), [items, form.slug]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const addMediaUrl = (url: string, type: MediaType) => {
    if (!url) return;
    setForm((f) => ({ ...f, media: [...(f.media ?? []), { url, type }] }));
  };

  const saveItem = () => {
    if (!form.slug || !form.title) {
      alert("Slug і title обовʼязкові");
      return;
    }
    setItems((prev) => {
      const exists = prev.find((i) => i.slug === form.slug);
      if (exists) {
        return prev.map((i) => (i.slug === form.slug ? { ...form } : i));
      }
      return [{ ...form }, ...prev];
    });
    if (assignDrop) {
      setDrops((prev) =>
        prev.map((d) =>
          d.id === assignDrop && !d.items.includes(form.slug)
            ? { ...d, items: [...d.items, form.slug] }
            : d
        )
      );
    }
    setForm(emptyItem);
    setAssignDrop("");
  };

  const editItem = (slug: string) => {
    const item = items.find((i) => i.slug === slug);
    if (item) setForm(item);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="space-y-3 rounded-2xl border border-border/70 bg-card/60 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create / Edit item</h3>
          {editing ? <span className="text-xs text-emerald-400">Editing</span> : null}
        </div>
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="slug"
          value={form.slug}
          onChange={(e) => updateField("slug", e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="brand"
            value={form.brand}
            onChange={(e) => updateField("brand", e.target.value)}
          />
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="line"
            value={form.line ?? ""}
            onChange={(e) => updateField("line", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="season"
            value={form.season ?? ""}
            onChange={(e) => updateField("season", e.target.value)}
          />
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="era (2010s/2020s)"
            value={form.era ?? ""}
            onChange={(e) => updateField("era", e.target.value as Item["era"])}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="size"
            value={form.size ?? ""}
            onChange={(e) => updateField("size", e.target.value)}
          />
          <input
            type="number"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="price"
            value={form.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Condition 1-10</span>
            <input
              type="number"
              min={1}
              max={10}
              className="rounded-lg border border-border bg-background px-3 py-2"
              value={form.conditionScore}
              onChange={(e) => updateField("conditionScore", Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Auth level</span>
            <select
              className="rounded-lg border border-border bg-background px-3 py-2"
              value={form.authLevel}
              onChange={(e) => updateField("authLevel", e.target.value as Item["authLevel"])}
            >
              <option value="unchecked">unchecked</option>
              <option value="verified">verified</option>
              <option value="rejected">rejected</option>
            </select>
          </label>
        </div>
        <textarea
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="Condition notes"
          value={form.conditionNotes ?? ""}
          onChange={(e) => updateField("conditionNotes", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Origin story"
            value={form.originCard.story ?? ""}
            onChange={(e) => updateField("originCard", { ...form.originCard, story: e.target.value })}
          />
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Dye / Finish"
            value={form.originCard.dyeFinish ?? ""}
            onChange={(e) => updateField("originCard", { ...form.originCard, dyeFinish: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Material"
            value={form.originCard.material ?? ""}
            onChange={(e) => updateField("originCard", { ...form.originCard, material: e.target.value })}
          />
          <input
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Tech"
            value={form.originCard.tech ?? ""}
            onChange={(e) => updateField("originCard", { ...form.originCard, tech: e.target.value })}
          />
        </div>
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="Features (comma separated)"
          value={form.features.join(", ")}
          onChange={(e) =>
            updateField(
              "features",
              e.target.value
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean)
            )
          }
        />
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="Tech spec e.g. Movement: Cal 3285; Case: 40mm"
          value={form.techSpec.map((t) => `${t.key}:${t.value}`).join("; ")}
          onChange={(e) =>
            updateField(
              "techSpec",
              e.target.value
                .split(";")
                .map((pair) => pair.trim())
                .filter(Boolean)
                .map((pair) => {
                  const [key, ...rest] = pair.split(":");
                  return { key: key.trim(), value: rest.join(":").trim() };
                })
            )
          }
        />

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Media URLs</p>
          <MediaInput onAdd={addMediaUrl} />
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {form.media.map((m) => (
              <span key={m.url} className="rounded-full border border-border px-3 py-1">
                {m.type}: {m.url.slice(0, 24)}…
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Assign to drop</label>
          <select
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={assignDrop}
            onChange={(e) => setAssignDrop(e.target.value)}
          >
            <option value="">None</option>
            {drops.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={saveItem}
          className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-[1px]"
        >
          {editing ? "Update item" : "Create item"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Каталог (локально)</h3>
          <span className="text-xs text-muted-foreground">{items.length} шт.</span>
        </div>
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.slug} className="rounded-2xl border border-border/70 bg-card/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.brand} · {item.line ?? "—"} · {formatPrice(item.price)}
                  </p>
                </div>
                <button
                  onClick={() => editItem(item.slug)}
                  className="rounded-full border border-border px-3 py-1 text-xs"
                >
                  Edit
                </button>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <ConditionScale score={item.conditionScore} notes={item.conditionNotes} />
                <FeatureChips features={item.features} />
              </div>
              <div className="mt-3">
                <MediaGrid media={item.media} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MediaInput({ onAdd }: { onAdd: (url: string, type: MediaType) => void }) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState<MediaType>("main");
  return (
    <div className="flex gap-2">
      <input
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        placeholder="https://…"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <select
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        value={type}
        onChange={(e) => setType(e.target.value as MediaType)}
      >
        <option value="main">main</option>
        <option value="detail">detail</option>
        <option value="tag">tag</option>
        <option value="stitch">stitch</option>
        <option value="zipper">zipper</option>
        <option value="patch">patch</option>
        <option value="label">label</option>
      </select>
      <button
        type="button"
        onClick={() => {
          onAdd(url, type);
          setUrl("");
        }}
        className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-black"
      >
        Add
      </button>
    </div>
  );
}
