"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MonthlyReports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      week: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      day: {
        type: Sequelize.ENUM(
          "Sunday Service",
          "Tuesday/Wednesday",
          "Thursday Service",
          "Sunday Outreach Service",
          "Sunday School",
          "House Fellowship",
          "Youth Mid Week Service"
        ),
        allowNull: false,
      },
      Men: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Women: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Children: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Total: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      parishCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Churches", // Assuming the table name for Church model is 'Churches'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MonthlyReports");
  },
};
