const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const roleSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Role name is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Role name must be at least 3 characters long'],
    validate: {
      validator: (value) => validator.isAlpha(value, 'en-US', { ignore: ' -' }),
      message: 'Role name should only contain letters, spaces, or hyphens',
    },
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters'],
  },
  permissions: {
    type: [String], // Array of permissions
    validate: {
      validator: (arr) => arr.every((perm) => validator.isAlphanumeric(perm)),
      message: 'Each permission should be alphanumeric',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);


// ===== ADD THE STATIC METHOD HERE =====
roleSchema.statics.isNameTaken = async function (name, excludeRoleId) {
  const role = await this.findOne({ 
    name, 
    _id: { $ne: excludeRoleId } 
  });
  return !!role;
};
// =====================================

/**
 * @typedef Role
 */

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
