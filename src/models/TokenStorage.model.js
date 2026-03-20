const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TokenStorage = sequelize.define(
  'TokenStorage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = TokenStorage;
