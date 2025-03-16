// models/ChurchStructure.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChurchStructureSchema = new Schema(
  {
    // Identifier for the main church tenant
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    // Name of this structure (e.g., "West Region", "Central Province", "St. Mary's Parish")
    name: {
      type: String,
      required: true,
    },
    // Reference to the type/level of this structure (e.g., national, region, province, etc.)
    level: {
      type: Schema.Types.ObjectId,
      ref: "ChurchLevel",
      required: true,
    },
    // Parent structure reference. If null, this is the root structure for the tenant.
    parent: {
      type: Schema.Types.ObjectId,
      ref: "ChurchStructure",
      default: null,
    },
    // Materialized path representing the full hierarchy for quick subtree retrieval.
    // Example: "60abc123/60def456/60ghi789"
    path: {
      type: String,
      default: "",
    },
    // Optional additional fields
    description: { type: String },
    address: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Pre-save hook to compute the materialized path.
// If there's a parent, the path is the parent's path appended with this document's id.
ChurchStructureSchema.pre("save", async function (next) {
  try {
    if (this.parent) {
      const parentDoc = await this.constructor.findById(this.parent);
      this.path = parentDoc.path
        ? `${parentDoc.path}/${this._id}`
        : `${this.parent}/${this._id}`;
    } else {
      // No parent: this structure is the root for its tenant.
      this.path = `${this._id}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("ChurchStructure", ChurchStructureSchema);
