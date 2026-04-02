const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, ".env"), override: true });
}
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const cors = require("cors");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Allow credentials so session cookies can be sent from React
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("secretcode"));

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SECRET || "mysupersecretstring",
  },
  touchAfter: 24 * 60 * 60 * 1000,
});

store.on("error", function (err) {
  console.log("Error in Mongo session Store", err);
});

const sessionOptions = {
  store: store,
  secret: process.env.SECRET || "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax", // Crucial for cross-origin cookies in dev
    secure: false, // Set to true in production with HTTPS
  }
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const DB_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connection success full");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

// Global user middleware
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

// API endpoint to check current user session
app.get("/api/current-user", (req, res) => {
  res.json({ success: true, user: req.user || null });
});

app.use("/api/listings", listingsRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api", userRouter);

// Serve the static React frontend in production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "production-render") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use((req, res, next) => {
  next(new ExpressError(404, "API endpoint not found!"));
});

const handleValidationErr = (err) => {
  err.message = "Failed to save data: Please make sure all required fields are filled correctly.";
  err.status = 400;
  return err;
};

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});

// Custom error handling - returns JSON instead of rendering a view
app.use((err, req, res, next) => {
  let { status = 500, message = "General Error" } = err;
  res.status(status).json({ success: false, message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is working on port ${PORT}/`);
});

