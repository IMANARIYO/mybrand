"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  Settings, 
  BarChart3, 
  FileText,
  MessageSquare,
  Users,
  LogOut
} from "lucide-react"
import { logoutAction } from "@/app/(auth)/login/actions"
import { toast } from "sonner"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: Mail,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: FileText,
  },
  {
    title: "Service Requests",
    href: "/dashboard/service-requests",
    icon: MessageSquare,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MB</span>
          </div>
          <span className="font-bold text-xl">Dashboard</span>
        </Link>
      </div>

      <nav className="flex items-center space-x-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href={item.href} className="flex items-center space-x-2">
              <item.icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.title}</span>
            </Link>
          </Button>
        ))}
      </nav>

      <div className="flex items-center space-x-2">
        <ThemeSwitcher />
        <form action={async () => {
          toast.success("Logged out successfully")
          await logoutAction()
        }}>
          <Button variant="outline" size="sm" type="submit">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </form>
      </div>
    </div>
  )
}