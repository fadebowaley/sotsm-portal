const Joi = require('joi');

const checkPermission = {
  params: Joi.object().keys({
    roleId: Joi.string().required().pattern(/^[a-f\d]{24}$/i), // MongoDB ObjectId
    permission: Joi.string().required().alphanum()
  }),
};

module.exports = {
  createRole: { /* ... existing ... */ },
  getRoles: { /* ... existing ... */ },
  getRole: { /* ... existing ... */ },
  updateRole: { /* ... existing ... */ },
  deleteRole: { /* ... existing ... */ },
  checkPermission // Add this
};
