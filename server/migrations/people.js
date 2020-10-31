'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable(
      'people',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        height: {
          type: Sequelize.STRING,
          allowNull: false
        },
        weight: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lactose_intolerance: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true
        },
        athlete: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
      },
      {
        charset: 'utf8',                   
        collate: 'utf8_unicode_ci'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('people');
  }
};
