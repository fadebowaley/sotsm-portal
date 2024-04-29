"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Delete all data from the Churches table
    await queryInterface.bulkDelete("UserData", null, {});
    await queryInterface.bulkDelete("Churches", null, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback logic if needed
    // Since we are deleting all data in the up function, rollback logic for down function depends on your specific requirements
  },
};
