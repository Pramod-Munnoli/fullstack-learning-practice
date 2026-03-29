const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");  
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); 

router.route("/")
// Index Route
    .get(listingController.index)
// Create Route
    .post( isLoggedIn,upload.single('listing[image]'),
     validateListing,listingController.createListing
    );
    
// New Route
router.get("/new",
  isLoggedIn,
  listingController.renderNewForm
);

router.route("/:id")
// Show Route 
    .get(listingController.showListing)
// Update Route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'),
     validateListing, listingController.updateListing)
// Delete Route
    .delete(isLoggedIn, isOwner, listingController.deleteListing);

// Like Route
router.post("/:id/like", isLoggedIn, listingController.toggleLike);

// Edit Route
router.get("/:id/edit",
 isLoggedIn, isOwner, 
   listingController.renderEditForm
  );

module.exports = router;