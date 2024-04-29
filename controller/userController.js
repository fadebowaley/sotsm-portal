//church assigned to user
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { UserData } = require("../models");

//Create new controller for the User
const userController = {
  
  getForgotPassword: (req, res) => {
    const errorMsg = req.flash("error")[0];
    const successMsg = req.flash("success")[0];
    res.render("user/requestPassword", {
      errorMsg,
      successMsg,
      pageName: "Reset Password",
    });
  },

  //GET: function for verification success Page
  getVerificationSuccess: (req, res) => {
    const errorMsg = req.flash("error")[0];
    const successMsg = req.flash("success")[0];
    res.render("user/verified", {
      // csrfToken: req.csrfToken(),
      errorMsg,
      successMsg,
      pageName: "Verified Completed",
    });
  },

  //GET: Activate account
  getActivateAccount: async (req, res, next) => {
    try {
      const successMsg = req.flash("success")[0];
      const errorMsg = req.flash("error")[0];
      res.render("user/confirm", {
        successMsg,
        errorMsg,
        // csrfToken: req.csrfToken(),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  //POST: forgot password functions
  postForgotPassword: async (req, res, next) => {
    const email = req.body.email;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        req.flash(
          "success",
          " We have received your request. If you have an account with us, further instructions will be sent to your email address shortly."
        );
        return res.redirect("/user/login");
      }

      // Generate a random token for password reset
      const token = generateToken();
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
      sendPasswordResetEmailInBackground(token, email);
      req.flash(
        "success",
        " We have received your request. If you have an account with us, further instructions will be sent to your email address shortly."
      );

      res.redirect("/user/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      next(error);
    }
  },

  //GET: Reset token from the email
  getResetToken: async (req, res, next) => {
    try {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      // Find user with matching reset token
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      // If no user found, token is invalid or has expired
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/user/request-password");
      }

      // Render password reset form
      res.render("user/reset", {
        token: req.params.token,
        errorMsg,
        successMsg,
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      next(error);
    }
  },

  //POST: reset token code and verify
  postResetToken: async (req, res, next) => {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/user/request-password");
      }

      console.log("user data before modification - - >  ", user);
      console.log("the password in question --> ", req.body.password);
      const password = req.body.password;

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      console.log("user after modification -->", user);

      req.flash(
        "success",
        "Thank you! Your password has been reset sucessfully, you can now login."
      );
      res.redirect("/user/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      next(error);
    }
  },

  getResendVerificationEmail: async (req, res) => {
    try {
      // Send verification email to the logged-in user's email
      await sendVerificationEmail(req.user.email);
      req.flash("success", "Verification email has been resent.");
      res.redirect("/user/activate-your-account");
    } catch (err) {
      console.log(err);
      req.flash(
        "error",
        "Unable to resend verification email. Please try again later."
      );
      res.redirect("/user/activate-your-account");
    }
  },

  //POST: post User Register just for verification email
  postUserRegister: async (req, res) => {
    console.log('the matter reach here . . .')
    try {
        await sendVerificationEmail(req.user.email);
        req.flash(
          "success",
          "A verification email has been sent to your email address. Please verify your email before logging in."
        );
        res.redirect("/");
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  },


  //GET: router for verifying Token
  getVerifiedToken: async (req, res, next) => {
    try {
      // Find the user with the verification token
      const user = await User.findOne({
        emailVerificationToken: req.params.token,
        emailVerificationTokenExpiresAt: { $gt: Date.now() },
      });

      if (!user) {
        req.flash("error", "Invalid verification token");
        return res.redirect("/user/login");
      }

      if (user.emailVerified) {
        req.flash("success", "Your Account is already verified. Thank you !");
        return res.redirect("/user/verification-success");
      }
      if (
        !user.emailVerified &&
        user.emailVerificationTokenExpiresAt < Date.now()
      ) {
        req.flash("error", "Your Token has expired please get a new token.");
        return res.redirect("/user/resend-verification-email");
      }
      // Set the user's email as verified and remove the verification token
      user.emailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerifiedAt = Date.now();
      await user.save();
      req.flash(
        "success",
        "Email verification successful! You can now log in."
      );
      return res.redirect("/user/verification-success");
    } catch (error) {
      console.error("Error verifying email:", error);
      next(error);
    }
  },

  // GET: display the signin form with csrf token
  getUserLogin: async (req, res) => {
    var errorMsg = req.flash("error")[0];
    var successMsg = req.flash("success")[0];
    res.render("user/login", {
      errorMsg,
      successMsg,
      pageName: "Sign In",
    });
  },

  //POST: Post User Login
  postUserLogin: async (req, res) => {
    try {
      res.json({
        success: true,
        message: "success: login successfully",
        redirectUrl: "/",})
    } catch (err) {
      console.log(err);
      req.flash("error", "this is error: " + err.message);
      console.log("error", "Error during login: " + err.message);
      res.redirect("/");
    }
  },

  // GET: logout
  getUserLogout: (req, res) => {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      req.session.cart = null;
      res.redirect("/");
    });
  },



};

module.exports = userController;
