import { SectionTitle } from "@/components/brand";
import { ReactNode } from "react";

export function Section({ title, kicker, actions, children }: {
  title: string;
  kicker?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <SectionTitle title={title} kicker={kicker} />
        <div className="ml-auto flex items-center gap-2 text-sm text-muted">{actions}</div>
      </div>
      {children}
    </section>
  );
}
