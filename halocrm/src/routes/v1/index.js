/**
 * This is the main router file that sets up all our API routes.
 * Think of it like a map that tells the app where to send different requests.
 *
 * Example of how it works:
 *
 * 1. Regular Routes (defaultRoutes):
 *    - When someone visits '/auth/login', it goes to the auth routes
 *    - When someone visits '/users/123', it goes to the user routes
 *
 *    For example:
 *    - POST /auth/login -> Handles user login
 *    - GET /users/123 -> Gets info about user #123
 *
 * 2. Development-only Routes (devRoutes):
 *    - These only work when the app is in development mode
 *    - Like '/docs' which shows API documentation
 *
 *    For example:
 *    - GET /docs -> Shows API documentation (only in development)
 */

const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const roleRoute = require('./role.route'); // New addition

const router = express.Router();

// Routes that are always available
const defaultRoutes = [
  {
    path: '/auth',    // Example: /auth/login, /auth/register
    route: authRoute,
  },
  {
    path: '/users',   // Example: /users/123, /users/profile
    route: userRoute,
  },

  {
    path: '/roles',   // Mount under /v1/roles
    route: roleRoute,
  },

  // add more routes here like app, admin,
];

// Routes only available during development
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',    // Example: /docs shows API documentation
    route: docsRoute,
  },
];

// Set up all the regular routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Set up development routes only if we're in development mode
/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
