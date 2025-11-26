import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger.js';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_LOGGING
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || 'localhost',
  port: DB_PORT ? Number(DB_PORT) : 5432,
  dialect: 'postgres',
  logging: DB_LOGGING === 'true' ? (msg) => logger.debug(msg) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// simple connection test on startup (optional helper)
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error.message);
  }
};

export default sequelize;
