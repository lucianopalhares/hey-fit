'use strict';

module.exports = (sequelize, DataTypes) => {
    const person = sequelize.define('person', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lactose_intolerance: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      athlete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    });
  
    return person;
  }