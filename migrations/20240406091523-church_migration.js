"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Churches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parishOrPlaceOfAssignment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zoneName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dioceseRegionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      divisionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      churchState: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      churchLGA: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      churchAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      churchCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateOfEstablishment: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      propertyStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estimatedValue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      building: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentFrequency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      leaseRentAgreement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parishCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      zonalCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dioceseCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      divisionCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nationalCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hqStatus: {
        type: Sequelize.ENUM(
          "zone",
          "diocese",
          "region",
          "division",
          "national"
        ),
        allowNull: true,
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
    await queryInterface.dropTable("Churches");
  },
};
