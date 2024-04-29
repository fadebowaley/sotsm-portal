const express = require("express");
const router = express.Router();
const appController = require("../controller/appController");





router.get("/", appController.getData); // first default Homepage


router.get( "/home");


module.exports = router;