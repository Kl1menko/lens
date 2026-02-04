import { Section } from "@/components/section";
import { getAdminIdsFromEnv, isAdmin } from "@/lib/admin-auth";
import { setAdminSession } from "./actions";
import AdminDashboard from "./ui/admin-dashboard";

export default async function AdminPage() {
  const allowed = getAdminIdsFromEnv();
  const hasAdmin = await isAdmin();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-10">
      <Section title="Admin" kicker="Catalog control">
        {!allowed.length ? (
          <div className="rounded-2xl border border-border/70 bg-card/60 p-4 text-sm text-muted-foreground">
            Додайте ADMIN_USER_IDS у .env.local (через кому). Потім увійдіть як один із них.
          </div>
        ) : null}

        {hasAdmin ? (
          <AdminDashboard />
        ) : (
          <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Доступ обмежено. Введіть свій admin id (має збігатися з ADMIN_USER_IDS).
            </p>
            <form action={setAdminSession} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                name="admin_id"
                placeholder="your-admin-id"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-[1px]"
              >
                Увійти
              </button>
            </form>
          </div>
        )}
      </Section>
    </main>
  );
}
