"use server";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
  format: string;
  created_at: string;
}

export async function uploadToCloudinary(
  formData: FormData
): Promise<CloudinaryUploadResult> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only images and PDFs are allowed.");
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert buffer to base64
    const base64Data = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64Data}`;

    // Upload to Cloudinary
    const uploadResult = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader.upload(
          dataURI,
          {
            folder: "uploads",
            resource_type: "auto", // Handle PDFs as raw files
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result as CloudinaryUploadResult);
          }
        );
      }
    );

    return uploadResult;
  } catch (error) {
    throw new Error("Failed to upload file to Cloudinary", { cause: error });
  }
}

// "use server";

// import { v2 as cloudinary } from "cloudinary";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export interface CloudinaryUploadResult {
//   public_id: string;
//   secure_url: string;
//   original_filename: string;
//   bytes: number;
//   format: string;
//   created_at: string;
// }

// export async function uploadToCloudinary(
//   formData: FormData
// ): Promise<CloudinaryUploadResult> {
//   try {
//     const file = formData.get("file") as File;

//     if (!file) {
//       throw new Error("No file provided");
//     }

//     // Validate file type
//     const allowedMimeTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "application/pdf",
//     ];
//     if (!allowedMimeTypes.includes(file.type)) {
//       throw new Error("Invalid file type. Only images and PDFs are allowed.");
//     }

//     // Upload directly to Cloudinary without converting to buffer/base64
//     const uploadResult = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream(
//             {
//               folder: "uploads",
//               resource_type: file.type === "application/pdf" ? "raw" : "auto", // Handle PDFs as raw files
//             },
//             (error, result) => {
//               if (error) {
//                 reject(error);
//                 return;
//               }
//               resolve(result as CloudinaryUploadResult);
//             }
//           )
//           .end(file); // Directly send the file stream
//       }
//     );

//     return uploadResult;
//   } catch (error) {
//
//     throw new Error("Failed to upload file to Cloudinary");
//   }
// }
