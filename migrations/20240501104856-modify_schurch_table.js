'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn("Churches", "assistantId", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add a column for office church (pastorOffice) to the Churches table
    await queryInterface.addColumn("Churches", "pastorOffice", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Remove the leaseRentAgreement column from the Churches table
    await queryInterface.removeColumn("Churches", "leaseRentAgreement");
  },

  async down (queryInterface, Sequelize) {
    // Re-add the leaseRentAgreement column to the Churches table
    await queryInterface.addColumn("Churches", "leaseRentAgreement", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Remove the added columns
    await queryInterface.removeColumn("Churches", "assistantId");
    await queryInterface.removeColumn("Churches", "pastorOffice");
  }
};
