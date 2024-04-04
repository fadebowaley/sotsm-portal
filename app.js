// app.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Authentication dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const User = require("./models/user");
const { conn } = require("./config/db");
const MongoStore = require("connect-mongo");

dotenv.config();

const app = express();

const allowedOrigins = ["*"];

app.use(
  cors({
    origin: (origin, next) => {
      if (!origin || allowedOrigins.includes(origin)) {
        next(null, true);
      } else {
        next(new Error(`${origin} not allowed`));
      }
    },
  })
);

// Load passport configuration
require("./config/passport");




app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set up view engine and static assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view cache", false);
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));



const options = {
  //mongoUrl: conn.client.s.url, // MongoDB connection string
  mongoUrl: process.env.MONGO_URI, // MongoDB connection string
  collectionName: "sessions", // Name of the MongoDB collection for session storage
  ttl: 14 * 24 * 60 * 60, //  = 14 days. Default
  autoRemove: "interval", // Automatically remove expired session data
};

//Set Up sessions with version 5.1.0 from 3.2.0
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create(options),
    resave: false, // Add this option to suppress the warning
    saveUninitialized: false, // Add this option to suppress the warning
  })
);


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport middleware
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
        const { title, firstname, lastname, phone } = req.body; // get the firstname and lastname fields from the request body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return done(null, false, { message: "Email already exists" });
        }
        const user = new User({
          title,
          firstname,
          lastname,
          email,
          phone,
          password,
        });
        await user.save();
        console.log('user has been saved to the database')
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "identifier", // use a custom field to accept either email or username
      passwordField: "password",
    },
    async (identifier, password, done) => {
      try {
        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });
        if (!user) {
          return done(null, false, { message: "Invalid email or username" });
        }
        const isMatch = await user.validPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


// Set up middleware and body parsing
app.use(flash());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));


const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const indexRoutes = require("./routes/indexRoutes");


app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// Global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
