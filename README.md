# LENS9 MVP – scaffold

Фрейм: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + next-themes. Стек під Supabase (auth/db/storage) — клієнт в `src/lib/supabase/client.ts`.

## Швидкий старт

```bash
pnpm install
pnpm dev
# http://localhost:3000
```

## Структура

- `src/app/(pages)` — маршрути (Home, Catalog, Drops, WTB, Profile) + спільний layout з навбаром/темою.
- `src/components/` — UI: навбар, картки каталогу, секції, брендмарка, theme-provider.
- `src/content/` — мок-дані каталогу й константи (features, brands, condition scale).
- `src/lib/` — утиліти (cn, Supabase browser client).
- `db/` — майбутня схема/migrations для Supabase (draft).

## Тема та UI

- Tailwind 3.4 + shadcn/ui (config у `components.json`, `tailwind.config.ts`, `src/app/globals.css`).
- Theme toggle (light/dark) у навбарі, `next-themes` з `attribute="class"`.
- Базовий layout з glass/bg-grid стилями, шрифти Space Grotesk + JetBrains Mono.

## Демо-контент

- Головна: hero, останні лоти, блок Drops, блок WTB.
- `/catalog` відображає мок-товари з `src/content/items.ts`.
- `/drops`, `/wtb`, `/profile` — заглушки з описом наступних кроків.

## Наступні кроки (план)

1) Додати сторінку товару `/items/[slug]` з Origin/Tech/Condition.  
2) Інтегрувати Supabase схему + RLS + seed, підʼєднати storage.  
3) Форми WTB/Drop, email/Telegram алерти (Resend/бот).  
4) Документація condition/auth протоколу та пайплайнів QC.  

## Нотифікації (free)
- TG бот: додай у `.env.local` `TELEGRAM_BOT_TOKEN` і `TELEGRAM_CHAT_ID` (канал/група для алертів), опц. `ADMIN_USER_IDS`.
- `src/app/admin/actions.ts`: `notifyScheduledDrop(drop)` шле Telegram при створенні scheduled drop; `notifyItemLive(item)` робить простий матчинг WTB → DM/чат.
- Матчинг WTB: `src/lib/matching.ts` (brand/size/query includes). Використовує мокові `wtbRequests` (замінити на запити з БД пізніше).
