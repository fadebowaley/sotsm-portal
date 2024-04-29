"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FaithTable extends Model {
    static associate(models) {
      // Define one-to-one relationship with Household
      FaithTable.belongsTo(models.Household, { foreignKey: "householdId" });

    }
  }

  FaithTable.init(
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
      labelRank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lastCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fkStr: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      householdId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "FaithTable",
    }
  );
  return FaithTable;
};
