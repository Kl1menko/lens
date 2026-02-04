"use server";

import { Drop, Item } from "@/lib/types";

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
  }
  return { token, chatId };
}

async function sendTelegramMessage(chatId: string, text: string) {
  const { token } = getTelegramConfig();
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Telegram send failed", await res.text());
  }
}

export async function sendDropAlert(drop: Drop) {
  const { chatId } = getTelegramConfig();
  const text = [
    "🚨 *New Drop Scheduled*",
    `*${drop.title}*`,
    `Starts: ${drop.startsAt}`,
    drop.endsAt ? `Ends: ${drop.endsAt}` : "",
    `Status: ${drop.status}`,
  ]
    .filter(Boolean)
    .join("\n");
  await sendTelegramMessage(chatId, text);
}

export async function sendItemLiveAlerts(item: Item, matches: { userHandle: string; chatId?: string }[]) {
  const defaultChatId = process.env.TELEGRAM_CHAT_ID;
  for (const match of matches) {
    const chat = match.chatId ?? defaultChatId;
    if (!chat) continue;
    const text = [
      "✅ *New match for your WTB*",
      `${item.brand} · ${item.title}`,
      `Condition: ${item.conditionScore}/10`,
      `Price: ${item.price}`,
      `Features: ${item.features.join(", ")}`,
    ].join("\n");
    await sendTelegramMessage(chat, text);
  }
}
