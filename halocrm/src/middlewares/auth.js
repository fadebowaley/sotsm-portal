// This code imports necessary modules and sets up authentication middleware using JWT (JSON Web Tokens).
const passport = require('passport'); // Importing the passport library for authentication
const httpStatus = require('http-status'); // Importing HTTP status codes for better readability
const ApiError = require('../utils/ApiError'); // Importing a custom error handling class
const { roleRights } = require('../config/roles'); // Importing role-based rights configuration

// This function verifies the user's authentication and checks their permissions.
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  // If there's an error, or if no user is found, reject the promise with an unauthorized error.
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user; // Attach the authenticated user to the request object

  // If there are required rights to check
  if (requiredRights.length) {
    // Original code
    const userRights = roleRights.get(user.role); // Get the rights associated with the user's role
    // Check if the user has all the required rights
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    
    // // Timi Fixes
    // const userRights = roleRights.get(user.role) || []; // Default to an empty array
    // const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));

    // If the user does not have the required rights and is not the owner of the resource, reject with a forbidden error
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve(); // Resolve the promise if authentication and authorization checks pass
};

// This function creates the authentication middleware that can be used in routes.
const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    // Use passport to authenticate the user with JWT and handle the verification callback
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next()) // If authentication is successful, proceed to the next middleware
    .catch((err) => next(err)); // If there's an error, pass it to the next error handling middleware
};

module.exports = auth; // Export the auth middleware for use in other parts of the application
