const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNodeStructure = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    level: Joi.string().required().custom(objectId),
    parent: Joi.string().custom(objectId),
    description: Joi.string().trim().allow(''),
    address: Joi.string().trim().allow(''),
  }),
};

const getNodeStructures = {
  query: Joi.object().keys({
    name: Joi.string().trim(),
    level: Joi.string().custom(objectId),
    parent: Joi.string().custom(objectId),
    path: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNodeStructure = {
  params: Joi.object().keys({
    nodeStructureId: Joi.string().custom(objectId),
  }),
};

const updateNodeStructure = {
  params: Joi.object().keys({
    nodeStructureId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      level: Joi.string().custom(objectId),
      parent: Joi.string().custom(objectId),
      description: Joi.string().trim().allow(''),
      address: Joi.string().trim().allow(''),
    })
    .min(1),
};

const deleteNodeStructure = {
  params: Joi.object().keys({
    nodeStructureId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNodeStructure,
  getNodeStructures,
  getNodeStructure,
  updateNodeStructure,
  deleteNodeStructure,
};