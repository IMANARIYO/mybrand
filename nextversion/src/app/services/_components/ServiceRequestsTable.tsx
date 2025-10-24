"use client"

import { useState, useTransition } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Trash2, Mail, Phone, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import type { ServiceRequestWithService, Meta } from "../_types/services-types"
import { updateServiceRequestStatus, deleteServiceRequest } from "../_server-actions/services-server-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ServiceRequestsTableProps {
  requests: ServiceRequestWithService[]
  meta: Meta
  currentSearch?: string
  currentStatus?: string
}

const statusColors = {
  pending: "bg-warning/10 text-warning border-warning/20",
  "in-progress": "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

export function ServiceRequestsTable({
  requests,
  meta,
  currentSearch = "",
  currentStatus = "all",
}: ServiceRequestsTableProps) {
  const [searchTerm, setSearchTerm] = useState(currentSearch)
  const [statusFilter, setStatusFilter] = useState(currentStatus)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    startTransition(() => {
      const params = new URLSearchParams()
      if (value) params.set("search", value)
      if (statusFilter !== "all") params.set("status", statusFilter)
      params.set("page", "1")
      router.push(`?${params.toString()}`)
    })
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    startTransition(() => {
      const params = new URLSearchParams()
      if (searchTerm) params.set("search", searchTerm)
      if (value !== "all") params.set("status", value)
      params.set("page", "1")
      router.push(`?${params.toString()}`)
    })
  }

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams()
      if (searchTerm) params.set("search", searchTerm)
      if (statusFilter !== "all") params.set("status", statusFilter)
      params.set("page", newPage.toString())
      router.push(`?${params.toString()}`)
    })
  }

  const handleStatusChange = async (requestId: string, newStatus: ServiceRequestWithService["status"]) => {
    const result = await updateServiceRequestStatus(requestId, newStatus)

    if (result.success) {
      toast.success("Status updated successfully")
      router.refresh()
    } else {
      toast.error(result.error?.message || "Failed to update status")
    }
  }

  const handleDelete = async (requestId: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return

    const result = await deleteServiceRequest(requestId)

    if (result.success) {
      toast.success("Request deleted successfully")
      router.refresh()
    } else {
      toast.error(result.error?.message || "Failed to delete request")
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, or service..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
            disabled={isPending}
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter} disabled={isPending}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No service requests found
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.name}</p>
                      {request.message && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{request.message}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.serviceName}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <a
                        href={`mailto:${request.email}`}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                      >
                        <Mail className="h-3 w-3" />
                        {request.email}
                      </a>
                      <a
                        href={`tel:${request.phone}`}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                      >
                        <Phone className="h-3 w-3" />
                        {request.phone}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={request.status}
                      onValueChange={(value) =>
                        handleStatusChange(request.id, value as ServiceRequestWithService["status"])
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <Badge className={statusColors[request.status]} variant="outline">
                            {request.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(request.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {requests.length === 0 ? 0 : (meta.currentPage - 1) * meta.limit + 1} to{" "}
          {Math.min(meta.currentPage * meta.limit, meta.totalItems)} of {meta.totalItems} requests
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(meta.currentPage - 1)}
            disabled={meta.currentPage === 1 || isPending}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show first page, last page, current page, and pages around current
                return (
                  page === 1 ||
                  page === meta.totalPages ||
                  (page >= meta.currentPage - 1 && page <= meta.currentPage + 1)
                )
              })
              .map((page, index, array) => {
                // Add ellipsis if there's a gap
                const prevPage = array[index - 1]
                const showEllipsis = prevPage && page - prevPage > 1

                return (
                  <div key={page} className="flex items-center gap-1">
                    {showEllipsis && <span className="px-2 text-muted-foreground">...</span>}
                    <Button
                      variant={page === meta.currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      disabled={isPending}
                      className="w-9"
                    >
                      {page}
                    </Button>
                  </div>
                )
              })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(meta.currentPage + 1)}
            disabled={meta.currentPage === meta.totalPages || isPending}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
