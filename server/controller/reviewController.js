const Review = require("../model/Review");
const Course = require("../model/Courses");

// ─── GET /api/course/reviews/all ────────────────────────────────
// Admin: fetch every review across all courses, newest first
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      status: true,
      reviews,
    });
  } catch (err) {
    console.error("getAllReviews error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error fetching reviews.",
    });
  }
};

// ─── GET /api/course/reviews/:courseId ──────────────────────────
// Public: fetch all reviews for a single course
const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await Review.find({ courseId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      status: true,
      reviews,
    });
  } catch (err) {
    console.error("getCourseReviews error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error fetching course reviews.",
    });
  }
};

// ─── POST /api/course/reviews/:courseId ─────────────────────────
// Authenticated student: submit a new review
const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, comment } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        status: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    // Check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found.",
      });
    }

    // Prevent duplicate review by same user on same course
    const existing = await Review.findOne({
      courseId,
      userId: req.user._id,
    });
    if (existing) {
      return res.status(409).json({
        status: false,
        message: "You have already reviewed this course.",
      });
    }

    const review = await Review.create({
      courseId,
      courseTitle: course.title,
      userId:      req.user._id,
      name:        req.user.name,
      rating:      Number(rating),
      comment:     comment || "",
    });

    return res.status(201).json({
      status:  true,
      message: "Review submitted successfully.",
      review,
    });
  } catch (err) {
    console.error("addReview error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error submitting review.",
    });
  }
};

// ─── DELETE /api/course/reviews/:reviewId ───────────────────────
// Admin only: permanently delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        status: false,
        message: "Review not found.",
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      status:  true,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    console.error("deleteReview error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error deleting review.",
    });
  }
};

module.exports = {
  getAllReviews,
  getCourseReviews,
  addReview,
  deleteReview,
};