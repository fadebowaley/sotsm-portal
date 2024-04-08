"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SpiritualProfiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      yearBornAgain: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearWaterBaptized: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      holyGhostBaptism: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      yearJoinedSOTSM: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearBecameWorker: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearBecameMinister: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearDeaconDns: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearOrdainedPastor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearSeniorPastor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearOrdainedElder: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearBishop: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lastOrdinationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ministrySchools: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yearGraduatedIBCOMS: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearGraduatedWOOCOME: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearGraduatedILS: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yearGraduatedNGBTI: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("SpiritualProfiles");
  },
};
