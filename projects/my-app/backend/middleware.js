const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");
const { reviewSchema } = require("./schema.js");
const wrapAsync = require("./utils/wrapAsync"); 

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ success: false, message: "You must be logged in!" });
    }
    next();
};

module.exports.isOwner = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).json({ success: false, message: "Listing not found!" });
    }
    if (!listing.owner.equals(req.user._id)) {
        return res.status(403).json({ success: false, message: "You are not the owner of this listing!" });
    }
    next();
});

module.exports.isReviewAuthor = wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review) {
        return res.status(404).json({ success: false, message: "Review not found!" });
    }
    if (!review.author.equals(req.user._id)) {
        return res.status(403).json({ success: false, message: "You are not the author of this review!" });
    }
    next();
});

// Validate Listing Middleware
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validationReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

