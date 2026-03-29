const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

module.exports.renderNewForm = wrapAsync(async (req, res) => {
  res.render("listings/new");
});

module.exports.showListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
});

module.exports.createListing = wrapAsync(async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  // 1. ADD THIS PART: Geocoding with MapTiler
  const query = `${req.body.listing.location}, ${req.body.listing.country}`;
  let data = {};
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.MAPTILER_API_KEY}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
        data = await response.json();
    }
  } catch (err) {
    console.error("Geocoding failed or timed out:", err.message);
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // 2. ADD THIS PART: Set the geometry
  if (data.features && data.features.length > 0 && data.features[0].geometry.coordinates.length === 2) {
    newListing.geometry = data.features[0].geometry;
  } else {
    // Default coordinates in case geocoding fails or returns empty
    newListing.geometry = { type: "Point", coordinates: [77.209, 28.6139] };
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
});


module.exports.renderEditForm = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit", { listing, originalImageUrl });
});

module.exports.updateListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  // 3. ADD THIS PART: Update coordinates if user edited the location
  const query = `${req.body.listing.location}, ${req.body.listing.country}`;
  let data = {};

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.MAPTILER_API_KEY}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
        data = await response.json();
    }
  } catch (err) {
    console.error("Geocoding update failed or timed out:", err.message);
  }
  if (data.features && data.features.length > 0 && data.features[0].geometry.coordinates.length === 2) {
    listing.geometry = data.features[0].geometry;
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  await listing.save();

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
});


module.exports.deleteListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
});
