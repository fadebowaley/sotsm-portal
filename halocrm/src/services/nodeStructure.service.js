const httpStatus = require('http-status');
const { NodeStructures, NodeLevel } = require('../models');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const createNodeStructure = async (tenantId, userId, nodeStructureBody) => {
  // Verify level exists and belongs to tenant
  const level = await NodeLevel.findOne({ 
    _id: nodeStructureBody.level, 
    tenantId 
  });
  if (!level) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Level not found in your organization');
  }

  // Verify parent exists and belongs to tenant if provided
  if (nodeStructureBody.parent) {
    const parent = await NodeStructures.findOne({ 
      _id: nodeStructureBody.parent, 
      tenantId 
    });
    if (!parent) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Parent structure not found in your organization');
    }
  }

  // Check name uniqueness within tenant
  if (await NodeStructures.findOne({ 
    name: nodeStructureBody.name, 
    tenantId 
  })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Structure name already exists in your organization');
  }

  return NodeStructures.create({ 
    ...nodeStructureBody,
    tenantId,
    createdBy: userId 
  });
};

const queryNodeStructures = async (tenantId, filter, options) => {
  return NodeStructures.paginate(
    { ...filter, tenantId },
    { ...options, populate: 'level parent createdBy' }
  );
};

const getNodeStructureById = async (tenantId, id) => {
  const nodeStructure = await NodeStructures.findOne({ 
    _id: id, 
    tenantId 
  }).populate('level parent createdBy');
  
  if (!nodeStructure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node structure not found');
  }
  return nodeStructure;
};

const updateNodeStructureById = async (tenantId, nodeStructureId, updateBody) => {
  const nodeStructure = await getNodeStructureById(tenantId, nodeStructureId);

  if (updateBody.level) {
    const level = await NodeLevel.findOne({ 
      _id: updateBody.level, 
      tenantId 
    });
    if (!level) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Level not found in your organization');
    }
  }

  if (updateBody.parent) {
    const parent = await NodeStructures.findOne({ 
      _id: updateBody.parent, 
      tenantId 
    });
    if (!parent) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Parent structure not found in your organization');
    }
  }

  if (updateBody.name && await NodeStructures.findOne({
    name: updateBody.name,
    tenantId,
    _id: { $ne: nodeStructureId }
  })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Structure name already exists');
  }

  Object.assign(nodeStructure, updateBody);
  await nodeStructure.save();
  return nodeStructure;
};

const deleteNodeStructureById = async (tenantId, nodeStructureId) => {
  const nodeStructure = await getNodeStructureById(tenantId, nodeStructureId);

  // Check for child structures
  const childrenCount = await NodeStructures.countDocuments({ 
    parent: nodeStructureId,
    tenantId 
  });
  
  if (childrenCount > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Cannot delete structure with ${childrenCount} child structures`
    );
  }

  await nodeStructure.remove();
  return nodeStructure;
};

module.exports = {
  createNodeStructure,
  queryNodeStructures,
  getNodeStructureById,
  updateNodeStructureById,
  deleteNodeStructureById,
};