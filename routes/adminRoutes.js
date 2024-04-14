// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController");
const middleware = require("../middleware/confirm");
const storage = require("../middleware/storage");


//POST:Create pastors Employee Data  with post
router.get("/pastors", middleware.isLoggedIn, adminController.getPastors);
router.get( "/legal", middleware.isLoggedIn,  adminController.getLegal); //property status
router.get( "/leadership",  adminController.getLeadership); //ordinations

//other direcotry
router.get("/report", middleware.isLoggedIn, adminController.getReport); // church strength
router.get( "/analysis",  adminController.getAnalysis); // church strength
router.get("/active-workforce", middleware.isLoggedIn, middleware.isLoggedIn, adminController.getActiveAge);
router.get("/missions", middleware.isLoggedIn,  adminController.getMissions);
router.get("/campuses", middleware.isLoggedIn,  adminController.getCampus);
router.get("/region", middleware.isLoggedIn,  adminController.getRegions);
router.get("/nations", middleware.isLoggedIn,  adminController.getNations);
router.get("/divisions", middleware.isLoggedIn,  adminController.getDivisions);
router.get("/schools", middleware.isLoggedIn,  adminController.getSchools);

module.exports = router;
