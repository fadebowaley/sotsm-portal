"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserData.hasOne(models.User, { foreignKey: "userId" });

    }
  }
  UserData.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      //Phone number is just added to the model
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: DataTypes.STRING,

      emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      emailVerificationTokenExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserData",
    }
  );
  return UserData;
};
