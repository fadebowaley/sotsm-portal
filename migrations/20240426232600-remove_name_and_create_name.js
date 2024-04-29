"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove existing columns
    for (let i = 0; i < 10; i++) {
      await queryInterface.removeColumn("Churches", `levelTier${i}`);
      await queryInterface.removeColumn("Churches", `labelTier${i}`);
    }

    // Add new columns faithCode0 to faithCode9 and faithFold0 to faithFold9
    for (let i = 0; i < 10; i++) {
      await queryInterface.addColumn("Churches", `faithCode${i}`, {
        type: Sequelize.STRING,
        allowNull: true,
      });
      await queryInterface.addColumn("Churches", `faithFold${i}`, {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove newly added columns
    for (let i = 0; i < 10; i++) {
      await queryInterface.removeColumn("Churches", `faithCode${i}`);
      await queryInterface.removeColumn("Churches", `faithFold${i}`);
    }

    // Revert removal of columns levelTier0 to levelTier9 and labelTier0 to labelTier9
    for (let i = 0; i < 10; i++) {
      await queryInterface.addColumn("Churches", `levelTier${i}`, {
        type: Sequelize.STRING,
        allowNull: true,
      });
      await queryInterface.addColumn("Churches", `labelTier${i}`, {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },
};
