// Example of migration file
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("UserData", "firstName", {
      type: Sequelize.STRING,
      allowNull: true, // Allow null values
    });

    await queryInterface.changeColumn("UserData", "lastName", {
      type: Sequelize.STRING,
      allowNull: true, 
    });

    await queryInterface.changeColumn("UserData", "emailVerificationToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn(
      "UserData",
      "emailVerificationTokenExpiresAt",
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

  },
  down: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn("UserData", "firstName", {
      type: Sequelize.STRING,
      allowNull: false, // Revert to disallow null values
    });

    await queryInterface.changeColumn("UserData", "lastName", {
      type: Sequelize.STRING,
      allowNull: false, // Revert to disallow null values
    });
    await queryInterface.changeColumn("UserData", "emailVerificationToken", {
      type: Sequelize.STRING,
      allowNull: false, // Revert to disallow null values
    });
    await queryInterface.changeColumn(
      "UserData",
      "emailVerificationTokenExpiresAt",
      {
        type: Sequelize.STRING,
        allowNull: false, // Revert to disallow null values
      }
    );
  },
};
