const mongoose = require('mongoose');
const validator = require('validator');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { toJSON, paginate, tenantPlugin } = require('./plugins');
const logger = require('../config/logger');

const roleSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'Role name is required'],
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
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', default: [] }], // Linked to Permission
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
});

// Add plugins that convert mongoose to JSON and handle pagination
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);
roleSchema.plugin(tenantPlugin);

// Static method to check if a role name is taken
roleSchema.statics.isNameTaken = async function (name, excludeRoleId) {
  const role = await this.findOne({
    name,
    _id: { $ne: excludeRoleId },
  });
  return !!role;
};

// Static method to create a role
roleSchema.statics.createRole = async function (roleData, currentUser) {
  if (!currentUser?.tenantId || !currentUser?.userId) {
    throw new Error('Missing tenantId or userId in currentUser');
  }

  // Attach user and tenant IDs
  const completeData = {
    ...roleData,
    tenantId: currentUser.tenantId,
    userId: currentUser.userId,
  };

  const role = new this(completeData);
  await role.save();
  return role;
};

// Static method to bulk create roles
roleSchema.statics.bulkCreateRoles = async function (rolesArray, user) {
  if (!user?.isOwner && !user?.hasPermissionToCreateRoles) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to create roles');
  }

  if (!Array.isArray(rolesArray) || rolesArray.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Roles array is empty');
  }

  const existingNames = await this.find({
    name: { $in: rolesArray.map((role) => role.name) },
    tenantId: user.tenantId,
  }).distinct('name');

  const rolesToCreate = rolesArray
    .map((role) => {
      if (existingNames.includes(role.name)) {
        logger.info(`Role name "${role.name}" already exists for this tenant, skipping...`);
        return null;
      }
      return {
        ...role,
        tenantId: user.tenantId,
        userId: user.userId,
      };
    })
    .filter((role) => role !== null);

  if (rolesToCreate.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All role names already exist for this tenant');
  }

  return await this.insertMany(rolesToCreate);
};

// Static method to delete all roles for a tenant
roleSchema.statics.deleteAllRoles = async function (tenantId) {
  if (!tenantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tenant ID is required to delete all roles');
  }
  try {
    // Perform the deletion
    const result = await this.deleteMany({ tenantId });
    // Check if any roles were deleted
    if (result.deletedCount === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No roles found for this tenant');
    }
    // Return the result with the number of deleted roles
    return {
      message: `${result.deletedCount} roles successfully deleted.`,
      deletedCount: result.deletedCount,
    };
  } catch (error) {
    // Catching unexpected errors and rethrowing as API error
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error deleting roles', error);
  }
};

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
