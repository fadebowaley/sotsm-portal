// models/Statistics.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Statistics extends Model {
    static associate(models) {
      Statistics.belongsTo(models.Church, { foreignKey: "parishCode" });
    }
  }

  Statistics.init(
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
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Statistics",
    }
  );

  return Statistics;
};
