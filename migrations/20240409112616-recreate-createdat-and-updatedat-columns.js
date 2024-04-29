"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing createdAt and updatedAt columns if they exist
    await queryInterface.removeColumn("Churches", "createdAt");
    await queryInterface.removeColumn("Churches", "updatedAt");

    // Recreate the createdAt and updatedAt columns with the correct data types
    await queryInterface.addColumn("Churches", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("Churches", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the createdAt and updatedAt columns if the migration needs to be rolled back
    await queryInterface.removeColumn("Churches", "createdAt");
    await queryInterface.removeColumn("Churches", "updatedAt");
  },
};
