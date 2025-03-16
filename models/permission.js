const { Model } = require('sequelize');

class Permission extends Model {
  static associate(models) {
    // Define many-to-many relationship with Roles
    Permission.belongsToMany(models.Role, {
      through: 'RolePermissions', // This is the join table
      foreignKey: 'permissionId',
      otherKey: 'roleId'
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  Permission.init({
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
    },
    method: {
      type: DataTypes.ENUM('GET', 'POST', 'PUT', 'DELETE'),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};