const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controlers/reviews.js");


//Rewies
//Post Review Route

router.post("/", 
  validateReview, isLoggedIn, 
  wrapAsync(reviewController.createReview));


//Delete Reviews Route

router.delete("/:reviewId",
  isLoggedIn,isReviewAuthor, 
  wrapAsync(reviewController.destroyReview));


module.exports = router;