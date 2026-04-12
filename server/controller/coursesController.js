const Courses = require("../model/Courses");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const AddCourses = async (req, res) => {
  try {
    const courses = await Courses.create(req.body);
    await courses.populate("category");
    return res.json({
      message: "success",
      Courses: courses,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Error while creating course", status: false });
  }
};

const GetCourses = async (req, res) => {
  try {
    const xyz = await Courses.find().populate("category");
    return res.json({
      message: "lets get courses",
      courses: xyz,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error while fetch", status: false });
  }
};

const UpdateCourses = async (req, res) => {
  try {
    const updated = await Courses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category");
    return res.json({ message: "Update Courses", status: true, updated });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error while update", status: false });
  }
};

const DeleteCourses = async (req, res) => {
  try {
    await Courses.findByIdAndDelete(req.params.id);
    return res.json({ message: "Delete Courses", status: true });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error while delete", status: false });
  }
};

// ── GET /api/course/reviews/:courseId ──────────────────────────────
const GetCourseReviews = async (req, res) => {
  try {
    const course = await Courses.findById(req.params.courseId);
    if (!course)
      return res.status(404).json({ status: false, message: "Course not found" });

    return res.json({ status: true, reviews: course.reviews || [] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: "Failed to fetch reviews" });
  }
};

// ── POST /api/course/reviews/add ───────────────────────────────────
const AddCourseReview = async (req, res) => {
  // verify token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ status: false, message: "Unauthorized" });
let userId;
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  userId = decoded.id;
} catch (err) {
  return res.status(401).json({ status: false, message: "Invalid token" });
}

const user = await User.findById(userId).select("name");
if (!user)
  return res.status(404).json({ status: false, message: "User not found" });

const userName = user.name;

  const { courseId, rating, comment } = req.body;
  if (!courseId || !rating || !comment)
    return res.status(400).json({ status: false, message: "All fields are required" });

  try {
    const course = await Courses.findById(courseId);
    if (!course)
      return res.status(404).json({ status: false, message: "Course not found" });

    // prevent duplicate review from same user
    const alreadyReviewed = course.reviews.find(
      (r) => r.user?.toString() === userId
    );
    if (alreadyReviewed)
      return res.status(400).json({
        status: false,
        message: "You have already reviewed this course",
      });

    course.reviews.push({ user: userId, name: userName, rating, comment });
    await course.save();

    return res.json({ status: true, message: "Review added successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: "Failed to add review" });
  }
};

module.exports = {
  AddCourses,
  GetCourses,
  UpdateCourses,
  DeleteCourses,
  GetCourseReviews,
  AddCourseReview,
};