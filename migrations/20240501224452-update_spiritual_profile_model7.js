'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
       await queryInterface.removeColumn(
         "SpiritualProfiles",
         "holyGhostBaptism"
       );
          
       await queryInterface.addColumn("SpiritualProfiles", "holyGhostBaptism", {
            type: Sequelize.INTEGER,
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
      await queryInterface.changeColumn(
        "SpiritualProfiles",
        "holyGhostBaptism",
        {
          type: Sequelize.BOOLEAN,
          allowNull: true, // Modify allowNull according to your requirement
        }
      );
  }
};
