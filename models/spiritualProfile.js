// models/spiritualProfile.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SpiritualProfile extends Model {
    static associate(models) {
    SpiritualProfile.belongsTo(models.User);

    }
  }

  SpiritualProfile.init(
    {
      yearBornAgain: DataTypes.INTEGER,
      yearWaterBaptized: DataTypes.INTEGER,
      holyGhostBaptism: DataTypes.INTEGER,
      yearJoinedSOTSM: DataTypes.INTEGER,
      yearBecameWorker: DataTypes.INTEGER,
      yearBecameMinister: DataTypes.INTEGER,
      yearDeaconDns: DataTypes.INTEGER,
      yearOrdainedPastor: DataTypes.INTEGER,
      yearSeniorPastor: DataTypes.INTEGER,
      yearOrdainedElder: DataTypes.INTEGER,
      yearBishop: DataTypes.INTEGER,
      lastOrdinationDate: DataTypes.DATE,
      yearGraduatedIBCOMS: DataTypes.INTEGER,
      yearGraduatedWOOCOME: DataTypes.INTEGER,
      yearGraduatedILS: DataTypes.INTEGER,
      yearGraduatedNGBTI: DataTypes.INTEGER,
      employeeId: DataTypes.STRING,
      UserId:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "SpiritualProfile",
    }
  );

  return SpiritualProfile;
};
