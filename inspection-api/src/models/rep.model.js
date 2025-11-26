import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Rep = sequelize.define(
  'Rep',
  {
    rep_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'rep',
    timestamps: false
  }
);

export default Rep;
