import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Inquiry = sequelize.define(
  'Inquiry',
  {
    inquiry_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rep_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    inquiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    inquiry_channel: {
      type: DataTypes.STRING(50)
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'OPEN'
    },
    inspection_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    notes: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'inquiry',
    timestamps: false
  }
);

export default Inquiry;
