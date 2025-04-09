const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNodeLevel = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    description: Joi.string().trim().allow(''),
    rank: Joi.number().required().integer(),
    isSpecial: Joi.boolean(),
  }),
};

const getNodeLevels = {
  query: Joi.object().keys({
    name: Joi.string().trim(),
    rank: Joi.number().integer(),
    isSpecial: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNodeLevel = {
  params: Joi.object().keys({
    nodeLevelId: Joi.string().custom(objectId),
  }),
};

const updateNodeLevel = {
  params: Joi.object().keys({
    nodeLevelId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      description: Joi.string().trim().allow(''),
      rank: Joi.number().integer(),
      isSpecial: Joi.boolean(),
    })
    .min(1),
};

const deleteNodeLevel = {
  params: Joi.object().keys({
    nodeLevelId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNodeLevel,
  getNodeLevels,
  getNodeLevel,
  updateNodeLevel,
  deleteNodeLevel,
};