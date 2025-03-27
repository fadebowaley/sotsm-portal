/**
 * This file sets up Swagger documentation for the API endpoints.
 *
 * How it works:
 * 1. Imports required packages:
 *    - express: For routing
 *    - swagger-jsdoc: Converts JSDoc comments to Swagger/OpenAPI spec
 *    - swagger-ui-express: Creates UI for viewing API docs
 *
 * 2. Configures Swagger:
 *    - Uses swaggerDefinition from ../../docs/swaggerDef for base config
 *    - Scans files matching 'src/docs/*.yml' and 'src/routes/v1/*.js' for API docs
 *
 * 3. Sets up routes:
 *    - Serves Swagger UI at the root path ('/')
 *    - Enables API explorer in the UI
 *
 * Example usage:
 *
 * 1. Start your server and visit /v1/docs in browser
 * 2. You'll see the Swagger UI with all documented endpoints
 * 3. Try documenting an endpoint in your route file:
 *
 *    @swagger
 *    /users:
 *      get:
 *        summary: Get all users
 *        responses:
 *          200:
 *            description: List of users
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *
 * 4. Refresh the docs page to see your new endpoint documentation
 */

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
