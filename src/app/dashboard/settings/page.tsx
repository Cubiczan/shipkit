// ─── ShipKit Settings Page ──────────────────────────────────────────────

"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { User, Bell, Palette, Shield } from "lucide-react"

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
]

export default function SettingsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("profile")

  if (!session?.user) {
    redirect("/login")
  }

  const ActiveTabPanel = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings user={session.user!} />
      case "notifications":
        return <NotificationSettings />
      case "appearance":
        return <AppearanceSettings />
      case "security":
        return <SecuritySettings />
      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-black dark:border-white text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <ActiveTabPanel />
    </div>
  )
}

function ProfileSettings({ user }: { user: { name?: string | null; email?: string | null; image?: string | null } }) {
  const [name, setName] = useState(user.name || "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    // In production, this would call an API
    await new Promise((r) => setTimeout(r, 500))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
          {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div>
          <p className="font-medium">{user.name || "User"}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium block mb-1.5">
            Display Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="email-settings" className="text-sm font-medium block mb-1.5">
            Email
          </label>
          <input
            id="email-settings"
            type="email"
            value={user.email || ""}
            disabled
            className="w-full max-w-md px-3 py-2 border rounded-lg text-sm bg-muted cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Email cannot be changed. Contact support for account changes.
          </p>
        </div>
      </div>

      <div className="border-t pt-6">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </form>
  )
}

function NotificationSettings() {
  const toggles = [
    { label: "Email notifications", description: "Receive emails about your account activity", enabled: true },
    { label: "Product updates", description: "New features, changelog, and improvements", enabled: true },
    { label: "Marketing emails", description: "Tips, tutorials, and special offers", enabled: false },
    { label: "Billing alerts", description: "Payment confirmations, failures, and receipts", enabled: true },
  ]

  return (
    <div className="space-y-4">
      {toggles.map((item) => (
        <div key={item.label} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium text-sm">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={item.enabled}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white" />
          </label>
        </div>
      ))}
    </div>
  )
}

function AppearanceSettings() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Theme preferences are applied site-wide.
      </p>
      <div className="grid grid-cols-3 gap-4 max-w-md">
        {[
          { id: "light", label: "Light", emoji: "☀️" },
          { id: "dark", label: "Dark", emoji: "🌙" },
          { id: "system", label: "System", emoji: "💻" },
        ].map((theme) => (
          <button
            key={theme.id}
            className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              // Theme switching via next-themes
              document.documentElement.classList.remove("light", "dark")
              if (theme.id !== "system") {
                document.documentElement.classList.add(theme.id)
              }
              localStorage.setItem("theme", theme.id)
            }}
          >
            <span className="text-2xl">{theme.emoji}</span>
            <span className="text-xs font-medium">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Password</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              You use magic link authentication. No password required.
            </p>
          </div>
          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium">
            Secure
          </span>
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Connected Accounts</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage your OAuth connections
            </p>
          </div>
          <button className="text-sm text-blue-600 hover:underline cursor-pointer">
            Manage
          </button>
        </div>
      </div>

      <div className="p-4 border rounded-lg border-red-200 dark:border-red-900/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm text-red-600 dark:text-red-400">
              Danger Zone
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <button className="text-sm text-red-600 hover:underline cursor-pointer">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
