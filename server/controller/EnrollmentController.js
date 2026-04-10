const Enrollment = require("../model/Enrollment");

// ENROLL COURSE
const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user._id;

        const alreadyEnrolled = await Enrollment.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyEnrolled) {
            return res.json({
                status: false,
                message: "Already enrolled in this course",
            });
        }

        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId,
        });

        res.json({
            status: true,
            message: "Course enrolled successfully",
            enrollment,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};

// GET MY COURSES
const getMyCourses = async (req, res) => {
    try {
        const userId = req.user._id;

        const courses = await Enrollment.find({ user: userId }).populate("course");

        res.json({
            status: true,
            courses,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};

// ADMIN: GET COURSES BY USER ID
const getCoursesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const enrollments = await Enrollment.find({ user: userId }).populate("course");

        res.json({
            status: true,
            enrollments,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};

// ADMIN: UPDATE ENROLLMENT STATUS
const updateEnrollmentStatus = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const { status } = req.body;

        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({
                status: false,
                message: "Invalid status. Must be 'active' or 'inactive'",
            });
        }

        const enrollment = await Enrollment.findByIdAndUpdate(
            enrollmentId,
            { status },
            { new: true }
        ).populate("course");

        if (!enrollment) {
            return res.status(404).json({
                status: false,
                message: "Enrollment not found",
            });
        }

        res.json({
            status: true,
            message: `Enrollment marked as ${status}`,
            enrollment,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};

module.exports = {
    enrollCourse,
    getMyCourses,
    getCoursesByUserId,
    updateEnrollmentStatus,
};