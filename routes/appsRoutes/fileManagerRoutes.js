const express = require("express");
const fileManagerController = require("../../controller/appsControllers/fileManagerController")
const router = express.Router();

router.get("/blank", fileManagerController.getBlank);
router.get("/files", fileManagerController.getFile);
router.get("/folders", fileManagerController.getFolder);
router.get("/settings", fileManagerController.getSettings);


module.exports = router;