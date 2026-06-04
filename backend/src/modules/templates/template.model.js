const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Template name is required"],
      trim: true,
      maxlength: [150, "Template name cannot exceed 150 characters"],
    },
    thumbnail: {
      type: String,
      default: null,
      trim: true,
    },
    category: {
      type: String,
      enum: ["business", "portfolio", "ecommerce", "blog", "landing"],
      required: [true, "Template category is required"],
      index: true,
    },
    defaultPages: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    defaultNavigation: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

templateSchema.index({ isActive: 1, category: 1 });

templateSchema.methods.toJSON = function () {
  const template = this.toObject();
  delete template.__v;
  return template;
};

module.exports = mongoose.model("Template", templateSchema);
