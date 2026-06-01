const multer = require("multer");
const { errorResponse } = require("../utils/responseHelper");

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_TYPES = new Set([
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  // Documents
  "application/pdf",
  // Video
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      const err = new Error(
        "Invalid file type. Allowed: images (jpg/png/webp/gif), PDF, and videos (mp4/webm/mov).",
      );
      err.statusCode = 400;
      return cb(err);
    }
    return cb(null, true);
  },
});

/**
 * Single file upload middleware (field name: "file")
 * Handles multer errors and returns consistent API responses.
 */
const uploadSingleFile = (req, res, next) => {
  const handler = upload.single("file");

  handler(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json(errorResponse("File too large. Max size is 10MB."));
      }
      return res
        .status(400)
        .json(errorResponse(`Upload error: ${err.message}`));
    }

    const statusCode = err.statusCode || 400;
    return res
      .status(statusCode)
      .json(errorResponse(err.message || "Upload failed."));
  });
};

module.exports = {
  uploadSingleFile,
  MAX_FILE_SIZE_BYTES,
  ALLOWED_MIME_TYPES,
};
