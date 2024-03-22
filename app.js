// app.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const flash = require("connect-flash");

const User = require("./models/user");
const { conn } = require("./config/db");
const MongoStore = require("connect-mongo");

dotenv.config();

const app = express();

const allowedOrigins = ["http://127.0.0.1:3000", "*"];

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

// Set up middleware and body parsing
app.use(flash());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/", userRoutes);
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
