const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

const userProfileSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    // Personal data fields
    title: { type: String, required: true },
    otherName: { type: String, required: false },
    phoneNumber: { type: String, match: /^[0-9]+$/, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    highestQualification: { type: String, required: true },
    professional: { type: String, required: true },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
    stateOfOrigin: { type: String, required: true },
    lgaOfOrigin: { type: String, required: true },
    homeTown: { type: String, required: true },
    spouseName: { type: String, required: false },
    spousePhoneNumber: { type: String, required: false },
    spouseDateOfBirth: { type: Date, required: false },
    nextOfKinName: { type: String, required: true },
    nextOfKinPhoneNumber: { type: String, required: true },
    nextOfKinRelationship: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    stateOfResidence: { type: String, required: true },
    lgaOfResidence: { type: String, required: true },
    employmentCategory: { type: String, required: true },
    occupation: { type: String, required: true },
    employeeId: { type: String, required: false },

    // Relationships
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

