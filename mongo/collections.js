const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

// Offering Schema: Stores offerings and assigned parameters
const CollectionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true }, // User-input amount
    assignedParameters: [
      {
        parameter: { type: mongoose.Schema.Types.ObjectId, ref: "Parameter" },
        computedValue: { type: Number }, // Store computed value after applying logic
      },
    ],
    finalValue: { type: Number }, // Stores the final computed offering value
    isCompulsory: { type: Boolean, required: true }, // Indicates if the offering is compulsory or optional
  },
  { timestamps: true }
);

module.exports = conn.model("Collections", CollectionSchema);
