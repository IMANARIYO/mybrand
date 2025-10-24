"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Copy, MoreVertical, Pencil, Trash2 } from "lucide-react"
import type { Service } from "../_types/services-types"
import { deleteService, duplicateService } from "../_server-actions/services-server-actions"
import { toast } from "sonner"

interface ServicePopoverProps {
  service: Service
  onEdit: (service: Service) => void
}

export function ServicePopover({ service, onEdit }: ServicePopoverProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = () => {
    onEdit(service)
    setOpen(false)
  }

  const handleDuplicate = async () => {
    setIsLoading(true)
    const result = await duplicateService(service.id)

    if (result.status === "success") {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
    setOpen(false)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service?")) return

    setIsLoading(true)
    const result = await deleteService(service.id)

    if (result.status === "success") {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-2">
        <div className="flex flex-col gap-1">
          <Button variant="ghost" size="sm" className="justify-start" onClick={handleEdit} disabled={isLoading}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="justify-start" onClick={handleDuplicate} disabled={isLoading}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
