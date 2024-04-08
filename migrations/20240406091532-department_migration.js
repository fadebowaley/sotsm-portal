"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Departments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      placeOfAssignment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unitName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentState: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentLGA: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("Departments");
  },
};
