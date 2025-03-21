const express = require("express");
const chatController = require("../../controller/appsControllers/chatController")
const router = express.Router();

router.get("/private", chatController.getPrivate);
router.get("/group", chatController.getGroup);
router.get("/drawer", chatController.getDrawer);


module.exports = router;