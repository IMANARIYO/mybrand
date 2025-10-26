// Reusable service types and enums

// Service Benefit Interface
export interface ServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

// Service Process Interface
export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

// Service Action Interface
export interface ServiceAction {
  label: string;
  actionType: "link" | "modal" | "scroll" | "form";
  target?: string;
}

// Service Status Enum Values
export const SERVICE_STATUS_VALUES = [
  "featured",
  "new", 
  "completed",
  "in-progress",
  "available",
] as const;

export type ServiceStatus = typeof SERVICE_STATUS_VALUES[number];

// Service Request Status Enum Values
export const SERVICE_REQUEST_STATUS_VALUES = [
  "pending",
  "in-progress", 
  "completed",
  "cancelled",
] as const;

export type ServiceRequestStatus = typeof SERVICE_REQUEST_STATUS_VALUES[number];