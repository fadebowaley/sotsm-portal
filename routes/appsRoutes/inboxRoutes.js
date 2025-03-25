const express = require("express");
const inboxController = require("../../controller/apps/inboxController");
const router = express.Router();

router.get("/listing", inboxController.getMesssages);
router.get("/compose", inboxController.getCompose);
router.get("/reply", inboxController.getReply);


module.exports = router;