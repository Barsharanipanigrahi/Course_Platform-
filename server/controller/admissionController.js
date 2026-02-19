const Admission = require("../models/Admission");

/* =========================
   CREATE ADMISSION
   ========================= */
exports.createAdmission = async (req, res) => {
  try {
    const { name, email, courseId } = req.body;

    if (!name || !email || !courseId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const admission = await Admission.create({
      name,
      email,
      courseId,
    });

    res.status(201).json({
      message: "Admission submitted successfully",
      admission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit admission",
      error: error.message,
    });
  }
};

/* =========================
   GET ALL ADMISSIONS (Admin)
   ========================= */
exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate("courseId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json({ admissions });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admissions",
      error: error.message,
    });
  }
};

/* =========================
   UPDATE ADMISSION STATUS
   ========================= */
exports.updateAdmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.status(200).json({
      message: "Admission status updated",
      admission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update admission",
      error: error.message,
    });
  }
};
