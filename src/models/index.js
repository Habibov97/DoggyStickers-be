const User = require('./User.model');
const Order = require('./Order.model');
const OrderItem = require('./OrderItem.model');
const Product = require('./Product.model');
const Variant = require('./Variant.model');
const Image = require('./Image.model');

Product.hasMany(Variant);
Variant.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Variant.hasMany(OrderItem, { foreignKey: 'variantId' });
OrderItem.belongsTo(Variant, { foreignKey: 'variantId' });

Product.hasMany(Image);
Image.belongsTo(Product);

module.exports = {
  User,
  Order,
  OrderItem,
  Product,
  Image,
  Variant,
};
