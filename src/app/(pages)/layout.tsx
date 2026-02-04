import type { ReactNode } from "react";
import { TopNav } from "@/components/top-nav";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-grid text-foreground">
      <TopNav />
      {children}
    </div>
  );
}
