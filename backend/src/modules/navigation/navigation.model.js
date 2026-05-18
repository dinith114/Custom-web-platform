const mongoose = require('mongoose');

const navigationItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', default: null },
    url: { type: String, default: null },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    children: { type: Array, default: [] },
  },
  { _id: false }
);

const navigationSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
      unique: true,
    },
    items: [navigationItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Navigation', navigationSchema);
