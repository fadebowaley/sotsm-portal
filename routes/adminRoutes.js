// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController");
const middleware = require("../middleware/auth");
const storage = require("../middleware/storage");


//POST:Create pastors Employee Data  with post

// User Permissions Routes
router.get("/permissions", middleware.isLoggedIn, adminController.renderPermissionsPage);

// User Roles Routes
router.get("/roles", middleware.isLoggedIn, adminController.getRoles);
router.get("/roles/view", middleware.isLoggedIn, adminController.getRoleView);


// User Settings Routes
router.get("/user-settings", middleware.isLoggedIn, adminController.getUserSettings);
router.get("/onboarding", middleware.isLoggedIn, adminController.getSubscription);
router.get(
  "/subscription",
  middleware.isLoggedIn,
  adminController.getSubscriptionList
);


// File Management Routes
router.get("/folder", middleware.isLoggedIn, adminController.getFolder);
router.get("/files", middleware.isLoggedIn, adminController.getFiles);
router.get("/folder-list", middleware.isLoggedIn, adminController.getFolderList);





// getUsers:
router.get("/users", middleware.isLoggedIn, adminController.getUsers);
router.get("/pastors", middleware.isLoggedIn, adminController.getPastors);
router.get( "/legal", middleware.isLoggedIn,  adminController.getLegal); //property status
router.get( "/leadership",  adminController.getLeadership); //ordinations

router.get("/api/users", middleware.isLoggedIn, adminController.getFetchUsers);
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
