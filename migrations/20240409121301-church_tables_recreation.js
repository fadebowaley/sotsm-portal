"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Churches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parishOrPlaceOfAssignment: {
        type: Sequelize.STRING,
      },
      zoneName: {
        type: Sequelize.STRING,
      },
      dioceseRegionName: {
        type: Sequelize.STRING,
      },
      divisionName: {
        type: Sequelize.STRING,
      },
      churchState: {
        type: Sequelize.STRING,
      },
      churchLGA: {
        type: Sequelize.STRING,
      },
      churchAddress: {
        type: Sequelize.STRING,
      },
      churchCountry: {
        type: Sequelize.STRING,
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
      },
      alias: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parishCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zonalCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dioceseCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      divisionCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nationalCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      employeeId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hqStatus: {
        type: Sequelize.ENUM(
          "parish",
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
 
};
