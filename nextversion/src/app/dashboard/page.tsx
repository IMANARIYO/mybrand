import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Settings, BarChart3, Briefcase, FileText, MessageSquare, Users } from "lucide-react"
import { getContactStats } from "@/app/contact/_server-actions/contact-server-actions"
import { getProjectStats } from "@/app/dashboard/projects/_server-actions/projects-actions"
import { getServiceStats } from "@/app/dashboard/services/_server-actions/services-actions"
import { getServiceRequestStats } from "@/app/dashboard/service-requests/_server-actions/service-requests-actions"
import { getUserStats } from "@/app/dashboard/users/_server-actions/users-actions"

export default async function DashboardPage() {
  const [contactStats, projectStats, serviceStats, requestStats, userStats] = await Promise.all([
    getContactStats(),
    getProjectStats(),
    getServiceStats(),
    getServiceRequestStats(),
    getUserStats()
  ])

  const dashboardCards = [
    {
      title: "Contact Management",
      description: "View and manage contact form submissions",
      icon: Mail,
      href: "/dashboard/contacts",
      count: contactStats.total,
      newCount: contactStats.new,
    },
    {
      title: "Projects",
      description: "Manage your development projects",
      icon: Briefcase,
      href: "/dashboard/projects",
      count: projectStats.total,
      newCount: projectStats.inProgress,
    },
    {
      title: "Services",
      description: "Manage your service offerings",
      icon: FileText,
      href: "/dashboard/services",
      count: serviceStats.total,
      newCount: serviceStats.active,
    },
    {
      title: "Service Requests",
      description: "Handle incoming service requests",
      icon: MessageSquare,
      href: "/dashboard/service-requests",
      count: requestStats.total,
      newCount: requestStats.pending,
    },
    {
      title: "Users",
      description: "Manage user accounts and permissions",
      icon: Users,
      href: "/dashboard/users",
      count: userStats.total,
      newCount: userStats.admins,
    },
    {
      title: "Analytics",
      description: "View website and contact analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      count: 0,
    },
    {
      title: "Settings",
      description: "Manage site settings and preferences",
      icon: Settings,
      href: "/dashboard/settings",
      count: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio management dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <card.icon className="h-8 w-8 text-primary" />
                {card.newCount && card.newCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {card.newCount} new
                  </span>
                )}
              </div>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{card.count}</div>
                <Button asChild>
                  <Link href={card.href}>View</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Button asChild variant="outline" className="h-auto p-4">
              <Link href="/dashboard/contacts" className="flex flex-col items-start">
                <span className="font-semibold">View New Messages</span>
                <span className="text-sm text-muted-foreground">
                  {contactStats.new} unread messages
                </span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4">
              <Link href="/dashboard/service-requests" className="flex flex-col items-start">
                <span className="font-semibold">Pending Requests</span>
                <span className="text-sm text-muted-foreground">
                  {requestStats.pending} requests awaiting review
                </span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4">
              <Link href="/dashboard/projects" className="flex flex-col items-start">
                <span className="font-semibold">Active Projects</span>
                <span className="text-sm text-muted-foreground">
                  {projectStats.inProgress} projects in progress
                </span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4">
              <Link href="/contact" className="flex flex-col items-start">
                <span className="font-semibold">Test Contact Form</span>
                <span className="text-sm text-muted-foreground">
                  Preview the public contact form
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}