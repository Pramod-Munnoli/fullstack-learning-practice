const express = require("express");
const router = express.Router({ mergeParams: true }); // Crucial for getting :id
const { validationReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

// POST Review Route
router.post(
    "/",
    isLoggedIn,
    validationReview,
    reviewController.createReview
);

// DELETE Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    reviewController.deleteReview
);

module.exports = router;
