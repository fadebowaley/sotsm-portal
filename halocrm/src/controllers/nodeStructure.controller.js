const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { nodeStructureService } = require('../services');

const createNodeStructure = catchAsync(async (req, res) => {
  const nodeStructure = await nodeStructureService.createNodeStructure(
    req.user.tenantId,
    req.user.id,
    req.body
  );
  res.status(httpStatus.CREATED).send(nodeStructure);
});

const getNodeStructures = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'level', 'parent', 'path']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await nodeStructureService.queryNodeStructures(
    req.user.tenantId,
    filter,
    options
  );
  res.send(result);
});

const getNodeStructure = catchAsync(async (req, res) => {
  const nodeStructure = await nodeStructureService.getNodeStructureById(
    req.user.tenantId,
    req.params.nodeStructureId
  );
  res.send(nodeStructure);
});

const updateNodeStructure = catchAsync(async (req, res) => {
  const nodeStructure = await nodeStructureService.updateNodeStructureById(
    req.user.tenantId,
    req.params.nodeStructureId,
    req.body
  );
  res.send(nodeStructure);
});

const deleteNodeStructure = catchAsync(async (req, res) => {
  await nodeStructureService.deleteNodeStructureById(
    req.user.tenantId,
    req.params.nodeStructureId
  );
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNodeStructure,
  getNodeStructures,
  getNodeStructure,
  updateNodeStructure,
  deleteNodeStructure,
};