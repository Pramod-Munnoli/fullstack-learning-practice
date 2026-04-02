const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  const { q, category } = req.query;
  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
    ];
  }

  const allListings = await Listing.find(filter);
  res.json({ success: true, allListings, q, category });
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
    return res.status(404).json({ success: false, message: "Listing not found!" });
  }
  res.json({ success: true, listing });
});

module.exports.createListing = wrapAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image is required!" });
  }
  let url = req.file.path;
  let filename = req.file.filename;

  const query = `${req.body.listing.location}, ${req.body.listing.country}`;
  let data = {};
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

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

  if (data.features && data.features.length > 0 && data.features[0].geometry.coordinates.length === 2) {
    newListing.geometry = data.features[0].geometry;
  } else {
    newListing.geometry = { type: "Point", coordinates: [77.209, 28.6139] };
  }

  await newListing.save();
  res.status(201).json({ success: true, listing: newListing, message: "New Listing Created!" });
});

module.exports.updateListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found!" });
  }

  const query = `${req.body.listing.location}, ${req.body.listing.country}`;
  let data = {};

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

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

  res.json({ success: true, listing, message: "Listing updated successfully!" });
});

module.exports.deleteListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.json({ success: true, message: "Listing deleted successfully!" });
});

module.exports.toggleLike = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }

  const userId = req.user._id;
  if (listing.likes.includes(userId)) {
    listing.likes.pull(userId);
  } else {
    listing.likes.push(userId);
  }
  await listing.save();
  res.json({ success: true, liked: listing.likes.includes(userId), likesCount: listing.likes.length });
});

