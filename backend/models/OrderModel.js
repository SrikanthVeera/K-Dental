import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    orderNumber: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    // Shipping Address
    shippingName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    shippingPhone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    shippingStreet: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    shippingCity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    shippingState: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    shippingPincode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    shippingCountry: {
      type: DataTypes.STRING(100),
      defaultValue: 'India',
    },
    // Payment
    paymentMethod: {
      type: DataTypes.ENUM('COD', 'Card', 'UPI', 'NetBanking'),
      defaultValue: 'COD',
    },
    paymentStatus: {
      type: DataTypes.ENUM('Pending', 'Paid', 'Failed'),
      defaultValue: 'Pending',
    },
    // Pricing
    itemsPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    shippingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    taxPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    // Status
    status: {
      type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
      defaultValue: 'Pending',
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
    hooks: {
      beforeCreate: async (order) => {
        if (!order.orderNumber) {
          const date = new Date();
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const count = await Order.count();
          order.orderNumber = `ORD-${year}${month}-${String(count + 1).padStart(5, '0')}`;
        }
      },
    },
  }
);

export const OrderItem = sequelize.define(
  'OrderItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(500),
    },
  },
  {
    tableName: 'order_items',
    timestamps: true,
  }
);
