const express = require("express");
const router = express.Router({ mergeParams: true }); // Crucial for getting :id
const wrapAsync = require("../utils/wrapAsync"); // Need to import
const { reviewSchema } = require("../schema.js"); // Need to import
const ExpressError = require("../utils/ExpressError"); // Need to import
const Listing = require("../models/listing"); // Need to import
const Review = require("../models/review.js"); // Need to import

// Review Validation Middleware
const validationReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// POST Review Route (Path is just "/" because it's mounted at /listings/:id/reviews)
router.post("/", validationReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.reviews);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

// DELETE Review Route (Path is just "/:reviewId")
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
