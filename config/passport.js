//config/passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { UserData } = require("../models");




// function to generate Token
function generateToken() {
  return require("crypto").randomBytes(20).toString("hex");
}

const {
  sendVerificationEmailInBackground,
} = require("../worker/workers");

//send a verification email
async function sendVerificationEmail(email) {
  try {
    // Check if the user exists in the database
    const user = await UserData.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User does not exist");
    }

    // Generate a new token and save it to the user's record in the database
    const token = generateToken();
    user.emailVerificationToken = token;
    user.emailVerificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString(); // Token expires in 24 hours
    await user.save();

    // Send the verification email to the user
    await sendVerificationEmailInBackground(token, email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserData.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {

         const user = await UserData.findOne({
           where: { phoneNumber: phoneNumber },
         });
        if (!user) {
           const user = await UserData.findOne({
          where: { phoneNumber: phoneNumber },
        });
          return done(null, false, { message: "User not Authorised " });
        }
        if (password != req.body.password2) {
          return done(null, false, { message: "Passwords must match" });
        }
        const passwordHash =  await bcrypt.hash(password, 10);

        const newUser = await UserData.create({
          email: email,
          password: passwordHash,
        });

        console.log('user has been registered');
        // Send verification email
        console.log(email);

        await sendVerificationEmail(email);
  
        return done(null, newUser);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);


passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "phoneNumber",
      passwordField: "password",
      passReqToCallback: false,
    },
    async (phoneNumber, password, done) => {
      try {
        const user = await UserData.findOne({
          where: { phoneNumber: phoneNumber },
        });

        if (!user) {
          return done(null, false, { message: "User doesn't exist" });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
