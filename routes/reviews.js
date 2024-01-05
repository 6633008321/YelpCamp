const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require("../Utils/catchAsync");
const reviews = require('../controller/reviews.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');

router.post("/", validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;