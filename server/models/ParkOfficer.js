"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParkOfficer extends Model {
    static associate(models) {
      // ParkOfficer.hasMany(models.Protocol, {
      //   foreignKey: "officerId",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
    }
  }
  ParkOfficer.init(
    {
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      badgeNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'ParkPfficer',
      tableName: 'park_officers',
      underscored: true
    }
  );
  return ParkOfficer;
};
