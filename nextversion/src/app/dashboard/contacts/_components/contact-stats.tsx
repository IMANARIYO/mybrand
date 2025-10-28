"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Mail, MessageSquare, CheckCircle, Archive } from "lucide-react"

interface ContactStatsProps {
  stats: {
    total: number
    new: number
    read: number
    replied: number
    archived: number
  }
}

export function ContactStats({ stats }: ContactStatsProps) {
  const statCards = [
    {
      title: "Total Contacts",
      value: stats.total,
      icon: Mail,
      color: "bg-blue-500",
    },
    {
      title: "New Messages",
      value: stats.new,
      icon: MessageSquare,
      color: "bg-green-500",
    },
    {
      title: "Read",
      value: stats.read,
      icon: CheckCircle,
      color: "bg-yellow-500",
    },
    {
      title: "Replied",
      value: stats.replied,
      icon: CheckCircle,
      color: "bg-purple-500",
    },
    {
      title: "Archived",
      value: stats.archived,
      icon: Archive,
      color: "bg-gray-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-md ${stat.color}`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}