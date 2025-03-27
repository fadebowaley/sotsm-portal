const { version } = require('../../package.json');
const config = require('../config/config');

// Steps to update Swagger definition:
// 1. Update the title to reflect your actual API name
// 2. Update the GitHub URL to point to your repository
// 3. Add description and examples if needed

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'HaloCRM API Documentation', // Changed from boilerplate to actual name
    version,
    description: 'API documentation HaloCRM', // Added description
    license: {
      name: 'MIT',
      url: 'https://github.com/fadebowaley/sotsm-portal/blob/main/LICENSE', // Updated GitHub URL
    },
    // Example of additional info you can add:
    contact: {
      name: 'HaloCRM Support',
      email: 'support@halocrm.com',
      url: 'https://halocrm.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Local Development Server',
    },
  ],
};

module.exports = swaggerDef;
