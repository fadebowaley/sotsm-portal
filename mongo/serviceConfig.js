const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

const serviceConfigSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    }, // e.g., Regular Service, Weekly Service, Special Service
    description: {
      type: String,
    },
    // Array of references to DataPoint documents defining which datapoints to capture.
    dataPoints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DataPoint",
      },
    ],
  },
  { timestamps: true }
);



module.exports = conn.model("ServiceForms", serviceConfigSchema);
