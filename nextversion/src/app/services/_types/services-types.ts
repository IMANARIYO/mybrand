import type { Service, NewService, ServiceRequest, NewServiceRequest } from "@/db/schema";

// Re-export schema types
export type { Service, NewService, ServiceRequest, NewServiceRequest };

import type { ServiceBenefit, ServiceProcess, ServiceAction } from "@/db/schema";

// Form data interface for creating/updating services
export interface ServiceFormData {
  title: string
  tagline: string
  description: string
  imageUrl?: string
  icon: string
  category: string
  pricing: string
  duration: string
  featured: string
  status?: string
  isPublic: boolean
  skills: string[]
  benefits: ServiceBenefit[]
  process: ServiceProcess[]
  actions: ServiceAction[]
}

export interface ServiceRequestWithService extends ServiceRequest {
  serviceName: string
}

export interface ServiceRequestFormData {
  serviceId: string
  name: string
  email: string
  phone: string
  message?: string
}

export interface ServiceRequestStats {
  totalRequests: number
  pendingRequests: number
  inProgressRequests: number
  completedRequests: number
  requestsByService: { serviceId: string; serviceName: string; count: number }[]
}

export interface ServiceFilters {
  category?: string
  featured?: string
  search?: string
}

export interface ServiceRequestFilters {
  status?: ServiceRequest["status"]
  serviceId?: string
  search?: string
}
