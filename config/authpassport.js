const authpassport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../mongo/user");

// function to generate Token
function generateToken() {
  return require("crypto").randomBytes(20).toString("hex");
}

// Function to generate unique IDs
const generateTenantId = () => {
  return "HALO" + Math.floor(100000 + Math.random() * 900000).toString();
};

const generateUserId = () => {
  return "CLC" + Math.floor(1000000 + Math.random() * 9000000).toString();
};

const { sendVerificationEmailInBackground } = require("../worker/workers");

//send a verification email
async function sendVerificationEmail(email) {
  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }

  // Generate a new token and save it to the user's record in the database
  const token = generateToken();
  user.emailVerificationToken = token;
  user.emailVerificationTokenExpiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ); // Token expires in 24 hours
  await user.save();

  // Send the verification email to the user
  await sendVerificationEmailInBackground(token, email, user.firstname);
}

// Serialize user into session
authpassport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user by storing user ID in the session
});

// Deserialize user from session
authpassport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Retrieve user by ID
    done(null, user); // Pass user to the next middleware
  } catch (err) {
    done(err, null); // Handle errors
  }
});

// authpassport middleware
authpassport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        console.log("The email was received on the sign-up passport");
        const { firstname, lastname } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log("this email already exist");
          return done(null, false, {
            message: " We are sorry your Email already exists",
          });
        }
        const user = new User({
          userId: generateUserId(),
          firstname,
          lastname,
          email,
          password,
          isOwner: true,
          tenantId: generateTenantId(),
        });
        await user.save();
        console.log("data is saved");
        //send verification email
        //sendVerificationEmail(user.email);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

authpassport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email", // use a custom field to accept either email or username
      passwordField: "password",
    },
    async (email, password, done) => { // Changed identifier to email
      try {
        console.log("we are trying to login . . . ");

        const user = await User.findOne({ email }); // Use email directly

        if (!user) {
          console.log("user not available")
          return done(null, false, { message: "Invalid email or username" });
        }

        const isMatch = await user.validPassword(password);
        if (!isMatch) {
          console.log("password is not matched ")
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = authpassport;
