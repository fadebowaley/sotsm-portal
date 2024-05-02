'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
//define user{Pastor} relationship with church 1-1
      Department.belongsTo(models.User, { foreignKey: "employeeId", optional: true });
    }
  }
  Department.init(
    {
      placeOfAssignment: DataTypes.STRING,
      departmentAddress: DataTypes.STRING,
      departmentState: DataTypes.STRING,
      departmentLGA:  DataTypes.STRING,
      departmentCountry: DataTypes.STRING,
      employeeId:   DataTypes.INTEGER,
      yearEmployed: DataTypes.DATE,
      gradeLevel:  DataTypes.INTEGER,
      stepLevel:  DataTypes.INTEGER,
      jobTitle:  DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};