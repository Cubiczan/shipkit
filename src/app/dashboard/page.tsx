// ─── ShipKit Dashboard Overview ─────────────────────────────────────────

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Activity,
  CreditCard,
  Key,
  FileText,
  Users,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  BarChart3,
} from "lucide-react"

async function getDashboardData(userId: string) {
  const [subscription, apiKeyCount, projectCount] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId } }),
    prisma.apiKey.count({ where: { userId, revokedAt: null } }),
    prisma.project.count({ where: { userId, status: "ACTIVE" } }),
  ])
  return { subscription, apiKeyCount, projectCount }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const data = await getDashboardData(session.user.id)

  const planName = data.subscription?.plan ?? "Trial"
  const planColor =
    planName === "PRO" ? "text-blue-600" :
    planName === "ENTERPRISE" ? "text-purple-600" :
    "text-muted-foreground"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back{session.user.name ? `, ${session.user.name}` : ""}
        </p>
      </div>

      {/* Plan banner */}
      <div className="border rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <p className={`text-2xl font-bold mt-1 ${planColor}`}>{planName}</p>
          </div>
          <Link
            href="/pricing"
            className="text-sm font-medium border px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            {data.subscription?.status === "ACTIVE" ? "Manage Plan" : "Upgrade"}
          </Link>
        </div>
        {data.subscription?.status && (
          <p className="text-xs text-muted-foreground mt-2 capitalize">
            Status: {data.subscription.status.toLowerCase().replace("_", " ")}
          </p>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Projects</p>
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2">{data.projectCount}</p>
          <Link
            href="/dashboard/projects"
            className="text-xs text-blue-600 hover:underline mt-1 inline-flex items-center gap-1"
          >
            Create project <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">API Keys</p>
            <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Key className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2">{data.apiKeyCount}</p>
          <Link
            href="/dashboard/api-keys"
            className="text-xs text-blue-600 hover:underline mt-1 inline-flex items-center gap-1"
          >
            Manage keys <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Billing</p>
            <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2">
            {data.subscription?.status === "ACTIVE" ? "Active" : "No plan"}
          </p>
          <Link
            href="/dashboard/billing"
            className="text-xs text-blue-600 hover:underline mt-1 inline-flex items-center gap-1"
          >
            View details <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Activity & Quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-muted-foreground">
                No recent activity yet. Create your first project to get started.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/projects"
            className="text-sm text-blue-600 hover:underline mt-4 inline-flex items-center gap-1"
          >
            Create your first project <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Project", icon: FileText, href: "/dashboard/projects/new" },
              { label: "Create API Key", icon: Key, href: "/dashboard/api-keys" },
              { label: "Invite Teammates", icon: Users, href: "/dashboard/team" },
              { label: "View Analytics", icon: TrendingUp, href: "/dashboard/analytics" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors text-center"
              >
                <action.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
