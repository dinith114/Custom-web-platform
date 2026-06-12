// Constants — API base URL, file size limits, block types
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Website Builder";
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
export const ALLOWED_DOC_TYPES = ["application/pdf"];
export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
