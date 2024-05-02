'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove the ministrySchool column from the Spiritual table
    await queryInterface.removeColumn("SpiritualProfiles", "ministrySchools");
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Add the ministrySchool column back to the Spiritual table
    await queryInterface.addColumn("Spiritual", "ministrySchool", {
      type: Sequelize.STRING,
      allowNull: true, // Modify allowNull according to your requirement
    });
  }
};
