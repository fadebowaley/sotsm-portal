'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Define many-to-many relationship with Users
      Role.belongsToMany(models.User, {
        through: 'UserRoles', // This is the join table
        foreignKey: 'roleId',
        otherKey: 'userId'
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};

