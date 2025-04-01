const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { nodeStructureValidation } = require('../../validations');
const { nodeStructureController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageNodeStructures'),
    validate(nodeStructureValidation.createNodeStructure),
    nodeStructureController.createNodeStructure
  )
  .get(
    auth('getNodeStructures'),
    validate(nodeStructureValidation.getNodeStructures),
    nodeStructureController.getNodeStructures
  );

router
  .route('/:nodeStructureId')
  .get(
    auth('getNodeStructures'),
    validate(nodeStructureValidation.getNodeStructure),
    nodeStructureController.getNodeStructure
  )
  .patch(
    auth('manageNodeStructures'),
    validate(nodeStructureValidation.updateNodeStructure),
    nodeStructureController.updateNodeStructure
  )
  .delete(
    auth('manageNodeStructures'),
    validate(nodeStructureValidation.deleteNodeStructure),
    nodeStructureController.deleteNodeStructure
  );

module.exports = router;