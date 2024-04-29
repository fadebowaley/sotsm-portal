const express = require("express");
const router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

const middleware = require("../middleware/confirm");
const userController = require("../controller/userController");


const {
  userSignUpValidationRules,
  userSignInValidationRules,
  validateSignup,
  validateSignin,
} = require("../middleware/validator");


//Users Authentications
router.post(
  "/signup",
  [
    middleware.isNotLoggedIn,
    passport.authenticate("local.signup", {
      successRedirect: "/",
      failureRedirect: "/",
      failureFlash: true,
      successFlash: true,
    }),
  ],
  userController.postUserRegister
);





// Authentication Utilities
router.post("/forgot/password", userController.postForgotPassword);
router.get("/reset/:token", userController.getResetToken);
router.post("/reset/:token", userController.postResetToken);
router.get("/verify/:token", userController.getVerifiedToken);
router.get("/activate-your-account", userController.getActivateAccount);
router.get("/verification-success", userController.getVerificationSuccess);
router.get(
  "/request-password",
  middleware.isNotLoggedIn,
  userController.getForgotPassword
);


router.get(
  "/resend-verification-email",
  middleware.isLoggedIn,
  userController.getResendVerificationEmail
);




router.get("/login", middleware.isNotLoggedIn, userController.getUserLogin);

router.post(
  "/login",
  [
    middleware.isNotLoggedIn,
    passport.authenticate("local.signin", {
      failureRedirect: "/",
      failureFlash: true,
    }),
  ],
  userController.postUserLogin
);

//User Adminitrations
router.get("/logout", middleware.isLoggedIn, userController.getUserLogout);





module.exports = router;
