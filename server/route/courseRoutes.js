const express = require("express");
const {
  AddCourses,
  GetCourses,
  UpdateCourses,
  DeleteCourses,
  GetCourseReviews,
  AddCourseReview,
  DeleteCourseReview,
} = require("../controller/coursesController");

const router = express.Router();

// ── Course routes ──────────────────────────────────────────────────
router.post("/add", AddCourses);
router.get("/get", GetCourses);
router.get("/all", GetCourses);
router.put("/update/:id", UpdateCourses);
router.delete("/delete/:id", DeleteCourses);

// ── Review routes ──────────────────────────────────────────────────
router.get("/reviews/:courseId", GetCourseReviews);
router.get("/:courseId/reviews", GetCourseReviews);
router.post("/reviews/add", AddCourseReview);
router.delete("/reviews/:reviewId", DeleteCourseReview);
router.delete("/:courseId/reviews/:reviewId", DeleteCourseReview);  

module.exports = router;