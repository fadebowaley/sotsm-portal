const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { nodeLevelService } = require('../services');

const createNodeLevel = catchAsync(async (req, res) => {
  const nodeLevel = await nodeLevelService.createNodeLevel(
    req.user.tenantId,
    req.user.id,
    req.body
  );
  res.status(httpStatus.CREATED).send(nodeLevel);
});

const getNodeLevels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'rank', 'isSpecial']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await nodeLevelService.queryNodeLevels(req.user.tenantId, filter, options);
  res.send(result);
});

const getNodeLevel = catchAsync(async (req, res) => {
  const nodeLevel = await nodeLevelService.getNodeLevelById(
    req.user.tenantId,
    req.params.nodeLevelId
  );
  res.send(nodeLevel);
});

const updateNodeLevel = catchAsync(async (req, res) => {
  const nodeLevel = await nodeLevelService.updateNodeLevelById(
    req.user.tenantId,
    req.params.nodeLevelId,
    req.body
  );
  res.send(nodeLevel);
});

const deleteNodeLevel = catchAsync(async (req, res) => {
  await nodeLevelService.deleteNodeLevelById(
    req.user.tenantId,
    req.params.nodeLevelId
  );
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNodeLevel,
  getNodeLevels,
  getNodeLevel,
  updateNodeLevel,
  deleteNodeLevel,
};