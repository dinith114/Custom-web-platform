const Media = require("./media.model");
const config = require("../../config");
const cloudinary = require("../../utils/cloudinary");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const uploadBufferToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });

    stream.end(buffer);
  });
};

/**
 * POST /api/sites/:siteId/media/upload
 * Multipart form-data: file (required)
 */
const uploadMedia = async (req, res) => {
  const { siteId } = req.params;

  if (!req.file) {
    return res
      .status(400)
      .json(errorResponse("No file uploaded. Expected form field: file"));
  }

  const { cloudName, apiKey, apiSecret } = config.cloudinary;
  if (!cloudName || !apiKey || !apiSecret) {
    return res
      .status(500)
      .json(
        errorResponse(
          "Cloudinary is not configured. Set CLOUDINARY_* env vars.",
        ),
      );
  }

  const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
    folder: `custom-web-platform/sites/${siteId}`,
    resource_type: "auto",
  });

  const media = await Media.create({
    siteId,
    uploadedBy: req.user.id,
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
    fileUrl: uploadResult.secure_url,
    storageKey: uploadResult.public_id,
    uploadedAt: new Date(),
  });

  res.status(201).json(successResponse(media, "File uploaded successfully."));
};

module.exports = { uploadMedia };
