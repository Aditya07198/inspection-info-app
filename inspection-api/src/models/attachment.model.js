import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Attachment = sequelize.define(
  'Attachment',
  {
    attachment_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    file_extension: DataTypes.STRING(20),
    content_type: DataTypes.STRING(100),
    file_size_bytes: DataTypes.BIGINT,

    // BLOB (DB: BYTEA)
    file_data: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    },

    description: DataTypes.STRING(500),
    entity_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    entity_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    uploaded_by_rep_id: {
      type: DataTypes.BIGINT
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'attachment',
    timestamps: false
  }
);

export default Attachment;
