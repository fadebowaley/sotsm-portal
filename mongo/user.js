// Import necessary modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { conn } = require("../config/dbb");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // User identification
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    tenantId: {
      type: String,
      index: true,
    },
    // User roles
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }], // Owner

    // Explicit flag to indicate if the user is the owner.
    isOwner: { type: Boolean, default: false },
    isSuper: { type: Boolean, default: false },

    // Personal information
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    emailVerificationToken: String,
    emailVerificationTokenExpiresAt: Date,

    // Security information
    password: { type: String, required: true, minlength: 6 },
    fingerprint: { type: String }, // Fingerprint data
    biometricData: { type: Object }, // Biometric data (can be an object to hold various types of biometric information)
  },

  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Ensure userId is generated for every new user
  if (
    !this.isOwner &&
    !this.isSuper &&
    (!this.tenantId || this.tenantId.length === 0)
  ) {
    return next(new Error("Non-owner users must have at least one tenantId."));
  }
  next();
});

// Method to check if password is valid
userSchema.methods.validPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Export the User model
module.exports = conn.model("User", userSchema);
