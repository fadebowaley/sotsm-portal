'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Change the data type of parishCode column to STRING
    await queryInterface.changeColumn("Statistics", "parishCode", {
      type: Sequelize.STRING,
      allowNull: true, // Modify allowNull according to your requirement
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Statistics", "parishCode", {
      type: Sequelize.INTEGER,
      allowNull: true, // Modify allowNull according to your requirement
    });
  }
};
