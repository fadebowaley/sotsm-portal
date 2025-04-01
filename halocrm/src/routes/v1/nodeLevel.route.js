const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { nodeLevelValidation } = require('../../validations');
const { nodeLevelController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageNodeLevels'),
    validate(nodeLevelValidation.createNodeLevel),
    nodeLevelController.createNodeLevel
  )
  .get(
    auth('getNodeLevels'),
    validate(nodeLevelValidation.getNodeLevels),
    nodeLevelController.getNodeLevels
  );

router
  .route('/:nodeLevelId')
  .get(
    auth('getNodeLevels'),
    validate(nodeLevelValidation.getNodeLevel),
    nodeLevelController.getNodeLevel
  )
  .patch(
    auth('manageNodeLevels'),
    validate(nodeLevelValidation.updateNodeLevel),
    nodeLevelController.updateNodeLevel
  )
  .delete(
    auth('manageNodeLevels'),
    validate(nodeLevelValidation.deleteNodeLevel),
    nodeLevelController.deleteNodeLevel
  );

module.exports = router;