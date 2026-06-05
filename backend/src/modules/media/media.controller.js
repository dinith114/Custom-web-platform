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
 * GET /api/sites/:siteId/media
 * Returns all media items for the site, newest first.
 */
const listMedia = async (req, res) => {
  const { siteId } = req.params;

  const mediaItems = await Media.find({ siteId }).sort({ uploadedAt: -1 });

  res.json(successResponse(mediaItems, "Media retrieved successfully."));
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
    resourceType: uploadResult.resource_type || "image",
    uploadedAt: new Date(),
  });

  res.status(201).json(successResponse(media, "File uploaded successfully."));
};

/**
 * DELETE /api/sites/:siteId/media/:mediaId
 * Deletes the media record and removes the file from Cloudinary when possible.
 */
const deleteMedia = async (req, res) => {
  const { siteId, mediaId } = req.params;

  const media = await Media.findOne({ _id: mediaId, siteId });
  if (!media) {
    return res.status(404).json(errorResponse("Media not found."));
  }

  if (media.storageKey) {
    try {
      const deleteResult = await cloudinary.uploader.destroy(media.storageKey, {
        resource_type: media.resourceType || "image",
      });

      if (
        deleteResult?.result !== "ok" &&
        deleteResult?.result !== "not found"
      ) {
        return res
          .status(502)
          .json(errorResponse("Cloudinary file deletion failed."));
      }
    } catch (error) {
      return res
        .status(502)
        .json(errorResponse("Cloudinary file deletion failed."));
    }
  }

  await Media.findByIdAndDelete(mediaId);

  res.json(successResponse(null, "Media deleted successfully."));
};

module.exports = { listMedia, uploadMedia, deleteMedia };
