const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');

/**
 * Create a new role
 * @route POST /roles
 * @access Private/Admin
 */
const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(httpStatus.CREATED).send(role);
});

/**
 * Get all roles
 * @route GET /roles
 * @access Private/Admin
 */
const getRoles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roleService.queryRoles(filter, options);
  res.send(result);
});

/**
 * Get single role
 * @route GET /roles/:roleId
 * @access Private/Admin
 */
const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRoleById(req.params.roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  res.send(role);
});

/**
 * Update role
 * @route PATCH /roles/:roleId
 * @access Private/Admin
 */
const updateRole = catchAsync(async (req, res) => {
  const role = await roleService.updateRoleById(req.params.roleId, req.body);
  res.send(role);
});

/**
 * Delete role
 * @route DELETE /roles/:roleId
 * @access Private/Admin
 */
const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRoleById(req.params.roleId);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Check permission
 * @route GET /roles/:roleId/has-permission/:permission
 * @access Private/Admin
 */
const checkPermission = catchAsync(async (req, res) => {
  const hasPerm = await roleService.hasPermission(
    req.params.roleId, 
    req.params.permission
  );
  res.send({ 
    roleId: req.params.roleId,
    permission: req.params.permission,
    hasPermission: hasPerm 
  });
});

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
  checkPermission,
};