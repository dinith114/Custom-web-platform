const mongoose = require('mongoose');

const siteMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: [true, 'Site is required'],
      index: true,
    },
    role: {
      type: String,
      enum: ['owner', 'editor', 'viewer'],
      required: [true, 'Role is required'],
    },
    invitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// A user can only have one membership per site
siteMemberSchema.index({ siteId: 1, userId: 1 }, { unique: true });

// Remove internal fields from JSON output
siteMemberSchema.methods.toJSON = function () {
  const member = this.toObject();
  delete member.__v;
  return member;
};

module.exports = mongoose.model('SiteMember', siteMemberSchema);
