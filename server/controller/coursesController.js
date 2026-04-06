const Courses = require("../model/Courses");

const AddCourses = async (req, res) => {
  try {
    const courses = await Courses.create(req.body);

    // Populate category so the response includes full category object
    await courses.populate("category");

    return res.json({
      message: "success",
      Courses: courses,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Error while creating course",
      status: false,
    });
  }
};

const GetCourses = async (req, res) => {
  try {
    // Populate category on every fetch so frontend gets name + color
    const xyz = await Courses.find().populate("category");

    return res.json({
      message: "lets get courses",
      courses: xyz,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error while fetch",
      status: false,
    });
  }
};

const UpdateCourses = async (req, res) => {
  try {
    const updated = await Courses.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category"); // ← populate so response is consistent

    return res.json({
      message: "Update Courses",
      status: true,
      updated,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error while update",
      status: false,
    });
  }
};

const DeleteCourses = async (req, res) => {
  try {
    await Courses.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Delete Courses",
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error while delete",
      status: false,
    });
  }
};

module.exports = {
  AddCourses,
  GetCourses,
  UpdateCourses,
  DeleteCourses,
};