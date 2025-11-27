const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TechnicianNotification = sequelize.define('TechnicianNotification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  technicianId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('new_job', 'job_update', 'payment', 'system', 'alert'),
    defaultValue: 'system'
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'service_jobs',
      key: 'id'
    }
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  }
}, {
  tableName: 'technician_notifications',
  timestamps: true
});

module.exports = TechnicianNotification;
