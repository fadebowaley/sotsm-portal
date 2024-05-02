"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Household extends Model {
    static associate(models) {

      // Define one-to-one relationship with User & HouseHold
      Household.hasOne(models.FaithTable, { foreignKey: "householdId" });
      Household.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Household.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      levelRank: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      labelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statusCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      codeFormat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idFke: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Household",
    }
  );
  return Household;
};
