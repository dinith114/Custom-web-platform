const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: [true, "Site is required"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Page title is required"],
      trim: true,
      maxlength: [200, "Page title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Page slug is required"],
      trim: true,
      lowercase: true,
      maxlength: [200, "Page slug cannot exceed 200 characters"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    isHomePage: {
      type: Boolean,
      default: false,
    },
    draftContent: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    publishedContent: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [200, "SEO title cannot exceed 200 characters"],
      default: null,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [500, "SEO description cannot exceed 500 characters"],
      default: null,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Uniqueness is scoped per site: multiple sites can have the same page slug.
pageSchema.index({ siteId: 1, slug: 1 }, { unique: true });

// Remove internal fields from JSON output.
pageSchema.methods.toJSON = function () {
  const page = this.toObject();
  delete page.__v;
  return page;
};

module.exports = mongoose.model("Page", pageSchema);
