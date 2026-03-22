const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const config = require('../config/index');
const routerPath = path.join(__dirname, '../routes/**/*.js');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Doggy Stickers API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${config.baseURL}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [routerPath], // route file-lar
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
