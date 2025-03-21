"use strict";

// Load environment variables from the .env file
require("dotenv").config();

// Core dependencies
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");


// Redis and MongoDB session store
const RedisStore = require("connect-redis").default;
const MongoStore = require("connect-mongo");


// Authentication dependencies
const flash = require("connect-flash");
const passport = require("passport");
const { conn } = require("./config/dbb");

// Import Redis client from config
const redisClient = require("./config/redisClient");

const app = express();


// Hybrid session store: Redis as primary, MongoDB as fallback
const sessionStore = process.env.USE_MONGO_SESSION === "true"
  ? MongoStore.create({
      mongoUrl: conn.client.s.url,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // 14 days
      autoRemove: "interval",
    })
  : new RedisStore({ client: redisClient });

//const store = new RedisStore({ client: redisClient });

// Configure allowed origins for CORS
const allowedOrigins = [
  "*",
  "http://127.0.0.1:3000",
  "http://10.17.1.252:3000",
  "http://10.17.1.114:3000",
  "http://0.0.0.0:3000/",
  "http://localhost:3000",
];

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

// Set up sessions with Redis
app.use(
  session({
    store:sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.url = process.env.FETCH_HOST;
    res.locals.redisClient = redisClient;

    // Set global variable for EJS templates
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.use(bodyParser.json());

// Set up view engine and static assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view cache", false);
app.use(express.static(path.join(__dirname, "public")));


const options = {
  mongoUrl: conn.client.s.url, // MongoDB connection string
  collectionName: "sessions", // Name of the MongoDB collection for session storage
  ttl: 14 * 24 * 60 * 60, //  = 14 days. Default
  autoRemove: "interval", // Automatically remove expired session data
};




// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Load passport configuration
require("./config/authpassport");

// Set up middleware and body parsing
app.use(flash());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); // Keep it consistent
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const indexRoutes = require("./routes/indexRoutes");

const fileManagerRoutes = require("./routes/appsRoutes/fileManagerRoutes");
const chatRoutes = require("./routes/appsRoutes/chatRoutes");
const inboxRoutes = require("./routes/appsRoutes/inboxRoutes");


// For the new app and routes
const appRoutes = require("./routes/appRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/apps/file-manager", fileManagerRoutes);
app.use("/apps/chat", chatRoutes);
app.use("/apps/inbox", inboxRoutes);

// For the new App Structure
app.use("/app", appRoutes);
app.use("/auth", authRoutes);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).render("error/404");
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error/500");
});

redisClient.set("test_key", "Hello Redis!", (err, reply) => {
  if (err) console.error("Redis Error:", err);
  console.log("Redis SET Response:", reply);
});

redisClient.get("test_key", (err, value) => {
  if (err) console.error("Redis Error:", err);
  console.log("Redis GET Response:", value);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
