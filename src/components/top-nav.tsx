"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand";
import {
  ShoppingBag,
  Timer,
  Search,
  User,
  Sparkles,
  Sun,
  MoonStar,
  Heart,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

const links = [
  { href: "/", label: "Каталог", icon: ShoppingBag },
  { href: "/drops", label: "Дропи", icon: Timer },
  { href: "/wtb", label: "Запити", icon: Search },
  { href: "/profile/alice", label: "Профіль", icon: User },
];

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const mounted = useMemo(() => typeof window !== "undefined", []);

  return (
    <header className="sticky top-0 z-20 bg-transparent">
      <div className="w-full bg-black/70 px-6 py-2 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span>LENS9 — вторинний люкс. Замовляй доставку.</span>
          <span>
            Персональні пропозиції після{" "}
            <Link href="/profile/alice" className="font-semibold text-foreground hover:underline">
              авторизації
            </Link>
            .
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 text-sm">
        <div className="flex flex-col gap-3 rounded-3xl bg-black/70 px-4 py-3 shadow-lg backdrop-blur-md md:flex-row md:items-center md:gap-4">
          <Link href="/" className="hover:opacity-80">
            <BrandMark />
          </Link>

          <div className="flex w-full items-center gap-2 rounded-2xl bg-[#161616] px-3 py-2">
            <input
              aria-label="Пошук"
              placeholder="Я шукаю"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-foreground transition hover:bg-white/20">
              Знайти
              <Search size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <button className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 hover:border-white/30">
                Допомога <ChevronDown size={14} />
              </button>
              <button className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 hover:border-white/30">
                Ми <ChevronDown size={14} />
              </button>
            </div>
            <Link href="/profile/alice" className="rounded-full p-2 hover:bg-white/10">
              <User size={18} />
            </Link>
            <button className="rounded-full p-2 hover:bg-white/10">
              <Heart size={18} />
            </button>
            <Link href="/drops" className="rounded-full p-2 hover:bg-white/10">
              <ShoppingBag size={18} />
            </Link>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-2 py-2 text-foreground transition hover:border-white/40"
            >
              {mounted && theme === "light" ? <Sun size={16} /> : <MoonStar size={16} />}
            </button>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm w-full justify-between">
          <div className="flex flex-wrap items-center gap-3">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/5"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          </div>
          <Link
            href="/drops"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-black transition hover:-translate-y-[1px] hover:shadow-lg"
          >
            <Sparkles size={18} />
            <span className="text-base font-semibold">Лайв дроп</span>
            <span className="text-sm text-neutral-700 group-hover:text-neutral-900">03:12</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
