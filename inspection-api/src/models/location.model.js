import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Location = sequelize.define(
  'Location',
  {
    location_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    location_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address_1: DataTypes.STRING(255),
    address_2: DataTypes.STRING(255),
    unit_number: DataTypes.STRING(10),
    city: DataTypes.STRING(100),
    state_province: DataTypes.STRING(100),
    country: DataTypes.STRING(100),
    postal_code: DataTypes.STRING(20),
    contact_name: DataTypes.STRING(255),
    contact_mobile: DataTypes.STRING(50),
    contact_office_phone: DataTypes.STRING(50),
    phone_ext: DataTypes.STRING(10),
    contact_fax: DataTypes.STRING(50),
    contact_email: DataTypes.STRING(255),
    organization_type: DataTypes.STRING(100),
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: DataTypes.DATE
  },
  {
    tableName: 'location',
    timestamps: false
  }
);

export default Location;
