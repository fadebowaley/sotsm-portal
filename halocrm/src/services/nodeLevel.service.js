const httpStatus = require('http-status');
const { NodeLevel } = require('../models');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/**
 * Create a node level
 */
const createNodeLevel = async (tenantId, userId, nodeLevelBody) => {
  // Check name uniqueness within tenant
  if (await NodeLevel.findOne({ name: nodeLevelBody.name, tenantId })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Level name already exists in your organization');
  }

  // Check rank uniqueness for non-special levels
  if (!nodeLevelBody.isSpecial && await NodeLevel.findOne({ 
    rank: nodeLevelBody.rank, 
    tenantId,
    isSpecial: false 
  })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Rank already exists for non-special level');
  }

  return NodeLevel.create({ 
    ...nodeLevelBody,
    tenantId,
    createdBy: userId 
  });
};

/**
 * Query node levels
 */
const queryNodeLevels = async (tenantId, filter, options) => {
  const result = await NodeLevel.paginate(
    { ...filter, tenantId },
    { ...options, populate: 'createdBy' }
  );
  return result;
};

/**
 * Get node level by id
 */
const getNodeLevelById = async (tenantId, id) => {
  const nodeLevel = await NodeLevel.findOne({ _id: id, tenantId }).populate('createdBy');
  if (!nodeLevel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node level not found');
  }
  return nodeLevel;
};

/**
 * Update node level by id
 */
const updateNodeLevelById = async (tenantId, nodeLevelId, updateBody) => {
  const nodeLevel = await getNodeLevelById(tenantId, nodeLevelId);
  
  if (updateBody.name && await NodeLevel.findOne({ 
    name: updateBody.name, 
    tenantId,
    _id: { $ne: nodeLevelId } 
  })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Level name already exists');
  }

  if (updateBody.rank && !(updateBody.isSpecial ?? nodeLevel.isSpecial)) {
    const existingRank = await NodeLevel.findOne({
      rank: updateBody.rank,
      tenantId,
      isSpecial: false,
      _id: { $ne: nodeLevelId }
    });
    if (existingRank) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Rank already exists for non-special level');
    }
  }

  Object.assign(nodeLevel, updateBody);
  await nodeLevel.save();
  return nodeLevel;
};

/**
 * Delete node level by id
 */
const deleteNodeLevelById = async (tenantId, nodeLevelId) => {
  const nodeLevel = await getNodeLevelById(tenantId, nodeLevelId);
  
  // Check if any structures use this level
  const structuresCount = await mongoose.model('NodeStructures').countDocuments({ 
    level: nodeLevelId,
    tenantId 
  });
  
  if (structuresCount > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Cannot delete level as it's used by ${structuresCount} structure(s)`
    );
  }

  await nodeLevel.remove();
  return nodeLevel;
};

module.exports = {
  createNodeLevel,
  queryNodeLevels,
  getNodeLevelById,
  updateNodeLevelById,
  deleteNodeLevelById,
};