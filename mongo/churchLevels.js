// models/ChurchLevel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChurchLevelSchema = new Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    // Level name (e.g., "national", "region", "province", etc.)
    name: { type: String, required: true, unique: true, trim: true },
    // Description for additional context
    description: { type: String, default: "" },
    // Rank: Lower numbers indicate higher levels in the hierarchy
    rank: { type: Number, required: true },
    // isSpecial flag: If true, this level is considered 'special' and duplicate rank values are allowed
    isSpecial: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create a partial unique index on rank for non-special levels
ChurchLevelSchema.index(
  { rank: 1 },
  { unique: true, partialFilterExpression: { isSpecial: { $ne: true } } }
);

module.exports = mongoose.model("ChurchLevel", ChurchLevelSchema);
