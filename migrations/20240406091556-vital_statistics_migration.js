"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VitalStatistics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      numberOfAdult: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfYouth: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfChildren: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalMembers: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfWorkers: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalWorkers: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      workersInTraining: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalUnordainedLeaders: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfMinisters: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfDeaconsDeaconesses: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfPastors: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfSeniorPastors: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfElders: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfBishops: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      parishCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Churches", // Assuming the table name for Church model is 'Churches'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("VitalStatistics");
  },
};
