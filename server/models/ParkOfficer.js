"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParkOfficer extends Model {
    static associate({ Protocol }) {
      ParkOfficer.hasMany(Protocol, {
        foreignKey: "officerId",
      });
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
      isWorked: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "ParkOfficer",
      tableName: "park_officers",
      underscored: true,
    }
  );
  return ParkOfficer;
};
