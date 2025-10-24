"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Service } from "../_types/services-types"
import { ServicePopover } from "./ServicePopover"
import { ServiceDrawer } from "./ServiceDrawer"

interface ServiceTableProps {
  services: Service[]
}

export function ServiceTable({ services }: ServiceTableProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined)

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setIsDrawerOpen(true)
  }

  const handleCreate = () => {
    setSelectedService(undefined)
    setIsDrawerOpen(true)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Service Management</h2>
            <p className="text-muted-foreground">Manage all your services in one place</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No services found. Create your first service to get started.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>
                      <Badge variant={service.featured === "true" ? "default" : "secondary"}>
                        {service.featured === "true" ? "Featured" : "Standard"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(service.createdAt)}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(service.updatedAt)}</TableCell>
                    <TableCell>
                      <ServicePopover service={service} onEdit={handleEdit} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ServiceDrawer service={selectedService} open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  )
}
