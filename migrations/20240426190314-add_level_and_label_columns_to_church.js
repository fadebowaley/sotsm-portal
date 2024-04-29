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
    await queryInterface.addColumn("Churches", "levelTier0", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier1", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier2", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier3", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier4", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier5", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier6", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier7", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier8", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "levelTier9", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add columns for labelTier0 to labelTier9 similarly
    await queryInterface.addColumn("Churches", "labelTier0", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier1", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier2", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier3", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier4", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier5", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier6", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier7", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier8", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Churches", "labelTier9", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Remove columns for levelTier0 to levelTier9 similarly
    await queryInterface.removeColumn("church", "levelTier0");
    await queryInterface.removeColumn("church", "levelTier1");
    await queryInterface.removeColumn("church", "levelTier2");
    await queryInterface.removeColumn("church", "levelTier3");
    await queryInterface.removeColumn("church", "levelTier4");
    await queryInterface.removeColumn("church", "levelTier5");
    await queryInterface.removeColumn("church", "levelTier6");
    await queryInterface.removeColumn("church", "levelTier7");
    await queryInterface.removeColumn("church", "levelTier8");
    await queryInterface.removeColumn("church", "levelTier9");

    // Remove columns for labelTier0 to labelTier9 similarly
    await queryInterface.removeColumn("church", "labelTier0");
    await queryInterface.removeColumn("church", "labelTier1");
    await queryInterface.removeColumn("church", "labelTier2");
    await queryInterface.removeColumn("church", "labelTier3");
    await queryInterface.removeColumn("church", "labelTier4");
    await queryInterface.removeColumn("church", "labelTier5");
    await queryInterface.removeColumn("church", "labelTier6");
    await queryInterface.removeColumn("church", "labelTier7");
    await queryInterface.removeColumn("church", "labelTier8");
    await queryInterface.removeColumn("church", "labelTier9");
  }
};
