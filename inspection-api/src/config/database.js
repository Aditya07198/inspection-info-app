import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger.js';

import dotenv from 'dotenv';
dotenv.config(); // ensure .env is loaded here as well

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_LOGGING
} = process.env;

logger.info(
  `Connecting to Postgres at ${DB_HOST || 'localhost'}:${DB_PORT || 5432} db=${DB_NAME} user=${DB_USER}`
);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || 'localhost',
  port: DB_PORT ? Number(DB_PORT) : 5432,
  dialect: 'postgres',
  logging: DB_LOGGING === 'true' ? (msg) => logger.debug(msg) : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // ok for managed cloud DBs like Render
    }
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error.message);
    throw error;
  }
};

export default sequelize;
