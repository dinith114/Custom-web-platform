// MediaFile — represents an uploaded file's metadata

export type MediaType = "image" | "video" | "document" | "other";

export interface MediaFile {
  _id: string;
  siteId: string;
  uploadedBy: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  storageKey: string;
  uploadedAt: string;
}

export interface UploadMediaPayload {
  file: File;
  siteId: string;
}

export interface UploadResponse {
  media: MediaFile;
}
