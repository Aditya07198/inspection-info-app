import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { corsOptions } from './middleware/corsHandler.js';
import { swaggerSpec } from './config/swagger.js';

const app = express();

// core middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'inspection-api', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', apiRoutes);

// centralized error handler
app.use(errorHandler);

export default app;
