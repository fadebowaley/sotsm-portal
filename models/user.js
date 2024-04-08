'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Define one-to-one relationship with VitalStatistics using parishCode
        User.hasOne(models.CareerMinistry);
        User.hasOne(models.SpiritualProfile);
        User.hasOne(models.Department, { foreignKey: "employeeId", optional: true });
        User.hasOne(models.Church, { foreignKey: "employeeId", optional: true });

        User.belongsTo(models.UserData);

    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    emailVerificationToken:DataTypes.STRING,
    emailVerificationTokenExpiresAt:DataTypes.DATE,
    password: DataTypes.STRING,

    // Personal data fields
    title: DataTypes.STRING,
    otherName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    highestQualification: DataTypes.STRING,
    professional: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    stateOfOrigin: DataTypes.STRING,
    lgaOfOrigin: DataTypes.STRING,
    homeTown: DataTypes.STRING,
    spouseName: DataTypes.STRING,
    spousePhoneNumber: DataTypes.STRING,
    spouseDateOfBirth: DataTypes.DATE,
    nextOfKinName: DataTypes.STRING,
    nextOfKinPhoneNumber: DataTypes.STRING,
    nextOfKinRelationship: DataTypes.STRING,
    residentialAddress: DataTypes.STRING,
    stateOfResidence: DataTypes.STRING,
    lgaOfResidence: DataTypes.STRING,
    employmentCategory: DataTypes.STRING,
    occupation: DataTypes.STRING,
    employeeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};


