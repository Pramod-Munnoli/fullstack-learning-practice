const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const { listingSchema } = require("./schema.js");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Allow the app to parse JSON data from Postman or other APIs
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

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

// Index Route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// Show Route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  }),
);

// Validate Listing Middleware
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Create Route
app.post( "/listings",validateListing,wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

// Edit Route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  }),
);

// Update Route
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }),
);

// Middleware to protect the remove route
// We use .all to cover any method on this specific path
const checkToken = (req, res, next) => {
  let { token } = req.query; // Check for ?token=... in the URL
  if (token === "giveaccess") {
    return next(); // Correctly return next to stop the current function
  }
  throw new ExpressError(401, "You are not authorized to delete this listing");
};

// Delete route - Now protected because the path matches!
app.delete(
  "/listings/:id/remove",
  checkToken,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  }),
);

app.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);

app.all(/.*/, (req, res, next) => {
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
  // Pull 'status' from err
  let { status = 500, message = "General Error" } = err;
  // Use the 'status' variable we just created!
  res.status(status).render("error", { message });
});

app.listen(8080, () => {
  console.log("server is workig on http://localhost:8080/");
});
