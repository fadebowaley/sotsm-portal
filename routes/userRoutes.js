const express = require("express");
const router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const middleware = require("../middleware/auth");
const userController = require("../controller/userController");



// ====================
// GET Routes for Authentication
// ====================
router.get("/login", middleware.isNotLoggedIn, userController.getUserLogin);
router.get("/welcome", middleware.isNotLoggedIn, userController.getWelcome);
router.get("/verify", middleware.isNotLoggedIn, userController.getUserVerify);
router.get(
  "/activate",
  middleware.isNotLoggedIn,
  userController.getActivateAccount
);
router.get(
  "/reset-password",
  middleware.isNotLoggedIn,
  userController.getForgotPassword
);
router.get(
  "/register",
  middleware.isNotLoggedIn,
  userController.getUserRegister
);
router.get(
  "/resend",
  middleware.isLoggedIn,
  userController.getResendVerificationEmail
);
router.get("/verify/:token", userController.getVerifiedToken);

// ====================
// User Administration Routes
// ====================
router.get("/logout", middleware.isLoggedIn, userController.getUserLogout);

// ====================
// Authentication Utilities
// ====================
router.post("/forgot/password", userController.postForgotPassword);
router.get("/reset/:token", userController.getResetToken);
router.post("/reset/:token", userController.postResetToken);

// ====================
// POST Routes for User Authentication
// ====================
router.post(
  "/login",
  [middleware.isNotLoggedIn, passport.authenticate("local.signin")],
  //[middleware.isNotLoggedIn, passport.authenticate("local.signin")],
  userController.postUserLogin
);


router.post(
  "/signup",
  [
    middleware.isNotLoggedIn,
    passport.authenticate("local.signup"),
  ],
  userController.postUserRegister
);




module.exports = router;
