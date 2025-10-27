
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface UploadWidgetProps {
  multiple?: boolean
  onUpload: (files: UploadedFileInfo[]) => void
  trigger?: ReactNode | ((open: () => void) => ReactNode)
}

export interface UploadedFileInfo {
  fileName: string
  url: string
  mimeType: string
  fileSize: number
  metadata: any
}

export default function UploadWidget({ multiple = false, onUpload, trigger }: UploadWidgetProps) {
  const widgetRef = useRef<any>(null)
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)

  useEffect(() => {
    const loadCloudinaryScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window !== 'undefined' && (window as any).cloudinary) {
          resolve()
          return
        }

        if (document.querySelector('script[src*="upload-widget.cloudinary.com"]')) {
          const checkLoaded = setInterval(() => {
            if ((window as any).cloudinary) {
              clearInterval(checkLoaded)
              resolve()
            }
          }, 100)
          setTimeout(() => {
            clearInterval(checkLoaded)
            reject(new Error('Script loading timeout'))
          }, 10000)
          return
        }

        const script = document.createElement('script')
        script.src = 'https://upload-widget.cloudinary.com/global/all.js'
        script.async = true
        script.onload = () => {
          setTimeout(() => {
            if ((window as any).cloudinary) {
              resolve()
            } else {
              reject(new Error('Cloudinary not available after script load'))
            }
          }, 100)
        }
        script.onerror = () => reject(new Error('Failed to load Cloudinary script'))
        document.head.appendChild(script)
      })
    }

    const initWidget = async () => {
      try {
        await loadCloudinaryScript()

        widgetRef.current = (window as any).cloudinary.createUploadWidget(
          {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
            folder: "my_portfolio_files",
            multiple,
            sources: ["local", "url", "camera"],
            maxFileSize: 10 * 1024 * 1024,
            cropping: false,
          },
          (error: any, result: { event: string; info: any }) => {
            if (error) {
              console.error("Upload error:", error)
              toast.error("Failed to upload file.")
              setIsWidgetOpen(false)
              return
            }

            if (result?.event === "show") {
              setIsWidgetOpen(true)
            } else if (result?.event === "close" || result?.event === "success") {
              setIsWidgetOpen(false)

              if (result.event === "success") {
                const info = result.info
                const fileData: UploadedFileInfo = {
                  fileName: info.original_filename || "file",
                  url: info.secure_url,
                  mimeType: info.format,
                  fileSize: info.bytes,
                  metadata: info,
                }

                onUpload([fileData])
                toast.success(`Uploaded: ${fileData.fileName}`)
              }
            }
          },
        )
      } catch (err) {
        console.error("Error initializing widget:", err)
        toast.error("Failed to initialize upload widget.")
      }
    }

    initWidget()

    const handleGlobalClick = (e: MouseEvent) => {
      if (isWidgetOpen) {
        const target = e.target as Element
        // More specific check for cloudinary widget elements
        if (!target.closest(".cloudinary-widget") && !target.closest("[data-cloudinary]")) {
          // Only prevent propagation for non-dialog elements
          if (!target.closest("[role='dialog']") && !target.closest("[data-radix-dialog-content]")) {
            e.stopPropagation()
            e.preventDefault()
          }
        }
      }
    }

    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if (isWidgetOpen && e.key === "Escape") {
        // Don't prevent escape from closing dialogs
        const target = e.target as Element
        if (!target.closest("[role='dialog']")) {
          e.stopPropagation()
        }
      }
    }

    // Use capture phase but with less aggressive prevention
    document.addEventListener("click", handleGlobalClick, { capture: true, passive: false })
    document.addEventListener("keydown", handleGlobalKeydown, { capture: true, passive: false })

    return () => {
      document.removeEventListener("click", handleGlobalClick, true)
      document.removeEventListener("keydown", handleGlobalKeydown, true)
    }
  }, [multiple, onUpload, isWidgetOpen])

  const openWidget = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }

    if (widgetRef.current) {
      widgetRef.current.open()
    }
  }

  // Handle different types of triggers
  if (trigger) {
    if (typeof trigger === "function") {
      return <>{trigger(() => openWidget())}</>
    } else {
      return (
        <div
          onClick={openWidget}
          onMouseDown={(e) => e.stopPropagation()}
          className="inline-block"
          data-upload-trigger="true"
        >
          {trigger}
        </div>
      )
    }
  }

  return (
    <button
      onClick={openWidget}
      onMouseDown={(e) => e.stopPropagation()}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      data-upload-trigger="true"
    >
      {multiple ? "Upload Files" : "Upload File"}
    </button>
  )
}
