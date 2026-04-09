const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");
const { reviewSchema } = require("./schema.js");
const wrapAsync = require("./utils/wrapAsync"); 

const jwt = require("jsonwebtoken");
const User = require("./models/user");

module.exports.isLoggedIn = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
   if (!token) {
        return res.status(401).json({ success: false, message: "No token provided!" });
    }
    try {
        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3. Attach user to request so other middlewares can use it
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return res.status(403).json({ success: false,
             message: "Invalid or expired token!" 
        });
    }

};

module.exports.isOwner = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    if (!id || id === "undefined") {
        return res.status(400).json({ success: false, message: "Invalid Listing ID provided!" });
    }
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

