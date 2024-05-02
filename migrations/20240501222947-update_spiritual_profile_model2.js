"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing userId column
    await queryInterface.removeColumn("SpiritualProfiles", "userId");

    // Add a new UserId column
    await queryInterface.addColumn("SpiritualProfiles", "UserId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the newly created UserId column
    await queryInterface.removeColumn("SpiritualProfiles", "UserId");

    // Recreate the userId column
    await queryInterface.addColumn("SpiritualProfiles", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
