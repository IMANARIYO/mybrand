import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
        <Toaster position="top-right" richColors />
      </div>
    </ThemeProvider>
  )
}