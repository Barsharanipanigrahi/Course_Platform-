const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
    enrollCourse,
    getMyCourses,
    getCoursesByUserId,
    updateEnrollmentStatus,
} = require("../controller/EnrollmentController");

router.post("/enroll", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);
router.get("/user/:userId", getCoursesByUserId);
router.patch("/:enrollmentId/status", protect, adminOnly, updateEnrollmentStatus);

module.exports = router;