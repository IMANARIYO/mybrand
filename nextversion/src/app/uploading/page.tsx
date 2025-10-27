"use client"

import { useState } from "react"
import UploadWidget, { type UploadedFileInfo } from "@/components/Uploading/UploadWidget"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

export default function UploadingTestPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([])

  const handleUpload = (files: UploadedFileInfo[]) => {
    console.log("Uploaded files:", files)
    setUploadedFiles(prev => [...prev, ...files])
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Upload Widget Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test with default button */}
          <div>
            <h3 className="font-semibold mb-2">Default Button:</h3>
            <UploadWidget
              multiple={true}
              onUpload={handleUpload}
            />
          </div>

          {/* Test with custom trigger */}
          <div>
            <h3 className="font-semibold mb-2">Custom Trigger:</h3>
            <UploadWidget
              multiple={false}
              onUpload={handleUpload}
              trigger={
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Custom Upload Button
                </Button>
              }
            />
          </div>

          {/* Display uploaded files */}
          {uploadedFiles.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Uploaded Files:</h3>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p><strong>Name:</strong> {file.fileName}</p>
                    <p><strong>URL:</strong> <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{file.url}</a></p>
                    <p><strong>Size:</strong> {(file.fileSize / 1024).toFixed(2)} KB</p>
                    <p><strong>Type:</strong> {file.mimeType}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}