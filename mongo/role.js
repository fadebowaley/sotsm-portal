const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

const roleSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    name: { type: String, required: true, unique: true }, // Role name
    description: { type: String, required: false }, // Optional description of the role
    usercreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user who created the role
  },
  { timestamps: true }
);

module.exports = conn.model("Role", roleSchema);

// This module defines the schema for the Role model in the MongoDB database using Mongoose.
// It includes fields for the role name, an optional description, and a reference to the user who created the role.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema.
// Examples:
// 1. Creating a new role: 
//    const newRole = new Role({ name: "Admin", description: "Administrator role", usercreated: userId });
// 2. Finding a role by name: 
//    const role = await Role.findOne({ name: "Admin" });
