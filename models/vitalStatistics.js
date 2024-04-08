// models/vitalStatistics.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VitalStatistics extends Model {
    static associate(models) {
      // Define one-to-one relationship with Church using parishCode
      VitalStatistics.belongsTo(models.Church, { foreignKey: "parishCode" });
    }
  }

  VitalStatistics.init(
    {
      numberOfAdult: DataTypes.INTEGER,
      numberOfYouth: DataTypes.INTEGER,
      numberOfChildren: DataTypes.INTEGER,
      totalMembers: DataTypes.INTEGER,
      numberOfWorkers: DataTypes.INTEGER,
      totalWorkers: DataTypes.INTEGER,
      workersInTraining: DataTypes.INTEGER,
      totalUnordainedLeaders: DataTypes.INTEGER,
      numberOfMinisters: DataTypes.INTEGER,
      numberOfDeaconsDeaconesses: DataTypes.INTEGER,
      numberOfPastors: DataTypes.INTEGER,
      numberOfSeniorPastors: DataTypes.INTEGER,
      numberOfElders: DataTypes.INTEGER,
      numberOfBishops: DataTypes.INTEGER,
      parishCode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "VitalStatistics",
    }
  );

  return VitalStatistics;
};
