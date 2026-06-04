// ─── ShipKit Dashboard Layout ───────────────────────────────────────────

import { DashboardLayout as DashboardShell } from "@/components/dashboard-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
