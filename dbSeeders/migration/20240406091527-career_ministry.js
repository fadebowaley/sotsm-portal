"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CareerMinistries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      careerType: {
        type: Sequelize.ENUM(
          "Career Officer",
          "Career Officer with Pastoral Responsibility",
          "Full-Time Pastor",
          "Part-Time Pastor"
        ),
        allowNull: false,
      },
      parishOrPlaceOfAssignment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yearEmployed: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      unitName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gradeLevel: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      step: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      departmentAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      departmentState: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      departmentLGA: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      departmentCountry: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pastorInParish: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      leadershipRole: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zoneName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dioceseRegionName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      divisionName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      churchState: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      churchLGA: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      churchAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      churchCountry: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("CareerMinistries");
  },
};
