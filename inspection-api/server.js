import dotenv from 'dotenv';
dotenv.config(); // load .env before anything else

import app from './src/app.js';
import { logger } from './src/utils/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Inspection API listening on port ${PORT}`);
});
