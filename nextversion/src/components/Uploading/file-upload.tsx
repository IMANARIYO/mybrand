"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { UploadIcon as IconUpload, Loader2 } from "lucide-react";
import { toast } from "sonner";

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (
    files: File[],
    cloudinaryResults?: CloudinaryUploadResult[]
  ) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [cloudinaryResults, setCloudinaryResults] = useState<
    CloudinaryUploadResult[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      if (CLOUDINARY_UPLOAD_PRESET) {
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      } else {
        throw new Error("CLOUDINARY_UPLOAD_PRESET is not defined");
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result = await response.json();

      setCloudinaryResults((prev) => [...prev, result]);

      if (onChange) {
        onChange([...files, file], [...cloudinaryResults, result]);
      }

      return result;
    } catch {
      toast("Upload failed", {
        description: `Failed to upload ${file.name} to Cloudinary.`,
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (newFiles: File[]) => {
    const tempFiles = [...files];
    const successfulUploads = [];

    for (const file of newFiles) {
      const result = await uploadFile(file);

      if (result) {
        tempFiles.push(file);
        successfulUploads.push(file);
      }
    }

    setFiles(tempFiles);

    const failedCount = newFiles.length - successfulUploads.length;
    if (failedCount > 0) {
      toast("Upload Summary", {
        description: `${successfulUploads.length} files uploaded successfully. ${failedCount} files failed.`,
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className={cn(
          "p-10 group/file block rounded-lg w-full relative overflow-hidden",
          isUploading ? "cursor-wait opacity-70" : "cursor-pointer"
        )}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
          disabled={isUploading}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            {isUploading
              ? "Uploading files..."
              : "Drag or drop your files here or click to upload"}
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => {
                const cloudinaryResult = cloudinaryResults[idx];
                return (
                  <div
                    key={"file" + idx}
                    className={cn(
                      "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                      "shadow-sm"
                    )}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                        {file.name}
                      </p>
                      <p className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                      <p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800">
                        {file.type}
                      </p>

                      {cloudinaryResult ? (
                        <a
                          href={cloudinaryResult.secure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View on Cloudinary
                        </a>
                      ) : (
                        <p>
                          modified{" "}
                          {new Date(file.lastModified).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            {!files.length && !isUploading && (
              <div
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
              </div>
            )}

            {isUploading && (
              <div className="flex items-center justify-center h-32 mt-4">
                <Loader2 className="h-6 w-6 animate-spin text-neutral-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridPattern = () => {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 bg-gray-50 dark:bg-neutral-950 ${index % 2 === 0 ? "bg-gray-50 dark:bg-neutral-950" : "bg-transparent"} `}
            />
          );
        })
      )}
    </div>
  );
};