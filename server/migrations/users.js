'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable(
      'users',
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
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        is_admin: {
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
    await queryInterface.dropTable('users');
  }
};
