const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: [true, "Site is required"],
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Uploader is required"],
      index: true,
    },
    fileName: {
      type: String,
      required: [true, "File name is required"],
      trim: true,
      maxlength: [255, "File name cannot exceed 255 characters"],
    },
    fileType: {
      type: String,
      required: [true, "File type is required"],
      trim: true,
      maxlength: [100, "File type cannot exceed 100 characters"],
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"],
      min: [1, "File size must be greater than 0"],
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
    },
    storageKey: {
      type: String,
      required: [true, "Storage key is required"],
      trim: true,
    },
    resourceType: {
      type: String,
      required: [true, "Resource type is required"],
      trim: true,
      default: "image",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

mediaSchema.index({ siteId: 1, uploadedAt: -1 });

module.exports = mongoose.model("Media", mediaSchema);
