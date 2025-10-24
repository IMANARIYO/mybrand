import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Clock, CheckCircle2, TrendingUp, Package } from "lucide-react"
import { getServiceRequests, getServiceRequestStats } from "../_server-actions/services-server-actions"
import { ServiceRequestsTable } from "../_components/ServiceRequestsTable"
import type { ServiceRequestFilters } from "../_types/services-types"

interface PageProps {
  searchParams: Promise<{
    page?: string
    search?: string
    status?: string
  }>
}

export default async function ServicesDashboardPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = params.search || ""
  const status = params.status || "all"

  const filters: ServiceRequestFilters = {}
  if (search) filters.search = search
  if (status && status !== "all") filters.status = status as ServiceRequestFilters["status"]

  const [requestsResponse, statsResponse] = await Promise.all([
    getServiceRequests(page, 10, filters),
    getServiceRequestStats(),
  ])

  const requests = requestsResponse.data || []
  const meta = requestsResponse.meta!
  const stats = statsResponse.data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Service Management Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track and manage all service requests from potential clients</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">All time service requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgressRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">Active projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Requests by Service */}
      {stats && stats.requestsByService.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Requests by Service
            </CardTitle>
            <CardDescription>See which services are most popular</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.requestsByService
                .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
                .map((item: { serviceId: string; serviceName: string; count: number }) => (
                  <div key={item.serviceId} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.serviceName}</span>
                    <Badge variant="secondary">{item.count} requests</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Service Requests</CardTitle>
          <CardDescription>Manage and track the status of all incoming requests</CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceRequestsTable requests={requests} meta={meta} currentSearch={search} currentStatus={status} />
        </CardContent>
      </Card>
    </div>
  )
}
