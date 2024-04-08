"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop the existing column
    await queryInterface.removeColumn(
      "UserData",
      "emailVerificationTokenExpiresAt"
    );

    // Recreate the column with the new data type
    await queryInterface.addColumn(
      "UserData",
      "emailVerificationTokenExpiresAt",
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    // Rollback by dropping the newly created column
    await queryInterface.removeColumn(
      "UserData",
      "emailVerificationTokenExpiresAt"
    );

    // Recreate the column with the old data type (if necessary)
    await queryInterface.addColumn(
      "UserData",
      "emailVerificationTokenExpiresAt",
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },
};
