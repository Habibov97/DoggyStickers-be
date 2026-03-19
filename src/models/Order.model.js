const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['pending', 'completed', 'cancelled'],
      defaultValue: 'pending',
    },
  },
  { timestamps: true },
);

module.exports = Order;
