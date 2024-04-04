// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController");
const middleware = require("../middleware/confirm");
const storage = require("../middleware/storage");


//POST:Create pastors Employee Data  with post
router.get("/pastorsData", middleware.isLoggedIn, middleware.isLoggedIn,middleware.isAdmin, adminController.getPastors);
router.get( "/legalData", middleware.isLoggedIn, middleware.isAdmin, adminController.getLegal);
router.get( "/leadership", middleware.isAdmin, adminController.getLeadership);



module.exports = router;
