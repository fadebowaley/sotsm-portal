const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

// Subdocument schema for a captured datapoint
const CapturedDataPointSchema = new Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    // Reference to the DataPoint definition (e.g., "men", "youth", "weather", etc.)
    dataPoint: {
      type: Schema.Types.ObjectId,
      ref: "DataPoint",
      required: true,
    },
    // The actual value captured for this datapoint
    value: { type: Schema.Types.Mixed },
  },
  { _id: false } // We don't need a separate _id for each subdocument.
);

const ServiceDataSchema = new Schema(
  {
    // Tenant identifier for filtering in a multitenant app
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    // The configuration/template used for this service event
    service: {
      type: Schema.Types.ObjectId,
      ref: "ServiceForms",
      required: true,
    },
    // Date when the service took place
    serviceDate: {
      type: Date,
      required: true,
    },
    // Array of captured datapoints for this service event
    dataPoints: [CapturedDataPointSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceData", ServiceDataSchema);
