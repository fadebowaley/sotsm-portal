"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Churches", "dateOfEstablishment", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "propertyStatus", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "estimatedValue", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "building", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "paymentFrequency", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "leaseRentAgreement", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "employeeId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Churches", "dateOfEstablishment", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("Churches", "propertyStatus", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Churches", "estimatedValue", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
    await queryInterface.changeColumn("Churches", "building", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Churches", "paymentFrequency", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Churches", "leaseRentAgreement", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Churches", "employeeId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
