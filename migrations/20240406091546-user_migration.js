"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      emailVerificationToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emailVerificationTokenExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otherName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      highestQualification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      professional: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      maritalStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stateOfOrigin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lgaOfOrigin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      homeTown: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      spouseName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      spousePhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      spouseDateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nextOfKinName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextOfKinPhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextOfKinRelationship: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      residentialAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stateOfResidence: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lgaOfResidence: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      employmentCategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Assuming this is nullable based on your model
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
