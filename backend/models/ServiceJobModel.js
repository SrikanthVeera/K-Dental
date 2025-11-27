const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceJob = sequelize.define('ServiceJob', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jobNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  technicianId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  customerLocation: {
    type: DataTypes.JSON, // {lat, lng}
    allowNull: true
  },
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'assigned',
      'accepted',
      'rejected',
      'reached',
      'in_progress',
      'completed',
      'cancelled'
    ),
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  technicianEarning: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: true
  },
  otpVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completionImages: {
    type: DataTypes.JSON, // Array of image URLs
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'service_jobs',
  timestamps: true
});

module.exports = ServiceJob;
