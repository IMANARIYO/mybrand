"use client";

import { useState, useEffect } from "react";
import type { ControllerRenderProps } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, File } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "./file-upload";

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
};

interface DocumentFile {
  url: string;
  name: string;
}
interface FileUploadDemoProps {
  field?: ControllerRenderProps<
    {
      documents: {
        url: string;
        name: string;
      }[];
      name: string;
      type: string;
      uuid: string;
      fullDescription: string;
      shortDescription: string;
      status: string;
      priorityUuid: string;
      startDate: Date;
      dueDate: Date;
    },
    "documents"
  >;
  onChange?: (documents: DocumentFile[]) => void;
}

export function FileUploadDemo({
  field,
  onChange,
}: FileUploadDemoProps) {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [showUploader, setShowUploader] = useState(true);
  const [currentDocument, setCurrentDocument] = useState<{
    url: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (field?.value && documents.length === 0) {
      try {
        if (
          typeof field.value === "string" &&
          (field.value as string).startsWith("[")
        ) {
          const parsedDocs = JSON.parse(field.value);
          if (Array.isArray(parsedDocs)) {
            setDocuments(
              parsedDocs.map((doc) =>
                typeof doc === "object" && doc.url && doc.name
                  ? doc
                  : {
                    url: typeof doc === "string" ? doc : "",
                    name: "Unnamed Document",
                  }
              )
            );
          }
        } else if (typeof field.value === "string") {
          setDocuments([{ url: field.value, name: "Unnamed Document" }]);
        }
      } catch { }
    }
  }, [field?.value, documents.length]);

  const handleFileUpload = (
    files: File[],
    cloudinaryResults?: CloudinaryUploadResult[]
  ) => {
    if (cloudinaryResults && cloudinaryResults.length > 0) {
      const newUrl = cloudinaryResults[0].secure_url;
      setCurrentDocument({
        url: newUrl,
        name: files[0].name || "Unnamed Document",
      });

      setShowUploader(false);
    } else {
      setCurrentDocument(null);
      toast.error("uploading files failed");
    }
  };

  const handleNameSubmit = () => {
    if (currentDocument) {
      const newDocuments = [...documents, currentDocument];
      setDocuments(newDocuments);

      if (field) {
        field.onChange(JSON.stringify(newDocuments));
      }

      if (onChange) {
        onChange(newDocuments);
      }

      setCurrentDocument(null);
      setShowUploader(true);
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);

    if (field) {
      field.onChange(newDocuments.length ? JSON.stringify(newDocuments) : "");
    }

    if (onChange) {
      onChange(newDocuments);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {documents.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="relative flex items-center p-3 bg-white dark:bg-gray-800 border rounded-lg shadow-sm group"
            >
              <File className="w-5 h-5 mr-2 text-blue-500" />
              <div className="max-w-[150px] truncate">{doc.name}</div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeDocument(index)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      {currentDocument && (
        <div className="mb-4 p-4 border border-dashed rounded-lg bg-white dark:bg-black">
          <h3 className="text-sm font-medium mb-2">Name your document</h3>
          <div className="flex gap-2">
            <Input
              value={currentDocument.name}
              onChange={(e) =>
                setCurrentDocument({ ...currentDocument, name: e.target.value })
              }
              placeholder="Enter document name"
              className="flex-1"
            />
            <Button onClick={handleNameSubmit}>Save</Button>
          </div>
        </div>
      )}

      {showUploader && (
        <div className="border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <FileUpload onChange={handleFileUpload} />
        </div>
      )}

      {field && (
        <input
          type="hidden"
          {...field}
          value={documents.length ? JSON.stringify(documents) : ""}
        />
      )}
    </div>
  );
}
