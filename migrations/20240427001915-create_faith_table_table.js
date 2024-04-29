"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("FaithTables", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      levelRank: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      labelRank: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lastCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fkStr: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      householdId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: "Households",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("FaithTables");
  },
};
