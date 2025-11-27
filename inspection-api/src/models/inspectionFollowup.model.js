import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const InspectionFollowup = sequelize.define(
  'InspectionFollowup',
  {
    followup_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    inspection_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rep_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    followup_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    followup_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    due_date: DataTypes.DATE,
    completed_at: DataTypes.DATE,
    notes: DataTypes.TEXT
  },
  {
    tableName: 'inspection_followup',
    timestamps: false
  }
);

export default InspectionFollowup;
