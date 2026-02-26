const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
    enrollCourse,
    getMyCourses,
    getCoursesByUserId, // 👈 NEW
} = require("../controller/EnrollmentController");

router.post("/enroll", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);

// 👇 ADMIN: get courses by userId
router.get("/user/:userId", getCoursesByUserId);

module.exports = router;
