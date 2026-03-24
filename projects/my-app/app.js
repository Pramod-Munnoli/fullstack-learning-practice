const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync"); 
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const session = require("express-session");
const flash = require("connect-flash");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Allow the app to parse JSON data from Postman or other APIs
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser("secretcode"));

const sessionOptions = {
    secret: "mysupersecretstring",
     resave:false , 
     saveUninitialized:true,
     cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
     }
    }
app.use(session(sessionOptions));
app.use(flash()); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connection success full");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Middleware to set res.locals.success for flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error"); 
  next();
});

app.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Example: Setting a cookie
app.get("/setcookie", (req, res) => {
  res.cookie("greet", "hello" , {signed: true});
  res.cookie("name", "Pramod", {signed: false});
  res.send("Sent you some cookies!");
});

// Example: Reading cookies using req.cookies (thanks to cookie-parser)
app.get("/greet", (req, res) => {
  let { name = "anonymous" } = req.signedCookies;
  res.send(`Hi, ${name}!`);
});

app.all("*path", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});


const handleValidationErr = (err) => {
  console.log("Validation Error occurred in Listings App");
  err.message =
    "Failed to save listing: Please make sure all required fields are filled correctly.";
  err.status = 400;
  return err;
};

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});

// 2. Custom error handling
app.use((err, req, res, next) => { 
  let { status = 500, message = "General Error" } = err; 
  res.status(status).render("error", { message });
});

app.listen(8000, () => {
  console.log("server is workig on http://localhost:8000/");
});
