import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Developer Portfolio",
  description: "Explore my professional services and offerings",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
