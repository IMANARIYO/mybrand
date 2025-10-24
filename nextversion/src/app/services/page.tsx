import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ServiceCard } from "./_components/ServiceCard"
import { ServiceTable } from "./_components/ServiceTable"
import { getServices } from "./_server-actions/services-server-actions"
import type { Service } from "./_types/services-types"
import { LayoutGrid, Table } from "lucide-react"

async function ServicesContent() {
  const result = await getServices(1, 100)
  const services = result.data || []

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">My Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the professional services I offer to help bring your ideas to life with modern technology and best
          practices.
        </p>
      </div>

      {/* Tabs for Card View and Table View */}
      <Tabs defaultValue="cards" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="cards" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Card View
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2">
              <Table className="h-4 w-4" />
              Table View
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Card View */}
        <TabsContent value="cards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: Service) => (
              <ServiceCard key={service.id} service={service} isAdmin={true} />
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services available at the moment.</p>
            </div>
          )}
        </TabsContent>

        {/* Table View (Admin) */}
        <TabsContent value="table" className="mt-6">
          <ServiceTable services={services} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ServicesLoading() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 text-center">
        <Skeleton className="h-10 w-64 mx-auto mb-3" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesLoading />}>
      <ServicesContent />
    </Suspense>
  )
}
