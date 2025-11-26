import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Inspection Info API',
    version: '1.0.0',
    description: 'REST API for inspection reps, locations, inquiries, orders, followups, and attachments.'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local dev'
    }
  ]
};

const options = {
  swaggerDefinition,
  // All route files with OpenAPI comments
  apis: ['./src/routes/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);
