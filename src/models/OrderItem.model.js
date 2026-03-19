const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const OrderItem = sequelize.define(
  'OrderItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    variantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceAtPurchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = OrderItem;
