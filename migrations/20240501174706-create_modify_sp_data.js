'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

       await queryInterface.changeColumn("SpiritualProfiles", "employeeId", {
         type: Sequelize.STRING,
         allowNull: true, // Modify allowNull according to your requirement
       });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
       await queryInterface.changeColumn("SpiritualProfiles", "employeeId", {
         type: Sequelize.INTEGER,
         allowNull: true, // Modify allowNull according to your requirement
       });
  }
};
