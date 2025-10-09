"use strict";

/**@type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("images", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      protocolId: {
        field: "protocol_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "protocols",
            key: "id",
          },
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updateAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("images");
  },
};
