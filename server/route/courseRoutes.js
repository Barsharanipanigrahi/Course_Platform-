const express = require("express");
const { AddCourses, GetCourses, UpdateCourses, DeleteCourses, GetCourseReviews, AddCourseReview } = require("../controller/coursesController");
const router = express.Router();

router.post("/add", AddCourses);
router.get("/get", GetCourses);
router.put("/update/:id", UpdateCourses);
router.delete("/delete/:id", DeleteCourses);
router.delete("/course/all", DeleteCourses);
router.get("/reviews/:courseId", GetCourseReviews);
router.post("/reviews/add", AddCourseReview);
router

module.exports = router;