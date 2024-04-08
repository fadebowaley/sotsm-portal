"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the 'email' column exists in the UserData table
    const userDataTable = await queryInterface.describeTable("UserData");
    if ("email" in userDataTable) {
      // Modify the email column to allow null values
      await queryInterface.changeColumn("UserData", "email", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } else {
      console.warn(
        "The 'email' column does not exist in the UserData table. Skipping modification."
      );
    }

    // Add the phoneNumber column
    await queryInterface.addColumn("UserData", "phoneNumber", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the phoneNumber column
    await queryInterface.removeColumn("UserData", "phoneNumber");

    // Restore the original state of the email column
    await queryInterface.changeColumn("UserData", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
