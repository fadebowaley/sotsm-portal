"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Churches", "parishCode", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "zonalCode", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "dioceseCode", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "divisionCode", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "nationalCode", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "employeeId", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    // Add the phoneNumber column
    await queryInterface.addColumn("Churches", "alias", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    //add a new column alias
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Churches", "employeeId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "parishCode", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "zonalCode", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "dioceseCode", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "divisionCode", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Churches", "nationalCode", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
