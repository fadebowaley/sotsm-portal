'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.removeColumn("Departments", "unitName");

    // Add new columns to the 'Departments' table
    await queryInterface.addColumn("Departments", "yearEmployed", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("Departments", "gradeLevel", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("Departments", "stepLevel", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    
    await queryInterface.addColumn("Departments", "jobTitle", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Re-add 'unitName' to the 'Department' table
    await queryInterface.addColumn("Departments", "unitName", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Remove the added columns
    await queryInterface.removeColumn("Departments", "yearEmployed");
    await queryInterface.removeColumn("Departments", "gradeLevel");
    await queryInterface.removeColumn("Departments", "stepLevel");
    await queryInterface.removeColumn("Departments", "jobTitle");
  }
};
