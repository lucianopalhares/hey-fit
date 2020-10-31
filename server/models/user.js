'use strict';

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });

    return user;
  }

