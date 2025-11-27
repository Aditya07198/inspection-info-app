import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import { testConnection } from './src/config/database.js';
import './src/models/index.js'; // ensures models & associations are registered

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await testConnection(); // only authenticate, no sync
  app.listen(PORT, () => {
    logger.info(`Inspection API listening on port ${PORT}`);
  });
};

startServer().catch((err) => {
  logger.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});
