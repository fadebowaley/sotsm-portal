const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ChurchLevel extends Model {
    static associate(models) {
      // Define relationships with Church model
      ChurchLevel.hasMany(models.Church, { foreignKey: "levelId" });
    }
  }

  ChurchLevel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      levelOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: "ChurchLevel",
    }
  );

  return ChurchLevel;
};
