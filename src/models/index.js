const User = require('./User.model');
const Order = require('./Order.model');
const OrderItem = require('./OrderItem.model');
const Product = require('./Product.model');
const Variant = require('./Variant.model');
const Image = require('./Image.model');

Product.hasMany(Variant, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  as: 'variants',
});
Variant.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId', onDelete: 'SET NULL' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Variant.hasMany(OrderItem, { foreignKey: 'variantId', onDelete: 'RESTRICT' });
OrderItem.belongsTo(Variant, { foreignKey: 'variantId' });

Product.hasMany(Image, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  as: 'images',
});
Image.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Order,
  OrderItem,
  Product,
  Image,
  Variant,
};
