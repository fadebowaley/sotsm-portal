const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

const ChurchSchema = new mongoose.Schema(
  {
    // Basic Church Information
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: "ChurchLevel",
      required: true,
    },
    parent: { type: Schema.Types.ObjectId, ref: "Church" },
    isMain: { type: Boolean, default: true },
    isOwner: { type: Boolean, default: false },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String },
    dateOfEstablishment: { type: Date },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);


// Pre-save hook to enforce parent-child relationship
ChurchSchema.pre('save', async function (next) {
  // If level is greater than 0, a parent is required
  if (this.level > 0) {
    if (!this.parent) {
      return next(new Error(`A parent church (level ${this.level - 1}) is required for a church at level ${this.level}.`));
    }
    try {
      const parentChurch = await this.constructor.findById(this.parent);
      if (!parentChurch) {
        return next(new Error('Parent church does not exist.'));
      }
      if (parentChurch.level !== this.level - 1) {
        return next(new Error(`The parent church must be at level ${this.level - 1}, but the provided parent is at level ${parentChurch.level}.`));
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = conn.model("Church", ChurchSchema);
