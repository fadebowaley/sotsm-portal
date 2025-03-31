const httpStatus = require('http-status');
const { Role } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a role
 * @param {Object} roleBody
 * @returns {Promise<Role>}
 */
const createRole = async (roleBody) => {
  // Check if role name already exists
  if (await Role.isNameTaken(roleBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role name already taken');
  }
  
  // Validate permissions array if provided
  if (roleBody.permissions && !Array.isArray(roleBody.permissions)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Permissions must be an array');
  }

  return Role.create(roleBody);
};

/**
 * Get role by ID
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const getRoleById = async (id) => {
  return Role.findById(id);
};

/**
 * Get role by name
 * @param {string} name
 * @returns {Promise<Role>}
 */
const getRoleByName = async (name) => {
  return Role.findOne({ name });
};

/**
 * Query for roles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option
 * @param {number} [options.limit] - Maximum results per page
 * @param {number} [options.page] - Current page
 * @returns {Promise<QueryResult>}
 */
const queryRoles = async (filter, options) => {
  return Role.paginate(filter, options);
};

/**
 * Update role by ID
 * @param {ObjectId} roleId
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */
const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  // Prevent duplicate role names
  if (updateBody.name && (await Role.isNameTaken(updateBody.name, roleId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role name already taken');
  }

  Object.assign(role, updateBody);
  await role.save();
  return role;
};

/**
 * Delete role by ID
 * @param {ObjectId} roleId
 * @returns {Promise<Role>}
 */
const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await role.remove();
  return role;
};

/**
 * Check if role has specific permission
 * @param {ObjectId} roleId
 * @param {string} permission
 * @returns {Promise<boolean>}
 */
const hasPermission = async (roleId, permission) => {
  const role = await getRoleById(roleId);
  if (!role) return false;
  return role.permissions.includes(permission);
};

module.exports = {
  createRole,
  getRoleById,
  getRoleByName,
  queryRoles,
  updateRoleById,
  deleteRoleById,
  hasPermission,
};