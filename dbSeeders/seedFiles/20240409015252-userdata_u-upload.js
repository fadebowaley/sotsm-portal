"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "UserData",

      [
        {
          firstName: "Super",
          lastName: "User",
          emailVerificationToken: new Date('2024-04-09'),
          password:
            "$2b$10$M6Td4jc7AE3BKSSPh5iqlOZN.5Q0hWgaLDcaSPHewOn4tz/Qqxp1W",
          createdAt: new Date('2024-04-09T00:00:00+01:00'),
          updatedAt: new Date('2024-04-09T00:00:00+01:00'),         
           emailVerificationTokenExpiresAt: new Date('2024-04-09'),
          phoneNumber: "08145045108",
        },
        {
          firstName: "Admin",
          lastName: "User",
          emailVerificationToken: new Date('2024-04-09'),
          password:
            "$2b$10$M6Td4jc7AE3BKSSPh5iqlOZN.5Q0hWgaLDcaSPHewOn4tz/Qqxp1W",
          createdAt: new Date('2024-04-09T00:00:00+01:00'),
          updatedAt: new Date('2024-04-09T00:00:00+01:00'),
          emailVerificationTokenExpiresAt: new Date('2024-04-09'),
          phoneNumber: "08027180715",
        },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
