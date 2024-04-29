// app.js
const express = require("express");
const session = require("express-session");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const sequelize = require('./config/db'); 
const passport = require("./config/passport"); 


// Authentication dependencies
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const User = require("./models/user");

dotenv.config();

const app = express();




const allowedOrigins = ["*", "http://127.0.0.1:3000"];

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


// Set up sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


// Global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.url = process.env.FETCH_HOST;
    // Set global variable for EJS templates
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


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




// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// Set up middleware and body parsing
app.use(flash());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const indexRoutes = require("./routes/indexRoutes");


//For the new app and routes 
const appRoutes = require("./routes/appRoutes");
const authRoutes = require("./routes/authRoutes");


app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

//For the new App Structure
app.use("/app", appRoutes);
app.use("/auth", authRoutes);






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
