'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.addColumn("SpiritualProfiles", "userId", {
         type: Sequelize.INTEGER,
         allowNull: true, // Modify allowNull according to your requirement
       });
  
  },

  async down (queryInterface, Sequelize) {
       await queryInterface.removeColumn("SpiritualProfiles", "userId", {
         type: Sequelize.INTEGER,
         allowNull: true, // Modify allowNull according to your requirement
       });
  }
};
