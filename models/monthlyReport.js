// models/monthlyReport.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MonthlyReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define one-to-one relationship with Church
      MonthlyReport.belongsTo(models.Church, { foreignKey: "parishCode" });
    }
  }
MonthlyReport.init(
  {
    week: DataTypes.STRING,
    day: {
      type: DataTypes.ENUM(
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
    Men: DataTypes.INTEGER,
    Women: DataTypes.INTEGER,
    Children: DataTypes.INTEGER,
    Total: DataTypes.INTEGER,
    parishCode: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "MonthlyReport",
  }
);

  return MonthlyReport;
};

