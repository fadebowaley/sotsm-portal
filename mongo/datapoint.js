const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

const DataPointSchema = new mongoose.Schema(
  {
    // Identifier to associate the datapoint with a specific tenant.
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    // The name of the datapoint (e.g., "men", "youth", "weather").
    name: {
      type: String,
      required: true,
    },
    // A brief description of what this datapoint represents.
    description: {
      type: String,
    },
    // The expected data type for this datapoint's value.
    // This can help in validating and formatting the captured data.
    dataType: {
      type: String,
      required: true,
      enum: ["Number", "String", "Boolean", "Date", "Object"],
      default: "Number",
    },
    // Indicates whether capturing this datapoint is required.
    isRequired: {
      type: Boolean,
      default: false,
    },
    // A default value that can be used if no value is provided.
    defaultValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = conn.model("DataPoint", DataPointSchema);
