// models/careerMinistry.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CareerMinistry extends Model {
    static associate(models) {
      CareerMinistry.belongsTo(models.User,);

    }
  }

  CareerMinistry.init(
    {
      // Common fields
      careerType: DataTypes.ENUM(
        "Career Officer",
        "Career Officer with Pastoral Responsibility",
        "Full-Time Pastor",
        "Part-Time Pastor"
      ),
      // Career Officer fields
      parishOrPlaceOfAssignment: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      yearEmployed: DataTypes.DATE,
      unitName: DataTypes.STRING,
      gradeLevel: DataTypes.INTEGER,
      step: DataTypes.INTEGER,
      departmentAddress: DataTypes.STRING,
      departmentState: DataTypes.STRING,
      departmentLGA: DataTypes.STRING,
      departmentCountry: DataTypes.STRING,
      // Career Officer with Pastoral Responsibility fields
      pastorInParish: DataTypes.BOOLEAN,
      leadershipRole: DataTypes.STRING,

      // Full-Time/Part-Time Pastor fields church data
      zoneName: DataTypes.STRING,
      dioceseRegionName: DataTypes.STRING,
      divisionName: DataTypes.STRING,
      churchState: DataTypes.STRING,
      churchLGA: DataTypes.STRING,
      churchAddress: DataTypes.STRING,
      churchCountry: DataTypes.STRING,
      employeeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CareerMinistry",
    }
  );

  return CareerMinistry;
};



/***
 * 
  Users              
  - CareerMinistries- user has 1-1 
  - SpiritualProfiles -user has 1-1
  Churches           user has 1-1
    - Zone  church has 1-1             
    - Diocese   church has 1-1         
    - Division           church has 1-1
    - Region             church has 1-1
    - National           church has 1-1
    - MonthlyReports     church has 1-1
    - Statistics         church has 1-1
    - VitalStatistics    church has 1-1
  Departments        user has 1-1

 * 
 * 
 * 
 * 
 * 
 */