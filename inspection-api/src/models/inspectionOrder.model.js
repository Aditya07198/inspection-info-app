import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const InspectionOrder = sequelize.define(
  'InspectionOrder',
  {
    inspection_order_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rep_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    inquiry_id: {
      type: DataTypes.BIGINT
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    scheduled_date: DataTypes.DATE,
    completion_date: DataTypes.DATE,
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'OPEN'
    },
    inspection_type: DataTypes.STRING(100),
    next_due_date: DataTypes.DATEONLY,
    followup_start_date: DataTypes.DATEONLY,
    invoice_raised: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    invoice_amount: {
      type: DataTypes.DECIMAL(12, 2)
    },
    remarks: DataTypes.TEXT
  },
  {
    tableName: 'inspection_order',
    timestamps: false
  }
);

export default InspectionOrder;
