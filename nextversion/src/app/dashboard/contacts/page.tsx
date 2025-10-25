import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactsTable } from "./_components/contacts-table"
import { ContactStats } from "./_components/contact-stats"
import { getContacts, getContactStats } from "@/app/contact/_server-actions/contact-server-actions"

export default async function ContactsPage() {
  const [contacts, stats] = await Promise.all([
    getContacts(),
    getContactStats()
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Management</h1>
        <p className="text-muted-foreground">
          Manage and respond to customer inquiries
        </p>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <ContactStats stats={stats} />
      </Suspense>

      <Card>
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
          <CardDescription>
            View and manage all contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading contacts...</div>}>
            <ContactsTable contacts={contacts} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}