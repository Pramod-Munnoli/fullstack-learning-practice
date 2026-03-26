const express = require("express");
const router = express.Router({ mergeParams: true }); // Crucial for getting :id
const wrapAsync = require("../utils/wrapAsync"); // Need to import
const { validationReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js"); // Need to import


// POST Review Route
router.post(
    "/",
    isLoggedIn,
    validationReview,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.reviews);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success", "Review added successfully!");
        res.redirect(`/listings/${listing._id}`);
    })
);

// DELETE Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review deleted successfully!");
        res.redirect(`/listings/${id}`);
    })
);

module.exports = router;
