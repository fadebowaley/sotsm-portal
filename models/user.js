const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");
const saltRounds = 10;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: false,
  },
  title: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  role: {
    type: String,
    enum: ["employee", "parishPastor", "admin", "superUser"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationTokenExpiresAt: {
    type: Date,
  },
  emailVerifiedAt: {
    type: Date,
  },
  resetPasswordExpires: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    default: function () {
      return `${this.firstname.toLowerCase()}${this.lastname.toLowerCase()}${Math.floor(
        Math.random() * 10000
      )}`;
    },
  },
  church: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
    },
  ],
});


// Pre-save hook to hash the password before saving
// Pre-save hook to hash the password before saving
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
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

module.exports = conn.model("User", userSchema);
