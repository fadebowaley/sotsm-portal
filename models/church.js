"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Church extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define one-to-many relationship with MonthlyReport, vitalStatistics,Statistics
      Church.hasMany(models.MonthlyReport, { foreignKey: "parishCode" });
      Church.hasMany(models.VitalStatistics, { foreignKey: "parishCode" });
      Church.hasMany(models.Statistics, { foreignKey: "parishCode" });
      //define user{Pastor} relationship with church 1-1
      Church.belongsTo(models.User, { foreignKey: "employeeId", optional: true });

    }
  }
  Church.init(
    {
      parishOrPlaceOfAssignment: DataTypes.STRING,
      zoneName: DataTypes.STRING,
      dioceseRegionName: DataTypes.STRING,
      divisionName: DataTypes.STRING,
      churchState: DataTypes.STRING,
      churchLGA: DataTypes.STRING,
      churchAddress: DataTypes.STRING,
      churchCountry: DataTypes.STRING,

      //additional info
      dateOfEstablishment: { type: DataTypes.DATE, allowNull: true },
      propertyStatus: { type: DataTypes.STRING, allowNull: true },
      estimatedValue: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      building: { type: DataTypes.STRING, allowNull: true },
      paymentFrequency: { type: DataTypes.STRING, allowNull: true },
      leaseRentAgreement: { type: DataTypes.STRING, allowNull: true },
      status: DataTypes.STRING,
      //add alias
      alias:{type:DataTypes.STRING, allowNull:true },

      //codes for parishes
      parishCode: { type: DataTypes.STRING, allowNull: true }, // Nullable field
      zonalCode: { type: DataTypes.STRING, allowNull: true }, // Nullable field
      dioceseCode: { type: DataTypes.STRING, allowNull: true }, // Nullable field
      divisionCode: { type: DataTypes.STRING, allowNull: true }, // Nullable field
      nationalCode: { type: DataTypes.STRING, allowNull: true }, // Nullable field
      employeeId: { type: DataTypes.STRING, allowNull: true },


      // HQ Status enum
      hqStatus: {
        type: DataTypes.ENUM(
          "parish",
          "zone",
          "diocese",
          "region",
          "division",
          "national"
        ),
        allowNull: true, // Nullable field
      },
    },
    {
      sequelize,
      modelName: "Church",
    }
  );
  return Church;
};
