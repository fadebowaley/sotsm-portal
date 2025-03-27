const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const nodeLevelSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
  },
  //write a profile  cqtegorizing into education,
  //  personal profile, ministry resume,
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

// add plugin that converts mongoose to json
nodeLevelSchema.plugin(toJSON);
nodeLevelSchema.plugin(paginate);

/**
 * @typedef NodeLevel
 */
const NodeLevel = mongoose.model('NodeLevel', nodeLevelSchema);
module.exports = NodeLevel;
// Create a partial unique index on rank for non-special levels
ChurchLevelSchema.index(
  { rank: 1 },
  { unique: true, partialFilterExpression: { isSpecial: { $ne: true } } }
);

module.exports = mongoose.model("ChurchLevel", ChurchLevelSchema);
