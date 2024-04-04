const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const churchSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "parish",
      "area",
      "zone",
      "diocese",
      "region",
      "Others",
    ],
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },

  
});




module.exports = conn.model("Church", churchSchema);
