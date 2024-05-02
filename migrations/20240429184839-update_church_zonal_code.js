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
      await queryInterface.sequelize.query(`
      UPDATE "Churches"
      SET "zonalCode" = CONCAT(SUBSTRING("zonalCode", 1, 7), '000', SUBSTRING("zonalCode", 8))
      WHERE "parishCode" LIKE 'ZN2183%';
    `);

      await queryInterface.sequelize.query(`
      UPDATE "Churches"
      SET "dioceseCode" = CONCAT(SUBSTRING("dioceseCode", 1, 7), '000', SUBSTRING("dioceseCode", 8))
      WHERE "dioceseCode" LIKE 'DI2183%';
    `);
  await queryInterface.sequelize.query(`
      UPDATE "Churches"
      SET "divisionCode" = CONCAT(SUBSTRING("divisionCode", 1, 7), '000', SUBSTRING("divisionCode", 8))
      WHERE "divisionCode" LIKE 'DV2183%';
    `);
      await queryInterface.sequelize.query(`
      UPDATE "Churches"
      SET "nationalCode" = CONCAT(SUBSTRING("nationalCode", 1, 7), '000', SUBSTRING("nationalCode", 8))
      WHERE "nationalCode" LIKE 'NT2183%';
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
