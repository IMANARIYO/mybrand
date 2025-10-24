"use client"

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ServiceForm } from "./ServiceForm"
import type { Service } from "../_types/services-types"

interface ServiceDrawerProps {
  service?: Service
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ServiceDrawer({ service, open, onOpenChange }: ServiceDrawerProps) {
  const handleSuccess = () => {
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-2xl overflow-y-auto p-6">
          <DrawerHeader className="px-0">
            <DrawerTitle>{service ? "Edit Service" : "Create New Service"}</DrawerTitle>
            <DrawerDescription>
              {service ? "Update the service details below." : "Fill in the details to create a new service."}
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-6">
            <ServiceForm service={service} onSuccess={handleSuccess} onCancel={handleCancel} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
