"use strict";

/**@type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("protocols", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      serviceNotes: {
        field: "service_notes",
        type: Sequelize.STRING,
        allowNull: false,
      },
      officerId: {
        field: "officer_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "park_officers",
            key: "id",
          },
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fineAmount: {
        field: "fine_amount",
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("protocols");
  },
};
