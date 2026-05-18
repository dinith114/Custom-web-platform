const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    name: {
      type: String,
      required: [true, 'Site name is required'],
      trim: true,
      maxlength: [150, 'Site name cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    subdomain: {
      type: String,
      unique: true,
      sparse: true, // allows multiple nulls
    },
    customDomain: {
      type: String,
      default: null,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      default: null,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for ownerId (not auto-created since it's not unique)
siteSchema.index({ ownerId: 1 });

module.exports = mongoose.model('Site', siteSchema);
