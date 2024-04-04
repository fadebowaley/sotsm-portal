const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/msql");

const saltRounds = 10;

const Leader = sequelize.define("Leader", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    lowercase: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM,
    values: [
      "superUser",
      "administrator",
      "accountant",
      "pastor",
      "zonalPastor",
      "Diocesan",
      "HOD",
      "RegionalPastor",
      "Bishops",
      "DMD",
      "Head Bishop",
    ],
    defaultValue: "pastor",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  emailVerificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailVerificationTokenExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  emailVerifiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  username: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.getDataValue(
        "firstname"
      ).toLowerCase()}${this.getDataValue(
        "lastname"
      ).toLowerCase()}${Math.floor(Math.random() * 10000)}`;
    },
  },
});

// Pre-save hook to hash the password before saving
Leader.beforeCreate(async (leader) => {
  if (leader.password) {
    const hashedPassword = await bcrypt.hash(leader.password, saltRounds);
    leader.password = hashedPassword;
  }
});

// Method to check if password is valid
Leader.prototype.validPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = Leader;
