export type Meta = {
  currentPage: number
  limit: number
  totalItems: number
  totalPages: number
}

export type AppResponse<T = unknown> = {
  success: boolean
  data?: T
  meta?: Meta
  error?: { message: string; code?: string }
}

export const AppResponse = {
  success<T>(payload: T, meta?: Meta): AppResponse<T> {
    return { success: true, data: payload, meta }
  },
  error(message: string, code?: string): AppResponse {
    return { success: false, error: { message, code } }
  },
}
