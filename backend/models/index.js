import User from './UserModel.js';
import Product from './ProductModel.js';
import Review from './ReviewModel.js';
import { Cart, CartItem } from './CartModel.js';
import { Order, OrderItem } from './OrderModel.js';
import PasswordResetToken from './PasswordResetTokenModel.js';
import Brand from './BrandModel.js';
import { sequelize } from '../config/database.js';

// Define associations
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });

Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasMany(PasswordResetToken, { foreignKey: 'userId', as: 'resetTokens' });
PasswordResetToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  User,
  Product,
  Review,
  Cart,
  CartItem,
  Order,
  OrderItem,
  PasswordResetToken,
  Brand,
  sequelize,
};
