const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getCourseReviews,
  addReview,
  deleteReview,
} = require("../controller/reviewController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin: get all reviews across all courses
router.get("/all", protect, adminOnly, getAllReviews);

// Public: get all reviews for a specific course
router.get("/reviews/:courseId", getCourseReviews);

// Authenticated student: submit a review for a course
router.post("/reviews/:courseId", protect, addReview);

// Admin: delete a review by its ID
router.delete("/reviews/:reviewId", protect, adminOnly, deleteReview);

module.exports = router;