"use client"

import { useState, useTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Eye } from "lucide-react"
import { updateContactStatus, deleteContact } from "@/app/contact/_server-actions/contact-server-actions"
import { toast } from "sonner"

interface Contact {
  id: string
  name: string
  email: string
  telephone: string | null
  subject: string
  message: string
  inquiryType: string
  createdAt: Date
  status: "new" | "read" | "replied" | "archived"
}

interface ContactsTableProps {
  contacts: Contact[]
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [isPending, startTransition] = useTransition()
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const handleStatusChange = (contactId: string, newStatus: "new" | "read" | "replied" | "archived") => {
    startTransition(async () => {
      const result = await updateContactStatus(contactId, newStatus)
      if (result.success) {
        toast.success("Status updated successfully")
      } else {
        toast.error("Failed to update status")
      }
    })
  }

  const handleDelete = (contactId: string) => {
    startTransition(async () => {
      const result = await deleteContact(contactId)
      if (result.success) {
        toast.success("Contact deleted successfully")
      } else {
        toast.error("Failed to delete contact")
      }
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      new: "bg-green-100 text-green-800",
      read: "bg-yellow-100 text-yellow-800",
      replied: "bg-blue-100 text-blue-800",
      archived: "bg-gray-100 text-gray-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  return (
    <div className="space-y-4">
      {contacts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No contacts found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{contact.email} • {contact.telephone || 'No phone'}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(contact.status)}
                    <Badge variant="outline">{contact.inquiryType}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{contact.subject}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {contact.message.length > 150
                        ? `${contact.message.substring(0, 150)}...`
                        : contact.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {contact.createdAt.toLocaleDateString()} at {contact.createdAt.toLocaleTimeString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <Select
                        value={contact.status}
                        onValueChange={(value) => handleStatusChange(contact.id, value as "new" | "read" | "replied" | "archived")}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
                        disabled={isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  )
}

function ContactDetailModal({ contact, onClose }: { contact: Contact; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{contact.name}</CardTitle>
              <CardDescription>{contact.email} • {contact.telephone || 'No phone'}</CardDescription>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Subject</h4>
            <p>{contact.subject}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Message</h4>
            <p className="whitespace-pre-wrap">{contact.message}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Type: {contact.inquiryType}</span>
            <span>Status: {contact.status}</span>
            <span>Received: {contact.createdAt.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}