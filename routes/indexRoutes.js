const express = require("express");
const middleware = require("../middleware/confirm");
const indexController = require("../controller/indexController");
const router = express.Router();



// Change language route
router.get("/", indexController.getHomePage);




module.exports = router;
